export class VistaController {
    router: any;
    notas: Array<any>;
    constructor(notas: Array<any>) {
        this.notas = notas;
    }
    renderNotas(IContenedor: HTMLInputElement | HTMLElement): void {
        IContenedor.innerHTML = "";
        this.notas.forEach(nota => {
            var elemNota = document.createElement('div');
            elemNota.classList.add('three', 'columns', 'nota-card');
            elemNota.textContent = nota.titulo + ' contenido: ' + nota.contenido;
            IContenedor.appendChild(elemNota);
        });
    }
}