(function($){
	app.shapes = {};
	var view = this;
	app.shapes.drawLine = function(x0, y0, x1, y1,color,level){ //drawLine
		var line = new createjs.Shape();
	    line.graphics.beginStroke(color).moveTo(x0, y0).lineTo(x1, y1);
	    var container = new createjs.Container();
		container.addChild(line);
	    return container;
	}
	
	app.shapes.drawChildNode = function(x,y,r,color,level){ //drawChildNode
		var childNode = new createjs.Shape();
		childNode.graphics.beginFill(color).drawCircle(x,y,r-1);
		var container = new createjs.Container();
		container.addChild(childNode);
	    return container;
		
	}
	
	app.shapes.drawCenterNode = function(x,y,r,color,level){ //draw the center node
		var centerNode = new createjs.Shape();
		centerNode.graphics.beginFill("#a4998e").drawCircle(x,y,r);
		centerNode.graphics.beginFill(color).drawCircle(x,y,r-1);		
		var container = new createjs.Container();
		container.addChild(centerNode);
	    return container;
	}
	app.shapes.showText = function(x,y,name){
		var text = new createjs.Text(name, "10px Arial, #888");
  		text.x = x - 12;
  		text.y = y + 12;
  		return text;
	}
	
	
})(jQuery);