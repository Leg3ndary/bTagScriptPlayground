function isInt(str) {
	if (typeof str !== 'string') {
		return false;
	}

	const num = Number(str);

	if (Number.isInteger(num) && num > 0) {
		return true;
	}

	return false;
}


const CARL_API_URL = 'https://mighty-sea-55702.herokuapp.com/https://carl.gg/api/v1/tags/';


const carlImportURL = document.getElementById('carlImportURL');
const carlImportBtn = document.getElementById('carlImport');

function parseID(str) {
	let tagID;
	if (isInt(str) === true) {
		tagID = str;
	} else {
		tagID = str.split('/').pop();
		if (isInt(tagID) === false) {
			console.log('Add something here when tag isn\'t found idiot');
			// Custom tag I made lul
			tagID = 1479390;
		}
	}
	return tagID;
}

async function importTag() {
	let importURL = carlImportURL.value;

	let tagID = parseID(importURL);

	let headers = new Headers();
	headers.append('origin', 'btagscriptplayground');

	let resp = await fetch(CARL_API_URL + tagID, {
		method: 'GET',
		headers: headers,
	})
		.then(response => response.json());
	editor.setValue(resp.content);

	carlImportURL.innerText = '';
}

carlImportBtn.addEventListener('click', importTag);
carlImportURL.addEventListener('keydown', e => {
	if (e.key === 'Enter') importTag();
});