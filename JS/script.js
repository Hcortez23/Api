//URL de la API
const API_URL = "https://retoolapi.dev/mQfaCh/data";

//funcion que manda a llamar al JSON
async function obtenerPersonas() {
    //respuesta del servidor
    const res = await fetch(API_URL); //Se hace una llamada al 
    
    //Pasamos a JSON la respuesta del servidor
    const data = await res.json(); //Esto es un JSON

    //Enviamos el JSON que nos manda la API a la funcion que crea la tabla
    MostrarDatos(data);
}

//La funcion lleva un parametro "datos que representa al JSON"
function MostrarDatos(datos){
    const tabla = document.querySelector('#tabla tbody');


    //Para inyectar codigo HTML usamos innerHTML
     tabla.innerHTML = '';

     datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Email}</td>
            <td>${persona.Edad}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
            </tr>
        `;
     });
}

//Lllamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();
