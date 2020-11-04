class MyCustomButton extends tabris.Widget{

	//----自定义控件类必须覆写_nativeType属性的getter以返回与原生实现匹配的类型----
	get _nativeType(){
		return 'com.tabris.Button';
	}

	//---------与原生交换属性-------
	set myProperty(value){
		this._nativeType('myProperty',value);
	}

	get myProperty(){
		return this._nativeGet('myProperty');
	}

	//-----覆写_listen方法，并调用_nativeListen以便在原生控件触发事件时收到通知。----
	_listen(name,listening){
		if(name==='select'){
			this._nativeListen(name,listening);
		}else{
			super._listen(name,listening);
		}
	}
	destory(){
	    this.el.dispose();
	    this.tabs.forEach((tabObj)=>{
	      tabObj.tab.dispose();
	    })
    }
}


module.exports ={
	constant:null,
	init:function(){
		this.constant = MyCustomWidget()
	},
};