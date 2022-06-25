import IdeaItem from './IdeaItem.js';

export default class IdeaList {
	constructor(ideas, parent, type, editHandler, deleteHandler) {
		this.ideas = ideas;
		this.type = type;
		this.editHandler = editHandler;
		this.deleteHandler = deleteHandler;
		this.parent = parent;
		this.counter = 0;
		this.createIdeas();
	}

	createIdeas() {
		this.ideas.forEach((idea) => {
			this.counter += 1;
			new IdeaItem(
				this.counter,
				idea,
				this.parent,
				this.deleteHandler,
				this.editHandler
			);
		});
	}
}
