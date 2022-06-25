export default class HelperClass {
	static moveDOMElement(id, parentId) {
		const item = document.getElementById(id);
		const parent = document.getElementById(parentId);
		parent.appendChild(item);
		item.scrollIntoView({ behavior: 'smooth' });
	}
	static clearEventListener(element) {
		let newElement = element.cloneNode(true);
		element.parentNode.replaceChild(newElement, element);
		return newElement;
	}
}
