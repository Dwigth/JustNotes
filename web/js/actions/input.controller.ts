import { VistaController } from "./vista.controller";
import { Nota } from "../helpers/nota";
import { NotasService } from "../services/notas.service";
import { AlertController } from "./alert.controllert";

export class InputController {
    ITitulo: HTMLInputElement;
    IContenido: HTMLInputElement;
    IContenedor: HTMLInputElement;
    IConfirmacion: HTMLInputElement;
    notas: Array<Nota> = [];
    ILista: HTMLElement;
    IBusqueda: HTMLInputElement;
    static IRefresh: HTMLElement;
    constructor() {
        this.ITitulo = <HTMLInputElement>document.getElementById('ITitulo');
        this.IContenido = <HTMLInputElement>document.getElementById('IContenido');
        this.IContenedor = <HTMLInputElement>document.getElementById('IContenedor');
        this.IConfirmacion = <HTMLInputElement>document.getElementById('IConfirmacion');
        this.ILista = <HTMLElement>document.getElementById('ILista');
        this.IBusqueda = <HTMLInputElement>document.getElementById('busqueda');
        InputController.IRefresh = <HTMLElement>document.getElementById('IRefresh');
        this.IConfirmacion.addEventListener('click', () => { this.save(); this.afterClickIContenido('none'); });
        this.IContenido.addEventListener('click', () => {
            this.afterClickIContenido('initial');
        });
        this.IBusqueda.addEventListener('keyup', () => {
            this.search(this.IBusqueda.value);
        });
        this.afterClickIContenido('none');
        this.displayNotas();
        InputController.IRefresh.addEventListener('click', () => { this.refresh() })
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
        let notas: Array<Nota> = (data.data != undefined) ? Array.from(data.data) : [];
        this.notas = notas;
        let vc = new VistaController(this.notas).render(this.IContenedor);
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
        let current_datetime = new Date()
        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
        console.log(formatted_date)
        var nota: Nota = {
            titulo: this.getITitulo(),
            contenido: this.getIContenido(),
            id_usuario: 1,
            lista: false,
            fecha_creacion: formatted_date,
            fecha_modificacion: formatted_date
        };
        if (nota.contenido !== '') {
            NotasService.agregarNota(nota).finally(() => {
                let vc = new VistaController(this.notas).render(this.IContenedor);
                this.clean();
                this.displayNotas();
            });
        }
    }
    clean() {
        this.ITitulo.value = "";
        this.IContenido.value = "";
    }
    refresh() {
        InputController.IRefresh.classList.add('refresh');
        this.displayNotas().finally(() => InputController.IRefresh.classList.remove('refresh'));
    }
    public static spin(spin: boolean) {
        (spin) ? this.IRefresh.classList.add('refresh') : InputController.IRefresh.classList.remove('refresh');
    }
    async search(val: string) {
        if (val != '') {
            let data = await NotasService.buscarNota(val).catch(e => e);
            let vc = new VistaController(data.data).render(this.IContenedor);
        } else this.displayNotas();
    }
}