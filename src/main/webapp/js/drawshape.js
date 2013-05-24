(function($){
	drawshape = {};
//	var _colors = ["#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
	var _baseLineLen = [80,40,20,10];
	var view = this;
	drawshape.drawLine = function(x0, y0, x1, y1,color,level){ //drawLine
//		var color = _colors[level];
		var line = new createjs.Shape();
	    line.graphics.beginStroke(color).moveTo(x0, y0).lineTo(x1, y1);
	    var container = new createjs.Container();
		container.addChild(line);
	    return container;
	}
	
	drawshape.drawChildNode = function(x,y,r,color,level){ //drawChildNode
		var childNode = new createjs.Shape();
//		var color = _colors[level];
		childNode.graphics.beginFill(color).drawCircle(x,y,r-1);
		var container = new createjs.Container();
		container.addChild(childNode);
	    return container;
		
	}
	
	drawshape.drawCenterNode = function(x,y,r,color,level){ //draw the center node
		var centerNode = new createjs.Shape();
//		var color = _colors[level];
		centerNode.graphics.beginFill("#a4998e").drawCircle(x,y,r);
		centerNode.graphics.beginFill(color).drawCircle(x,y,r-1);		
		var container = new createjs.Container();
		container.addChild(centerNode);
	    return container;
	}
	drawshape.showText = function(x,y,name){
		var text = new createjs.Text(name, "10px Arial, #888");
  		text.x = x - 12;
  		text.y = y + 12;
  		return text;
	}
	
	
})(jQuery);