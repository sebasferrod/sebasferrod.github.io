let dataExperiencias = null; // Placeholder for data, will be fetched later
const btnTecnico = document.getElementById('boton-tecnico');
const btnGeneral = document.getElementById('boton-general');
const btnGastronomia = document.getElementById('boton-gastronomia')
const container = document.getElementById('experiencia').getElementsByClassName('contenedor')[0];

document.addEventListener('DOMContentLoaded', () => {
    // CUANDO SE DESBLOQUEAN LAS SIGUIENTES LINEAS, SE ROMPE LA PAGINA.
    
    btnTecnico.addEventListener('click', cargarExperienciasTecnicas);
    btnGastronomia.addEventListener('click', cargarExperienciasGastronomicas);
    btnGeneral.addEventListener('click', cargarExperienciasGenerales);
    
    
    fetch('../data/bd.json')
    .then(response => response.json())
    .then(data => {
        dataExperiencias = data;
        let contador = 0;
        container.innerHTML = ''; // Limpiar mensaje de carga
        console.log('Experiencias cargadas:', data.experiencias);
        if (!data.experiencias || data.experiencias.length === 0) {
            console.warn('No se encontraron experiencias en el JSON.');}
        data.experiencias.forEach(experiencia => {
            if (contador == 0) {
                container.appendChild(crearExperienciaHTML(experiencia));
                // Necesito ver que el conteiner tenga algo:
                // console.log('Contenido CONTEINER:' + container.innerHTML);
                // Ya no es necesario ver el contenido del contenedor, los errores fueron corregidos.
                contador++;
            }
            else {
                /*La pagina se rompe con las siguientes lineas de codigo. 
                Se intento que se carguen las experiencias desde la mas vieja a la mas nueva en orden ascendente.
                Hay problemas con .insertBefore(p1,p2), creo que el problema es que no se para un nodo optimo.*/
                try {
                    // Se uso un query selector con ayuda de github copilot. El error era que se buscaba un id en vez de un data-id.
                    const expReferencia = document.querySelector(`.trabajo[data-id="${contador}"]`);
                    if (!expReferencia) {
                        console.warn('Referencia no encontrada para el contador:', contador);
                        return;
                    }
                    container.insertBefore(crearExperienciaHTML(experiencia), expReferencia);
                    contador++;
                }
                catch (error){
                    console.error('Error insertando experiencia:', error);
                    const nuevaExp = crearExperienciaHTML(experiencia);
                    if (nuevaExp) {
                        container.appendChild(nuevaExp);
                        contador++;
                    } else {
                        console.warn('No se pudo crear la experiencia:', experiencia);
                    }
                }
                
            }
        });
    })
    .catch(error => {
        console.error('Error cargando experiencias:', error);
        container.innerHTML = '<p class="error">Error cargando experiencias. Por favor intenta más tarde.</p>';
    });
});

function crearExperienciaHTML(exp) {
    // Validar que la experiencia tenga los campos necesarios
    if (!exp || !exp.id || !exp.puesto || !exp.periodo || !exp.empresa || !exp.descripcion) {
        console.warn('Experiencia incompleta:', exp);
        return null;
    }
    else{
        const nuevaExp = document.createElement('div');
        nuevaExp.className = 'trabajo elemento';
        nuevaExp.setAttribute('data-id', exp.id);
        nuevaExp.innerHTML = `
            <div class="cabecera">
                <h3>${exp.puesto}</h3>
                <div class="tiempo">
                    <i>${exp.periodo}</i>
                </div>
            </div>
            <div class="institucion">
                ${exp.empresa}
            </div>
            <div class="descripcion">
                ${exp.descripcion}
            </div>
        `;
        return nuevaExp;
    }
}

function cargarExperienciasTecnicas() {
    console.log('FUNCION CARGAR EXPERIENCIAS TECNICAS');
    cargarExperienciasCategoria([2]);
}
function cargarExperienciasGastronomicas() {
    console.log('FUNCION CARGAR EXPERIENCIAS GASTRONOMICAS');
    cargarExperienciasCategoria([3]);
}
function cargarExperienciasGenerales() {
    console.log('FUNCION CARGAR EXPERIENCIAS GENERALES');
    cargarExperienciasCategoria([1, 2, 3]);
}

function cargarExperienciasCategoria(categorias){
    console.log('FUNCION CARGAR EXPERIENCIAS ' + categorias);
    let contador = 0;
    let id_anterior = 0;
    container.innerHTML = '';
    if (!dataExperiencias.experiencias || dataExperiencias.experiencias.length === 0) {
        console.warn('No se encontraron experiencias en el JSON.');}
    dataExperiencias.experiencias.forEach(experiencia => {
        if (selector(categorias, experiencia.categoria)) {
            const nuevaExp = crearExperienciaHTML(experiencia);
            if (contador == 0 && nuevaExp) {
                container.appendChild(nuevaExp);
                id_anterior = experiencia.id;
                contador++;
            } else if (contador > 0 && nuevaExp) {
                try {
                    const expReferencia = document.querySelector(`.trabajo[data-id="${id_anterior}"]`);
                    if (!expReferencia) {
                        console.warn('Referencia no encontrada para el contador:', contador);
                        return;
                    }
                    container.insertBefore(nuevaExp, expReferencia);
                    id_anterior = experiencia.id;
                    contador++;
                } catch (error) {
                    console.error('Error insertando experiencia técnica:', error);
                    container.appendChild(nuevaExp);
                }
            }
            else {
                console.warn('No se pudo crear la experiencia técnica:', experiencia);
            }
        }
    });
}

function selector(categorias, catExp){
    /*
    if (categoria < 3){
        if(catExp === categoria){
            return true;
        }
        return false;
    }
    else if (categoria === 3){
        return true;
    }
    else {
        console.warn('Categoria no reconocida:', categoria);
        return false;
    }
    */
    let aprobado = true;
    if (categorias.includes(catExp)){
        aprobado = true;
    }
    else {
        aprobado = false;
    }
    return aprobado;
}