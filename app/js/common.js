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
			commentsSlider: $('.comments-slider'),
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
			},
			commentsOwlOptions: {
				autoPlay: false,
				navigation: false,
				pagination: true,
				scrollPerPage: true,
				items: 3					
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
			el.trigger('change');
			function decrement(e) {
				var el = $(e.target).next();
				var value = el[0].value;
				value--;
				if(!min || value >= min) el[0].value = value;
			}
			function increment(e) {
				var el = $(e.target).prev();
				var value = el[0].value;
				value++;
				if(!max || value <= max) el[0].value = value++;
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
				.append('<span class="fade_out">&#x2a2f;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});

				$('.popup').on('click', function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
				})
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

		fillValue: function(formEl) {
			formEl.on('change', function(e){
				this.setAttribute('value', e.target.value);
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
			// owl comments slider
			this.opt.commentsSlider.owlCarousel(this.opt.commentsOwlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);

			this.inputNumber(this.opt.inputNumber);

			this.fillValue($('input'));
			this.fillValue($('textarea'));

			this.dropDown('.question-title', '.answer');


			// Render the PayPal button
			if (document.getElementById('paypal-button-container')) {

				paypal.Button.render({
	
					env: 'sandbox', // sandbox | production
					style: {
						label: 'checkout',  // checkout | credit | pay | buynow | generic
						size:  'responsive', // small | medium | large | responsive
						shape: 'pill',   // pill | rect
						color: 'gold'   // gold | blue | silver | black
					},
			
		
					// PayPal Client IDs - replace with your own
					// Create a PayPal app: https://developer.paypal.com/developer/applications/create
					client: {
						sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
						production: '<insert production client id>'
					},
		
					// Show the buyer a 'Pay Now' button in the checkout flow
					commit: true,
		
					// payment() is called when the button is clicked
					payment: function(data, actions) {
		
						// Make a call to the REST api to create the payment
						return actions.payment.create({
							payment: {
								transactions: [
									{
									  amount: {
										"total": "30.11",
										"currency": "USD",
										"details": {
										  "subtotal": "30.00",
										  "tax": "0.07",
										  "shipping": "0.03",
										  "handling_fee": "1.00",
										  "insurance": "0.01",
										  "shipping_discount": "-1.00"
										}
									  },
									  "description": "This is the payment transaction description.",
									  "item_list": {
										"items": [
										  {
											"name": "hat",
											"sku": "1",
											"price": "3.00",
											"currency": "USD",
											"quantity": "5",
											"description": "Brown color hat",
											"tax": "0.01"
										  },
										  {
											"name": "handbag",
											"sku": "product34",
											"price": "15.00",
											"currency": "USD",
											"quantity": "1",
											"description": "Black color handbag",
											"tax": "0.02"
										  }
										],
										shipping_address: {
										  "recipient_name": "HelloWorld",
										  "line1": "4thFloor",
										  "line2": "unit#34",
										  "city": "SAn Jose",
										  "state": "CA",
										  "phone": "011862212345678",
										  "postal_code": "95131",
										  "country_code": "US"
										}
									  }
									}
								],
							}
						});
					},
		
					// onAuthorize() is called when the buyer approves the payment
					onAuthorize: function(data, actions) {
		
						// Make a call to the REST api to execute the payment
						return actions.payment.execute().then(function() {
							window.alert('Payment Complete!');
						});
					}
		
				}, '#paypal-button-container');
			}
			
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
		$(document).on('mouseover', '#dropdown-cart', function(e) {
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
