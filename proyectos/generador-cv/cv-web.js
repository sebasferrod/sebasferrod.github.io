let cvNombre;
let cvPuesto;
let cvTelefono;
let cvCorreo;
let cvDireccion;
let cvObjetivo;
let cvFoto;
let experiencias = [];
let arrayEducacion = [];
function recepcionDatosCV() {
    cvNombre = localStorage.getItem("nombre");
    cvPuesto = localStorage.getItem("puesto");
    cvTelefono = localStorage.getItem("telefono");
    cvCorreo = localStorage.getItem("correo");
    cvDireccion = localStorage.getItem("direccion");
    cvObjetivo = localStorage.getItem("objetivo");
    cvFoto = localStorage.getItem("foto");
    // Cargar experiencias desde localStorage
    experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
    arrayEducacion = JSON.parse(localStorage.getItem("educacion")) || [];
}

function cargarDatos(){
    const nombrePostulante = document.getElementById("nombrePostulante");
    const puestoPostulante = document.getElementById("puestoAspirado");
    const telefono= document.getElementById("telefono");
    const correo = document.getElementById("correo");
    const direccion = document.getElementById("direccion");
    const objetivoLaboral = document.getElementById("objetivoLaboral");
    const fotoPostulante = document.getElementById("fotoPostulante");

    fotoPostulante.src = cvFoto ? cvFoto : "https://via.placeholder.com/150"; // Imagen por defecto si no hay foto
    nombrePostulante.innerHTML = cvNombre ? cvNombre : "Nombre no disponible";
    puestoPostulante.innerHTML = cvPuesto ? cvPuesto : "Puesto no disponible";
    telefono.innerHTML = cvTelefono ?  "<i><b>Telefono:</b> " + cvTelefono + "</i>": "Teléfono no disponible";
    correo.innerHTML = cvCorreo ? "<i><b>Correo:</b> " + cvCorreo + "</i>": "Correo no disponible";
    direccion.innerHTML = cvDireccion ? "<i><b>Direccion:</b> " + cvDireccion + "</i>": "Dirección no disponible";
    objetivoLaboral.innerHTML = cvObjetivo ? cvObjetivo : "Objetivo laboral no disponible";
    renderExperiencias();
    renderEducacion();
}
function renderExperiencias() {
    const contenedor = document.getElementById("experienciaLaboral");
    contenedor.innerHTML = "<h2>EXPERIENCIA LABORAL</h2>";
    experiencias.forEach((exp, index) => {
        const divExp = document.createElement("div");
        divExp.className = "experiencia";
        divExp.id = `exp-${index}`;
        divExp.innerHTML = `
            <span class="titulo">${exp.nombrePuesto}</span>
            <i>(${exp.fechaInicio} - ${exp.fechaFin})</i>
            <p>${exp.descripcion}</p>
            <!--<button onclick="eliminarExperiencia(${index})">Eliminar</button>-->
        `;
        contenedor.appendChild(divExp);
    });
}
function eliminarExperiencia(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta experiencia?")) {
        experiencias.splice(index, 1);
        renderExperiencias();
    }
}

function renderEducacion(){
    const contenedor = document.getElementById("formacion");
    contenedor.innerHTML = "";
    arrayEducacion.forEach((edu, index) => {
        const divEdu = document.createElement("div");
        divEdu.className = "educacion";
        divEdu.id = `edu-${index}`;
        divEdu.innerHTML = `
            <span class="titulo">■ ${edu.nombreTitulo}</span>
            <i>(${edu.fechaInicioEdu} - ${edu.fechaFinEdu})</i>
            <p>${edu.descripcionEdu}</p>
            <!--<button onclick="eliminarEducacion(${index})">Eliminar</button>-->
        `;
        contenedor.appendChild(divEdu);
    });
}
recepcionDatosCV();
console.log("Datos recibidos:", cvNombre, cvPuesto, cvTelefono, cvCorreo, cvDireccion, cvObjetivo, experiencias);
cargarDatos();