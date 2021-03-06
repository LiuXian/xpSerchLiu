;(function() {

    (function ($) {
        brite.registerView("ReportHeader",  {parent:".MainScreen-header"}, {
            create:function (data, config) {
                var $html = app.render("tmpl-ReportHeader");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                view.level = view.level || 2;
                view.scaleVal = view.scaleVal || 1;
                $e.find(".ControlBar").hide();
                $e.find("li.d3jsPart").hide();
                $e.find("li.fabricjsPart").hide();
                brite.display("EaselJSForceClusterSlider");
    		  	$e.find(".ControlBar").show();
                $('#sl1').slider().off('slide').on('slide', function(ev){
                	if(view.level != ev.value){
                		view.level = ev.value;
	                	view.$el.trigger("DO_LEVEL_CHANGE",{level:ev.value});
                	}
				});
				
				$('#sl2').slider().off('slide').on('slide', function(ev){
                	var scaleVal = ev.value/100;
                	view.scaleVal = scaleVal;
                	view.$el.trigger("DO_ZOOM_CHANGE",{scaleVal:scaleVal});
				});
            },
            events:{
            	"btap;.nav li.nav-item":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $li = $(e.currentTarget);
            		$e.find("li.nav-item").removeClass("active");
            		$li.addClass("active");
            		var menu = $li.attr("data-nav");
            		
            		if(menu == "UserCluster"){
            			brite.display("EaselJSForceClusterSlider");
            		  	$e.find(".ControlBar").show();
            		  	$(".MainScreen-main").css("top","113px");
            		}else if(menu == "EaselJSForceClusterSliderLiu"){
            			brite.display("EaselJSForceClusterSliderLiu");
            		  	$e.find(".ControlBar").show();
            		  	$(".MainScreen-main").css("top","113px");
            		}
            	}
            }
        });
        
    })(jQuery);
})();