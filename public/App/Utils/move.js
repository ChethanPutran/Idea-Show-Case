export default function move(source, destination) {
	// Creating fragment for element movements
	const fragment = document.createDocumentFragment();

	//Appending source to fragment
	fragment.appendChild(source);

	//Moving fragment to destination
	destination.appendChild(fragment);
}
