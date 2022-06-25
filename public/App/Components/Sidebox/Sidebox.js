import SideboxItem from './SideboxItem.js';

export default class Sidebox {
	constructor(title, parent, id, items, btn_text, viewers_btn_handler) {
		this.items = items;
		this.parent = parent;
		this.id = id;
		this.create();
		this.set_title(title);
		this.set_btn_text(btn_text);
		this.create_items();
		this.sidebox_btn.addEventListener('click', viewers_btn_handler);
	}

	create() {
		//Sidebox
		this.sidebox = document.createElement('div');
		this.sidebox.className = 'sidebox';
		this.sidebox.id = this.id;

		//sidebox-items
		this.sidebox_items = document.createElement('div');
		this.sidebox_items.className = 'sidebox-items';

		//Btn-box
		const div = document.createElement('div');
		div.className = 'sidebox-btnbox';
		this.sidebox_btn = document.createElement('button');
		this.sidebox_btn.className = 'btn sidebox-btn btn-more';

		div.appendChild(this.sidebox_btn);

		//Title
		this.title = document.createElement('h2');
		this.title.className = 'sidebox-title';

		this.sidebox.appendChild(div);
		this.sidebox.appendChild(this.sidebox_items);
		this.sidebox.appendChild(this.title);
		this.parent.appendChild(this.sidebox);
	}
	set_title(title) {
		this.title.textContent = title;
	}
	set_btn_text(btn_text) {
		this.sidebox_btn.textContent = btn_text;
	}

	create_items() {
		this.items.forEach((item) => {
			new SideboxItem(item, this.sidebox);
		});
	}
}
