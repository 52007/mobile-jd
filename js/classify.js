window.onload = function(){
	/* 左侧商品分类
	1 点击li元素改变样式——添加和移除类active
	2 实现分类栏的拖动——
	 */
	// 获取左侧栏
	var goodsClass = document.querySelector(".goodsClass");
	// 获取左侧栏的高度
	var classHeight = goodsClass.offsetHeight;
	// 获取滑动列表
	var ulGoodsClass = goodsClass.querySelector("ul:first-of-type")
	// 获取滑动列表高度
	var ulClassHeight = ulGoodsClass.offsetHeight;
	// 获取所有的li元素
	var lis = ulGoodsClass.querySelectorAll("li");
	
	// 设置静止状态下的最大top值maxTop
	var maxTop = 0;
	// 设置静止状态下的最小top值minTop
	var minTop = classHeight - ulClassHeight;
	// 设置滑动状态下的最大top值maxBounceTop
	maxBounceTop = maxTop+100;
	// 设置滑动状态下的最小top值minBounceTop
	minBounceTop = minTop-100;
	console.log(maxBounceTop+":"+minBounceTop);
	
	/* 实现滑动 */
	var startY,moveY,distanceY=0;
	// 记录当前元素滑动到的距离
	var currentY = 0;
	
	// 添加触屏事件
	ulGoodsClass.addEventListener("touchstart",function(e){
		// 记录手指触屏的起点坐标
		startY = e.targetTouches[0].clientY;
	});
	ulGoodsClass.addEventListener("touchmove",function(e){
		// 记录移动中的坐标
		moveY = e.targetTouches[0].clientY;
		// 计算差异值
		distanceY = moveY-startY;
		// 判断是否超过滑动区间
		if(currentY+distanceY > maxBounceTop || currentY+distanceY < minBounceTop){
			console.log("超出范围！");
			return;
		}
		// 清除之前可能会有的过渡效果
		ulGoodsClass.style.transition="none";
		// 设置偏移
		ulGoodsClass.style.top = (currentY+distanceY)+"px";
	});
	ulGoodsClass.addEventListener("touchend",function(e){
		// 判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间
		if(currentY+distanceY > maxTop){
			// 重置currentY为maxTop
			currentY = maxTop;
			// 回到maxTop位置
			ulGoodsClass.style.transition = "top 0.5s"
			ulGoodsClass.style.top = maxTop+"px";
		}
		else if(currentY+distanceY < minTop){
			// 重置currentY为minTop
			currentY = minTop;
			// 回到minTop位置
			ulGoodsClass.style.transition = "top 0.5s"
			ulGoodsClass.style.top = minTop+"px";
		}
		else{
			// 记录当前的滑动距离
			currentY += distanceY;
		}
	});
	
	// 为每一个li元素设置添加一个索引值
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;
	}
	
	// 绑定移动端的tap事件
	itcast.tap(ulGoodsClass,function(e){
		/* 1. 修改li元素的样式 */
		// 清除所有li的active样式
		for (var i=0;i<lis.length;i++){
			lis[i].classList.remove("active");
		}
		// 为当前li添加active样式
		var li = e.target.parentNode;
		li.classList.add("active");
		// 获取li元素的高度
		var liHeight = li.offsetHeight;
		
		/* 2. 移动当前li元素到父容器的最顶部，不嗯呢该超过之前设定的静止状态下的mintop区间值 */
		// 获取当前li的索引
		var index = li.index;
		// 添加过渡
		ulGoodsClass.style.transition = "top 0.5s";
		// 设置偏移
		if(-index*liHeight < minTop){
			 ulGoodsClass.style.top = minTop+"px";
			 currentY = -index*liHeight;
		}
		else{
			ulGoodsClass.style.top = (-index*liHeight)+"px";
			currentY = -index*liHeight;
		}
		
	});

}