/**
 * 全局替换
 * @param s1 oldstr
 * @param s2 newstr
 */
function jsReplaceAll(s1,s2){
	this.replace(new RegExp(s1,"gm"),s2); 
}
