var itcast = {
	tap:function(dom,callback){
		// 判断是否传入对象,且对象需要为一个dom元素
		if(!dom || typeof dom!="object"){
			return;
		}
		/* 绑定移动端的tap事件 */
		/* 
		1 判断是否只有一个手指，多手指不响应
		2 判断触摸是否超过固定时间，超过则是长按
		3 判断滑动距离是否超过固定值，超过则是滑动
		 */
		var startTime,stratX,startY,endX,endY;
		dom.addEventListener("touchstart",function(e){
			// 判断是否有多根手指
			if(e.targetTouches.length > 1){
				return;
			}
			// 记录手指开始触摸的时间
			startTime = Date.now();
			// 记录当前手指坐标
			startX = e.targetTouches[0].clientX;
			startY = e.targetTouches[0].clientY;
		});
		
		/*touchend：当手指松开时候触发，意味着当前元素上已经没有手指对象了,所以无法通过targetTouches来获取手指对象*/
		dom.addEventListener("touchend",function(e){
			// 判断是否多根手指
			if(e.changedTouches.length > 1){
				return;
			}
			// 判断是否长按
			if((Date.now() - startTime) > 150){
				return;
			}
			endX = e.changedTouches[0].clientX;
			endY = e.changedTouches[0].clientY;
			if (Math.abs(endX-startX) < 6 && Math.abs(endY-startY) < 6 ){
				callback && callback(e);
			}
		});
	}
}
