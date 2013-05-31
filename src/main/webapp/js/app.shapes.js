(function($){
	app.shapes = {};
	app.shapes.drawLine = function(x0, y0, x1, y1,color,level){ //drawLine
		var line = new createjs.Shape();
	    line.graphics.beginStroke(color).moveTo(x0, y0).lineTo(x1, y1);
	    var container = new createjs.Container();
		container.addChild(line);
		line.x0 = x0;
		line.y0 = y0;
		line.x1 = x1;
		line.y1 = y1;
		line.color = color;
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
	app.shapes.reDrawLine = function(lineContainer,offsetX,offsetY) {
		var line = lineContainer.children[0];
        var lineClone = {x0:line.x0, y0:line.y0, x1:line.x1, y1:line.y1};
        line.graphics.clear().beginStroke(line.color).moveTo(lineClone.x0, lineClone.y0).lineTo(lineClone.x1+offsetX,lineClone.y1+ offsetY);
        line.x1 = lineClone.x1+offsetX;
        line.y1 = lineClone.y1+ offsetY;
	}
	
	
})(jQuery);