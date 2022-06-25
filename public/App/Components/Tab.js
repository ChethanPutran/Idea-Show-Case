export default class Tab {
	static tabs = document.getElementsByClassName('idea-list');
	static tabs_titles = document.getElementsByClassName('idea-title');

	static init() {
		document
			.getElementById('_active')
			.addEventListener(
				'click',
				this.change_content.bind(this, 'active')
			);
		document
			.getElementById('_finished')
			.addEventListener(
				'click',
				this.change_content.bind(this, 'finished')
			);
		document
			.getElementById('_inactive')
			.addEventListener(
				'click',
				this.change_content.bind(this, 'inactive')
			);
	}
	static change_content(status, evt) {
		for (let i = 0; i < this.tabs.length; i++) {
			//Hiding tabs
			this.tabs[i].parentElement.classList.remove('show');

			//Removing title style
			this.tabs_titles[i].classList.remove('active');
		}

		//Showing current tab
		document.getElementById(status).parentElement.classList.add('show');

		//Adding title style
		evt.currentTarget.className += ' active';
	}
}
