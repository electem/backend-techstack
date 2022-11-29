// FNC for detecting for click outside of any elements ============== 
$.fn.clickOff = function(callback, selfDestroy) {
		var clicked = false;
		var parent = this;
		var destroy = selfDestroy || true;
		
		parent.click(function() {
			clicked = true;
		});
		
		$(document).click(function(event) { 
			if (!clicked) {
				callback(parent, event);
			}
			if (destroy) {
			};
			clicked = false;
		});
	};
	
/** 
 * PrimeFaces Spark Layout
 */
var Spark = {
    
    init: function() {
        this.menubar = $('#layout-menu');
        this.topmenu = $('#layout-topbar-menu');
        this.menumask = $('#menu-mask');
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        var $this = this;
        
        //main menu
        this.menubar.find('a').click(function() {
            var link = $(this);

            if(link.next().hasClass('openSubMenu')) {
                link.next().removeClass('openSubMenu');
                $this.menubarActive = false;
            }
            else {
                link.parent().parent().find('ul.openSubMenu').removeClass('openSubMenu');
                link.next('.submenu').addClass('openSubMenu');
                $this.menubarActive = true;
            }
        });
        
        this.menubar.find('> li > a').on('mouseenter', function() {
            if($this.menubarActive && document.documentElement.clientWidth > 960) {
                var link = $(this);
                link.parent().parent().find('ul.openSubMenu').removeClass('openSubMenu');
                link.next('.submenu').addClass('openSubMenu');
            }
        });
        
        this.menubar.find('li').clickOff(function() {
            $this.menubar.find('> li > ul').removeClass('openSubMenu');
            $this.menubarActive = false;
        });
        
        //topbar
        this.topmenu.find('a').click(function() {
            var link = $(this);
            
            if(link.next().hasClass('openSubMenu')) {
                link.next().removeClass('openSubMenu');
                $this.topmenuActive = false;
            }
            else {
                $this.topmenu.find('> li > ul.openSubMenu').removeClass('openSubMenu');
                link.next('.submenu').addClass('openSubMenu');
                $this.topmenuActive = true;
            }
        });
        
        this.topmenu.find('> li > a').on('mouseenter', function() {
            if($this.topmenuActive && document.documentElement.clientWidth > 960) {
                var link = $(this);
                $this.topmenu.find('> li > ul.openSubMenu').removeClass('openSubMenu');
                link.next('.submenu').addClass('openSubMenu');
            }
        });

        this.topmenu.find('li').clickOff(function() {
            $this.topmenu.find('> li > ul').removeClass('openSubMenu');
            $this.topmenuActive = false;
        });
        
        $('#mobile-menu-button-gray').click(function(e){
            if($this.topmenu.is(':hidden')) {
                $this.menubar.hide();
                $this.topmenu.show();
                $this.menumask.addClass('menu-mask-open');
            }
            else {
                $this.topmenu.hide();
                $this.menumask.removeClass('menu-mask-open');
            }
            
            e.preventDefault();
        });

        // mobile mode main menu open
        $('#mobile-menu-button').click(function(e) {
            if($this.menubar.is(':hidden')) {
                $this.menubar.show();
                $this.topmenu.hide();
                $this.menumask.addClass('menu-mask-open');
            }
            else {
                $this.menubar.hide();
                $this.menumask.removeClass('menu-mask-open');
            }
            
            e.preventDefault();
        });

        // closing all menus
        $('#menu-mask').click(function(){
            $this.menubar.hide();
            $this.topmenu.hide();
            $this.menumask.removeClass('menu-mask-open');
        });
    }
    
};

$(function() {
    Spark.init();
});
