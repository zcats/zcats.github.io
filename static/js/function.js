(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 
	
	/* Preloader Effect */
	$window.on( "load", function(){
		$(".preloader").fadeOut(1000);
		add_sticky_class();
    });
	
	/* Sticky header */
	$window.scroll(function(){
    	add_sticky_class();
	});
	
	function add_sticky_class(){
		if ($window.scrollTop() > 100) {
			$('.header-layout-1').addClass('sticky-header');
		} else {
			$('.header-layout-1').removeClass('sticky-header');
		}
	}
	
	/* Top Menu */
	$('nav').coreNavigation({
		menuPosition: 'right',
		mode: 'fixed',
		container: true,
		dataMinusOffset:70
	});
	
	/* Scroll to section */
	$(document).on('click','.smoothscroll',function(){
		
		if($(this).hasClass("has-popup")) return false;
		var id = $(this).attr('href');
		if($(id).length) {
			var h = parseFloat($(id).offset().top);
			$('body,html').stop().animate({
				scrollTop: h - 70
			}, 800);
			return false;
		}
		
	});
	
	/* Pop up page*/
	var $haspopup = $(".has-popup"); 
	if($haspopup.length){
		$haspopup.magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',	
			callbacks: {
				open: function() {
					$('html').css('margin-right', 0);
					$('html').css('overflow', 'auto');
				}
			}
			 
		});
	}
	
	/* Popup video */
	var	$popupvideo = $('.popup-video');
	if($popupvideo.length){
		$popupvideo.magnificPopup({
			type: 'iframe',
			preloader: true,
		});
	}
	
	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $("#contactForm").serialize(),
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-left mt-4 text-success";
		} else {
			var msgClasses = "h3 text-left mt-4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */
	
	/* Animate with wow js */
    new WOW({mobile:false}).init(); 
	
	
	/* Portfolio (filtering) */
	$window.on( "load", function(){
		if( $(".portfolio-boxes").length ) {
				
			/* Init Isotope */
			var $portfolio = $(".portfolio-boxes").isotope({
				itemSelector: ".portfolio-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});
				
			/* Filter items on click */
			var $portfolionav=$(".portfolio-nav li a");
				$portfolionav.on('click', function (e) { 
			
				var filterValue = $(this).attr('data-filter');
				$portfolio.isotope({
					filter: filterValue
				}); 
				
				$portfolionav.removeClass("active-portfolio"); 
				$(this).addClass("active-portfolio");
				e.preventDefault();
			});
		
			$portfolio.isotope({ filter: "*" });
		}
			
	});
	
	/* Animated Header Slider Start */
	if($('.swiper-container.banner-slider-1').length)
	{
		var swiperAnimation = new SwiperAnimation();
		var mySwiper = new Swiper('.swiper-container.banner-slider-1', {
			effect: 'fade',
			loop: true,
			speed: 2000,
			autoplay: {
				delay: 6000
			},
			navigation: {
				nextEl: '.banner-button-next',
				prevEl: '.banner-button-prev',
			},
			on: {
				init: function() {
					swiperAnimation.init(this).animate();
				},
				slideChange: function() {
					swiperAnimation.init(this).animate();
				}
			}
		});
	}
	
	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length)
	{
		if ($(window).width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				 offset: 0,
			});
		}
	}
	
})(jQuery);