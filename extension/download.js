function radioOnClick(info, tab) {
	var socket = new WebSocket('ws://10.0.0.69:1080/');
	socket.onopen = function () {
		socket.send(info.linkUrl);
	};
	
	socket.onmessage = function(message) {
		alert(message.data);
	};
}

var radio1 = chrome.contextMenus.create({
	"title":	"Add as torrent",
	"contexts":	["link"],
	"onclick":	radioOnClick
});