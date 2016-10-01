window.addEventListener("DOMContentLoaded", loadOptions);


function loadOptions() {
	document.getElementById("save").addEventListener("click", saveOptions);
	var username_flo
	chrome.storage.sync.get({
		username_flo: 'username',
		password_flo: 'password'
	}, function(items) {
		document.getElementById("username").value = items.username_flo;
		document.getElementById("password").value = items.password_flo;
	});
}

function saveOptions() {
	chrome.storage.sync.set({
		'username_flo': document.getElementById("username").value,
		'password_flo': document.getElementById("password").value
	}, function() {
		alert("Options Saved");
	});
	
}