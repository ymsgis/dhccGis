/*
 * 日期 星期显示
 */
function showTime(){
	  var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
	  var time = new Date();
	  var year = time.getFullYear();
	  var month = time.getMonth();
	  month = month + 1;
	  var date = time.getDate();
	  var day = time.getDay();
	  var first_time = date + '日' + ' '+ show_day[day];
	  var second_time = showDate(year,month,date) + '日' + ' '+ show_day[showDaySecond(day)];
	  var third_time = showDate(year,month,(date+1)) + '日' + ' '+ show_day[showDayThird(day)];
	  var fouth_time = showDate(year,month,(date+2)) + '日' + ' '+ show_day[showDayFouth(day)];
	  var fifth_time = showDate(year,month,(date+3)) + '日' + ' '+ show_day[showDayFifth(day)];
	  var sixth_time = showDate(year,month,(date+4)) + '日' + ' '+ show_day[showDaySixth(day)];
	  var seventh_time = showDate(year,month,(date+5)) + '日' + ' '+ show_day[showDaySeventh(day)];
	  var eighth_time = showDate(year,month,(date+6)) + '日' + ' '+ show_day[day];
	  var ninth_time = showDate(year,month,(date+7)) + '日' + ' '+ show_day[showDaySecond(day)];
	  var tenth_time = showDate(year,month,(date+8)) + '日' + ' '+ show_day[showDayThird(day)];
	  $("#first").html(first_time);
	  $("#second").html(second_time);
	  $("#third").html(third_time);
	  $("#fouth").html(fouth_time);
	  $("#fifth").html(fifth_time);
	  $("#sixth").html(sixth_time);
	  $("#seventh").html(seventh_time);
	  $("#eighth").html(eighth_time);
	  $("#ninth").html(ninth_time);
	  $("#tenth").html(tenth_time);
}
function isLeapYear(year){
	if((year%4==0 && year%100!=0)||(year%400==0)){//判断闰年（366）
		return true;
	}else{
		return false;
	}
}
function showDate(year,month,date){
	var flag = isLeapYear(year);
	if(flag){
		if(month==2){//二月份29天
			if(date>0&&date<29) return date+1;	
			if(date==29) return 1;
			if(date==30) return 2;
			if(date==31) return 3;
			if(date==32) return 4;
			if(date==33) return 5;
			if(date==34) return 6;
			if(date==35) return 7;
			if(date==36) return 8;
			if(date==37) return 9;
		}
		if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
			if(date>0&&date<31) return date+1;
			if(date==31) return 1;
			if(date==32) return 2;
			if(date==33) return 3;
			if(date==34) return 4;
			if(date==35) return 5;
			if(date==36) return 6;
			if(date==37) return 7;
			if(date==38) return 8;
			if(date==39) return 9;
		}
		if(month==4||month==6||month==9||month==11){
			if(date>0&&date<30) return date+1;
			if(date==30) return 1;
			if(date==31) return 2;
			if(date==32) return 3;
			if(date==33) return 4;
			if(date==34) return 5;
			if(date==35) return 6;
			if(date==36) return 7;
			if(date==37) return 8;
			if(date==38) return 9;
		}
	}else{
		if(month==2){//二月份28天
			if(date>0&&date<28) return date+1;
			if(date==28) return 1;
			if(date==29) return 2;
			if(date==30) return 3;
			if(date==31) return 4;
			if(date==32) return 5;
			if(date==33) return 6;
			if(date==34) return 7;
			if(date==35) return 8;
			if(date==36) return 9;
		}
		if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){			
			if(date>0&&date<31) return date+1;
			if(date==31) return 1;
			if(date==32) return 2;
			if(date==33) return 3;
			if(date==34) return 4;
			if(date==35) return 5;
			if(date==36) return 6;
			if(date==37) return 7;
			if(date==38) return 8;
			if(date==39) return 9;
		}
		if(month==4||month==6||month==9||month==11){
			if(date>0&&date<30) return date+1;
			if(date==30) return 1;
			if(date==31) return 2;
			if(date==32) return 3;
			if(date==33) return 4;
			if(date==34) return 5;
			if(date==35) return 6;
			if(date==36) return 7;
			if(date==37) return 8;
			if(date==38) return 9;
		}
	}
}
function showDaySecond(day){//第二天
	if(day==0||day==1||day==2||day==3||day==4||day==5){
		return day+1;
	}else if(day==6){
		return 0;
	}
}
function showDayThird(day){//第三天
	if(day==0||day==1||day==2||day==3||day==4){
		return day+2;
	}else if(day==6){
		return 1;
	}else if(day==5){
		return 0;
	}
}
function showDayFouth(day){//第四天
	if(day==0||day==1||day==2||day==3){
		return day+3;
	}else if(day==6){
		return 2;
	}else if(day==5){
		return 1;
	}else if(day==4){
		return 0;
	}
}
function showDayFifth(day){//第五天
	if(day==0||day==1||day==2){
		return day+4;
	}else if(day==6){
		return 3;
	}else if(day==5){
		return 2;
	}else if(day==4){
		return 1;
	}else if(day==3){
		return 0;
	}
}
function showDaySixth(day){//第六天
	if(day==0||day==1){
		return day+5;
	}else if(day==6){
		return 4;
	}else if(day==5){
		return 3;
	}else if(day==4){
		return 2;
	}else if(day==3){
		return 1;
	}else if(day==2){
		return 0;
	}
}
function showDaySeventh(day){//第七天
	if(day==0){
		return day+6;
	}else if(day==6){
		return 5;
	}else if(day==5){
		return 4;
	}else if(day==4){
		return 3;
	}else if(day==3){
		return 2;
	}else if(day==2){
		return 1;
	}else if(day==1){
		return 0;
	}
}

