var d = new Date();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var shortDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

//make double digits
var dblDigits = function(num){
	if(num < 10){
			return String('0' + num);
	} else {
		return String(num);
	}
}

//find AM or PM
var meridiem = function(time){
	if(time >= 12){
		return 'PM';
	} else {
		return 'AM';
	}
}

//ordinals
function ordinals(d) {
    var j = d % 10,
        k = d % 100;
    if (j == 1 && k != 11) {
        return d + "st";
    }
    if (j == 2 && k != 12) {
        return d + "nd";
    }
    if (j == 3 && k != 13) {
        return d + "rd";
    }
    return d + "th";
}

//time library
var library = (function() {
  return {
	TimeStamp: (function(){
   	  return {
		UnixTimestamp: function(){
			var dateTime = Date.now();
			var timestamp = Math.floor(dateTime / 1000);
			return String(timestamp);
		},
		UnixMillisecond: function(){
			return String(new Date().getTime());
		}
	  }
	})(),

	Local: (function(){
	  return {
		Time: (function() {
		  return {
	  	    WithSeconds: function(){
						return d.getHours() % 12 + ':' + dblDigits(d.getMinutes()) + ":" + dblDigits(d.getSeconds()) + " " + meridiem(d.getHours());
					},
	   	    WithOutSeconds: function() {
						 return d.getHours() % 12 + ':' + dblDigits(d.getMinutes()) + " " + meridiem(d.getHours());
					 }
		  }
		})(),

		MDY: (function(){
	  	  return {
		    Numeral: function(){
					return d.getMonth()+1 + "/" + dblDigits(d.getDate()) + "/" + d.getFullYear();
				},
			Name: function(){
					return monthNames[d.getMonth()] + " " + dblDigits(d.getDate()) + ", " + d.getFullYear();
			}
		  }
		  })(),
		}
	})(),

	Second: (function(){
		return{
			Second: function(){
				return String(d.getSeconds());
			},
			DblDigit: function(){
				return dblDigits(d.getSeconds());
			}
		}
	})(),

	Minute: (function(){
		return{
			Minute: function(){
				return String(d.getMinutes());
			},
			DblDigit: function(){
				return dblDigits(d.getMinutes());
			}
		}
	})(),

	Hour: (function(){
		return {
			TwentyFourHour: function() {
				return String(d.getHours());
			},
			TwelveHour: function() {
				return String(d.getHours() % 12);
			},
			AMPM: (function() {
				return {
					UpperCase: function(){
						return meridiem(d.getHours());
					},
					LowerCase: function(){
						return meridiem(d.getHours()).toLowerCase();
					}
				}
			})()
		}
	})(),

	Week: (function(){
		return {
			DayOfWeek: function(){
				return days[d.getDay()];
			},
			AbrDayOfWeek: function(){
				return shortDays[d.getDay()];
			},
			FirstTwoOfWeek: function(){
				var day = shortDays[d.getDay()];
				return day.slice(0,2);
			},
			WeekOfYear: function(){
				var start = new Date(d.getFullYear(),0);
				var diff = d.getTime() - start.getTime();
				var days = Math.floor(diff/86400000);
				return String(Math.round(days / 7) + 1);
			}
		}
	})(),

	Month: (function(){
		return {
			DateOfMonth: (function(){
				return {
					Numeral: function(){
						return String(d.getDate());
					},
					Ordinal: function(){
						return ordinals(d.getDate());
					},
					DateDblDigit: function(){
						return dblDigits(d.getDate());
					}
				}
			})(),
			MonthNumber: function(){
				return String(d.getMonth() + 1);
			},
			MonthNumberDblDigit: function(){
				return dblDigits(d.getMonth() + 1);
			},
			AbrOfCurrentMonth: function(){
				return shortMonths[d.getMonth()];
			},
			CurrentMonth: function(){
				return monthNames[d.getMonth()];
			}
		}
	})(),

	Year: (function(){
		return {
			DayOfYear: (function(){
				return {
					Numeral: function(){
						var start = new Date(d.getFullYear(), 0);
						var diff = d.getTime() - start.getTime();
						var oneDay = 1000 * 60 * 60 * 24;
						var day = Math.ceil(diff / oneDay);
						return String(day);
					},
					Ordinal: function(){
						var start = new Date(d.getFullYear(), 0);
						var diff = d.getTime() - start.getTime();
						var oneDay = 1000 * 60 * 60 * 24;
						var day = Math.ceil(diff / oneDay);
						return ordinals(day);
					}
				}
			})(),
			YearFull: function(){
				return String(d.getFullYear());
			},
			YearAbr: function(){
				return String(d.getFullYear()).substring(2);
			}
		}
	})(),
	
	Defaults: function(){
		return d.getFullYear() + '-' + dblDigits(d.getMonth()+1) + '-' + dblDigits(d.getDate()) + "T" + dblDigits(d.getHours()) + ":" + dblDigits(d.getMinutes()) + ":" + dblDigits(Math.ceil(d.getSeconds()));
	}
  }
})();