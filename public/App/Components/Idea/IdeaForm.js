import Backdrop from '../Backdrop/Backdrop.js';
import Prompt from '../Prompt/Prompt.js';

export default class IdeaForm {
	static idea_modal = document.querySelector('.idea-modal');
	static form = this.idea_modal.querySelector('.idea-form');
	static form_btn = this.form.querySelector('.idea-form-btn');
	static form_close = this.form.querySelector('.idea-form-close');

	static get_data(event) {
		event.preventDefault();
		const title = this.form.title.value;
		const description = this.form.description.value;
		const status = this.form.status.value;

		if (!title || !description || !status) {
			this.show_error("Field/s can't be empty!");
		} else {
			this.submit({ title, description, status });
		}
	}
	static show_error(message) {
		Prompt.config(1, Prompt.hide);
		Prompt.set_title((type = 'error'), 'Error');
		Prompt.set_message(message);
	}

	static show(submit_handler, closeHandler) {
		this.submit = submit_handler;
		this.form.addEventListener('submit', this.get_data.bind(this));
		this.form_close.addEventListener('click', closeHandler);
		this.enable_form();
		Backdrop.show(closeHandler);
		this.idea_modal.classList.add('visible');
	}
	static close() {
		Backdrop.hide();
		this.clear_input();
		this.idea_modal.classList.remove('visible');
	}
	static clear_input() {
		this.form.reset();
	}

	static disable_form() {
		this.form_btn.classList.add('disabled');
	}
	static enable_form() {
		this.form_btn.classList.remove('disabled');
	}
}
