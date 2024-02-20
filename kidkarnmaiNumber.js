/* 
	Copyright MIT ยฉ <2013> <Nathawut Niemsuwan @ Kidkarnmai Studio co.,ltd.>
	
	kidkarnmaiNumber.randomNumber(max,min);
	kidkarnmaiNumber.formatNumber(number, maxDecimals, forceDecimals,siStyle);
	kidkarnmaiNumber.randomNoLoop(max,min,num); 
	kidkarnmaiNumber.timeToString(time_to_convert)
	
*/
var kidkarnmaiNumber = new function(){
	
	
	 if ( ! window.console ) console = { log: function(){} };
	 
	this.randomNumber = function(max,min)
	{
		"use strict";
		max = max || 10;
		min = min || 0;
		var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return (randomNum);
	}
	
	this.formatNumber = function(number, maxDecimals, forceDecimals,siStyle)
	{
		"use strict";
		
		number = number || 0;
		maxDecimals = maxDecimals || 2;
		forceDecimals = forceDecimals || false;
		siStyle = siStyle || true; 
		
		var i = 0,inc = Math.pow(10,maxDecimals),str = String(Math.round(inc * Number(number)) / inc);
		var hasSep = str.indexOf(".") == -1,sep = hasSep ? str.length:str.indexOf(".");
		var ret = (hasSep && !forceDecimals ? "" : (siStyle ? "." : ",")) + str.substr(sep+1);
		if (forceDecimals)
		{
			for (var j = 0; j <= maxDecimals - (str.length - (hasSep ? sep-1 : sep)); j++)
			{
				ret +=  "0";
			}
		}
		while (i + 3 < (str.substr(0, 1) == "-" ? sep-1 : sep))
		{
			ret = (siStyle ? "," : ".") + str.substr(sep - (i += 3), 3) + ret;
		}
		return str.substr(0, sep - i) + ret;
	}

	this.randomNoLoop = function(max,min,num)
	{
		"use strict";
		max = max || 10;
		min = min || 1;
		num = num || 10;
		
		var arr = [];
		while (arr.length<num)
		{
			var bol = true;
			var numS;
			while (bol)
			{
				bol = false;
				numS = randomNumber(max,min);
				for (var i=0; i<arr.length; i++)
				{
					if (arr[i] == numS)
					{
						bol = true;
					}
				}
			}
			arr.push(numS);
		}
		return (arr);
	}

	this.timeToString = function(time_to_convert)
	{
		"use strict"; 
		
		var elapsed_hours;
		var remaining;
		var elapsed_minutes;
		var elapsed_seconds;
		var elapsed_fs;
		var hours;
		var minutes;
		var seconds;
		var hundredths;
		elapsed_hours = Math.floor(time_to_convert / 3600000);
		remaining = time_to_convert - (elapsed_hours * 3600000);
		elapsed_minutes = Math.floor(remaining / 60000);
		remaining = remaining - (elapsed_minutes * 60000);
		elapsed_seconds = Math.floor(remaining / 1000);
		remaining = remaining - (elapsed_seconds * 1000);
		elapsed_fs = Math.floor(remaining);
		if (elapsed_hours < 10)
		{
			hours = "0" + elapsed_hours.toString();
		}
		else
		{
			hours = elapsed_hours.toString();
		}
		if (elapsed_minutes < 10)
		{
			minutes = "0" + elapsed_minutes.toString();
		}
		else
		{
			minutes = elapsed_minutes.toString();
		}
		if (elapsed_seconds < 10)
		{
			seconds = "0" + elapsed_seconds.toString();
		}
		else
		{
			seconds = elapsed_seconds.toString();
		}
		if (elapsed_fs < 10)
		{
			hundredths = "0" + elapsed_fs.toString();
		}
		else if (elapsed_fs < 100)
		{
			hundredths = "0" + elapsed_fs.toString();
		}
		else
		{
			hundredths = elapsed_fs.toString();
		}
		return minutes + ":" + seconds + ":" + hundredths;
	}	
	
	function randomNumber(max,min)
	{
		"use strict";
		max = max || 10;
		min = min || 0;
		var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return (randomNum);
	}
}