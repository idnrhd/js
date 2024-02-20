/* 
	Copyright MIT ยฉ <2013> <Nathawut Niemsuwan @ Kidkarnmai Studio co.,ltd.>
	
	$(document).ready(function () {
		$("body").kidkarnmaiPreloader({
			setPercent:setPercent,
			setPercentComplete:setPercentComplete
		});
	});
	
	function setPercent(num){
		$("body").hide();
		console.log("setPercent : "+num);
	}
	
	function setPercentComplete(){
		$("body").show();
		console.log("setPercentComplete");
	}

*/

(function($){
    $.kidkarnmaiPreloader = function(el, options,arr_images){
        var _base = this;

        _base.$el = $(el);
        _base.el = el;

        _base.$el.data("kidkarnmaiPreloader", _base);

        _base.kkmimages = [];
        _base.kkmbgimages = [];
        _base.kkmimageCounter = 0;
        _base.kkmdone = 0;
        _base.kkmdestroyed = false;

        _base.init = function(){

          arr_images = arr_images || [];
		_base.kkmimages = arr_images;

         _base.options = $.extend({},$.kidkarnmaiPreloader.defaultOptions, options);
			
            _base.findImageInElement(_base.el);
                _base.$el.find("*:not(script)").each(function() {
                    _base.findImageInElement(this);
                });
            _base.createPreloadContainer();
        };

        //the container where unbindable images will go
        _base.createPreloadContainer = function() {
            _base.kkmimageCounter = _base.kkmimages.length;
			//trace("_base.kkmimageCounter : "+ _base.kkmimageCounter);
			if(_base.kkmimages.length>0){
				for (var i = 0; _base.kkmimages.length > i; i++) {
				//trace(i+" : "+_base.kkmimages[i]);
					$.ajax({
						url: _base.kkmimages[i],
						type: 'GET',
						complete: function (data) {
							_base.addImageForPreload(_base.kkmimages[i]);
						}
					});
				}
			}
			else
			{
					_base.options.setPercentComplete();
			}
        };

        _base.addImageForPreload = function(url) {
            _base.bindLoadEvent(url);
        };

        _base.findImageInElement = function (element) {
            var url = "";
            var obj = $(element);
            var type = "normal";

            if (obj.css("background-image") != "none") {
                url = obj.css("background-image");
                type = "background";
            } else if (typeof(obj.attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") {
                url = obj.attr("src");
            }

            if (url.indexOf("gradient") == -1) {
                url = url.replace(/url\(\"/g, "");
                url = url.replace(/url\(/g, "");
                url = url.replace(/\"\)/g, "");
                url = url.replace(/\)/g, "");

                var urls = url.split(", ");

                for (var i = 0; i < urls.length; i++) {
                    if (urls[i].length > 0 && _base.kkmimages.indexOf(urls[i]) == -1 && !urls[i].match(/^(data:)/i)) {
                        var extra = "";

                        if (_base.isIE() || _base.isOpera()){
                            //filthy always no cache for IE, sorry peeps!
                            extra = "?rand=" + Math.random();
                            _base.kkmbgimages.push(urls[i] + extra);
                        } else {
                            if (type == "background") {
                                _base.kkmbgimages.push(urls[i]);
                            } else {
                              //  _base.bindLoadEvent(obj);
                            }
                        }

                        _base.kkmimages.push(urls[i]);
                    }
                }
            }
        }

        _base.isIE = function () {
            return navigator.userAgent.match(/msie/i);
        };

        _base.isOpera = function () {
            return navigator.userAgent.match(/Opera/i);
        };

        _base.bindLoadEvent = function (element) {
                _base.completeImageLoading(this);
        }

        _base.completeImageLoading = function (el) {
            _base.kkmdone++;
			//trace(_base.kkmdone +" : "+ _base.kkmimageCounter);
            var percentage = Math.round((_base.kkmdone / _base.kkmimageCounter) * 100);
           
		   _base.options.setPercent(percentage);

            if (_base.kkmdone == _base.kkmimageCounter) {
		 	  	_base.options.setPercentComplete();
            }
        };

        _base.init();
    };

 
    $.fn.kidkarnmaiPreloader = function(options,arr){
        return this.each(function(){
            (new $.kidkarnmaiPreloader(this, options,arr));
        });
    };
})(jQuery);

//HERE COMES THE IE SHITSTORM
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}