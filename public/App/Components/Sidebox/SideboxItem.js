export default class SideboxItem {
	constructor(item, parent) {
		this.item = item;
		this.parent = parent;
		this.create_item();
	}

	create_item() {
		const div = document.createElement('div');
		div.className = 'sidebox-item';
		div.id = this.item.id;
		div.innerHTML = `<div class='sideBox-item--profile'>
                            <img src='${this.item.profile_url}' alt='test-img' class='profile-img' />
			             </div>
                        <div class='sideBox-item--message'>
                            <p class='message-title'>${this.item.name}</p>
                            <small class='message-desc'>
                               ${this.item.about}
                            </small>
                        </div>`;
		this.parent.appendChild(div);
	}
}
