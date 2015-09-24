  $(function(){
  	 var v_height=document.documentElement.clientHeight;
  	var v_width=document.body.scrollWidth;
  	$(".containe").width(v_width);
    $(".containe").height(v_height);
    $('a[href*=#]').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
             var targetOffset = $target.offset().top;
             $('html,body').animate({
               scrollTop: targetOffset
                   },
            1000);
             return false;
            }
        }
    });
$('.menu li span').css('opacity', '0');
    $('.menu > ul > li').hover(function () {
        $(this).find('ul').show();
        $(this).find('span:first').stop(true).animate(
    		{
    		    top: -14,
    		    opacity: 100
    		}, 100
    	);
        $(this).addClass('active');
    }, function () {
        $(this).find('ul').hide();
        $(this).find('span:first').stop(true).animate(
    		{
    		    top: 0,
    		    opacity: 0
    		}, 100
    	);
        $(this).removeClass('active');
    });
    $('.menu li li').hover(function () {
        $(this).find('span').stop(true).animate(
			{
			    top: 16,
			    opacity: 100
			}, 100
		);
    }, function () {
        $(this).find('span').stop(true).animate(
			{
			    top: 0,
			    opacity: 0
			}, 100
		);
    });
  });