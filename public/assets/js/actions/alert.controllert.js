"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlertController {
    constructor() {
        this.AlertElement = document.querySelector('#error-message');
    }
    showAlert(message) {
        this.AlertElement.style.visibility = 'visible';
        this.AlertElement.children[0].textContent = message;
        setTimeout(() => {
            this.AlertElement.style.visibility = 'hidden';
        }, 3000);
    }
}
AlertController.instance = undefined;
exports.AlertController = AlertController;
