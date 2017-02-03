const ENTRIES_PRIFIX = '/ebidding/openinghall/';

function postJSON(url, data = null) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) {
				return;
			}
			if (xhr.status === 200) {
				console.log(`ajax:${url}`, xhr.response);
				resolve(xhr.response);
			} else {
				reject(new Error(xhr.statusText));
			}
		};
		const reqData = { jsonData: JSON.stringify(data) };
		xhr.send(JSON.stringify(reqData));
	});
}

const storage = {
	queryOpenRoom(roleType) {
		const args = { roleType };
		return postJSON(`${ENTRIES_PRIFIX}queryOpenRoom`, args);
	}
};

export default storage;
