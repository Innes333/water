(function() {
 
})();

$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			mobButton: $('.mob-button'),
			slider: $('.slider'),
			mineralSlider: $('.elements-slider'),
			partnersSlider: $('.partners-slider'),
			inputNumber: $('.input-number'),
			minBag: $('.dropdown-mini-bag'),	
			bagBtn: $('.shop-cart'),
			mineralOwlOptions: {
				autoPlay: false,
				navigation: false,
				singleItem: true,	
				pagination: true,
				scrollPerPage: true							
			},
			partnersOwlOptions: {
				autoPlay: false,
				navigation: false,
				pagination: true,
				scrollPerPage: true,
				items: 4					
			}
		},
		owlSetPaginName: function(slider){
			var items = slider.find('.owl-item > .item');
			var pagin = slider.find('.owl-pagination > .owl-page');			
			for(var i = 0; i < items.length; i++){
				$(pagin[i]).html($(items[i]).data('name'));
			};
		},
		inputNumber: function(el) {
			var min = el.attr('min') || false;
			var max = el.attr('max') || false;			
			el.prev().on('click', decrement);
			el.next().on('click', increment);
			function decrement(e) {
				var el = $(e.target).next();
				var value = el[0].value;
				value--;
				if(!min || value >= min){
					el[0].value = value;
					el.trigger('change');
				};
			}
			function increment(e) {
				var el = $(e.target).prev();
				var value = el[0].value;
				value++;
				if(!max || value <= max){
					el[0].value = value++;
					el.trigger('change');
				};
			}
		},
		tabs: function(el){
			var linc = el.find('.tab-link'),
					tab  = el.find('.tab'),
					dataShow;
			linc.on('click',function(){
				dataShow = $(this).data('show');
				linc.removeClass('active');
				$(this).addClass('active');

				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},
		popup: function(el){
			el.on('click',function(event){
				event.preventDefault();		
				var show = $(this).data('show'),
						pop  = $('#'+ show);

				pop.fadeIn(600)
				.css('height', $(window).height() + 'px')
				.find('.popup-content')
				.removeClass('anim')
				.append('<span class="fade_out">&#9587;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});
			});
		},

		toggleC: function(el){
			el.on('click',function(){
				el.toggleClass('active');
			});
		},

		winH: function(){
			return this.opt.wind.height();
		},

		fullHeight: function(el){
			$(el).css('min-height',this.winH()+'px');
		},

		dragstart: function(el){
			$(el).on('dragstart',function(event){
				event.preventDefault();
			});
		},

		dropDown: function(btn, el) {
			$(btn).on('click', function() {
				$(el).not($(this).next()).slideUp('fast');
				$(this).next().slideToggle('fast');
			});
		},

		showMiniBag: function(btn, bag) {
			btn.on('mouseover', function() {
				bag.fadeIn(300);
			});

			bag.on('mouseleave', function(){
				bag.fadeOut(800);
			});
		},

		fillValue: function(input) {
			input.on('keyup', function(e){
				e.target.value.length > 0 && this.setAttribute('value', e.target.value);
			});
		},

		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// tabs init
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			// Add el window height
			this.fullHeight(this.opt.body);
			// show mini bag
			// this.showMiniBag(this.opt.bagBtn, this.opt.minBag);
			//owl slider init
			this.opt.mineralSlider.owlCarousel(this.opt.mineralOwlOptions);
			this.owlSetPaginName(this.opt.mineralSlider);
			// owl partners slider
			this.opt.partnersSlider.owlCarousel(this.opt.partnersOwlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);

			this.inputNumber(this.opt.inputNumber);

			this.fillValue($('input'));

			this.dropDown('.question-title', '.answer');
		}
	};

	$(document).ready(function(){

		main.init();

		//Shop add product count--------
		// $('.le-quantity button').click(function(e){
		// 		// e.preventDefault();
		// 		var elem = $(this).parents('form').find('input.counter');
		// 		var currentQty= elem.val();
		// 		if($(this).hasClass('minus') && currentQty > 0){
		// 			 elem.val(currentQty-1);
		// 			 elem.trigger('change');
		// 		}else	if($(this).hasClass('plus')){
		// 			elem.val(currentQty-0+1);
		// 			elem.trigger('change');
		// 		}
		// });
		//Shop add product count--------

		//Ajax mini cart----------------
		$(document).on('mouseenter', '#dropdown-cart', function(e) {
			e.preventDefault();
			$.ajax({  
				type: "POST",
				url: $(this).attr('data-url'), 
				data: {parent: '[[*id]]'},
				success:  function(data) { 
					if (data){
						$('.dropdown-mini-cart').html(data);
					}else{
						miniShop2.Message.error('Что-то пошло не так, попробуйте позже!');
					}} 
			}); 
		 });
		//Ajax mini cart----------------

		//E-mail Ajax Send--------------
		$("form.send").submit(function() { 
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize()
			}).done(function() {
				alert("Thank you!");
				setTimeout(function() {
					th.trigger("reset");
				}, 1000);
			});
			return false;
		});
		//E-mail Ajax Send--------------

		//Chrome Smooth Scroll----------
		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {

		};
	});
});
