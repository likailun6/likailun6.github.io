'use strict';
;(function (){
	var start=0;
	var iSpeed=20;
	window.doMove=function (obj,name,iTarget){
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			iSpeed+=(iTarget-start)/5;
			iSpeed*=0.8;
			start+=iSpeed;
			obj.style[name]=start+'px';
			
			if(Math.round(iSpeed)==0&&Math.round(start)==iTarget){
				clearInterval(obj.timer);
				obj.style[name]=iTarget+'px';
			}
		},16);
	};
})();