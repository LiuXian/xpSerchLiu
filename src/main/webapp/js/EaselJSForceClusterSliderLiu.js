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
		console.log(drawshape.drawCenterNode);
		var centerNode = drawshape.drawCenterNode.call(view,view.originPoint.x,view.originPoint.y,r,"blue");
		centerNode.name = view.currentContainerName;
		stage.addChild(centerNode);
		stage.update();
     	
     }
})(jQuery);