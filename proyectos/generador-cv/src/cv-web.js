let cvNombre;
let cvPuesto;
let cvTelefono;
let cvCorreo;
let cvDireccion;
let cvObjetivo;
let cvFoto;
let disponibilidad = 0; // 01 - Full time, 10 - Part time, 11 - Ambos - 00 - Sin disponibilidad
let experiencias = [];
let arrayEducacion = [];
function recepcionDatosCV() {
    cvNombre = localStorage.getItem("nombre");
    cvPuesto = localStorage.getItem("puesto");
    cvTelefono = localStorage.getItem("telefono");
    cvCorreo = localStorage.getItem("correo");
    bool_direccion = localStorage.getItem("bool_direccion") === "true"; // Convertir a booleano
    // Si bool_direccion es true, se carga la dirección, si no, se asigna "False"
    // Esto permite que si el checkbox de dirección no está marcado, no se muestre la dirección en el CV.
    // Si no hay dirección guardada, se asigna "False" para evitar mostrar un campo vacío.
    localStorage.getItem("direccion")? cvDireccion = localStorage.getItem("direccion") : cvDireccion = "False"; // Si no hay dirección, se asigna "False"
    cvObjetivo = localStorage.getItem("objetivo");
    cvFoto = localStorage.getItem("foto");
    disponibilidad = localStorage.getItem("disponibilidad") || 0; // Por defecto, sin disponibilidad
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
    const divDisponibilidad = document.getElementById("disponibilidad");

    fotoPostulante.src = cvFoto ? cvFoto : "https://via.placeholder.com/150"; // Imagen por defecto si no hay foto
    nombrePostulante.innerHTML = cvNombre ? cvNombre : "Nombre no disponible";
    puestoPostulante.innerHTML = cvPuesto ? cvPuesto : "Puesto no disponible";
    telefono.innerHTML = cvTelefono ?  "<i><b>Telefono:</b> " + cvTelefono + "</i>": "Teléfono no disponible";
    correo.innerHTML = cvCorreo ? "<i><b>Correo:</b> " + cvCorreo + "</i>": "Correo no disponible";
    if (cvDireccion === "False" || !bool_direccion) {
        console.log("No se ha proporcionado una dirección.");
    }
    else {
        console.log("Dirección proporcionada:", cvDireccion);
        direccion.style.display = "block"; // Mostrar el campo de dirección
        direccion.innerHTML = cvDireccion ? "<i><b>Direccion:</b> " + cvDireccion + "</i>": "Dirección no disponible";
    }
    objetivoLaboral.innerHTML = cvObjetivo ? cvObjetivo : "Objetivo laboral no disponible";
    if (disponibilidad === 0) { divDisponibilidad.style.display = "none"; }
    if (disponibilidad >= 2) { divDisponibilidad.innerHTML = "<br><i>Disponibilidad: <b>Full Time</b></i>"; }
    if (disponibilidad === 1) { divDisponibilidad.innerHTML = "<br><i>Disponibilidad: <b>Part Time</b></i>"; }
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