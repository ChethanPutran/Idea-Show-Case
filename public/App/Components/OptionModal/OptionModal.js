import Snackbar from '../Snackbar/Snackbar.js';
import request from '../../Utils/requests.js';
import Loader from '../Loader/Loader.js';

export default class OptionModal {
	constructor() {
		this.optModalStatus = 0;
		this.taskItemClassName = 'ideaItem';
		this.optModal = document.querySelector('.optionModal');
		this.optModal.addEventListener('click', this.optHandler.bind(this));
		this.id = null;
		this.element = null;
	}

	optHandler(event) {
		const snackbar = new Snackbar();
		const loader = new Loader(this.element);
		loader.load();
		if (event.target.id === 'share') {
			snackbar.setContent('Post shared sucessfully!');
			snackbar.show();
			snackbar.remove();
		} else if (event.target.id === 'archieve') {
			snackbar.setContent('Post archied sucessfully');
			snackbar.show();
			snackbar.remove();
			// posts.removeChild(event.target.closest('.post'));
		} else if (event.target.id === 'delete') {
			snackbar.setContent('Loading...');
			snackbar.show();
			const id = this.id.split('id')[1];
			request({
				method: 'DELETE',
				url: `user/ideas/idea/${id}`,
			})
				.then((res) => {
					snackbar.setContent('Idea deleted sucessfully!');
					snackbar.show();
					snackbar.remove();
					location.reload();
				})
				.catch((err) => {
					console.log(err);
					snackbar.setContent(
						'Something went wrong!\n Failed to delete idea.'
					);
					snackbar.show();
					snackbar.remove();
				});

			snackbar.setContent('Post deleted sucessfully!');
			snackbar.show();
			snackbar.remove();
			//posts.removeChild(event.target.closest('.post'));
		}
		loader.stopLoad();
	}

	contextListener(e) {
		const element = this.isClickedInsideDesireEle(
			e,
			this.taskItemClassName
		);
		if (element) {
			this.element = element;
			this.id = element.id;
			const position = this.getPosition(e);
			this.optModal.style.left = position.x + 'px';
			this.optModal.style.top = position.y + 'px';
			this.toggleOptModal();
			return false;
		}
		return true;
	}
	toggleOptModal() {
		if (this.optModalStatus === 0) {
			this.optModalStatus = 1;
			this.optModal.classList.add('show');
		} else {
			this.optModalStatus = 0;
			this.optModal.classList.remove('show');
		}
	}

	isClickedInsideDesireEle(e, className) {
		let el = e.srcElement || e.target;

		if (el.classList.contains(className)) {
			return el;
		} else {
			while ((el = el.parentNode)) {
				if (el.classList && el.classList.contains(className)) {
					return el;
				}
			}
		}
		return false;
	}

	getPosition(event) {
		let posx = 0;
		let posy = 0;
		let e = event;

		if (!e) e = window.event;

		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx =
				e.clientX +
				document.body.scrollLeft +
				document.documentElement.scrollLeft;
			posy =
				e.clientY +
				document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		return {
			x: posx,
			y: posy,
		};
	}
}
