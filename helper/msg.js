'use strict';

var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
					'August', 'September', 'October', 'November', 'December'];
					
var numDays = [31, , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var naturalReg = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/;

function interpretTime (str, callback) {
    var r, defaultMsg = {"unix": null, "natural": null};
	if (/^\d{10}$/.test(str)) {
		r = getUnix(str);
	}
	else if (naturalReg.test(str)) {
	   	r = getNatural(str);
	}
	callback(null, r || defaultMsg)
}

function getUnix (tsStr) {
		var ts = new Date(tsStr * 1000);
		var year = ts.getFullYear();
		var month = monthList[ts.getMonth()];
		var day = ts.getDate();
		return {"unix": +tsStr, "natural": month + " " + day + ", " + year};
}

function getNatural (ntStr) {
    var m = ntStr.match(naturalReg);
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

module.exports = {interpretTime};
