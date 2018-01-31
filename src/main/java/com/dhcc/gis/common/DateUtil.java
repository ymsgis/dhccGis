package com.dhcc.gis.common;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.joda.time.DateTime;

/*
 * joda类的使用
 * DateFormatUtils类的使用
 * DateUtils类的使用
 */
public class DateUtil {
	static String[] parsePatterns = { "yyyy-MM-dd", "yyyy/MM/dd" };

	/*
	 * 得到当前日期字符串 格式（yyyy-MM-dd）
	 */
	public static String getDate() {
		return DateFormatUtils.format(new Date(), "yyyy-MM-dd");
	}

	/*
	 * 得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 */
	public static String formatDate(Date date, Object... pattern) {
		String formatDate = null;
		if (pattern != null && pattern.length > 0) {
			formatDate = DateFormatUtils.format(date, pattern[0].toString());
		} else {
			formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
		}
		return formatDate;
	}

	/*
	 * 得到当前时间字符串 格式（HH:mm:ss）
	 */
	public static String getTime() {
		return (new DateTime()).toString("HH:mm:ss");
	}

	/*
	 * 得到当前日期和时间字符串 格式（yyyy-MM-dd HH:mm:ss）
	 */
	public static String getDateTime() {
		return (new DateTime()).toString("yyyy-MM-dd HH:mm:ss");
	}

	/*
	 * 得到当前星期字符串 格式（E）星期几
	 */
	public static String getWeek() {
		return (new DateTime()).toString("E");
	}

	/*
	 * 天数相加
	 */
	public static Date addDay(Date date, int d) {
		return DateUtils.addDays(date, d);
	}

	/*
	 * 小时相加
	 */
	public static Date addHours(Date date, int hour){
		return DateUtils.addHours(date, hour);
	}
	
	/*
	 * 小时相加
	 */
	public static Date addMinutes(Date date, int minute){
		return DateUtils.addMinutes(date, minute);
	}
	
	/*
	 * 月份相加
	 */
	public static Date addMonths(Date date, int m) {
		return DateUtils.addMonths(date, m);
	}
	
	/*
	 * 日期型字符串转化为日期 格式（"yyyy-MM-dd","yyyy/MM/dd"）
	 */
	public static Date parseDate(String str) throws ParseException {
		return DateUtils.parseDate(str, parsePatterns);
	}
	
	/**
	 * 
	 * @Title: getDateByHour 
	 * @Description: 获取指定时分秒的日期
	 * @param date
	 * @param hour
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date getDateByHHMMSS(Date date,int hour,int minute,int second){
		 Calendar rightNow = Calendar.getInstance();
		 rightNow.setTime(date);
		 rightNow.set(Calendar.HOUR_OF_DAY,hour); 
		 rightNow.set(Calendar.MINUTE,minute); 
		 rightNow.set(Calendar.SECOND,second);
		 rightNow.set(Calendar.MILLISECOND, 0);
		 date = rightNow.getTime();
		 return date;
	}

	public static Date getDate(int year,int month,int day,int hour,int minute,int second){
		Calendar rightNow = Calendar.getInstance();
		 rightNow.set(Calendar.YEAR,year); 
		 rightNow.set(Calendar.MONTH,month);
		 rightNow.set(Calendar.DAY_OF_MONTH,day); 
		 rightNow.set(Calendar.HOUR_OF_DAY,hour); 
		 rightNow.set(Calendar.MINUTE,minute); 
		 rightNow.set(Calendar.SECOND,second);
		 rightNow.set(Calendar.MILLISECOND,0);
		 return rightNow.getTime();
	}
	
	public static int getHour(Date date){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		return rightNow.get(Calendar.HOUR_OF_DAY);
	}
	
	public static int getYear(Date date){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		return rightNow.get(Calendar.YEAR);
	}
	
	public static int getMinute(Date date){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		return rightNow.get(Calendar.MINUTE);
	}
	
	public static int getMonth(Date date){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		return rightNow.get(Calendar.MONTH);
	}
	
	public static int getDay(Date date){
		Calendar rightNow = Calendar.getInstance();
		rightNow.setTime(date);
		return rightNow.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * @param args
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		Date date = getDate(2017,6,18,14,3,0);
		String str=formatDate(date,"yyyy年MM月dd日HH时mm分ss秒");
		//str = str.replace("-", "年").replace("-", "月").replace(" ", "日")+"时";
//		Calendar rightNow = Calendar.getInstance();
//		rightNow.setTime(new Date());
		int i=15;
		System.out.println(i/7-1);
//		String arch = System.getProperty("sun.arch.data.model");
		//System.out.println(formatDate(new Date(),"yyyyMMddHH"));
		//Long aa = 201602031501L;
		//System.out.println(aa.toString());
	}
}
