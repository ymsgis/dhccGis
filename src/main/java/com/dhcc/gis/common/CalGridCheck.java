package com.dhcc.gis.common;

import java.math.BigDecimal;

/**
 * 基本检验方法
 * @author hy
 * @date 2017年7月17日
 * @version 1.0
 */
public class CalGridCheck {
	
	/**
	 * 温度预报平均误差
	 * @param gridSumCount
	 * @param dValue
	 * @return
	 */
	public double tmpAverageError(int gridSumCount, float dValueSum){
		float result = dValueSum/gridSumCount;
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 温度预报均方根误差
	 * @param gridSumCount
	 * @param dSquareValueSum
	 * @return
	 */
	public double tmpRMSE(int gridSumCount, float dSquareValueSum){
		double result = Math.sqrt(dSquareValueSum/gridSumCount);
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 温度预报≤1℃预报准确率
	 * @param gridSumCount
	 * @param dCorrectValueCount
	 * @return
	 */
	public double accuracyRateOne(int gridSumCount, int dCorrectValueCount){
		double result = (double)dCorrectValueCount/gridSumCount;
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 温度预报≤2℃预报准确率
	 * @param gridSumCount
	 * @param dCorrectValueCount
	 * @return
	 */
	public double accuracyRateTwo(int gridSumCount, int dCorrectValueCount){
		double result = (double)dCorrectValueCount/gridSumCount;
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 温度≤1℃正确格点数
	 * @param value
	 * @return
	 */
	public int correctGridCountOne(float value){
		int num = 0;
		if(Math.abs(value)<=1){
			num = 1;
		}
		return num;
	}
	
	/**
	 * 温度≤2℃正确格点数
	 * @param value
	 * @return
	 */
	public int correctGridCountTwo(float value){
		int num = 0;
		if(Math.abs(value)<=2){
			num = 1;
		}
		return num;
	}
	
	/**
	 * 湿度预报平均误差
	 * @param gridSumCount
	 * @param dValueSum
	 * @return
	 */
	public double erhAverageError(int gridSumCount, float dValueSum){
		BigDecimal b1 = new BigDecimal(gridSumCount);
        BigDecimal b2 = new BigDecimal(dValueSum);	
        return b2.divide(b1,4,BigDecimal.ROUND_HALF_UP).doubleValue();
	}
	
	/**
	 * 湿度预报均方根误差
	 * @param gridSumCount
	 * @param dSquareValueSum
	 * @return
	 */
	public double erhRMSE(int gridSumCount, float dSquareValueSum){
		double result = Math.sqrt(dSquareValueSum/gridSumCount);
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 湿度≤5%准确率
	 * @param gridSumCount
	 * @param dCorrectValueCount
	 * @return
	 */
	public double accuracyRateFive(int gridSumCount, int dCorrectValueCount){
		double result = (double)dCorrectValueCount/gridSumCount;
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 湿度≤10%准确率
	 * @param gridSumCount
	 * @param dCorrectValueCount
	 * @return
	 */
	public double accuracyRateTen(int gridSumCount, int dCorrectValueCount){
		double result = (double)dCorrectValueCount/gridSumCount;
		BigDecimal bd = new BigDecimal(result);
		double dRes = bd.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		return dRes;
	}
	
	/**
	 * 湿度≤5%正确格点数
	 * @param value
	 * @return
	 */
	public int correctGridCountFive(float value){
		int num = 0;
		if(Math.abs(value)<=5){
			num = 1;
		}
		return num;
	}
	
	/**
	 * 湿度≤10%正确格点数
	 * @param value
	 * @return
	 */
	public int correctGridCountTen(float value){
		int num = 0;
		if(Math.abs(value)<=10){
			num = 1;
		}
		return num;
	}
	
	public static void main(String[] args) {
		CalGridCheck cgc = new CalGridCheck();
		double d = cgc.tmpRMSE(2, 8);
		System.out.println(d);
	}
}
