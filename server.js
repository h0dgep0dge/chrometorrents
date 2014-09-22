// This includes no security! It allows anyone to push near-arbitrary files to your disk.
var ws = require('ws').Server;
var fs = require('fs');

var server = new ws({port:1080});
server.on('connection', function(ws) {
	ws.on('message', function(message) {
		if(!/xt=urn:btih:([^&\/]+)/m.test(message)) {
			ws.send('Not a torrent link');
			ws.close();
			return;
		}
		var output_buffer = 'd10:magnet-uri' + String(message.length) + ':' + message + 'e';
		fs.writeFile('/disks/Downloads/.torrents/' + /[0-9a-z]{40}/m.exec(message)[0] + '.torrent', output_buffer, function (err) {
			if (err) {
				ws.send('Could not write torrent file');
				ws.close();
				throw err;
			}
			ws.send('Added');
			ws.close();
		});
	});
});
