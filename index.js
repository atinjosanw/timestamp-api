'use strict';

var express = require('express');

var app = express();

app.get('/:ts', function (req, res) {
	var timestampString = req.params.ts;
	var timestamp = {"unix":null, "natural": null}, r;
	
	var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
						'August', 'September', 'October', 'November', 'December'];
	var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	function getUnix (tsStr) {
		var ts = new Date(tsStr * 1000);
		var year = ts.getFullYear();
		var month = monthList[ts.getMonth()];
		var day = ts.getDate();
		return {"unix": +tsStr, "natural": month + " " + day + ", " + year};
	}
	function getNatural (m) {
		var month = m[1], date = m[2], year = m[3];
		var capMonth = month[0].toUpperCase() + month.slice(1);
		var nm = monthList.indexOf(capMonth);
		if ( nm  == -1 || +year < 1970)
			return null;
		var nd = nm == 1 ? (+year % 4 == 0 ? 28 : 29) : numDays[nd];
		if (+date > nd)
			return null;
		var naturalTime = capMonth + " " + date + ", " + year;
		return {"unix": Math.round(+new Date(naturalTime).getTime() / 1000), "natural": naturalTime };
	}

	var m = timestampString.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})$/);
	
	if (/^\d{10}$/.test(timestampString)) {
		r = getUnix(timestampString);
	}
	else if (m) {
		r = getNatural(m);
	}
	res.json(r || timestamp);

});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});