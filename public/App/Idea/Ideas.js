import IdeaList from './ideaList.js';
import Snackbar from '../Components/snackBar.js';
import request from '../Utils/requests.js';
import IdeaForm from './IdeaForm.js';

export default class Ideas {
	static types = ['active', 'inactive', 'finished'];
	static ideas_container = document.querySelector('.ideas');
	static get_ideas_btn = document.getElementById('idea-refresh');
	static new_idea_btn = document.getElementById('idea-new');
	static tab = document.querySelector('.ideas-tab');
	static ideas = {};

	static init(ideas, reload_handler) {
		this.ideas = ideas;
		this.reload = reload_handler;
		this.addBtnListener();
		if (this.ideas.all.length > 0) {
			this.load();
		} else {
			this.show_blank();
		}
	}
	static show_blank() {
		this.tab.classList.add('hide');
		const div = document.createElement('div');
		div.className = 'warning';
		div.innerHTML = `<p class='warning-text'> No idea found! </p>
			<button class='btn btn-primary'>Upload your first idea</button>
			`;
		this.ideas_container.appendChild(div);
	}

	static load() {
		this.types.forEach((idea_list_type) => {
			const parent = document.getElementById(idea_list_type);
			if (this.ideas[idea_list_type].length > 0) {
				const count = document.querySelector(
					`.idea-count.${idea_list_type}`
				);
				count.textContent = this.ideas[idea_list_type].length;
				count.classList.add('show');
				new IdeaList(
					this.ideas[idea_list_type],
					parent,
					idea_list_type,
					this.editdata_handler,
					this.deletedata_handler
				);
			} else {
				const div = document.createElement('div');
				div.className = 'warning';
				div.innerHTML = `<p class='warning-text'> No ${idea_list_type} idea found! </p>`;
				parent.parentElement.appendChild(div);
				parent.classList.add('hide');
			}
		});
	}

	static addBtnListener() {
		const refresh_handler = () => {
			this.reload(true);
		};
		const add_handler = () => {
			this.create_idea_handler();
		};
		this.get_ideas_btn.addEventListener('click', refresh_handler);
		this.new_idea_btn.addEventListener('click', add_handler);
	}
	static create_idea_handler() {
		IdeaForm.show(
			this.create_idea.bind(this),
			IdeaForm.close.bind(IdeaForm)
		);
	}

	static editdata_handler = (data) => {
		console.log('Edit data :', data);
	};
	static deletedata_handler = (id) => {
		console.log('Delete data :', id);
	};

	static async create_idea(data) {
		Snackbar.show('Creating new idea...');
		//POST form data
		//Passing form as argument
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('status', data.status);

		try {
			const res = await request({
				url: '/user/ideas/idea',
				method: 'POST',
				data: formData,
			});
			Snackbar.show('Idea created sucessfully!', 2000, 'sucess');
			IdeaForm.close();
			console.log(this);
			await this.reload();
		} catch (err) {
			console.log(err);
			Snackbar.show(
				'Something went wrong!\nUnable to create idea.',
				2000,
				'error'
			);
			IdeaForm.enable_form();
		}
	}
}
