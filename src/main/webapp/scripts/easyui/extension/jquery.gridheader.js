(function() {
/**
 * @requires jQuery,EasyUI
 * 
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);/* grid本身 */
	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
	var okCls = 'tree-checkbox1';//选中
	var emptyCls = 'tree-checkbox0';//取消
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="'+okCls+'" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="'+emptyCls+'" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == okCls) {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : emptyCls
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : okCls
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
//$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
//$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.extend($.fn.datagrid.methods, {
	bindHeader: function(grid, op) {
		var panel = grid.datagrid('getPanel');
		var header = panel.find('.datagrid-header-row');
		header.find('td[field]').css('cursor', 'pointer').click(function() {
			var field = $(this).attr('field');
			var colOp = grid.datagrid('getColumnOption', field);
			if(colOp.selectable==false) return false;
			var op = grid.datagrid('options');
			var onClickColumn = op.onClickColumn;
			if(onClickColumn) {
				onClickColumn.call(grid, this, colOp);
			}
			panel.find('td.datagrid-row-selected').removeClass('datagrid-row-selected');			
			panel.find('td[field='+field+']').addClass('datagrid-row-selected');
		});
		return grid;
	}
});

})()