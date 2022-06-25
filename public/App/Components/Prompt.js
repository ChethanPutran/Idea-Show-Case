export default class Prompt {
	static prompt_ = document.getElementById('prompt');
	static prompt_title = this.prompt_.querySelector('.prompt-title');
	static prompt_message = this.prompt_.querySelector('.prompt-message');
	static prompt_yes = this.prompt_.querySelector('.prompt-yes');
	static prompt_no = this.prompt_.querySelector('.prompt-no');
	static prompt_ok = this.prompt_.querySelector('.prompt-ok');

	static show() {
		this.prompt.classList.add('visible');
	}
	static hide() {
		this.prompt.classList.remove('visible');
	}

	static set_title(type = null, title) {
		this.prompt_title.textContent = title;
		this.prompt_title.classList.add(type);
	}
	static set_message(message) {
		this.prompt_message.textContent = message;
	}

	static config(
		num_btns,
		okHandler = null,
		yesHandler = null,
		noHandler = null
	) {
		if (num_btns === 1) {
			this.prompt_ok.removeEventListener('click', okHandler);
			this.prompt_ok.addEventListener('click', okHandler);
		} else {
			this.prompt_yes.removeEventListener('click', yesHandler);
			this.prompt_no.removeEventListener('click', noHandler);
			this.prompt_yes.addEventListener('click', yesHandler);
			this.prompt_no.addEventListener('click', noHandler);
		}
	}
}
