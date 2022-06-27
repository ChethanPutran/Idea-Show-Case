export default class Backdrop {
	static backdrop = document.querySelector('#backdrop');
	static show(backdropHandler) {
		this.backdrop.removeEventListener('click', backdropHandler);
		this.backdrop.addEventListener('click', backdropHandler);
		this.backdrop.classList.add('visible');
	}
	static hide() {
		this.backdrop.classList.remove('visible');
	}
}
