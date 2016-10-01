// login.js

// http://developer.okta.com/use_cases/authentication/session_cookie
// http://stackoverflow.com/questions/37140940/authenticate-to-sharepoint-through-okta-from-back-end-service
// http://stackoverflow.com/questions/35233948/how-to-get-saml-token-from-okta-from-net-web-service-code-without-using-browser
chrome.storage.local.get({
	username_flo: 'username',
	password_flo: 'password'
}, function(items) {
	var credentials = {
		"username": items.username_flo,
		"password": items.password_flo
	};
	requestToken(credentials);
});


var requestToken = function(credentials) {
	// netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	var token = "";
	// console.log(credentials);
	// document.domain = "flinders.okta.com";
	jQuery.ajax ({
		url: 'https://flinders.okta.com/api/v1/authn',
		type: "POST",
		data: JSON.stringify(credentials),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(response){
			var token = response["sessionToken"];
			// console.log(token);
			window.location.href = "https://flinders.okta.com/home/flindersuniversity_flo_1/0oa2he5hnC05dYPAr1t6/aln2hk9e0e0XvK5pR1t6?sessionToken="+token;
		},
		error: function(response) {
			alert("Error: Did you remember to set your username and password under addons?");
		}
	});
}


