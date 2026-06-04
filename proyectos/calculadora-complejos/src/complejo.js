export {Complejo};
class Complejo {
  constructor(real, imaginario) {
    this.real = real;
    this.imaginario = imaginario;
  }

  sumar(otroComplejo) {
    return new Complejo(
      this.real + otroComplejo.real,
      this.imaginario + otroComplejo.imaginario
    );
  }

  restar(otroComplejo) {
    return new Complejo(
      this.real - otroComplejo.real,
      this.imaginario - otroComplejo.imaginario
    );
  }

  multiplicar(otroComplejo) {
    return new Complejo(
      this.real * otroComplejo.real - this.imaginario * otroComplejo.imaginario,
      this.real * otroComplejo.imaginario + this.imaginario * otroComplejo.real
    );
  }

  dividir(otroComplejo) {
    const denominador = Math.pow(otroComplejo.real, 2) + Math.pow(otroComplejo.imaginario, 2);
    return new Complejo(
      (this.real * otroComplejo.real + this.imaginario * otroComplejo.imaginario) / denominador,
      (this.imaginario * otroComplejo.real - this.real * otroComplejo.imaginario) / denominador
    );
  }

  inverso() {
    return new Complejo(this.real/(Math.pow(this.real, 2) + Math.pow(this.imaginario, 2)), -this.imaginario/(Math.pow(this.real, 2) + Math.pow(this.imaginario, 2)));
  }

  modulo(){
    return Math.sqrt(Math.pow(this.real, 2) + Math.pow(this.imaginario, 2));
  }

  toString() {
    return `${this.real} + ${this.imaginario}i`;
  }
}