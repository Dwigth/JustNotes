import { VistaController } from "./vista.controller";
import { HTTPController } from "./http.controller";

export class InputController {
    ITitulo: HTMLInputElement;
    IContenido: HTMLInputElement;
    IContenedor: HTMLInputElement;
    IConfirmacion: HTMLInputElement;
    notas: Array<any> = [];
    constructor() {
        this.ITitulo = <HTMLInputElement>document.getElementById('ITitulo');
        this.IContenido = <HTMLInputElement>document.getElementById('IContenido');
        this.IContenedor = <HTMLInputElement>document.getElementById('IContenedor');
        this.IConfirmacion = <HTMLInputElement>document.getElementById('IConfirmacion');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.displayITitulo('none'); });
        this.IContenido.addEventListener('click', () => {
            this.displayITitulo('initial');
        });
        this.displayITitulo('none');
        this.getNotas();
    }
    async getNotas() {
        let data = await HTTPController.GET('/notas/obtener');
        console.log(data);

        let notas = (data.data != undefined) ? Array.from(data.data) : [];
        this.notas = notas;
        let vc = new VistaController(this.notas).renderNotas(this.IContenedor);
    }
    getITitulo() {
        return (this.ITitulo != null) ? this.ITitulo.value : 'Objeto es nulo';
    }
    getIContenido() {
        return (this.IContenido != null) ? this.IContenido.value : 'Objeto es nulo';
    }
    displayITitulo(status: string) {
        this.ITitulo.style.display = status;
    }
    save() {
        var nota = { titulo: this.getITitulo(), contenido: this.getIContenido() };
        if (nota.contenido !== '') {
            this.notas.push(nota);
            let vc = new VistaController(this.notas).renderNotas(this.IContenedor);
            this.clean();
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
}