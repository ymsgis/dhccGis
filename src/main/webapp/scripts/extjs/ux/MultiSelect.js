Ext.ux.Multiselect = Ext.extend(Ext.form.Field,  {    appendOnly:false,    dataFields:[],    data:[],    width:100,    height:100,    displayField:0,    valueField:1,    allowBlank:true,    minLength:0,    maxLength:Number.MAX_VALUE,    blankText:Ext.form.TextField.prototype.blankText,    minLengthText:decodeURIComponent("%E6%9C%80%E5%B0%8F%E9%95%BF%E5%BA%A6%E4%B8%BA%7B0%7D"),    maxLengthText:decodeURIComponent("%E6%9C%80%E5%A4%A7%E9%95%BF%E5%BA%A6%E4%B8%BA%7B0%7D"),    delimiter:',',    copy:false,    allowDup:false,    allowTrash:false,    focusClass:undefined,    sortDir:'ASC',    defaultAutoCreate : {tag: "div"},    initComponent: function(){        Ext.ux.Multiselect.superclass.initComponent.call(this);        this.addEvents({            'dblclick' : true,            'click' : true,            'change' : true,            'drop' : true        });         },    onRender: function(ct, position){        Ext.ux.Multiselect.superclass.onRender.call(this, ct, position);                var cls = 'ux-mselect';        var fs = new Ext.form.FieldSet({            renderTo:this.el,            title:this.legend,            height:this.height,            width:this.width,            style:"padding:0;",            tbar:this.tbar        });        fs.body.addClass(cls);        var tpl = '<tpl for="."><div class="' + cls + '-item';        if(Ext.isIE || Ext.isIE7){            tpl+='" unselectable=on';        }else{            tpl+=' x-unselectable"';        }        tpl+='>{' + this.displayField + '}</div></tpl>';        if(!this.store){            this.store = new Ext.data.SimpleStore({                fields: this.dataFields,                data : this.data            });        }        this.view = new Ext.ux.DDView({            multiSelect: true,             store: this.store,             selectedClass: cls+"-selected",             tpl:tpl,            allowDup:this.allowDup,             copy: this.copy,             allowTrash: this.allowTrash,             dragGroup: this.dragGroup,             dropGroup: this.dropGroup,             itemSelector:"."+cls+"-item",            isFormField:false,             applyTo:fs.body,            appendOnly:this.appendOnly,            sortField:this.sortField,             sortDir:this.sortDir        });        fs.add(this.view);                this.view.on('click', this.onViewClick, this);        this.view.on('beforeClick', this.onViewBeforeClick, this);        this.view.on('dblclick', this.onViewDblClick, this);        this.view.on('drop', function(ddView, n, dd, e, data){            return this.fireEvent("drop", ddView, n, dd, e, data);        }, this);                this.hiddenName = this.name;        var hiddenTag={tag: "input", type: "hidden", value: "", name:this.name};        if (this.isFormField) {             this.hiddenField = this.el.createChild(hiddenTag);        } else {            this.hiddenField = Ext.get(document.body).createChild(hiddenTag);        }        fs.doLayout();    },    initValue:Ext.emptyFn,    onViewClick: function(vw, index, node, e) {        var arrayIndex = this.preClickSelections.indexOf(index);        if (arrayIndex  != -1)        {            this.preClickSelections.splice(arrayIndex, 1);            this.view.clearSelections(true);            this.view.select(this.preClickSelections);        }        this.fireEvent('change', this, this.getValue(), this.hiddenField.dom.value);        this.hiddenField.dom.value = this.getValue();        this.fireEvent('click', this, e);        this.validate();            },    onViewBeforeClick: function(vw, index, node, e) {        this.preClickSelections = this.view.getSelectedIndexes();        if (this.disabled) {return false;}    },    onViewDblClick : function(vw, index, node, e) {        return this.fireEvent('dblclick', vw, index, node, e);    },      getValue: function(valueField){        var returnArray = [];        var selectionsArray = this.view.getSelectedIndexes();        if (selectionsArray.length == 0) {return '';}        for (var i=0; i<selectionsArray.length; i++) {            returnArray.push(this.store.getAt(selectionsArray[i]).get(((valueField != null)? valueField : this.valueField)));        }        return returnArray.join(this.delimiter);    },    setValue: function(values) {        var index;        var selections = [];        this.view.clearSelections();        this.hiddenField.dom.value = '';                if (!values || (values == '')) { return; }                if (!(values instanceof Array)) { values = values.split(this.delimiter); }        for (var i=0; i<values.length; i++) {            index = this.view.store.indexOf(this.view.store.query(this.valueField,                 new RegExp('^' + values[i] + '$', "i")).itemAt(0));            selections.push(index);        }        this.view.select(selections);        this.hiddenField.dom.value = this.getValue();        this.validate();    },    reset : function() {        this.setValue('');    },    getRawValue: function(valueField) {        var tmp = this.getValue(valueField);        if (tmp.length) {            tmp = tmp.split(this.delimiter);        }        else{            tmp = [];        }        return tmp;    },    setRawValue: function(values){        setValue(values);    },    validateValue : function(value){        if (value.length < 1) {              if (this.allowBlank) {                 this.clearInvalid();                 return true;             } else {                 this.markInvalid(this.blankText);                 return false;             }        }        if (value.length < this.minLength) {            this.markInvalid(String.format(this.minLengthText, this.minLength));            return false;        }        if (value.length > this.maxLength) {            this.markInvalid(String.format(this.maxLengthText, this.maxLength));            return false;        }        return true;    }});Ext.reg("multiselect", Ext.ux.Multiselect);