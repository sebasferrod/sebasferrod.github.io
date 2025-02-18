export {Punto, Fuerza, sumaFuerzas, sumaNFuerzas};

class Punto{
    constructor(coordenadas){
        this.setCoordenadas(coordenadas);
    }

    setCoordenadas = (coordenadas) => {
        if (coordenadas.length > 2){
            console.log("Vector posicion fuera del plano.");
        }
        else {
            this._coordenadas = coordenadas;
        }
    }
    getCoordenadas = () => {
        return this._coordenadas;
    }
}

class Fuerza{
    constructor(ubicacion = [0.0,0.0], modulo=1, angulo_x=0){
        this._posicion = new Punto(ubicacion);
        this._modulo = modulo;
        this._angulo = angulo_x;
    }

    setPosicion = (ubicacion) => {
        this._posicion = Punto(ubicacion);
    }
    setModulo = (modulo) => {
        this._modulo = modulo;
    }
    setAngulo = (angulo_x) => {
        this._angulo = angulo_x;
    }

    getPosicion = () => {
        return this._posicion.getCoordenadas();
    }
    getModulo = () => {
        return this._modulo;
    }
    getAngulo = () => {
        return this._angulo;
    }
    componenteX = () => {
        return (this._modulo*Math.cos(2*Math.PI*this._angulo/360));
    }
    componenteY = () => {
        return (this._modulo*Math.sin(2*Math.PI*this._angulo/360));
    }
}

const sumaFuerzas = (p1, p2) => {
    const r_x = p1.componenteX() + p2.componenteX();
    const r_y = p1.componenteY() + p2.componenteY();
    const r_modulo = (r_x**2 + r_y**2) ** (1/2);
    const r_angulo = (Math.atan(r_y/r_x)*360)/(2*Math.PI);
    const r_posicion = [
        (p1.componenteY()*p1.getPosicion()[0]+p2.componenteY()*p2.getPosicion()[0])/r_y, 
        (p1.componenteX()*p1.getPosicion()[1]+p2.componenteX()*p2.getPosicion()[1])/r_x];

    const r = new Fuerza(r_posicion, r_modulo, r_angulo);
    return r;
}

const sumaNFuerzas = (coleccion) => {
    let r_x = 0;
    let r_y = 0;
    coleccion.forEach(fuerza => {
        r_x = r_x + fuerza.componenteX();
        r_y = r_y + fuerza.componenteY()
    })
    const r_modulo = (r_x**2 + r_y**2) ** (1/2);
    const r_angulo = (Math.atan(r_y/r_x)*360)/(2*Math.PI);
    let coord_rx = 0.0;
    let coord_ry = 0.0;
    coleccion.forEach(fuerza => {
        coord_rx = coord_rx + fuerza.componenteY()*fuerza.getPosicion()[0];
        coord_ry = coord_ry + fuerza.componenteX()*fuerza.getPosicion()[1];
    });
    coord_rx = coord_rx/r_y;
    coord_ry = coord_ry/r_x;
    const r_posicion = [coord_rx, coord_ry];
    const r = new Fuerza(r_posicion, r_modulo, r_angulo);
    return r;
}

let p1 = new Fuerza([0.0,0.0], 1, 45);
console.log(45/360)
console.log(p1.componenteX());
console.log(p1.getAngulo())
console.log(Math.atan(1/1))