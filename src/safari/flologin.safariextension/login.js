// login.js

// http://developer.okta.com/use_cases/authentication/session_cookie
// http://stackoverflow.com/questions/37140940/authenticate-to-sharepoint-through-okta-from-back-end-service
// http://stackoverflow.com/questions/35233948/how-to-get-saml-token-from-okta-from-net-web-service-code-without-using-browser
var credentials = {
		"username": '',
		"password": ''
};

var requestToken = function(credentials) {
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
			window.location.href = "https://flinders.okta.com/home/flindersuniversity_flo_1/0oa2he5hnC05dYPAr1t6/aln2hk9e0e0XvK5pR1t6?sessionToken="+token;
		},
		error: function(response) {
			removeOverlay();
			alert("Error: Did you remember to set your username and password under extensions in preferences?");
		}
	});
}

var setCredentials = function (username, password, callback)
{
	credentials["username"] = username;
	credentials["password"] = password;
	// console.log(credentials);
	callback(credentials);
}

var addOverlay = function()
{
	var overlay = "<div id=\"overlay\"><div id=\"spinner\"></div></div>";
	$("body").prepend(overlay);
	$("#overlay").css({
		'background': 'rgb(50,50,50)',
		'position': 'absolute',
		'top': '0',
		'right': '0',
		'bottom': '0',
		'left': '0',
		'opacity': '0.5',
		'z-index': '100',
		'display': 'flex',
		'align-items': 'center',
		'justify-content': 'center'
    });
	$("<style>")
    .prop("type", "text/css")
    .html("\
    #spinner {\
    	border: 16px solid #f3f3f3; /* Light grey */\
    	border-top: 16px solid #3498db; /* Blue */\
		border-radius: 50%;\
    	width: 3em;\
    	height: 3em;\
    	animation: spin 2s linear infinite;\
	}\
	\
	@keyframes spin {\
	    0% { transform: rotate(0deg); }\
	    100% { transform: rotate(360deg); }\
	}")
    .appendTo("head");
}

var removeOverlay = function()
{
	$("#overlay").remove();
}

// listen for an incoming setSettings message
safari.self.addEventListener( "message", function( e ) {
	if( e.name === "setSettings" ) {
		addOverlay();
		setCredentials(e.message["username_flo"], e.message["password_flo"], requestToken);
	}
}, false );

// ask proxy.html for settings
safari.self.tab.dispatchMessage( "getSettings" );


// requestToken(credentials);




