package com.dhcc.gis.common;

public abstract class DataValidator {

	public static boolean isBlank(Object obj) {
		return obj == null || "".equals(obj.toString().trim());
	}
}
