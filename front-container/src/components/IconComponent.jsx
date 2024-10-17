const ICONS = {
  'eye': <>
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
  </>,
  'eye-slash': <>
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
  </>,
  'motor': <>
    <path d="M15.6179795,7.02489867 C15.6305288,7.02476683 15.6431683,7.02473933 15.655898,7.02481594 C15.777555,7.02558143 15.9771897,7.02558143 16.2548023,7.02481594 L18.4809132,9.06440678 L18.9384181,9.06440678 L18.9384181,8.42033898 C18.9384181,8.06463016 19.2267771,7.77627119 19.5824859,7.77627119 L20.6559322,7.77627119 C21.011641,7.77627119 21.3,8.06463016 21.3,8.42033898 L21.3,17.2225989 C21.3,17.5783076 21.011641,17.8666667 20.6559322,17.8666667 L19.5824859,17.8666667 C19.2267771,17.8666667 18.9384181,17.5783076 18.9384181,17.2225989 L18.9384181,16.2564972 L17.8649718,16.2564972 L17.8649718,17.4372881 C17.8649718,17.9115666 17.4804931,18.2960452 17.0062147,18.2960452 L8.2851824,18.2960452 C7.26860203,17.3109703 6.63333842,16.6935077 6.37939154,16.4436575 C6.37024871,16.4346621 6.16717184,16.4382103 5.97954013,16.4343216 C5.90789552,16.4328368 5.72165452,16.4343216 5.69505576,16.4343216 C5.68798925,16.4343216 5.43292159,16.4436575 5.16498981,16.4436575 C5.12463961,16.4436575 5.02613568,16.4430379 4.86947806,16.4417986 C4.39786514,16.4380678 4.01751412,16.0546961 4.01751412,15.5830685 L4.01751412,13.680226 L3.37344633,13.680226 L3.37344633,16.1491525 L2.3,16.1491525 L2.3,8.20564972 L3.37344633,8.20564972 L3.37344633,10.6745763 L4.01751412,10.6745763 L4.01751412,9.49378531 C4.01751412,9.01950688 4.40199276,8.63502825 4.87627119,8.63502825 L6.27175141,8.63502825 L6.27175141,7.66892655 C6.27175141,7.31321773 6.56011039,7.02485876 6.91581921,7.02485876 L10.0288136,7.02485876 L10.0288136,6.27344633 L7.55988701,6.27344633 L7.55988701,5.2 L15.5033898,5.2 L15.5033898,6.27344633 L13.0344633,6.27344633 L13.0344633,7.02485876 L15.6107345,7.02485876 C15.6131526,7.02485876 15.6155677,7.02487208 15.6179795,7.02489867 Z">
    </path>
  </>,
  'pencil': <>
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
  </>,
  'trash': <>
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
  </>
}

export default function IconComponent({ icon, className, onClick, viewBox = "0 0 16 16" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick} fill="currentColor" viewBox={viewBox}>
      {ICONS[icon]}
    </svg>
  )
}