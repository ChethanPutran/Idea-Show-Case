import Idea from './Idea/idea.js';

window.onload = (event) => {
	const idea = new Idea();
	idea.dbHandler()
		.then(() => {
			idea.show();
		})
		.catch((err) => {
			const div = document.createElement('div');
			div.className = 'no-p-found';
			div.innerHTML = `<p>${err}</p>`;
			const container = document.querySelector('.container');
			document.querySelector('.pContainer .idea').style.display = 'none';
			container.appendChild(div);
		});
};
