export default class Snackbar {
	static snackbar = document.getElementById('snackbar');

	static show(message, time = null, type = null) {
		this.set_message(message, type);
		this.snackbar.classList.add('show');
		if (time) {
			setTimeout(() => {
				this.hide();
			}, time);
		}
	}
	static hide() {
		this.snackbar.classList.remove('show');
	}
	static set_color(color) {
		const color_pre = Array.from(this.snackbar.classList).filter(
			(class_name) => class_name.startsWith('color')
		);
		if (color_pre.length) {
			this.snackbar.classList.remove(color_pre);
		}

		this.snackbar.classList.add(color);
	}

	static set_message(message, type = 'normal') {
		if (type === 'error') {
			this.set_color('color-danger');
		} else if (type === 'sucess') {
			this.set_color('color-sucess');
		}
		this.snackbar.textContent = message;
	}
	static setPosition(position = '') {
		this.snackbar.style.cssText = position;
	}
	static setParent(parentSelector) {
		this.parent = document.querySelector(parentSelector);
		this.parent.appendChild(this.snackbar);
	}
	static remove() {
		setTimeout(() => this.snackbar.remove(), 2000);
	}
}
