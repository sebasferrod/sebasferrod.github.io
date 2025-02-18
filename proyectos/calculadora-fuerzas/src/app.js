import {Fuerza, sumaFuerzas, sumaNFuerzas} from '/proyectos/calculadora-fuerzas/src/fuerza.js';
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('cargador-fuerzas');
    const nuevoElementoIngresado  = {
        nombre: document.getElementById('nombre-fuerza'),
        coord_x: document.getElementById('coord_x'),
        coord_y: document.getElementById('coord_y'),
        modulo: document.getElementById('modulo'),
        angulo: document.getElementById('angulo')
    };
    const nombreResultante = document.getElementById('nombre-fuerza-resultante');
    const contenedorElementos = document.getElementById('contenedor');
    const botonCargar = document.getElementById('boton-cargar');
    const botonSumar = document.getElementById('boton-sumar');
    const botonEliminar = document.getElementById('boton-eliminar');

    let elementos = [];
    let elementosSeleccionados = [];

    const cargarFuerza = () => {
        const nombre_f = nuevoElementoIngresado.nombre.value.trim();
        if(nombre_f){
            const f = new Fuerza(
                [nuevoElementoIngresado.coord_x.value, nuevoElementoIngresado.coord_y.value], 
                nuevoElementoIngresado.modulo.value, 
                nuevoElementoIngresado.angulo.value);
            addElemento(nombre_f, f);
            nuevoElementoIngresado.nombre.value = '';
            nuevoElementoIngresado.coord_x.value = '';
            nuevoElementoIngresado.coord_y.value = '';
            nuevoElementoIngresado.modulo.value = '';
            nuevoElementoIngresado.angulo.value = '';
        }
    }

    botonCargar.addEventListener('click', cargarFuerza);

    const sumarFuerzas = () => {
        const nombre_r = nombreResultante.value.trim();
        if(nombre_r){
            if (elementosSeleccionados.length === 2){
                console.log(elementos.find(elem => elem.id === elementosSeleccionados[0]).f);
                console.log(elementos.find(elem => elem.id === elementosSeleccionados[1]).f);
                const r = sumaFuerzas(elementos.find(elem => elem.id === elementosSeleccionados[0]).f, elementos.find(elem => elem.id === elementosSeleccionados[1]).f)
                addElemento(nombre_r, r);
            } else {
                console.log("No se pudo realizar la suma.")
            }
        }
    }

    const sumarFuerzas2 = () => {
        const coleccionFSelec = [];
        const nombre_r = nombreResultante.value.trim();
        if(nombre_r){
            if (elementosSeleccionados.length > 1){
                elementosSeleccionados.forEach(f_selec => {
                    coleccionFSelec.push(elementos.find(elem => elem.id === f_selec).f);
                })
                const r = sumaNFuerzas(coleccionFSelec);
                addElemento(nombre_r, r);
            } else {
                console.log("No se pudo realizar la suma.")
            }
        }
    }

    botonSumar.addEventListener('click', sumarFuerzas2);

    function addElemento(nombre, f){
        const id = Date.now();
        elementos.push({id, nombre, f});
        renderElementos();
    }

    const renderElementos = () => {
        contenedorElementos.innerHTML = '';
        elementos.forEach(elemento => {
            const divElemento = document.createElement('div');
            divElemento.className = 'elemento';
            divElemento.dataset.id = elemento.id;
            const divNombreFuerza = document.createElement('div');
            divNombreFuerza.className = 'nombre-fuerza';
            divNombreFuerza.innerHTML = '<div class="etiqueta">Nombre: </div>' + elemento.nombre;
            const divCoordFuerza = document.createElement('div');
            divCoordFuerza.className = 'coordenadas-fuerza';
            divCoordFuerza.innerHTML = '<div class="etiqueta">Coordenadas: </div>' + '[' + elemento.f.getPosicion() + ']';
            const divModuloFuerza = document.createElement('div');
            divModuloFuerza.className = 'modulo-fuerza';
            divModuloFuerza.innerHTML = '<div class="etiqueta">Modulo: </div>' + elemento.f.getModulo();
            const divAnguloFuerza = document.createElement('div');
            divAnguloFuerza.className = 'angulo-fuerza';
            divAnguloFuerza.innerHTML = '<div class="etiqueta">Angulo: </div>' + elemento.f.getAngulo();
            divElemento.appendChild(divNombreFuerza);
            divElemento.appendChild(divCoordFuerza);
            divElemento.appendChild(divModuloFuerza);
            divElemento.appendChild(divAnguloFuerza);

            if (elementosSeleccionados.includes(elemento.id)){
                divElemento.classList.add('seleccionado')
            }
            divElemento.addEventListener('click', () => tornarElementoSeleccion(elemento.id));
            contenedorElementos.appendChild(divElemento);

            
        });

    }

    function tornarElementoSeleccion(id){
        const index = elementosSeleccionados.indexOf(id);
        if (index > -1){
            elementosSeleccionados.splice(index, 1);
        } else {
            elementosSeleccionados.push(id);
        }
        renderElementos();
    }

    function eliminarSeleccionados(){
        if (elementosSeleccionados.length > 0){
            elementosSeleccionados.forEach(elemSelec => {
                let index = elementos.findIndex(elem => elem.id === elemSelec)
                elementos.splice(index, 1);
            })
            elementosSeleccionados = [];
            renderElementos();
        }
        else{
            console.log("Lista elementos seleccionados vacia.");
        }
    }

    botonEliminar.addEventListener('click', eliminarSeleccionados);
});