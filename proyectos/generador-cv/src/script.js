/*
    * Script para el generador de CV.
*/
let experiencias = [];
let arrayEducacion = [];
let fotoACargar;
let disponibilidad = 0; // 10 - Full time, 01 - Part time, 11 - Ambos - 00 - Sin disponibilidad
let bool_direccion = false; // Variable para controlar si se muestra el campo de dirección

// Renderiza en codigo HTML las experiencias laborales y estudios cargados por el usuario.
function renderExperiencias() {
    const contenedor = document.getElementById("contenedor-experiencias");
    contenedor.innerHTML = "";
    experiencias.forEach((exp, index) => {
        const divExp = document.createElement("div");
        divExp.className = "experiencia";
        divExp.innerHTML = `
            <h3>${exp.nombrePuesto}</h3>
            <p>Fecha inicio: ${exp.fechaInicio}</p>
            <p>Fecha fin: ${exp.fechaFin}</p>
            <p>${exp.descripcion}</p>
            <button onclick="eliminarExperiencia(${index})">Eliminar</button>
        `;
        contenedor.appendChild(divExp);
    });
    arrayEducacion.forEach((edu, index) => {
        const divEdu = document.createElement("div");
        divEdu.className = "educacion";
        divEdu.innerHTML = `
            <h3>${edu.nombreTitulo}</h3>
            <p>Fecha inicio: ${edu.fechaInicioEdu}</p>
            <p>Fecha fin: ${edu.fechaFinEdu}</p>
            <p>${edu.descripcionEdu}</p>
            <button onclick="eliminarEducacion(${index})">Eliminar</button>
        `;
        contenedor.appendChild(divEdu);
    });
}
// Agrega un formulario para que el usuario pueda ingresar su experiencia laboral.
// Este formulario se muestra al hacer clic en el botón "Agregar Experiencia".
function agregarExperiencia(){
    const divFormExp = document.createElement("div");
    divFormExp.className = "formulario";
    divFormExp.innerHTML = `
        <h2>Agregar Experiencia</h2>
        <label for="nombre-puesto">Puesto:</label>
        <input type="text" id="nombre-puesto" name="nombre-puesto" required>
        <label for="fecha-inicio">Fecha inicio:</label>
        <input type="date" id="fecha-inicio" name="fecha-inicio" required>
        <label for="fecha-fin">Fecha fin:</label>
        <input type="date" id="fecha-fin" name="fecha-fin" required>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>
        <button id="botonAgregarExp" onclick="cargarExperiencia()">Agregar</button>
    `;
    const divContenedor = document.getElementById("contenedor-formulario");
    divContenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar el formulario
    divContenedor.appendChild(divFormExp);
}
// Carga en memoria la experiencia laboral del usuario.
function cargarExperiencia() {
    const nombrePuesto = document.getElementById("nombre-puesto").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;
    const descripcion = document.getElementById("descripcion").value;

    if (nombrePuesto && fechaInicio && fechaFin && descripcion) {
        console.log("Experiencia cargada:", nombrePuesto, fechaInicio, fechaFin, descripcion);
        // Agregar la experiencia al array
        experiencias.push({
            nombrePuesto,
            fechaInicio,
            fechaFin,
            descripcion
        });
        renderExperiencias();
        document.querySelector(".formulario").remove();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}
// Elimina una experiencia laboral del array de experiencias y actualiza la vista.
// Se muestra un mensaje de confirmación antes de eliminar la experiencia.
function eliminarExperiencia(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta experiencia?")) {
        experiencias.splice(index, 1);
        renderExperiencias();
    }
}

// Agrega un formulario para que el usuario pueda ingresar su educación.
// Este formulario se muestra al hacer clic en el botón "Agregar Educación".
function agregarEducacion(){
    const divFormEdu = document.createElement("div");
    divFormEdu.className = "formulario";
    divFormEdu.innerHTML = `
        <h2>Agregar Educación</h2>
        <label for="nombre-titulo">Título:</label>
        <input type="text" id="nombre-titulo" name="nombre-titulo" required>
        <label for="fecha-inicio-edu">Fecha inicio:</label>
        <input type="date" id="fecha-inicio-edu" name="fecha-inicio-edu" required>
        <label for="fecha-fin-edu">Fecha fin:</label>
        <input type="date" id="fecha-fin-edu" name="fecha-fin-edu" required>
        <label for="descripcion-edu">Descripción:</label>
        <textarea id="descripcion-edu" name="descripcion-edu" required></textarea>
        <button id="botonAgregarEdu" onclick="cargarEducacion()">Agregar</button>
    `;
    const divContenedor = document.getElementById("contenedor-formulario");
    divContenedor.innerHTML = "";
    divContenedor.appendChild(divFormEdu);
}
// Carga en memoria la educación del usuario.
function cargarEducacion() {
    const nombreTitulo = document.getElementById("nombre-titulo").value;
    const fechaInicioEdu = document.getElementById("fecha-inicio-edu").value;
    const fechaFinEdu = document.getElementById("fecha-fin-edu").value;
    const descripcionEdu = document.getElementById("descripcion-edu").value;
    if (nombreTitulo && fechaInicioEdu && fechaFinEdu && descripcionEdu) {
        console.log("Educación cargada:", nombreTitulo, fechaInicioEdu, fechaFinEdu, descripcionEdu);
        // Agregar la educación al array
        arrayEducacion.push({
            nombreTitulo,
            fechaInicioEdu,
            fechaFinEdu,
            descripcionEdu
        });
        renderExperiencias();
        document.querySelector(".formulario").remove();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}
// Elimina una educación del array de educación y actualiza la vista.
// Se muestra un mensaje de confirmación antes de eliminar la educación.
function eliminarEducacion(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta educación?")) {
        arrayEducacion.splice(index, 1);
        renderExperiencias();
    }
}

// Carga la foto del usuario en el navegador.
function cargarFoto(){
    const divFormFoto = document.createElement("div");
    divFormFoto.className = "formulario";
    divFormFoto.innerHTML = `
        <h2>Cargar Foto</h2>
        <label for="foto">Selecciona una foto:</label>
        <input type="file" id="inputFoto" name="foto" accept="image/*" required>
        <div id="previewFoto"></div>
        <button id="botonCargarFoto" onclick="cargarImagen()">Cargar</button>
    `;
    const divContenedor = document.getElementById("contenedor-formulario");
    divContenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar el formulario
    divContenedor.appendChild(divFormFoto);
    const divPreviewFoto = document.getElementById("previewFoto");
    divPreviewFoto.innerHTML = "<img id=\"preview\" alt=\"Vista previa\">"; // Limpiar el preview antes de cargar una nueva foto
    const previewFoto = document.getElementById("preview");
    const inputFoto = document.getElementById("inputFoto");
    inputFoto.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewFoto.src = event.target.result;
                previewFoto.style.display = "block"; // Mostrar la imagen
                fotoACargar = event.target.result; // Guardar la imagen en una variable
                console.log("Foto cargada:", fotoACargar);
            };
            reader.readAsDataURL(file);
        } else {
            previewFoto.src = ""; // Limpiar la imagen si no se selecciona ninguna
        }
    });
    // Cargar la imagen guardada en localStorage si existe
}
// Carga la imagen elegida por el usuario en el localStorage.
function cargarImagen(){
    localStorage.setItem("foto", fotoACargar);
}
// Carga en localStorage los datos del usuario para generar el CV y redirecciona a la pagina del curriculum.
function generarCV(){
    console.log("Generando CV...");
    let nombre = document.getElementById("nombre").value;
    let puesto = document.getElementById("puesto").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let direccion;
    let objetivo = document.getElementById("objetivo").value;
    document.getElementById("full-time").checked ? disponibilidad += 2 : disponibilidad += 0;
    document.getElementById("part-time").checked ? disponibilidad += 1 : disponibilidad += 0;
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("puesto", puesto);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("correo", correo);
    localStorage.setItem("bool_direccion", bool_direccion);
    if (bool_direccion) {
        direccion = document.getElementById("direccion").value;
        localStorage.setItem("direccion", direccion);
    }
    localStorage.setItem("objetivo", objetivo);
    localStorage.setItem("experiencias", JSON.stringify(experiencias));
    localStorage.setItem("educacion", JSON.stringify(arrayEducacion));
    localStorage.setItem("disponibilidad", disponibilidad);
    console.log("Datos guardados en localStorage:", nombre, puesto, telefono, correo, direccion, objetivo, experiencias, arrayEducacion);
    // Redirigir a la página del currículum
    window.location.href = "curriculum.html";
}

// Muestra u oculta el campo de dirección según el estado del checkbox.
function toggleDireccion() {
    const direccionDiv = document.getElementById("direccionDiv");
    const chkDireccion = document.getElementById("chk_direccion");
    if (chkDireccion.checked) {
        console.log("Checkbox de dirección marcado, mostrando campo de dirección.");
        direccionDiv.style.display = "block";
        bool_direccion = true; // Actualizar la variable de control
    } else {
        direccionDiv.style.display = "none";
        bool_direccion = false; // Actualizar la variable de control
        document.getElementById("direccion").value = ""; // Limpiar el campo de dirección
    }
    console.log("Estado del checkbox de dirección:", bool_direccion);
}