export default class ClientDBHandler {
	constructor(dbName, objstoreName) {
		this.dbName = dbName;
		this.objstoreName = objstoreName;
		this.db = null;
	}
	createTable(mode) {
		const promise = new Promise((resolve, reject) => {
			this.createDB()
				.then((db) => {
					this.db = db;
					//Fetching existing objectStore
					const transaction = this.db.transaction(
						this.objstoreName,
						mode
					);
					const ideaStore = transaction.objectStore(
						this.objstoreName
					);
					resolve(ideaStore);
				})
				.catch((err) => {
					reject(err);
				});
		});
		return promise;
	}

	createDB() {
		const promise = new Promise((resolve, reject) => {
			//Creating tables for the first time
			this.dbRequest = indexedDB.open(this.dbName, 1);

			this.dbRequest.onerror = function (event) {
				reject(event);
			};
			this.dbRequest.onupgradeneeded = (event) => {
				this.db = event.target.result;
				this.db.onerror = function (error) {
					reject(error);
				};
				const objStore = this.db.createObjectStore(this.objstoreName, {
					keyPath: '_id',
				});
				objStore.transaction.oncomplete = function (event) {
					resolve(this.db);
				};
			};
			this.dbRequest.onsuccess = function (event) {
				this.db = event.target.result;
				this.db.onerror = function (errorEvent) {
					reject(errorEvent.srcElement);
				};
				resolve(this.db);
			};
		});
		return promise;
	}

	addToLocalStorage(key, data) {
		this.createTable().then(() => {
			localStorage.setItem(key, JSON.stringify(data));
		});
	}
	getFromLocalStorage(key) {
		return localStorage.getItem(key);
	}

	addIdea(data) {
		return new Promise((resolve, reject) => {
			this.createTable('readwrite')
				.then((ideaStore) => {
					const req = ideaStore.add(data);
					req.onsuccess = function (event) {
						resolve({ error: false, data: event.target.result });
					};
					req.onerror = function (event) {
						reject({ error: true, message: event.target.error });
					};
				})
				.catch((err) => {
					reject({ error: true, message: err });
				});
		});
	}

	getIdea(id) {
		return new Promise((resolve, reject) => {
			this.createTable('readonly').then((ideaStore) => {
				const req = ideaStore.get(id);
				req.onsuccess = function (event) {
					resolve({ error: false, data: event.target.result });
				};
				req.onerror = function (event) {
					reject({ error: true, message: event.target.error });
				};
			});
		});
	}
	getIdeas() {
		return new Promise((resolve, reject) => {
			this.createTable('readonly').then((ideaStore) => {
				const ideas = [];
				ideaStore.openCursor().onsuccess = function (event) {
					const cursor = event.target.result;

					if (cursor) {
						ideas.push(cursor.value);
						cursor.continue();
					} else {
						resolve({ error: false, data: ideas });
					}
				};
				ideaStore.openCursor().onerror = function (event) {
					reject({
						error: true,
						// message: event.target.error
					});
				};
			});
		});
	}
}
