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
	if (isInt(str) == true) {
		tagID = str;
	} else {
		tagID = str.split('/').pop();
		if (isInt(tagID) == false) {
			console.log('Add something here when tag isn\'t found idiot');
			// Custom tag I made lul
			tagID = 1479390;
		}
	}
	return tagID;
}

async function importTag() {

	const importURL = carlImportURL.value;

	const tagID = parseID(importURL);

	const resp = await fetch(CARL_API_URL + tagID).then(response => response.json());
	editor.setValue(resp.content);

	tagscript.innerText = '';
}

carlImportBtn.addEventListener('click', importTag);
carlImportURL.addEventListener('keydown', e => {
	if (e.key === 'Enter') importTag();
});