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




//Agregar un nuevo registro

const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal(); //Abrir el modal
});

btnCerrar.addEventListener("click", () => {
    modal.close();
})



document.getElementById("frmAgregar").addEventListener("submit", async e=> {
    e.preventDefault(); //"e" representa al Evento Submit, evita que el formulario se envie de golpe

    //Capturar los valores del formulario
    const nombre = document.getElementById("Nombre").value.trim();
    const apellido = document.getElementById("Apellido").value.trim();
    const email = document.getElementById("Email").value.trim();
    const edad = document.getElementById("Edad").value.trim();

    //Validadicion basica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return;
    }

    //Llamar a la API para enviar al usuario

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente")

        document.getElementById("frmAgregar").reset();
        modal.close();

        obtenerPersonas();
    } else {
        alert("Hubo un error al agregar")
    }


});
