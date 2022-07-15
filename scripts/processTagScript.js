/* globals editor */
// Out of respect, please don't go spamming my API :(

const API_URL = 'https://btp.leg3ndary.repl.co/process/';
const output = document.getElementById('output');

// To start the api in case it's not running
fetch(API_URL + 'ping');

class Response {
	constructor(data) {
		this.body = data.body;
		this.actions = data.actions;
		this.extras = data.extras;
	}
}

const button = document.getElementById('processBTN');

function cleanTagScript(tagscript) {
	return tagscript
		.replace(/\\/g, 'Ꜳ')
		.replace(/\//g, '₩')
		.replace(/</g, 'ꜳ')
		.replace(/>/g, 'ꜵ')
		.replace(/\./g, 'Ꜷ');
}

function decodeTagScript(tagscript) {
	return tagscript
		.replace(/Ꜳ/g, '\\')
		.replace(/ꜳ/g, '<')
		.replace(/₩/g, '/')
		.replace(/ꜵ/g, '>')
		.replace(/Ꜷ/g, '.');
}

function escapeHtml(unsafe) {
	// ty asport
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function loadActionTable(actions) {
	const table = document.getElementById('actionBody');
	const errorsText = document.getElementById('errors');
	const warningsText = document.getElementById('warnings');

	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	errorsText.innerText = 'Errors: None';
	warningsText.innerText = 'Warnings: None';

	const errors = [];
	const warnings = [];

	for (const [action, value] of Object.entries(actions)) {
		const row = table.insertRow();
		const actionRow = row.insertCell(0);
		const valuesRow = row.insertCell(1);
		const badge = row.insertCell(2);

		let actionContent = 'Error';
		let valueContent = 'Error';
		let badgeContent = '<div class="badge badge-danger">Error</div>';

		if ( action == 'blacklist' ) {
			if ( actions.hasOwnProperty('requires') ) {
				errors.push('You cannot have both a blacklist and a require block.');
				actionContent = action;
				valueContent = `Blacklisting the following IDS: ${value.items.join(', ')}, replying with "${value.response}" when the user/role/channel is blacklisted.`;
				badgeContent = '<div class="badge badge-danger">Error</div>';
			} else {
				valueContent = `Blacklisting the following IDS: ${value.items.join(', ')}, replying with "${value.response}" when the user/role/channel is blacklisted.`;
				badgeContent = '<div class="badge badge-success">Success</div>';
			}
		} else if ( action == 'commands' ) {
			actionContent = 'command';
			valueContent = `The following commands are used with their associated values: ${value.join(', ')}`;
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else if ( action == 'delete' ) {
			actionContent = 'delete';
			valueContent = 'Deleting the message';
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else if ( action == 'embed' ) {
			actionContent = 'embed';
			valueContent = `Embedding the following embed json: ${JSON.stringify(value)}`;
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else if ( action == 'overrides' ) {
			actionContent = 'override';
			valueContent = 'Overriding command permissions.';
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else if ( action == 'reactions' ) {
			actionContent = 'reaction';
			valueContent = `Adding the following reactions: ${value.join(', ')}`;
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else if ( action == 'requires' ) {
			if ( actions.hasOwnProperty('requires') ) {
				actionContent = 'require';
				valueContent = `Requiring the following IDS: ${value.items.join(', ')}, replying with "${value.response}" when the requirements aren't met.`;
				badgeContent = '<div class="badge badge-danger">Error</div>';
			} else {
				actionContent = 'require';
				valueContent = `Requiring the following IDS: ${value.items.join(', ')}, replying with "${value.response}" when the requirements aren't met.`;
				badgeContent = '<div class="badge badge-success">Success</div>';
			}
		} else if ( action == 'target' ) {
			actionContent = 'redirect';
			valueContent = `Redirecting the message to the following channel: ${value.channel}`;
			badgeContent = '<div class="badge badge-success">Success</div>';
		} else {
			console.log('Unknown action: ' + action);
		}

		actionRow.innerHTML = escapeHtml(actionContent);
		valuesRow.innerHTML = escapeHtml(valueContent);
		badge.innerHTML = badgeContent;
	}

	if ( errors.length > 0 ) {
		errorsText.innerText = 'Errors: ' + errors.join(', ');
	}
	if ( warnings.length > 0 ) {
		warningsText.innerText = 'Warnings: ' + warnings.join(', ');
	}
}

function loadDebugTable(debug) {
	const table = document.getElementById('debugTable');

	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	for (const [name, value] of Object.entries(debug)) {
		const row = table.insertRow();

		const nameRow = row.insertCell(0);
		nameRow.innerHTML = escapeHtml(name);
        
		const valuesRow = row.insertCell(1);
		valuesRow.innerHTML = escapeHtml(value);
	}
}

let isProcessing = false;
async function process() {
	if (isProcessing) return;
	if (!tagscript) {
		output.value = '';

		loadActionTable({});
		loadDebugTable({});

		return;
	}

	button.setAttribute('disabled', true);
	isProcessing = true;

	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	let tagscript = editor.getValue();

	tagscript = cleanTagScript(tagscript);

	const request = encodeURIComponent(tagscript);

	const resp = await fetch(API_URL + request, {
		headers: headers,
		origin: 'https://leg3ndary.github.io:443',
	})
		.then(res => res.json())
		.catch(() => null);

	if (resp) {
		output.value = decodeTagScript(resp.body);

		loadActionTable(resp.actions);
		loadDebugTable(resp.extras.debug);
	} else {
		output.value = 'Something went wrong';
	}

	button.removeAttribute('disabled');
	isProcessing = false;
}

button.addEventListener('click', process);

editor.addKeyMap({
	'Cmd-Enter': process,
	'Ctrl-Enter': process,
});