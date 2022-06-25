export default class Sidebar {
	static sidebar = document.getElementById('sidebar');
	static create() {
		this.footer = this.sidebar.querySelector('.sidebar-footer');
		this.footer.innerHTML = `
		`;
	}
}
