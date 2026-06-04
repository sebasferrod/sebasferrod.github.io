import {Reloj} from '/proyectos/calculadora-tiempo/src/reloj.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento cargado');
    const reloj_actual = {
        hora: document.getElementById('hora-actual'),
        minutos: document.getElementById('minuto-actual'),
        segundos: document.getElementById('segundo-actual')
    }
    const reloj_rato = {
        hora: document.getElementById('hora-rato'),
        minutos: document.getElementById('minuto-rato'),
        segundos: document.getElementById('segundo-rato')
    }
    const reloj_resultante = {
        hora: document.getElementById('horas-resultantes'),
        minutos: document.getElementById('minutos-resultantes'),
        segundos: document.getElementById('segundos-resultantes')
    }
    console.log(reloj_actual);
    console.log(reloj_rato);
    console.log(reloj_resultante);
    const botonSumar = document.getElementById('boton-sumar');
    const botonRestar = document.getElementById('boton-restar');
    const botonDescanso = document.getElementById('boton-descanso');
    const r_actual = new Reloj();
    const r_rato = new Reloj();
    const r_resultante = new Reloj();

    botonSumar.addEventListener('click', () => {
        console.log("Suma");
        let ra_hh = reloj_actual.hora.value;
        let ra_mm = reloj_actual.minutos.value;
        let ra_ss = reloj_actual.segundos.value;
        r_actual.setTiempo(ra_hh, ra_mm, ra_ss);
        r_rato.setTiempo(reloj_rato.hora.value,
            reloj_rato.minutos.value,
            reloj_rato.segundos.value);
        
        r_resultante.setTiempoEnSegundos(r_actual.getTiempoEnSegundos() + r_rato.getTiempoEnSegundos());
        reloj_resultante.hora.innerText = r_resultante.getHoras()%24;
        reloj_resultante.minutos.innerText = r_resultante.getMinutos();
        reloj_resultante.segundos.innerText = r_resultante.getSegundos();
    })
    botonRestar.addEventListener('click', () => {
        console.log("Resta");
        r_actual.setTiempo(reloj_actual.hora.value,
            reloj_actual.minutos.value,
            reloj_actual.segundos.value);
        r_rato.setTiempo(reloj_rato.hora.value,
            reloj_rato.minutos.value,
            reloj_rato.segundos.value);
        r_resultante.setTiempoEnSegundos(r_actual.getTiempoEnSegundos() - r_rato.getTiempoEnSegundos());
        reloj_resultante.hora.innerText = r_resultante.getHoras()%24;
        reloj_resultante.minutos.innerText = r_resultante.getMinutos();
        reloj_resultante.segundos.innerText = r_resultante.getSegundos();
    })
    botonDescanso.addEventListener('click', () => {
        console.log("Descanso");
        reloj_rato.minutos.value = 35;
    })
})