class MyCustomButton extends tabris.Widget{

	 constructor(properties) {
	    super(properties);
	    console.log(properties)
	    // this._state = 'finish';
	    this._text = properties.text;
	    // this.composition = null;
	    // this.on('stateChanged', ({state}) => this._state = state);
	    // this.on('animationChanged', () => this._handleAutoPlay());
	    // this.on('load', () => {}); // required to get this.composition in this._trigger()
	  }

	//----自定义控件类必须覆写_nativeType属性的getter以返回与原生实现匹配的类型----
	get _nativeType(){
		return 'com.tabris.Button';
	}

	//---------与原生交换属性-------
	set text(value){
		this._text = value;
	}

	get text(){
		return this._text;
	}

	buttonText(){
		return "hhhhhhhh"
	}

	//-----覆写_listen方法，并调用_nativeListen以便在原生控件触发事件时收到通知。----
	_listen(name,listening){
		if(name==='select'){
			console.log("---//"+name)
			this._nativeListen(name,listening);
		}else{
			console.log("---//---"+name)
			super._listen(name,listening);
		}
	}
	//  _handleAutoPlay() {
	//     if (this.autoPlay) {

	//     }
	// }
	destory(){
	    this.el.dispose();
	    this.tabs.forEach((tabObj)=>{
	      tabObj.tab.dispose();
	    })
    }
}
tabris.NativeObject.defineProperties(MyCustomButton.prototype, {
  text: {type: 'string', default: "你好tabris"},
  maxLines:{type:'int',default:0}
});

tabris.NativeObject.defineEvents(MyCustomButton.prototype, {
  load: {native: true},
  update: {native: true},
});

module.exports = MyCustomButton