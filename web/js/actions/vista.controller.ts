import { Nota } from "../helpers/nota";
import { InputController } from "./input.controller";
import { NotasService } from "../services/notas.service";
import { AlertController } from "./alert.controllert";

export class VistaController {
    router: any;
    notas: Array<Array<Nota>>;
    private colors: Array<any> = [
        'FF637D',
        'F4F1BB',
        '66D7D1',
        'EAF2E3',
        'FFF87F'
    ];
    constructor(notas: Array<Array<Nota>>) {
        this.notas = notas;
    }

    /**
     * @param IContenedor Contenedor en el cual se construirán las tarjetas
     */
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

    /**
     * Función que crea el HTML de cada nota.
     * @param data Datos de la nota
     */
    cardBuilder(data: Nota) {
        const alert = new AlertController();
        const contenedorCard: HTMLElement = document.createElement('div');
        contenedorCard.classList.add('three', 'columns', 'nota-card', 'cursor');
        contenedorCard.id = `card_${data.id_nota}`;

        if (data.color) {
            contenedorCard.style.backgroundColor = '#' + data.color;
        }

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
        const colors_drop: HTMLElement = document.createElement('div');
        const more: HTMLElement = document.createElement('div');
        const colorsBtn: HTMLElement = document.createElement('i');
        const moreBtn: HTMLElement = document.createElement('i');
        colors_drop.classList.add('colors_dropdown');
        colors.classList.add('six', 'columns');
        colorsBtn.textContent = 'color_lens';
        colorsBtn.classList.add('material-icons', 'cursor');
        moreBtn.textContent = 'more_vert';
        moreBtn.classList.add('material-icons', 'cursor');
        more.classList.add('six', 'columns');
        colors.append(colors_drop, colorsBtn);
        more.appendChild(moreBtn);
        opt.append(colors, more);
        footerCard.appendChild(opt);

        this.colors.forEach(color => {
            const colorCircle = document.createElement('div');
            colorCircle.classList.add('circle');
            colorCircle.style.backgroundColor = '#' + color;
            colorCircle.addEventListener('click', () => {
                console.log(color);
                contenedorCard.style.backgroundColor = '#' + color;
                colors_drop.style.visibility = 'hidden';
                InputController.spin(true);
                data.color = color;
                NotasService.editarNota(data).then(r => {
                    if (r) {
                        alert.showAlert(<string>r.msg)
                    }
                    InputController.spin(false)
                }).catch(e => {
                    if (e) {
                        alert.showAlert('Ha ocurrido un error')
                    }
                    InputController.spin(false)
                });
                // setTimeout(() => {
                //     InputController.spin(false);
                // }, 1000);
            });
            colors_drop.appendChild(colorCircle)
        });

        colorsBtn.addEventListener('mouseover', (ev: Event) => {
            console.log('Colores de ', data.id_nota);
            colors_drop.style.visibility = 'visible';
        });
        colors_drop.addEventListener('mouseleave', (ev: Event) => {
            colors_drop.style.visibility = 'hidden';
        });

        moreBtn.addEventListener('click', () => {
            console.log('Mas de  ', data.id_nota);
        });

        headerCard.addEventListener('click', () => {
            console.log('Carta ', data.id_nota);
        });
        contentCard.addEventListener('click', () => {
            console.log('Carta ', data.id_nota);
        });




        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }
}