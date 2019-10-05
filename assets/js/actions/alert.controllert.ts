export class AlertController {
    AlertElement: HTMLElement;
    public static instance: AlertController | undefined = undefined;
    constructor() {
        this.AlertElement = <HTMLElement>document.querySelector('#error-message');
    }

    showAlert(message: string) {
        this.AlertElement.style.visibility = 'visible';
        this.AlertElement.children[0].textContent = message;
        setTimeout(() => {
            this.AlertElement.style.visibility = 'hidden';
        }, 3000);
    }
}