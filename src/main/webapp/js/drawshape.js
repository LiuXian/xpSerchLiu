(function($){
	drawshape = {};
	var r = 10;
	
	drawshape.drawLine = function(x0, y0, x1, y1,color){ //drawLine
		var line = new createjs.Shape();
		var color = "black";
	    line.graphics.beginStroke(color).moveTo(x0, y0).lineTo(x1, y1);
	    var container = new createjs.Container();
		container.addChild(line);
	    return container;
		
	}
	
	drawshape.drawChildNode = function(x,y,r,color){ //drawChildNode
		var childNode = new createjs.Shape();
		var color = "blue";
		childNode.graphics.beginFill(color).drawCircle(x,y,r-1);
				
		var container = new createjs.Container();
		container.addChild(childNode);
	    return container;
		
	}
	
	drawshape.drawCenterNode = function(x,y,r,color){ //draw the center node
		var centerNode = new createjs.Shape();
		var color1 = "black";
		var color2 = "gray";
		centerNode.graphics.beginFill(color1).drawCircle(x,y,r);
		centerNode.graphics.beginFill(color2).drawCircle(x,y,r-1);
		var container = new createjs.Container();
		container.addChild(centerNode);
	    return container;
	}
	
	drawshape.showText= function (x, y, name){   //show the node'name
      	var text = new createjs.Text(name, "10px Arial, #888");
      		text.x = x - 12;
      		text.y = y + 12;
      	return text;
    }	
})(jQuery);