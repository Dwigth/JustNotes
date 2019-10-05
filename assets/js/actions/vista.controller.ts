import { Nota } from "../helpers/nota";
import { InputController } from "./input.controller";
import { NotasService } from "../services/notas.service";
import { AlertController } from "./alert.controllert";
//Comentar para compilar en producción
// import Masonry from 'masonry-layout';
import { Etiquetas } from "../helpers/etiquetas";

export class VistaController {
    router: any;
    notas: Array<Nota>;
    etiquetas: Array<Etiquetas>;
    //Haciendo referencia a Masonry que está en otro archivo.
    Masonry: any;
    backdrop: HTMLElement;
    cardContainer: HTMLElement;

    private colors: Array<string> = [
        'FF637D',
        'F4F1BB',
        '66D7D1',
        'EAF2E3',
        'FFF87F',
        'FFFFFF'
    ];
    private opts: Array<string> = [
        'Agregar etiqueta',
        'Mostrar lista',
        'Eliminar'
    ];

    constructor(notas: Array<Nota>) {
        this.notas = notas;

    }

    setNotas(notas: Array<Nota>) {
        this.notas = notas;
    }

    /**
     * @param IContenedor Contenedor en el cual se construirán las tarjetas
     */
    render(IContenedor: HTMLInputElement | HTMLElement): void {
        this.cardContainer = IContenedor;
        this.backdrop = <HTMLElement>document.getElementById('backdrop');
        const IEtiquetaContenedor = <HTMLElement>document.getElementById('tags-list');
        IContenedor.innerHTML = "";
        IEtiquetaContenedor.innerHTML = "";
        IContenedor.classList.add('grid');

        this.notas.forEach((nota: Nota) => {
            const elemNota = this.cardBuilder(nota);
            IContenedor.append(elemNota);
        });

        this.Masonry = new Masonry('.grid', {
            // options
            itemSelector: '.nota-card',
            columnWidth: 20
        });

        this.loadEtiquetas(IEtiquetaContenedor);
    }

    /**
     * Función que crea el HTML de cada nota.
     * @param data Datos de la nota
     */
    cardBuilder(data: Nota) {
        let timer: any = null;
        const alert = new AlertController();
        const contenedorCard: HTMLElement = document.createElement('div');
        contenedorCard.classList.add('nota-card', 'cursor');
        contenedorCard.id = `card_${data.id_nota}`;

        if (data.color != null) {
            contenedorCard.style.backgroundColor = '#' + data.color;
            contenedorCard.classList.add('nota-card-color');
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
        //si no tiene contenido la nota podrá editarla
        if (data.titulo == '') {
            headerCard.innerHTML = '<br>';
        } else {
            headerCard.textContent = data.titulo;
        }
        if (data.contenido == '') {
            contentCard.innerHTML = '<br>';
        } else {
            contentCard.textContent = data.contenido;
        }
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

        this.opts.forEach((option: any, index: number) => {
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

            if (index == 2) {
                optionElem.addEventListener('click', async () => {
                    let r = await NotasService.eliminarNota(<number>data.id_nota).then(async r => {
                        contenedorCard.style.display = 'none';
                        this.notas = [];
                        this.notas = await NotasService.obtenerNotas().then((r: any) => r.data).catch(e => e);
                        console.log(this.notas);
                    }).catch(e => e)
                        .finally(() => {
                            this.render(this.cardContainer);
                        });
                });
            }

            more_drop.appendChild(optionElem);
        });

        moreBtn.addEventListener('click', () => {
            console.log('more');

            more_drop.style.visibility = 'visible';
        });

        headerCard.addEventListener('click', () => {
            console.log('Carta ', data.id_nota);
            contenedorCard.classList.add('nota-click');
            headerCard.contentEditable = "true";
            this.backdrop.style.visibility = 'visible';
        });
        contentCard.addEventListener('click', () => {
            contenedorCard.classList.add('nota-click');
            contentCard.contentEditable = "true";
            this.backdrop.style.visibility = 'visible';
        });
        headerCard.addEventListener('keydown', (ev) => {
            data.titulo = <string>headerCard.textContent;
            console.log(headerCard.textContent);
            clearTimeout(timer);
            timer = setTimeout(() => { NotasService.editarNota(data) }, 1000);
        });
        contentCard.addEventListener('keyup', (ev) => {
            data.contenido = <string>contentCard.textContent;
            clearTimeout(timer);
            timer = setTimeout(() => { NotasService.editarNota(data) }, 1000);
        });


        this.backdrop.addEventListener('click', () => {
            contenedorCard.classList.remove('nota-click');
            this.backdrop.style.visibility = 'hidden';
            InputController.Modal.style.visibility = 'hidden';
            this.Masonry.reloadItems();
        });




        contenedorCard.append(headerCard, contentCard, footerCard);
        return contenedorCard;
    }

    labelsBuilder(etiqueta: Etiquetas, editable?: boolean) {
        const base = document.createElement('div');
        base.classList.add('tag-element');
        const icon = document.createElement('i');
        icon.classList.add('material-icons-outlined');
        icon.textContent = 'label';
        base.append(icon);
        if (editable) {
            const nombre = document.createElement('div');
            nombre.textContent = etiqueta.nombre;
            base.appendChild(nombre);
        } else {
            base.setAttribute('data-value', etiqueta.nombre);
        }
        return base;
    }
    //render etiquetas
    async loadEtiquetas(IEtiquetaContenedor: HTMLElement) {
        InputController.Modal.innerHTML = "";
        const label = document.createElement('div');
        label.classList.add('tag-element');
        label.textContent = 'Etiquetas';
        const editLabel = document.createElement('div');
        editLabel.classList.add('tag-element');
        const iconEdit = document.createElement('i');
        iconEdit.classList.add('material-icons-outlined');
        iconEdit.textContent = 'edit';
        editLabel.appendChild(iconEdit);
        editLabel.setAttribute('data-value', 'Editar etiqueta');

        editLabel.addEventListener('click', async () => {
            this.backdrop.style.visibility = 'visible';
            InputController.Modal.style.visibility = 'visible';
        });


        IEtiquetaContenedor.appendChild(label);
        const inputLabels = document.createElement('input');
        inputLabels.classList.add('input-grey');
        inputLabels.placeholder = '¡Crea una nueva etiqueta!';
        inputLabels.style.padding = '10px';
        inputLabels.style.borderRadius = '4px';
        const LabelList = document.createElement('ul');
        this.etiquetas = await NotasService.etiquetasUsuario(1).then((r: any) => r.data.etiquetas).catch(e => e);
        this.etiquetas.forEach(etiqueta => {
            const label = this.labelsBuilder(etiqueta);
            IEtiquetaContenedor.appendChild(label);
            const li = document.createElement('li');
            li.appendChild(this.labelsBuilder(etiqueta, true));
            let name = <HTMLElement>li.children[0].children[1];
            name.addEventListener('click', () => {
                name.contentEditable = 'true';
            })
            LabelList.appendChild(li);
        });

        InputController.Modal.append(inputLabels, LabelList);
        IEtiquetaContenedor.appendChild(editLabel);

        inputLabels.addEventListener('keyup', (e) => {
            if (e.key == 'Enter') {
                const etiqueta: Etiquetas = {
                    nombre: inputLabels.value,
                    id_usuario: 1
                };
                const nuevo = this.labelsBuilder(etiqueta, true);
                LabelList.appendChild(nuevo);
                inputLabels.value = '';
            }
        });
    }



}