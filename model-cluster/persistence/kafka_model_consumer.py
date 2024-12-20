from kafka import KafkaConsumer
from .websockets import send_updates
import json
import os
import threading
import asyncio
import pandas as pd
from data_generator.feature_generator import generar_caracteristicas
from data_generator.preprocess import procesar_datos
from .database import guardar_alerta
import joblib
import time

# Cargar variables de entorno
KAFKA_HOST = os.getenv('KAFKA_HOST')
KAFKA_TOPIC_MODEL = os.getenv('KAFKA_TOPIC_MODEL')

# Definir la ruta completa a los archivos de modelo
base_path = os.path.dirname(os.path.abspath(__file__))
svm_binario_model_path = os.path.join(base_path, "svm_binario_model.pkl")
svm_fallo_model_path = os.path.join(base_path, "svm_fallo_model.pkl")

# Variables para almacenar datos
vibration_data_model_list = []
timer_started = False

def check_and_process_batch():
    global vibration_data_model_list
    # Verificar si tenemos datos acumulados
    if vibration_data_model_list:
        
        # Convertir la lista en un DataFrame
        df = pd.DataFrame(vibration_data_model_list, columns=['Timestamp', 'Value', 'Medicion', 'Axis', 'MotorId', 'MotorName'])

        motor_id = df.iloc[0]['MotorId']
        motor_name = df.iloc[0]['MotorName']

        df = df.drop(columns=['MotorId', 'MotorName'])

        ## Generar características y procesar
        df = generar_caracteristicas(df)
        if df is None:
            print("Error en las características, se omite este lote.")
            vibration_data_model_list.clear()
            return

        df = procesar_datos(df)
        if df is None:
            print("Error en el preprocesamiento de datos, se omite este lote.")
            vibration_data_model_list.clear()
            return

        # Validar y ajustar las columnas antes de alimentar al modelo
        expected_columns = ['Value', 'Rms', 'Axis', 'Estado']
        try:
            df = df[expected_columns]
        except KeyError as e:
            print(f"Error: Faltan columnas necesarias para el modelo: {e}")
            return

        # **Verificar si los modelos se cargan correctamente**
        try:
            svm_binario_model = joblib.load(svm_binario_model_path)
            svm_fallo_model = joblib.load(svm_fallo_model_path)
        except Exception as e:
            print(f"Error al cargar los modelos: {e}")
            return

         # **Realizar predicciones**
        try:
            
            # Asegurar que las columnas estén en el orden correcto
            column_order_binario = ['Value', 'Rms', 'Axis', 'Estado']
            if not all(col in df.columns for col in column_order_binario):
                print(f"Error: Las columnas necesarias para el modelo binario no están disponibles en el DataFrame: {df.columns}")
                return

            X_binario = df[column_order_binario]  # Reordenar explícitamente

            y_pred_bin = svm_binario_model.predict(X_binario)

            # Contador para el tipo de fallos
            tipo_fallo_counter = {"Desalineacion del eje": 0, "Desgaste del rodamiento": 0}
            fallo_detectado = False

            # Procesar los registros donde se detecta un fallo
            for i, fallo_pred in enumerate(y_pred_bin):
                if fallo_pred == 1:
                    fallo_detectado = True
                    column_order_fallo = ['Value', 'Rms', 'Axis', 'Estado']
                    features_fallo = X_binario.iloc[i][column_order_fallo].values.reshape(1, -1)  # Reordenar explícitamente
                    tipo_fallo_pred = svm_fallo_model.predict(features_fallo)[0]

                    # Mapear el tipo de fallo a nombres
                    if tipo_fallo_pred == 0:
                        tipo_fallo_counter['Desalineacion del eje'] += 1
                    elif tipo_fallo_pred == 1:
                        tipo_fallo_counter['Desgaste del rodamiento'] += 1

            if fallo_detectado:
                tipo_fallo_predominante = max(tipo_fallo_counter, key=tipo_fallo_counter.get)
                result = {"prediction": "Fallo detectado", "Tipo_fallo": tipo_fallo_predominante, "motorId": f'{motor_id}', "motorName": motor_name}
                asyncio.run(guardar_alerta(f'{motor_id}', motor_name, result))
            else:
                result = {"prediction": "Ningún fallo detectado", "motorId": f'{motor_id}', "motorName": motor_name}

            # Enviar los resultados por websockets
            asyncio.run(send_updates(result))
            print(f"Resultados enviados: {result}")

        except Exception as e:
            print(f"Error durante la predicción: {e}")
        finally:
            # Limpiar la lista después de procesar
            vibration_data_model_list.clear()
            print("Lote procesado y lista limpiada.")

def consume_model_data():
    global timer_started, vibration_data_model_list
    try:
        model_consumer = KafkaConsumer(
            KAFKA_TOPIC_MODEL,
            bootstrap_servers=KAFKA_HOST,
            auto_offset_reset='latest',
            enable_auto_commit=True,
            group_id='vibraciones-group',
            value_deserializer=lambda x: x.decode('utf-8')
        )

        print("Conectado al broker de Kafka al tópico model-topic")
        last_received_time = time.time()

        for message in model_consumer:
            model_data = json.loads(message.value)
            model_data.pop('data_type', None)
            if all(key in model_data for key in ['Timestamp', 'Value', 'Medicion', 'Axis', 'MotorId', 'MotorName']):
                data_array = [
                    model_data['Timestamp'],
                    model_data['Value'],
                    model_data['Medicion'],
                    model_data['Axis'],
                    model_data['MotorId'],
                    model_data['MotorName'],
                ]
                vibration_data_model_list.append(data_array)
            last_received_time = time.time()
            if not timer_started:
                timer_started = True
                threading.Thread(target=wait_for_completion, args=(last_received_time,)).start()

    except Exception as e:
        print(f"Error al conectarse o consumir datos de Kafka: {e}")

def wait_for_completion(last_received_time):
    global timer_started
    while True:
        current_time = time.time()
        if current_time - last_received_time > 3:  # Espera de 3 segundos
            print("No se recibieron más mensajes en los últimos 3 segundos.")
            check_and_process_batch()
            timer_started = False
            break

def start_model_consumer():
    thread = threading.Thread(target=consume_model_data)
    thread.daemon = True
    thread.start()