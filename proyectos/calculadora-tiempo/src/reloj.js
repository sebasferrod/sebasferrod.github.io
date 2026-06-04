export {Reloj};
class Reloj{
    constructor(horas = 0, minutos = 0, segundos = 0){
        this.segundos = (horas*3600) + (minutos*60) + segundos*1;
    }

    getTiempoEnSegundos = () => {
        return this.segundos;
    }
    getHoras = () => {
        return Math.floor(this.segundos/3600);
    }
    getMinutos = () => {
        return Math.floor((this.segundos%3600)/60);
    }
    getSegundos = () => {
        return this.segundos%60;
    }

    setTiempoEnSegundos = (segundos) => {
        this.segundos = segundos;
    }

    setTiempo = (horas=0, minutos=0, segundos=0) => {
        this.segundos = horas*3600 + minutos*60 + segundos*1;
    }

    sumarSegundos = (segundos) => {
        this.segundos += segundos;
    }

    getHora = () => {
        return [this.getHoras()%24, this.getMinutos(), this.getSegundos()];
    }
}

let r = new Reloj(2, 2, 3);
console.log(r.getHoras());
console.log(r.getMinutos());
console.log(r.getSegundos());
console.log(r.getHora());
console.log(r.getTiempoEnSegundos());
r.sumarSegundos(3600);
console.log(r.getHora());
console.log(r.getTiempoEnSegundos());
r.setTiempo(0, 0, 0);
console.log(r.getHora());
console.log(r.getTiempoEnSegundos());