import {Complejo} from '/proyectos/calculadora-complejos/src/complejo.js';
document.addEventListener('DOMContentLoaded', () => {
    const nuevoElementoIngresado = {
        nombre: document.getElementById('nombre-nComplejo'),
        real: document.getElementById('parte-real'),
        imaginario: document.getElementById('parte-imaginaria')
    };
    const contenedorElementos = document.getElementById('contenedor');
    const botonCargar = document.getElementById('boton-cargar');
    const botonEliminar = document.getElementById('boton-eliminar');
    const botonDividir = document.getElementById('boton-dividir');
    const botonMultiplicar = document.getElementById('boton-multiplicar');
    const botonSumar = document.getElementById('boton-sumar');
    const botonRestar = document.getElementById('boton-restar');
    const botonModulo = document.getElementById('boton-modulo');
    const displayModulo = document.getElementById('display-modulo');

    let elementos = [];
    let elementosSeleccionados = [];

    const cargarComplejo = () => {
        const nombre = nuevoElementoIngresado.nombre.value.trim();
        if(nombre){
            const c = new Complejo(parseFloat(nuevoElementoIngresado.real.value), parseFloat(nuevoElementoIngresado.imaginario.value*1.0));
            addElemento(nombre, c);
            nuevoElementoIngresado.nombre.value = '';
            nuevoElementoIngresado.real.value = '';
            nuevoElementoIngresado.imaginario.value = '';
        }
    }

    botonCargar.addEventListener('click', cargarComplejo);

    function addElemento(nombre, c){
        const id = Date.now();
        elementos.push({id, nombre, c});
        renderElementos();
    }

    const renderElementos = () => {
        contenedorElementos.innerHTML = '';
        elementos.forEach(elemento => {
            const divElemento = document.createElement('div');
            divElemento.className = 'elemento';
            divElemento.dataset.id = elemento.id;
            const divNumeroOriginal = document.createElement('div');
            const divNombreNumero = document.createElement('div');
            divNombreNumero.className = 'nombre-numero';
            divNombreNumero.innerHTML = '<div class="etiqueta">Nombre: </div>' + elemento.nombre;
            divNumeroOriginal.className = 'numero-original';
            const divParteReal = document.createElement('div');
            divParteReal.className = 'parte-real';
            divParteReal.innerHTML = '<div class="etiqueta">real: </div>' + elemento.c.real;
            const divParteImaginaria = document.createElement('div');
            divParteImaginaria.className = 'parte-imaginaria';
            divParteImaginaria.innerHTML = '<div class="etiqueta">Imaginaria: </div>' + elemento.c.imaginario;
            divNumeroOriginal.appendChild(divNombreNumero);
            divNumeroOriginal.appendChild(divParteReal);
            divNumeroOriginal.appendChild(divParteImaginaria);
            divElemento.appendChild(divNombreNumero);
            divElemento.appendChild(divNumeroOriginal);
            let complejoInverso = elemento.c.inverso();
            const divNumeroInverso = document.createElement('div');
            divNumeroInverso.className = 'numero-inverso';
            const divInversoParteReal = document.createElement('div');
            divInversoParteReal.className = 'parte-real';
            divInversoParteReal.innerHTML = '<div class="etiqueta">real: </div>' + complejoInverso.real;
            const divInversoParteImaginaria = document.createElement('div');
            divInversoParteImaginaria.className = 'parte-imaginaria';
            divInversoParteImaginaria.innerHTML = '<div class="etiqueta">Imaginaria: </div>' + complejoInverso.imaginario;
            divNumeroInverso.appendChild(divInversoParteReal);
            divNumeroInverso.appendChild(divInversoParteImaginaria);
            divElemento.appendChild(divNumeroInverso);

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

    function dividirSeleccionados(){
        if (elementosSeleccionados.length > 1 && elementosSeleccionados.length < 3 && nuevoElementoIngresado.nombre.value.trim() !== ''){
            const nombre = nuevoElementoIngresado.nombre.value.trim();
            const c1 = elementos.find(elem => elem.id === elementosSeleccionados[0]).c;
            const c2 = elementos.find(elem => elem.id === elementosSeleccionados[1]).c;
            const resultado = c1.dividir(c2);
            addElemento(nombre, resultado);
            renderElementos();
            nuevoElementoIngresado.nombre.value = '';
        }
        else{
            console.log("Lista de elementos seleccionados no tiene 2 elementos.");
        }
    }
    botonDividir.addEventListener('click', dividirSeleccionados);

    //Multiplicacion
    function multiplicarSeleccionados(){
        if (elementosSeleccionados.length > 1 && elementosSeleccionados.length < 3 && nuevoElementoIngresado.nombre.value.trim() !== ''){
            const nombre = nuevoElementoIngresado.nombre.value.trim();
            const c1 = elementos.find(elem => elem.id === elementosSeleccionados[0]).c;
            const c2 = elementos.find(elem => elem.id === elementosSeleccionados[1]).c;
            const resultado = c1.multiplicar(c2);
            addElemento(nombre, resultado);
            renderElementos();
            nuevoElementoIngresado.nombre.value = '';
        }
        else{
            console.log("Lista de elementos seleccionados no tiene 2 elementos.");
        }
    }
    botonMultiplicar.addEventListener('click', multiplicarSeleccionados);

    //Suma
    function sumarSeleccionados(){
        if (elementosSeleccionados.length > 1 && elementosSeleccionados.length < 3 && nuevoElementoIngresado.nombre.value.trim() !== ''){
            const nombre = nuevoElementoIngresado.nombre.value.trim();
            const c1 = elementos.find(elem => elem.id === elementosSeleccionados[0]).c;
            const c2 = elementos.find(elem => elem.id === elementosSeleccionados[1]).c;
            const resultado = c1.sumar(c2);
            console.log(resultado);
            console.log(c1, c2);
            addElemento(nombre, resultado);
            renderElementos();
            nuevoElementoIngresado.nombre.value = '';
        }
        else{
            console.log("Lista de elementos seleccionados no tiene 2 elementos.");
        }
    }
    botonSumar.addEventListener('click', sumarSeleccionados);

    //Resta
    function restarSeleccionados(){
        if (elementosSeleccionados.length > 1 && elementosSeleccionados.length < 3 && nuevoElementoIngresado.nombre.value.trim() !== ''){
            const nombre = nuevoElementoIngresado.nombre.value.trim();
            const c1 = elementos.find(elem => elem.id === elementosSeleccionados[0]).c;
            const c2 = elementos.find(elem => elem.id === elementosSeleccionados[1]).c;
            const resultado = c1.restar(c2);
            addElemento(nombre, resultado);
            renderElementos();
            nuevoElementoIngresado.nombre.value = '';
        }
        else{
            console.log("Lista de elementos seleccionados no tiene 2 elementos.");
        }
    }
    botonRestar.addEventListener('click', restarSeleccionados);

    function moduloSeleccionado(){
        if (elementosSeleccionados.length === 1){
            const c = elementos.find(elem => elem.id === elementosSeleccionados[0]).c;
            const resultado = c.modulo();
            displayModulo.innerHTML = `<div class="etiqueta">Modulo: </div>${resultado.toFixed(2)}`;
        }
        else{
            console.log("Lista de elementos seleccionados no tiene 1 elemento.");
        }
    }
    botonModulo.addEventListener('click', moduloSeleccionado);
})