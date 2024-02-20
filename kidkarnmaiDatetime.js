/*
	Copyright MIT ยฉ <2013> <Nathawut Niemsuwan @ Kidkarnmai Studio co.,ltd.>

	kidkarnmaiDatetime.getToday();
	kidkarnmaiDatetime.getTimeNow(position);
	kidkarnmaiDatetime.countTimer(callback);
	kidkarnmaiDatetime.stopTimer();

*/
var kidkarnmaiDatetime = new function() {

	"use strict";

	 if ( ! window.console ) console = { log: function(){} };


	var _startDate;
	var _ti;

	this.getToday = function()
	{
		"use strict";

		var today_date = new Date();
		var DateString = today_date.getDate() < 10 ? "0" + today_date.getDate():"" + today_date.getDate();
		var MonthString=(today_date.getMonth()+1)<10?"0"+(today_date.getMonth()+1):""+(today_date.getMonth()+1);
		var date_str = (DateString+"."+MonthString+"."+today_date.getFullYear());
		return date_str;
	}

	this.getTimeNow = function(position)
	{
		"use strict";

		position = position || 1;
		var now = new Date();
		var date_str;
		var hString = now.getHours() < 10 ? "0" + now.getHours():"" + now.getHours();
		date_str = hString;
		if (position >= 2)
		{
			var mString = now.getMinutes() < 10 ? "0" + now.getMinutes():"" + now.getMinutes();
			date_str +=  "." + mString;
		}
		if (position >= 3)
		{
			var sString = now.getSeconds() < 10 ? "0" + now.getSeconds():"" + now.getSeconds();
			date_str +=  "." + sString;
		}
		return date_str;
	}

	this.countTimer = function(callback)
	{
		"use strict";

		var da = new Date();
		_startDate = da;

		_ti = setInterval(function(){onCount()},10);

		function onCount()
		{
			var da = new Date();
				// console.log('_startDate : '+_startDate+' | '+da)
			var daysApart = getDaysBetweenDatesSec(_startDate,da);
			callback(daysApart);
		}
	}

	this.stopTimer = function()
	{
		"use strict";

		clearInterval(_ti);
	}

	function getDaysBetweenDates(date1,date2)
	{
		"use strict";

		date1 = date1 || new Date();
		date2 = date2 || new Date();
		var oneDay = 1000 * 60 * 60 * 24;
		var oneSec = 1000;
		var date1Milliseconds = date1.getTime();
		var date2Milliseconds = date2.getTime();
		var differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
		return Math.round(differenceMilliseconds/oneSec);
	}

	function getDaysBetweenDatesSec(date1,date2)
	{
		"use strict";

		date1 = date1 || new Date();
		date2 = date2 || new Date();

		var date1Milliseconds = date1.getTime();
		var date2Milliseconds = date2.getTime();
		var oneSec = 10;
			// console.log('> : '+date1Milliseconds+' | '+date2Milliseconds)
		var differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
		return Math.round(differenceMilliseconds/oneSec);
	}
}