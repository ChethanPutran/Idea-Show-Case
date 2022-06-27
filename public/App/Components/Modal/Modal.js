import Backdrop from '../Backdrop/Backdrop.js';
import move from '../../Utils/move.js';
export default class Modal {
	static modal = document.getElementById('modal');
	static init(children, onClickBackdrop) {
		//Adding children to parent (modal)
		move(children, this.modal);
		this.backdropHandler = onClickBackdrop;
	}
	static show() {
		console.log('Showing model...');
		Backdrop.show(this.backdropHandler);
		this.modal.classList.add('show');
	}
	static hide() {
		console.log('Hiding model...');
		Backdrop.hide();
		this.modal.classList.remove('show');
	}
}
