(function($){
	var _colors = ["#0B95B1","#ff7f0e","#aec7e8","#dddddd"];
	var _baseLineLen = [180,80,40,10];
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
        	var $e = view.$el;
        	view.level = $e.closest(".MainScreen").find(".ControlBar #sl1").val();        	
        	var scaleVal = $e.closest(".MainScreen").find(".ControlBar #sl2").val();
          	view.scaleVal = scaleVal/100;
          	$.ajax({
          		url:'/getUsers',
          		dataType:'json',
          		type:'Get',
          		data:{
          				id :10,
	          			level:view.level
	          		 },
          		success:function(data){
          			showView.call(view,data);
          		}
          	});
        },
        docEvents:  {
			"DO_LEVEL_CHANGE": function(event,extra){
				var view = this;
				
				view.level = extra.level;
				console.log(view.level);
				$.ajax({
	          		url:'/getUsers',
	          		dataType:'json',
	          		type:'Get',
	          		data:{
	          				id :10,
		          			level:view.level
		          		 },
	          		success:function(data){
	          			showView.call(view,data);
	          		}
	          	});
			},
			"DO_ZOOM_CHANGE": function(event,extra){
				var view = this;
				view.scaleVal = extra.scaleVal;
				zoomController.call(view, extra.scaleVal);
			}
        }
	});
	function showView(data){
     	var view = this;
     	var $e = view.$el;
     	var level = view.level;
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
		var color = _colors[view.level - level];
		var centerNode = app.shapes.drawCenterNode.call(view,view.originPoint.x,view.originPoint.y,r,color,view.level);
		var name = app.shapes.showText.call(view,view.originPoint.x,view.originPoint.y,view.rootName);
		
		var container = new createjs.Container();
		view.container = container;
		var currentContainerName = "containerName";
		view.currentContainerName = currentContainerName;
		view.container.name = currentContainerName;
		view.container.addChild(centerNode,name);
		stage.addChild(container);		
		data.cx = view.originPoint.x;
		data.cy = view.originPoint.y;
		showChildNode.call(view,data,level);
		stage.update(); 
     }
	 function showChildNode(parentNode,level){
		var view = this;
		if(level==0){
			return false;
		}
		var px = parentNode.cx;
		var py = parentNode.cy;
		var length = parentNode.children.length;
		if(length>0){
			var angle = 2*Math.PI/parentNode.children.length;
		}
		$.each(parentNode.children,function(i,node){
			var baseLineLength = _baseLineLen[view.level - level];
			var x = px+baseLineLength*Math.cos(i*angle);
			var y = py+baseLineLength*Math.sin(i*angle);
			var color = _colors[view.level - level];
			var name = app.shapes.showText.call(view,x,y,node.name);
			var childNode = app.shapes.drawChildNode.call(view,x,y,5,color,view.level);
			var line = app.shapes.drawLine.call(view,px,py,x,y,color,view.level);
			
			view.container.addChild(childNode,line,name);
			view.stage.addChild(view.container);
			node.cx = x;
			node.cy = y;
			if(level>0){
				showChildNode.call(view,node,level-1);				
			}
		});				
	 }
	 function zoomController(val){
			var view = this;
			var stage = view.stage;
			var containerLayout = stage.getChildByName(view.currentContainerName);
			var scaleVal = val || view.scaleVal;
			containerLayout.scaleX = scaleVal; 
			containerLayout.scaleY = scaleVal; 
			containerLayout.x = (1-scaleVal) * view.originPoint.x; 
			containerLayout.y = (1-scaleVal) * view.originPoint.y; 
			stage.update();
		}
})(jQuery);