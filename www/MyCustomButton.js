class MyCustomButton extends tabris.Widget{

	 constructor(properties) {
	    super(properties);
	    console.log(properties)
	    this._state = 'finish';
	    this._text = properties.text;
	    this.composition = null;
	    this.on('stateChanged', ({state}) => this._state = state);
	    this.on('animationChanged', () => this._handleAutoPlay());
	    this.on('load', () => {}); // required to get this.composition in this._trigger()
	  }

	//----自定义控件类必须覆写_nativeType属性的getter以返回与原生实现匹配的类型----
	get _nativeType(){
		return 'com.tabris.Button';
	}

	//---------与原生交换属性-------
	set buttonText(value){
		this._text = value;
	}

	get buttonText(){
		return this._text;
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
	 _handleAutoPlay() {
	    if (this.autoPlay) {

	    }
	}
	destory(){
	    this.el.dispose();
	    this.tabs.forEach((tabObj)=>{
	      tabObj.tab.dispose();
	    })
    }
}
tabris.NativeObject.defineProperties(MyCustomButton.prototype, {
  animation: {type: 'any', default: null},
  autoPlay: {type: 'boolean', default: true},
  speed: {type: 'number', default: 1},
  playing: {type: 'boolean', nocache: true, readonly: true},
  repeatMode: {choice: ['restart', 'reverse'], type: 'string', default: 'restart'},
  scaleMode: {choice: ['auto', 'fill'], type: 'string', default: 'auto'},
  scale: {type: 'number', default: 1},
  frame: {type: 'number', nocache: true},
  minFrame: {type: 'number', nocache: true},
  maxFrame: {type: 'number', nocache: true}
});

tabris.NativeObject.defineEvents(MyCustomButton.prototype, {
  load: {native: true},
  update: {native: true},
});

module.exports = MyCustomButton