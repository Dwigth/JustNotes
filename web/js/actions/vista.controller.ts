import { Nota } from "../helpers/nota";

export class VistaController {
    router: any;
    notas: Array<Array<Nota>>;
    constructor(notas: Array<Array<Nota>>) {
        this.notas = notas;
    }
    renderNotas(IContenedor: HTMLInputElement | HTMLElement): void {
        IContenedor.innerHTML = "";
        this.notas.forEach((notas: Array<Nota>, index: number) => {
            let row: HTMLElement = document.createElement('div');
            row.classList.add('row');
            notas.forEach((nota: Nota) => {
                var elemNota = this.cardBuilder(nota);
                row.appendChild(elemNota);
            });
            IContenedor.append(row);
        });
    }

    cardBuilder(data: Nota) {
        const contenedorCard: HTMLElement = document.createElement('div');
        contenedorCard.classList.add('three', 'columns', 'nota-card');
        const headerCard: HTMLElement = document.createElement('div');
        headerCard.textContent = data.titulo;
        headerCard.classList.add('nota-card-header');
        const contentCard: HTMLElement = document.createElement('div');
        contentCard.textContent = data.contenido;
        contentCard.classList.add('nota-card-content');
        const footerCard: HTMLElement = document.createElement('div');
        footerCard.classList.add('nota-card-footer', 'row');
        const opt: HTMLElement = document.createElement('div');
        opt.classList.add('u-full-width');
        const colors: HTMLElement = document.createElement('div');
        const edit: HTMLElement = document.createElement('div');
        const more: HTMLElement = document.createElement('div');
        colors.classList.add('four', 'columns');
        colors.textContent = '¡Color!';
        edit.textContent = 'Editar';
        edit.classList.add('four', 'columns');
        more.textContent = 'Más';
        more.classList.add('four', 'columns');
        opt.append(colors, edit, more);
        footerCard.appendChild(opt);

        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }
}