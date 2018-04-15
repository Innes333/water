(function() {
 
	window.inputNumber = function(el) {

		var min = el.attr('min') || false;
		var max = el.attr('max') || false;

		var els = {};

		els.dec = el.prev();
		els.inc = el.next();

		el.each(function() {
			init($(this));
		});

		function init(el) {

			els.dec.on('click', decrement);
			els.inc.on('click', increment);

			function decrement() {
				var value = el[0].value;
				value--;
				if(!min || value >= min) {
					el[0].value = value;
				}
			}

			function increment() {
				var value = el[0].value;
				value++;
				if(!max || value <= max) {
					el[0].value = value++;
				}
			}
		}
	}
})();

inputNumber($('.input-number'));

$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.btn.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			mobButton: $('.mob-button'),
			slider: $('.slider'),
			inputNumber: $('.input-number'),
			owlOptions: {
				autoPlay: 3000,
				navigation: true,
				singleItem: true,
				autoPlay: false,	
				pagination: true,
				scrollPerPage: true,
				navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']								
			}
		},
		inputNumber: function(el) {
			var min = el.attr('min') || false;
			var max = el.attr('max') || false;
			var els = {};
			els.dec = el.prev();
			els.inc = el.next();
			el.each(function() {
				init($(this));
			});
			function init(el) {
				els.dec.on('click', decrement);
				els.inc.on('click', increment);
				function decrement() {
					var value = el[0].value;
					value--;
					if(!min || value >= min) {
						el[0].value = value;
					}
				}
				function increment() {
					var value = el[0].value;
					value++;
					if(!max || value <= max) {
						el[0].value = value++;
					}
				}
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
			//owl slider init
			this.opt.slider.owlCarousel(this.opt.owlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);
			//
			this.inputNumber(this.opt.inputNumber);
		}
	};

	//E-mail Ajax Send
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


	$(document).ready(function(){

		main.init();

		//Chrome Smooth Scroll
		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {

		};
	});
});
