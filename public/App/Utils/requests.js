export default async function request({ method = 'GET', url, data = '' }) {
	try {
		const isJSON = (str) => {
			try {
				return JSON.parse(str);
			} catch (e) {
				return false;
			}
		};
		let response = null;
		if (method !== 'GET') {
			const isJSONData = isJSON(data);
			const content = {
				method: method,
				headers: {
					'Content-type': isJSONData
						? 'application/json'
						: 'multipart/form-data',
				},
				body: data,
			};
			response = await fetch(url, content);
		} else {
			response = await fetch(url);
		}
		if (response.status >= 200 && response.status < 300) {
			return await response.json();
		} else {
			const res = await response.json();
			throw res.error;
		}
	} catch (err) {
		throw err;
	}
}
