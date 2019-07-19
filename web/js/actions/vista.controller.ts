import { Nota } from "../helpers/nota";
import { InputController } from "./input.controller";
import { NotasService } from "../services/notas.service";
import { AlertController } from "./alert.controllert";
import Masonry from 'masonry-layout';

export class VistaController {
    router: any;
    notas: Array<Nota>;
    Masonry: any;
    private colors: Array<string> = [
        'FF637D',
        'F4F1BB',
        '66D7D1',
        'EAF2E3',
        'FFF87F'
    ];
    private opts: Array<string> = [
        'Agregar etiqueta',
        'Mostrar lista',
        'Eliminar'
    ];

    constructor(notas: Array<Nota>) {
        this.notas = notas;

    }

    /**
     * @param IContenedor Contenedor en el cual se construirán las tarjetas
     */
    renderNotas(IContenedor: HTMLInputElement | HTMLElement): void {
        IContenedor.innerHTML = "";
        IContenedor.classList.add('grid');

        this.notas.forEach((nota: Nota) => {
            const elemNota = this.cardBuilder(nota);
            IContenedor.append(elemNota);
        });

        this.Masonry = new Masonry('.grid', {
            // options
            itemSelector: '.nota-card',
            columnWidth: 100
        });
    }

    /**
     * Función que crea el HTML de cada nota.
     * @param data Datos de la nota
     */
    cardBuilder(data: Nota) {
        const alert = new AlertController();
        const contenedorCard: HTMLElement = document.createElement('div');
        contenedorCard.classList.add('nota-card', 'cursor');
        contenedorCard.id = `card_${data.id_nota}`;

        if (data.color) {
            contenedorCard.style.backgroundColor = '#' + data.color;
        }

        //creacion de elementos html y adición de clases css
        const headerCard: HTMLElement = document.createElement('div');
        const contentCard: HTMLElement = document.createElement('div');
        const footerCard: HTMLElement = document.createElement('div');
        const opt: HTMLElement = document.createElement('div');
        const colors: HTMLElement = document.createElement('div');
        const colors_drop: HTMLElement = document.createElement('div');
        const more_drop: HTMLElement = document.createElement('div');
        const more: HTMLElement = document.createElement('div');
        const colorsBtn: HTMLElement = document.createElement('i');
        const moreBtn: HTMLElement = document.createElement('i');

        headerCard.textContent = data.titulo;
        contentCard.textContent = data.contenido;
        colorsBtn.textContent = 'color_lens';
        moreBtn.textContent = 'more_vert';


        headerCard.classList.add('nota-card-header');
        contentCard.classList.add('nota-card-content');
        footerCard.classList.add('nota-card-footer', 'row');
        opt.classList.add('u-full-width');
        colors_drop.classList.add('colors_dropdown');
        more_drop.classList.add('more_dropdown', 'more_list');
        colors.classList.add('six', 'columns');
        colorsBtn.classList.add('material-icons', 'cursor');
        moreBtn.classList.add('material-icons', 'cursor');
        more.classList.add('six', 'columns');

        colors.append(colors_drop, colorsBtn);
        more.append(more_drop, moreBtn);
        opt.append(colors, more);
        footerCard.appendChild(opt);

        //Eventos
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
            });
            colors_drop.appendChild(colorCircle)
        });

        colorsBtn.addEventListener('mouseover', (ev: Event) => {
            colors_drop.style.visibility = 'visible';
        });
        colors_drop.addEventListener('mouseleave', (ev: Event) => {
            colors_drop.style.visibility = 'hidden';
        });

        this.opts.forEach(option => {
            const optionElem = document.createElement('div');
            optionElem.classList.add('more_list-item');
            optionElem.textContent = option;

            optionElem.addEventListener('click', () => {
                more_drop.style.visibility = 'hidden';
            });
            optionElem.addEventListener('mouseover', (ev: Event) => {
                optionElem.style.backgroundColor = 'rgba(0,0,0,0.05)';
            });
            optionElem.addEventListener('mouseleave', (ev: Event) => {
                optionElem.style.backgroundColor = 'rgba(0,0,0,0)';
            });

            more_drop.appendChild(optionElem);
        });

        moreBtn.addEventListener('click', () => {
            console.log('more');

            more_drop.style.visibility = 'visible';
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