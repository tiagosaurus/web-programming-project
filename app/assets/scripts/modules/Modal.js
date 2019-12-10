import $ from 'jquery';

class Modal {
    constructor() {
        this.openButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeButton = $(".modal-close");
        this.events();
    }

    events() {
        this.openButton.click(this.openModal.bind(this));

        this.closeButton.click(this.closeModal.bind(this));
    }

    openModal() {
        this.modal.addClass("modal--visible");
        this.closeButton.addClass("modal-close--visible");
        return false;
    }

    closeModal() {
        this.modal.removeClass("modal--visible");
        this.closeButton.removeClass("modal-close--visible");
    }
}

export default Modal;