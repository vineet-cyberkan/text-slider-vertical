var wahhao = window.wahhao || {};
//var userData = [], dc = '#dataCont', child, childH, childC, dcI, item, activeSlideH, topPos, newTop, currentIndex = 0;
var userData = [], dCont = '#dataCont';
var dc, child, childH, childC, dcI, item, activeSlideH, topPos, newTop, currentIndex = 0; //slider var

(function (window, document, $, wahhao) {
	wahhao.guess = {
		init: function(options){
			var defaults = {};
			this.options = $.extend(defaults, options);
			wahhao.guess.dataRequest();
		},

		dataRequest: function(){
			wahhao.guess.pageLoaderShow();
			$.ajax({
	            url: 'http://localhost/wahhao/guess_api.json',
	            type: 'GET',
	            contentType: 'application/json',
	            dataType: 'json',

	            success: function success(productsData) {
					//console.log(productsData.status)
					if (productsData.status == true && productsData.response.game.length > 0  ) {
						var products = userData = productsData.response.game;
						wahhao.guess.renderData(userData);
					}
	            },

	            complete: function() {
	                wahhao.guess.pageLoaderRemove();
	            }
        	});
			
		},

		pageLoaderShow: function() {
	        $('body').append('<div class="ajax-loader" style="" ></div>')
	    },

	    pageLoaderRemove: function() {
	        $('body>.ajax-loader').remove();
	    },

	    renderData: function(userData){
	    	if (userData.length > 0 ) {
	    		$(dCont).empty();
	    		var li = '';
	    		for ( var x in userData ){
	    			var p = '', u = '', filteredDataNode = userData[x];
	    			for ( var nodes in filteredDataNode) {
	    				if (nodes == "username") {
	    					u = filteredDataNode[nodes];
	    				}
	    				if (nodes == "guessed_price") {
	    					p = "<strong>guessed ₹"+filteredDataNode[nodes]+"</strong>";
	    				}
	    			}
	    			li += '<li>'+u+" "+p+' img</li>';
	    		}
	    		$(dCont).append(li);
	    		wahhao.guess.verticalSlide(dCont, 5);
	    	} else{

	    	}
	    },

	    verticalSlide: function(dCont, showItems) {
	    	dc = $(dCont);
	    	child = dc.find('li');
	    	childH = child.outerHeight();
	    	childHC = child.length;
	    	dcI = childH*showItems;
	    	dc.css({
	    		"height":dcI,
	    		"top":dcI - childH,
	    	});

			wahhao.guess.autoSlide();

	    },

	    animateItems: function(){
			item = child.eq(currentIndex);
			child.removeClass('active_user')
			item.addClass('active_user');
			activeSlideH = item.outerHeight();
			topPos = dc.css('top');
			newTop = parseInt(topPos) - parseInt(activeSlideH);
			//dc.css('top', newTop+'px');
			dc.animate({
				top: newTop+'px'
			}, 200)
	    },

	    autoSlide : function(){
	    	var autoSlide = setInterval(function() {
			  currentIndex += 1;
			  if (currentIndex > childHC - 1) {
			    //currentIndex = 0;
			    clearInterval(autoSlide);
			    wahhao.guess.resetAndUpdateSlide();
			  } else {
			  	wahhao.guess.animateItems();
			  }
			  console.log(currentIndex);
			}, 3000);
	    },

	    resetAndUpdateSlide : function(){
	    	currentIndex = 0;
	    	//wahhao.guess.renderData(userData);
	    	wahhao.guess.dataRequest();
	    }

	}
})(window, document, jQuery, wahhao);

window.onload = function(){
	if ($(dCont).length) {
		wahhao.guess.init();
	}
}

window.onresize = function(){
	
}





