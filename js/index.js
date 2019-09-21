window.onload = function(){
	searchOpacityEffect();
	
	skTimeEffect();
	
	bannerEffect();
}

// 设置随着滚动搜索条的透明度变化函数
function searchOpacityEffect(){
	// 获取轮播图区域的高度大小
	var bannerHeight = document.querySelector(".banner").offsetHeight;
	// console.log(bannerHeight);
	
	var search = document.querySelector("header");
	// 滚动事件
	document.addEventListener("scroll",function(){
		// 获取滚动出屏幕的距离
		var scrollHeight = document.documentElement.scrollTop;
		
		var opacity = 0;
		if(scrollHeight < bannerHeight){
			// 计算透明度:滚动出屏幕的距离/轮播区域高度
			opacity = scrollHeight/bannerHeight;
			
			// 设置搜索框的样式
			search.style.backgroundColor = "rgba(233,35,34,"+opacity+")";
			// console.log("现在执行着if里面的代码");
		}
	});
}

// 设置秒杀活动倒计时
function skTimeEffect(){
	// 给定一个时间进行倒计时
	var sk_time = 3700;

	// 获取span数组,将时间赋值
	var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
	
	// 添加判断条件
	if(sk_time<0){
		clearInterval(timeClock);
		return;
	}
	
	// 定时器
	var timeClock = setInterval(function(){
		sk_time--;
		
		// 获取该时间的时
		var hour = Math.floor(sk_time/3600);
		
		// 获取该时间的分
		var minute = Math.floor(sk_time%3600/60);
		
		// 获取该时间的秒
		var second = sk_time%60;
		
		// 赋值,将时间填充到span中
		spans[0].innerHTML = Math.floor(hour/10);
		spans[1].innerHTML = hour%10;
		spans[3].innerHTML = Math.floor(minute/10);
		spans[4].innerHTML = minute%10;
		spans[6].innerHTML = Math.floor(second/10);
		spans[7].innerHTML = second%10;
	},1000);

}

// 轮播图
function bannerEffect(){
	/* 1.设置修改轮播图的页面结构 
		a.在开始位置添加原始的最后一张图片吗
		b.在结束为止添加原始的第一张图片
	*/
   var banner = document.querySelector(".banner");
   var imgBox = banner.querySelector("ul:first-of-type");
   var first = imgBox.querySelector("li:first-of-type");
   var last = imgBox.querySelector("li:last-of-type");
   
   // 在首尾插入first和last这两张图片
   // cloneNode():复制一个dom元素
   imgBox.appendChild(first.cloneNode(true));
   // insertBefore(需要插入的dom元素,插入的位置)
   imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);
	
	/*2.设置对应的样式*/
	 // 2.1获取所有li元素
	 var lis = imgBox.querySelectorAll("li");
	 // 2.2获取li元素的数量
	 var count = lis.length;
	 // 2.3获取banner的宽度
	 var bannerWidth = banner.offsetWidth;
	 // 2.4设置图片盒子的宽度
	 imgBox.style.width = count*bannerWidth+"px";
	 // 2.5设置每一个li(图片)元素的宽度
	 for(var i=0;i<lis.length;i++){
		 lis[i].style.width = bannerWidth+"px";
	 }
	 
	 // 定义图片的索引
	 var index = 1;
	 
	 /* 3.设置默认的偏移 */
	 imgBox.style.left = -bannerWidth+"px";
	 
	 /* 4.当屏幕变化时，重新计算宽度*/
	 window.onresize = function(){
		 // 4.1获取banner的宽度,覆盖全局的宽度值
		 bannerWidth = banner.offsetWidth;
		 // 4.2设置图片盒子的宽度
		 imgBox.style.width = count*bannerWidth+"px";
		 // 4.3设置每一个li(图片)元素的宽度
		 for(var i=0;i<lis.length;i++){
			 lis[i].style.width = bannerWidth+"px";
		 }
		 // 4.4重新设置定位值
		 imgBox.style.left = -index*bannerWidth+"px";
	 }
	 
	 var timerId;
	 /* 5.实现自动轮播*/
	 var startTime = function(){
		timerId = setInterval(function(){
			// 5.1变换索引
			index++;
			// 5.2添加过渡效果
			imgBox.style.transition = "left 0.5s ease-in-out";
			// 5.3设置偏移
			imgBox.style.left = (-index*bannerWidth)+"px";
			// 5.4判断是否到最后一张，如果是则将索引返回第一张
			/* 由于if和上面的偏移是同时进行的，因此当index=count-1时，会直接执行if里面的代码，这么一来从最后一张到第一张将会是跳跃式的。因此这里应该使用延时器 */
			setTimeout(function(){
				if(index==count-1){
					// console.log(index);
					index=1;
					imgBox.style.transition = "none";
					imgBox.style.left=(-index*bannerWidth)+"px";
				}
			},500);

		},1000);
	 }
	 startTime();
	 
	 /* 6.实现手动轮播*/
	 var startX,moveX,distanceX;
	 // 为轮播添加触摸事件——触摸开始事件
	 imgBox.addEventListener("touchstart",function(e){
		 // 清除定时器
		 clearInterval(timerId);
		 // 获取当前触摸点的起始位置
		 startX = e.targetTouches[0].clientX;
	 });
	 // 触摸移动持续事件
	 imgBox.addEventListener("touchmove",function(e){
		 // 记录触摸点在移动中的坐标
		 moveX = e.targetTouches[0].clientX;
		 // 计算坐标的差异
		 distanceX = moveX-startX;
		 // 为了保证效果正常，将之前可能添加的过渡样式清除
		 imgBox.style.transition = "none";
		 // 实现元素的偏移，left参照最原始的坐标
		 // 重大细节：本次的滑动操作应当基于之前轮播图已经偏移的距离
		 imgBox.style.left = (-index*bannerWidth)+distanceX+"px";
	 });
	 // 触摸结束事件
	 imgBox.addEventListener("touchend",function(e){
		 // 获取当前滑动的距离，判断距离是否超出指定的100px范围,若超出则翻页，否则回弹
		 if(Math.abs(distanceX) > 100){
			 // 判断滑动的方向
			 if(distanceX > 0){
				 // 上一张
				 index--;
			 }
			 else{
				 // 下一张
				 index++;
			 }
			 // 实现翻页
			 imgBox.style.transition = "left 0.5s ease-in-out";
			 imgBox.style.left = -index*bannerWidth+"px";
		 }
		 else if(Math.abs(distanceX > 0)){
			 // 回弹
			 imgBox.style.transition = "let 0.5s ease-in-out";
			 imgBox.style.left = -index*bannerWidth+"px";
		 }
		 // 重新打开定时器
		 startTime();
	 });
	 
	 // webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕,当一个元素的过渡效果执行完毕的时候,会触发这个事件
	 imgBox.addEventListener("webkitTransitionEnd",function(){
		 if(index==count-1){
			 index=1;
			 imgBox.style.transition = "none";
			 imgBox.style.left = -index*bannerWidth+"px";
		 }
		 else if(index==0){
			 index = count-2;
			 imgBox.style.transition = "none";
			 imgBox.style.left = -index*bannerWidth+"px";
		 }
	 });
}