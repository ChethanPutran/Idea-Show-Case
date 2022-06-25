export default class Tooltip {
	constructor(updateFunc, parentSelector) {
		this.update = updateFunc;
		this.parent = document.querySelector(parentSelector);
		this.ul = this.parent.closest('ul.ideaList');
	}
	show(content) {
		this.toolTip = document.createElement('span');
		this.toolTip.className = 'toolTip';
		this.toolTip.innerHTML = content;
		this.toolTip.addEventListener('click', this.remove.bind(this));
		this.parent.appendChild(this.toolTip);
		this.setPosition();
		// this.ul.scrollTop
		this.ul.addEventListener(
			'scroll',
			this.updatePosWhenScrolled.bind(this)
		);
		this.updatePosWhenScrolled();
	}

	setPosition() {
		this.toolTip.style.cssText = `top: ${
			this.parent.offsetTop - this.toolTip.offsetHeight - 10
		}px; left:${
			this.parent.offsetLeft + this.parent.offsetWidth / 2 + 10
		}px; `;
	}
	updatePosWhenScrolled() {
		const topRefPointHeight =
			this.ul.previousElementSibling.getBoundingClientRect().bottom;
		const bottomRefPointHeight =
			topRefPointHeight + this.ul.getBoundingClientRect().height;
		const toolTipHeight = this.toolTip.getBoundingClientRect().bottom - 20;
		if (
			topRefPointHeight >= toolTipHeight ||
			bottomRefPointHeight <= toolTipHeight
		) {
			return this.remove();
		}
		this.setPosition();
	}

	remove() {
		this.toolTip.remove();
		this.update();
	}
}
