var w,h,className;
function getSrceenWH(){
	
	w = $(window).width();
	h = $(window).height();
	$('#dialogBg').width(w).height(h);
	$('#wrapper').width(w).height(h);
}

window.onresize = function(){  
	getSrceenWH();
}  
$(window).resize();  

$(function(){

	 	$('#tip4').tipso(
			{
				background:'tomato',
				position:'right'
			});
	   	$('#tip3').tipso(
			{
				background:'tomato',
				position:'right'
			});

	getSrceenWH();
	
	//显示弹框
	$('.box a').click(function(){
		className = $(this).attr('class');
		$('#dialogBg').fadeIn(300);
		$('#dialog').removeAttr('class').addClass('animated '+className+'').fadeIn();
	});
	
	//关闭弹窗
	$('.claseDialogBtn').click(function(){
		$('#dialogBg').fadeOut(300,function(){
			$('#dialog').addClass('bounceOutUp').fadeOut();
		});
	});
});