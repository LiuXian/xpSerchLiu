(function($){
	brite.registerView("EaselJSForceClusterSliderLiu",  {
		emptyParent : true,
		parent:".MainScreen-main"
	}, {
    	create:function (data, config) {
            var $html = app.render("tmpl-EaselJSForceClusterSliderLiu",{});
           	var $e = $($html);
            return $e;
        },
        postDisplay:function(data,config){
        	var view = this;
        	view.level =1;
        	var $e = view.$el;
        	var scaleVal = $e.closest(".MainScreen").find(".ControlBar #sl2").val();
          	view.scaleVal = scaleVal/100;
          	$.ajax({
          		url:'/getUsers',
          		dataType:'json',
          		type:'Get',
          		data:{
          				id :10,
	          			level:1
	          		 },
          		success:function(data){
          			console.log(data);
          			showView.call(view,data);
          		}
          	});
        }
	});
	function showView(data){
     	var view = this;
     	var $e = view.$el;
		view.currentContainerName = "currentContainer";
	    view.newContainerName = "newContainer";
	    view.cName = "centerCircle";
	    view.rootName = data.name;
	    view.uid = data.id;
		createjs.Ticker.useRAF = app.useRAF;
		createjs.Ticker.setFPS(60);
		
		var $ClusterChart = $e.find(".clusterChart");
		$ClusterChart.empty();
		$ClusterChart.html('<canvas id="ClusterChart" ></canvas>');  
		
		var canvas = $e.find("#ClusterChart")[0];
		canvas.width = $e.parent().width();
  		canvas.height = $e.parent().height();
  		
  		view.canvasW = canvas.width;
  		view.canvasH = canvas.height;
  		view.originPoint = {x:view.canvasW/2, y: view.canvasH/2};
  		
		var stage = new createjs.Stage(canvas);
		view.stage = stage;
		var r = 5;
		var centerNode = drawshape.drawCenterNode.call(view,view.originPoint.x,view.originPoint.y,r,"blue");
		centerNode.name = view.currentContainerName;
		stage.addChild(centerNode);
		data.cx = view.originPoint.x;
		data.cy = view.originPoint.y;
		showChildNode.call(view,data);
		stage.update();     	
     }
	 function showChildNode(parentNode){
		var view = this;
		var px = parentNode.cx;
		var py = parentNode.cy;
		var angle = 2*Math.PI/parentNode.children.length;
		$.each(parentNode.children,function(i,node){
			var x = px+100*Math.cos(i*angle);
			var y = py+100*Math.sin(i*angle);
			view.stage.addChild(drawshape.drawChildNode.call(view,x,y,5,"red"));
			view.stage.addChild(drawshape.drawLine.call(view,px,py,x,y,"#ccc"));
		});
		
	 }
	 function calculateNodePosition(childrenData,originPoint,level,angle){
		var view = this;
		var rx = originPoint.x;
		var ry = originPoint.y;
		var baseLineLen = _baseLineLen[view.level - level];
		var angle = Math.PI * 2 / childrenData.length ;
		var findpos = [];
      	for(var i = 0; i < childrenData.length; i++){
	        var cData = childrenData[i];
	        var l = baseLineLen;
	        var cx = nx + l * Math.sin(angle * i + angle);
	        var cy = ny + l * Math.cos(angle * i + angle);
	        findpos.push({x:cx, y:cy, angleVal:(angle * i + angle)});
	    }
		return findpos;
    }
})(jQuery);