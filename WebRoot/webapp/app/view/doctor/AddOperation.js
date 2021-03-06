Ext.define('Wj.view.doctor.AddOperation', {
	extend: 'Ext.window.Window',
	alias: 'widget.addoperation',

	modal: true,
	closable: true,
	resizable: false,
	layout: {
		type: 'hbox',
		pack: 'start',
		align: 'stretch',
	},

	title: '新增手术申请',

	width: 380,
	height: 320,

	initComponent: function(){

		this.items = [{
			xtype: 'form',
			flex: 1,
			padding: '10 2 10 2',
			border: false,
			bodyStyle: 'background:#DFE9F6',
			defaults: {
				labelSeparator: ' : ',
				msgTarget: 'side',
				anchor: '100%',
				style: {
					margin: '4px 10px',
				},
			},
			defaultType: 'textfield',

			items:[{
				fieldLabel: '伤员编号',
				name: 'pid',
				itemId: 'add_id',
				value: Wj.controller.Doctor.getPtId(),
				readOnly: true,
				fieldStyle: Wj.consts.css_readOnly,
			}, {
				fieldLabel: '伤员姓名',
				name: 'name',
				itemId: 'add_name',
				value: Wj.controller.Doctor.getPtName(),
				readOnly: true,
				fieldStyle: Wj.consts.css_readOnly,
			}, {
				fieldLabel: '申请医生',
				name: 'people',
				itemId: 'applypeople',
				value: Wj.controller.Doctor.getUser(),
				readOnly: true,
				fieldStyle: Wj.consts.css_readOnly,
			},{
			//	xtype: 'combobox',
			//	disabled:true,
				value:'手术',
				fieldStyle: Wj.consts.css_readOnly,
				fieldLabel: '类型',
				name: 'type2',
				itemId: 'add_type2',
				editable: false,
				readOnly: true,
				allowBlank: false,
				listeners:{
					  'render': function()
					  {
					  var g = Ext.ComponentQuery.query('#add_content')[0];
					  
					 console.log('g:'+g);
					 console.log('value:'+g.getValue());
					 
					  	g.setValue('');				  		
					  	var t = Ext.ComponentQuery.query('#add_type2')[0];
					  	var type = t.getValue();
					  	console.log('type:'+type);
							val = '';
							var st = Ext.ComponentQuery.query('#add_content')[0];
							store = st.getStore();

						store.getProxy().extraParams = {
							type2: type,
							term: val
						},
						store.load({
							callback: function(records, o, suc){
								console.log('suc:'+suc);
							}
							
							});

						console.log('store.getProxy().extraParams', store.getProxy().extraParams);

						Wj.tmp.timer = 0;
					  }
				}
				//blankText: '医嘱类型不能为空',
			}, {
				xtype: 'combobox',
				store: 'doctor.AdvContents',
				autoScroll: true,
				autoSelect: true,
				queryMode: 'remote',
				queryParam: 'term',
				queryDelay: 800,
				queryCaching: true,
				minChars: 1,
				// triggerAction: 'all',
				fieldLabel: '手术内容',
				name: 'content',
				displayField: 'content',
				valueField: 'content',
				itemId: 'add_content',
				enableKeyEvents: true,
				readOnly: true,
				fieldStyle: Wj.consts.css_readOnly,
				allowBlank: false,
				blankText: '检查内容不能为空',
				regex:/^\S{1,100}$/,
				regexText:'请输入100个以内字符',
			},{
				xtype: 'datetimefield',
				name: 'startTime',
				itemId: 'add_startTime',
				fieldLabel: '手术时间',
				value: new Date(),
				format: 'Y/m/d H:i:s',
				allowBlank: false,
				blankText: '下达时间不能为空',
				readOnly: true,
				fieldStyle: Wj.consts.css_readOnly,
			}, {
				xtype: 'textarea',
				name: 'spec',
				itemId: 'add_spec',
				height: 60,
				fieldLabel: '手术注意事项',
				grow: true,
				regex:/^[\s\S]{0,200}$/,
				regexText:'请输入200个以内字符',
			},
//			{
//				value:'未完成',
//				fieldLabel: '状态',
//				name: 'state',
//				itemId: 'add_state',
//				hidden: true, 
//				hideLabel:true 
//				
//			}
			]

		}];

		this.buttons = [{
			text: '确定',
			itemId: 'accept',
			icon: 'icon/accept.png',
			handler: Wj.controller.Doctor.confirmAddOperation,
		}, {
			text: '重置',
			itemId: 'reset',
			icon: 'icon/reset.png',
			handler: function(){
				
				var fm = this.up('window').down('form').getForm();
				var n = fm.findField('name').value;
				fm.reset();
				fm.findField('name').setValue(n);

			},
		}];

		this.callParent(arguments);

	}
})