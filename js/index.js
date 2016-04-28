jQuery(document).ready(function($) {
	var wH = $(window).height(),
		box = $('.step-box'),
		photo = $('.photo'),
		Llogo = $('.step .l-logo'),
		MAX_STEPS = $('.js-step').length+1,
		curStep = 1,
		isScroll = false;
	/*屏幕高度计算*/
	var screenH = wH - $('header').height();
	$('.js-step,.step-box').height(screenH);
	/*整屏滚动*/
	$('.step-box').mousewheel(function (event,delta){
		if(isScroll){
			return;
		}
		if(delta==1){
			scrollUp();
		}
		if(delta==-1){
			scrollDown();
		}
	});
	$(document).on('keyup', function(event) {
		switch(event.which) {
			case 38:
			case 37:
				scrollUp();	
				break;
			case 40:
			case 39:
				scrollDown();	
				break;
		}
	});
	// 文字渐显效果
	var $txtList = $('.dec-txt-list p');
	$('.dec-box li').on('mouseenter',function(){
		var idx = $(this).index() + 1;
		console.log(idx);
		$txtList.removeClass('fadeInDown').eq(idx).addClass('fadeInDown');
	});
	$('.dec-box ul').on('mouseleave',function(evt){
		$('.dec-txt-list .dec-txt').removeClass('fadeInDown').eq(0).addClass('fadeInDown');
	});
	function scrollUp(){
		if(curStep > 1){
			curStep--;
			var toTop = -(curStep - 1)*screenH;
			if(curStep == 1){
				$('.txt-1,.txt-2').animate({left: '50%'},1000);
				photo.show('slow');
				Llogo.show().animate({top: '19%',opacity:'1'}, 700);
			}
			if (curStep == 3) {
			    //底部文字恢复
			    toTop += screenH;
			    //过滤掉第二步直接跳到第一步；
			    curStep--;
			}
			box.animate({top: toTop}, 600, function () {
			    isScroll = false;
			});
			isScroll = true;
		}
	}
	function scrollDown(){
		if(curStep < MAX_STEPS){
			curStep++;
			var toTop = -(curStep - 1)*screenH ;
			if(curStep == 2){
				$('.photo').addClass('leanup');
				$('.l-logo').find('i').addClass('leanup').end().animate({top: "-100%",opacity: "0"},1000);
				setTimeout(function(){
					$('.photo').removeClass('leanup').hide();
					$('.l-Logo').removeClass('leanup').hide();
				}, 1000);
				var txt1 = $('.txt-1');
				var txt2 = $('.txt-2');
				txt1.animate({left: txt1.offset().left - txt1.width()/2}, 1300);
				txt2.animate({left: txt2.offset().left - txt2.width()/2}, 1300,function(){
					isScroll = false;
				});
				isScroll = true;
				return false;
			}
			if(curStep > 2 && curStep <= MAX_STEPS){
				toTop += screenH;
				box.animate({top:toTop},750,function(){
					isScroll= false
				});
			}
			// alert(curStep);
			isScroll = true;
		}
	}
});