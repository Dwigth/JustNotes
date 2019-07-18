import { VistaController } from "./vista.controller";
import { HTTPController } from "./http.controller";
import { Nota } from "../helpers/nota";
import { NotasService } from "../services/notas.service";
import { AlertController } from "./alert.controllert";

export class InputController {
    ITitulo: HTMLInputElement;
    IContenido: HTMLInputElement;
    IContenedor: HTMLInputElement;
    IConfirmacion: HTMLInputElement;
    notas: Array<Array<Nota>> = [];
    ILista: HTMLElement;
    IRefresh: HTMLElement;
    constructor() {
        this.ITitulo = <HTMLInputElement>document.getElementById('ITitulo');
        this.IContenido = <HTMLInputElement>document.getElementById('IContenido');
        this.IContenedor = <HTMLInputElement>document.getElementById('IContenedor');
        this.IConfirmacion = <HTMLInputElement>document.getElementById('IConfirmacion');
        this.ILista = <HTMLElement>document.getElementById('ILista');
        this.IRefresh = <HTMLElement>document.getElementById('IRefresh');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.afterClickIContenido('none'); });
        this.IContenido.addEventListener('click', () => {
            this.afterClickIContenido('initial');
        });
        this.afterClickIContenido('none');
        this.displayNotas();
        this.IRefresh.addEventListener('click', () => { this.refresh() })
    }
    async displayNotas() {
        let data = await NotasService.obtenerNotas();
        console.log(data);

        let alert = new AlertController();
        if (data.data == undefined) {
            alert.showAlert('Ha habido un error');
        } else {
            alert.showAlert(<string>data.msg);
        }
        let notas: Array<Array<Nota>> = (data.data != undefined) ? Array.from(data.data) : [];
        this.notas = notas;
        let vc = new VistaController(this.notas).renderNotas(this.IContenedor);
    }
    getITitulo() {
        return (this.ITitulo != null) ? this.ITitulo.value : 'Objeto es nulo';
    }
    getIContenido() {
        return (this.IContenido != null) ? this.IContenido.value : 'Objeto es nulo';
    }
    afterClickIContenido(status: string) {
        this.ITitulo.style.display = status;
        this.IConfirmacion.style.display = status;
        this.ILista.style.display = status;
    }
    save() {
        var nota: Nota = { titulo: this.getITitulo(), contenido: this.getIContenido(), id_usuario: 1, lista: false };
        if (nota.contenido !== '') {
            NotasService.agregarNota(nota);
            this.notas[this.notas.length - 1].push(nota);
            let vc = new VistaController(this.notas).renderNotas(this.IContenedor);
            this.clean();
            this.displayNotas();
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
    refresh() {
        this.IRefresh.classList.add('refresh');
        setTimeout(() => {
            this.displayNotas();
            this.IRefresh.classList.remove('refresh');
        }, 1000);
    }
}