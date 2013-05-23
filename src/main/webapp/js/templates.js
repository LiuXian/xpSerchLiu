Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-EaselJSForceClusterSlider ---
Handlebars.templates['tmpl-EaselJSForceClusterSlider'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaselJSForceClusterSlider easelJSContainer\">\n		<div class=\"clusterChart\"></div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-EaselJSForceClusterSliderLiu ---
Handlebars.templates['tmpl-EaselJSForceClusterSliderLiu'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"EaselJSForceClusterSliderLiu easelJSContainer\">\n		<div class=\"clusterChart\"></div>\n		<div class=\"contact-info\"></div>\n	</div>";}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n	    </div>\n	    <div class=\"MainScreen-main\">\n	    </div>\n    </div>";}
);

// template --- tmpl-ReportHeader ---
Handlebars.templates['tmpl-ReportHeader'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ReportHeader\">\n		<div class=\"navbar navbar-inverse\" style=\"position: static;\">\n        	<div class=\"navbar-inner\">\n            	<div class=\"container\">\n                  	<a class=\"brand\" href=\"#\">ContactCluster Demo</a>\n                  	<div class=\"nav-collapse collapse navbar-inverse-collapse\">\n                    	<ul class=\"nav\">\n                    	<li data-nav=\"UserCluter\" class=\"nav-item easeljsPart active\"><a href=\"#\">User Cluster</a></li>\n                    	<li data-nav=\"EaselJSForceClusterSliderLiu\" class=\"nav-item easeljsPart\"><a href=\"#\">EaselJSForceClusterSliderLiu</a></li>\n                    	</ul>\n                  	</div><!-- /.nav-collapse -->\n                </div>\n            </div><!-- /navbar-inner -->\n        </div><!-- /navbar -->\n        <div class=\"ControlBar\">\n        	<div class=\"toolItems\">\n				<div class=\"toolbar-item\">\n					<label>Level: </label> \n					<div class=\"toolbar-item-content showLevel\">\n						<input type=\"text\" class=\"span2\" data-slider-min=\"1\" data-slider-max=\"4\" data-slider-value=\"2\" value=\"2\" id=\"sl1\" >\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Zoom: </label> \n					<div class=\"toolbar-item-content zoom\">\n						<input type=\"text\" class=\"span2\" data-slider-min=\"40\" data-slider-max=\"200\" data-slider-value=\"100\" data-slider-step=\"20\" value=\"100\" id=\"sl2\" >\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Speed: </label> \n					<div class=\"toolbar-item-content speed\">\n						<input type=\"text\" class=\"span1\" value=\"500\" onKeypress=\"if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;\">\n					</div>\n				</div>\n				<div class=\"toolbar-item\">\n					<label>Use RAF: </label> \n					<div class=\"toolbar-item-content useRAF\">\n						<input type=\"checkbox\" checked=\"true\"/>\n					</div>\n				</div>\n			</div>\n        </div>\n	</div>";}
);
