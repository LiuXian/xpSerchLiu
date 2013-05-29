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
          				userId :9,
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
				$.ajax({
	          		url:'/getUsers',
	          		dataType:'json',
	          		type:'Get',
	          		data:{
	          				userId :9,
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
		
		var canvas = $e.find(".ClusterChart-canvas")[0];
		canvas.width = $e.parent().width();
  		canvas.height = $e.parent().height();
  		
  		view.canvasW = canvas.width;
  		view.canvasH = canvas.height;
  		view.originPoint = {x:view.canvasW/2, y: view.canvasH/2};
  		
		var stage = new createjs.Stage(canvas);
		view.stage = stage;
		data.cx = view.originPoint.x;
		data.cy = view.originPoint.y;
		var container = createContanier.call(view,data);
		container.name = view.currentContainerName;
		container.alpha = 1;
		stage.addChild(container);					
		stage.update(); 
		
		
     }
	 function showChildNode(parentNode,container,level,exAngle){
		var view = this;
		var r = 5;
		var stage = view.stage;
		if(level==0){
			return false;
		}
		var px = parentNode.cx;
		var py = parentNode.cy;
		var childrenData = parentNode.children;
		if(!childrenData){
			return ;
		}
		var angle = (parentNode.angleVal? parentNode.angleVal:0)+(level==view.level?exAngle:0);
		childHandle.call(view,parentNode);
		var fpos = calculateChildPosition.call(view,childrenData,parentNode,level,angle);
		$.each(childrenData,function(i,node){
			var baseLineLength = _baseLineLen[view.level - level];
			var cData = childrenData[i];
			if(parentNode.parentId == cData.id){
				return ;
			}
			//
			var x = fpos[i].x;
			var y = fpos[i].y;
			var color = _colors[view.level - level];
			var name = app.shapes.showText.call(view,x,y,node.name);
			
			node.angleVal =  fpos[i].angleVal;
			var line = app.shapes.drawLine.call(view,px-(r-1)*Math.cos(Math.PI-node.angleVal),py+(r-1)*Math.sin(Math.PI-node.angleVal),x-(r-1)*Math.cos(node.angleVal),y-(r-1)*Math.sin(node.angleVal),color,view.level);
			var childNode = app.shapes.drawChildNode.call(view,x,y,r,color,view.level);
			childNode.uid = node.id;
			childNode.angleVal = fpos[i].angleVal;
			childNode.addEventListener("click", function(n){clickEvent.call(view,n)});
			container.addChild(childNode,line,name);
			view.stage.addChild(view.container);
			
			childNode.addEventListener("mouseover", function(n){mouseoverEvent.call(view,n)});
			childNode.addEventListener("mouseout", function(n){mouseoutEvent.call(view,n)});
			node.cx = x;
			node.cy = y;
			if(level>0){
				showChildNode.call(view,node,container,level-1);	
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
	 function clickEvent(n){
		var view = this;
		var stage = view.stage;
		view.oldRootName = view.rootName;
	    view.rootName = n.target.name;
	    var rx = view.originPoint.x;
	    var ry = view.originPoint.y;
	    var statLayout = stage.getChildByName(view.currentContainerName);
	    var oldCenterNode = statLayout.getChildByName(view.cName);
	    statLayout.removeChild(oldCenterNode);
	    var newCenterNode = new createjs.Shape();
	    var color = _colors[0];
	    
	    var newCenterNode = app.shapes.drawCenterNode.call(view, n.target.x, n.target.y, color, view.level);
	    statLayout.removeChild(n.target);
	    $.ajax({
      		url:'/getUsers',
      		dataType:'json',
      		type:'Get',
      		data:{
      				userId :n.target.uid,
      				
          			level:view.level
          		 },
      		success:function(data){
      			data.cx = view.originPoint.x;
      			data.cy = view.originPoint.y;
      			console.log(data.children);
      			console.log(n.target.uid);
      			data.children = transformDataFirst.call(view,data.children,n.target.uid);
      			console.log(data.children);
      			var container = createContanier.call(view,data,Math.PI+n.target.angleVal);
      			view.stage.addChild(container);
      			var ox = -(n.stageX - rx);
      			var oy = -(n.stageY - ry);
      			createjs.Ticker.addEventListener("tick", view.stage);
      			createjs.Tween.get(statLayout).to({alpha : 0,x:ox,y:oy}, 1000,createjs.Ease.quartInOut); 
      			container.alpha = 0;
      			container.x = -ox;
      			container.y = -oy;
      			createjs.Tween.get(container).to({alpha : 1,x:0,y:0}, 1000,createjs.Ease.quartInOut).call(function(){
      				stage.update();
      				container.name = view.currentContainerName;
      				view.stage.removeChild(statLayout);
      			})
      		}
      	});
	 }
	 function mouseoverEvent(evt){
		var view = this;
	    var stage = view.stage;
	    var target = evt.target;
	    
	    var $contactInfo = view.$el.find(".contact-info");
	    $contactInfo.html('<span class="label label-info">Name: '+target.name+'</span>')
		$contactInfo.css("top",target.y+10);
		$contactInfo.css("left",target.x+10);
		$contactInfo.css("opacity",1);
	 }
	
	 function mouseoutEvent(evt){
		var view = this;
	    $contactInfo = view.$el.find(".contact-info").empty();
	 }
	 function createContanier(data,exAngle){
		var view = this;
		var r = 5;
		var color = _colors[0];
		if(!exAngle){
			exAngle = 0;
		}
		var centerNode = app.shapes.drawCenterNode.call(view,view.originPoint.x,view.originPoint.y,r,color,view.level);
		centerNode.name = view.cName;
		var name = app.shapes.showText.call(view,view.originPoint.x,view.originPoint.y,view.rootName);
		var container = new createjs.Container();
		container.addChild(centerNode);
		container.name = view.newContainerName;
		showChildNode.call(view,data,container,view.level,exAngle);
		
		return container;
	 }
	 function idSort(a,b){
			return a.id>b.id ? 1 :-1;
	 }
	 function calculateChildPosition(childrenData,parentNode,level,exAngle){
		 exAngle = exAngle || 0;
		 if(level==1){
		 }
 		var view = this;
 		var rx = parentNode.cx;
		var ry = parentNode.cy;
		var baseLineLen = _baseLineLen[view.level - level];
		var angle = 2*Math.PI/childrenData.length ;
		if(parentNode.parentId){
			angle = 2*Math.PI/(childrenData.length+1) ;
		}
 		var fpos = [];
 		for(var i = 0; i < childrenData.length; i++){
	        var cData = childrenData[i];
	        var l = baseLineLen;
	        var cx = rx + l * Math.cos(angle * (i+1)+exAngle+Math.PI);
	        var cy = ry + l * Math.sin(angle * (i+1)+exAngle+Math.PI );
	        fpos.push({x:cx, y:cy, angleVal:(angle * (i+1)+exAngle +Math.PI)});
	    }
		return fpos;
 	 }
	 function childHandle(nodeData){
		var view = this;
		
		
		if(!nodeData.children){
			return ;
		}
		$.each(nodeData.children,function(index,cData){	
			
			if(cData&&nodeData.parentId == cData.id){
				nodeData.children.splice(index,1);
			}
		});
	 }
	 
	function transformDataFirst(dataSet,id){ 
		var children = [];
		var index = 0;
		$.each(dataSet,function(i,it){
			if(it.id==id) index = i;
		});
		children  = children.concat(dataSet.slice(index,index+1)).concat(dataSet.slice(0,index)).concat(dataSet.slice(index+1));
		return children;
	}
})(jQuery);