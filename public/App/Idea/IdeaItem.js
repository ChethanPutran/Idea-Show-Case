export default class IdeaItem {
	constructor(count, idea, parent, deleteIdeaHandler, editIdeaHandler) {
		this.count = count;
		this.idea = idea;
		this.parent = parent;
		this.editIdea = editIdeaHandler;
		this.deleteIdea = deleteIdeaHandler;
		this.createIdeaItem();
	}

	createIdeaItem() {
		const create_config_btns = () => {
			const edit_btn = document.createElement('button');
			edit_btn.className = 'btn btn-edit';
			edit_btn.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
			edit_btn.addEventListener(
				'click',
				this.editIdea.bind(null, this.idea)
			);
			const delete_btn = document.createElement('button');
			delete_btn.className = 'btn btn-delete';
			delete_btn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
			delete_btn.addEventListener(
				'click',
				this.deleteIdea.bind(null, this.idea._id)
			);

			return [edit_btn, delete_btn];
		};
		if (this.check_idea(this.idea._id)) {
			return;
		}

		const row = this.parent.insertRow();
		row.id = this.idea._id;
		row.className = 'idea-list-item';
		const keys = ['title', 'description'];

		let cell = row.insertCell();
		let text = document.createTextNode(this.count);
		cell.appendChild(text);

		for (let key of keys) {
			cell = row.insertCell();
			text = document.createTextNode(this.idea[key]);
			cell.appendChild(text);
		}
		const [editbtn, deletebtn] = create_config_btns();
		cell = row.insertCell();
		cell.appendChild(editbtn);
		cell = row.insertCell();
		cell.appendChild(deletebtn);
	}
	check_idea(id) {
		return document.getElementById(id) ? true : false;
	}
}
