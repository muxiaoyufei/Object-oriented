/**
 * 限制边界的拖拽，继承自Drag
 * @param {Object} id
 */
function DragLimit(id){
	Drag.call(this,id);
}
//继承方法
for(var p in Drag.prototype){
	DragLimit.prototype[p] = Drag.prototype[p];
}

/**
 * 覆写父类的鼠标移动方法，控制不能移出边界
 */
DragLimit.prototype.fnMove = function(ev){
	var oEvent = ev || event;
	
	var left = oEvent.clientX - this.disX;
	var top = oEvent.clientY - this.disY;

	// 控制边界
	if(left < 0){
		left = 0;
	}else if(left > document.documentElement.clientWidth-this.oBox.offsetWidth){
		left = document.documentElement.clientWidth-this.oBox.offsetWidth;
	}
	if(top <=0){
		top = 0;
	}else if(top > document.documentElement.clientHeight-this.oBox.offsetHeight){
		top = document.documentElement.clientHeight-this.oBox.offsetHeight;
	}

	this.oBox.style.left = left + 'px';
	this.oBox.style.top = top + 'px';
}