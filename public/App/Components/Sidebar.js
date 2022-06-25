export default class Sidebar {
	static sidebar = document.getElementById('sidebar');

	static init(user) {
		this.user = user;
		this.footer = this.sidebar.querySelector('.sidebar-footer');
	}
	add_user_details() {
		const div = document.createElement('div');
		div.className = 'sidebar-textbox';
		div.innerHTML = `<h3 class="sidebar-company--name">${
			this.user.name
		}</h3>p class="sidebar-company--desc">${
			this.user.about || 'Nothing'
		}</p>`;
		this.footer.appendChild(div);
	}
}
