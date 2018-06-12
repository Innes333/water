(function() {
 
})();

$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.pop'),
			fadeOutBtn: $('.fade_out'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			mobButton: $('.mob-button'),
			slider: $('.slider'),
			mineralSlider: $('.elements-slider'),
			partnersSlider: $('.partners-slider'),
			commentsSlider: $('.comments-slider'),
			gallerySlider: $('.gallery-slider'),
			inputNumber: $('.input-number'),
			minBag: $('.dropdown-mini-bag'),	
			bagBtn: $('.shop-cart'),
			readMoreText: $('.read-more-text'),
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
				items: 4,
				itemsDesktop:  [1199,4],
				itemsDesktopSmall: [980, 4],
				itemsTablet: [768,3],
				itemsMobile: [479,2]				
			},
			commentsOwlOptions: {
				autoPlay: false,
				navigation: false,
				pagination: true,
				scrollPerPage: true,
				items: 2,
				itemsDesktop:  [1199,2],
				itemsDesktopSmall: [980, 2],
				itemsTablet: [768,2],
				itemsMobile: [479,1]				
			},
			galleryOwlOptions: {
				autoPlay: false,
				navigation: true,
				pagination: false,
				scrollPerPage: true,
				items: 3,
				navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
				itemsDesktop:  [1199,3],
				itemsDesktopSmall: [980, 2],
				itemsTablet: [768,1],
				itemsMobile: [479,1]	
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

		readMore: function() {
			var readBtnBlock = '<div class="read-more-btn">...read more</div>';
			
			this.opt.readMoreText.append(readBtnBlock);

			$('.read-more-btn').on('click', function(){
				var $that = $(this);
				$that.parent().toggleClass('open');
				$that.html(!$that.parent().hasClass('open')?'...read more':'...read less');
			})			
		},

		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// tabs init
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			this.opt.fadeOutBtn.on('click', function() {
				$('.popup').fadeOut('slow');
			});
			
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
			// owl comments slider
			this.opt.gallerySlider.owlCarousel(this.opt.galleryOwlOptions);
			//mob button toggle
			this.toggleC(this.opt.mobButton);

			this.inputNumber(this.opt.inputNumber);

			this.fillValue($('input'));
			this.fillValue($('textarea'));

			this.dropDown('.question-title', '.answer');
			
			// init read more
			this.readMore();			
		}
	};

	$(document).ready(function(){

		main.init();

    function getRandomInt(min, max){return Math.floor(Math.random() * (max - min)) + min};
		var stateData  = null;
		var citiesData = null;
	  $.ajax({
			type: "GET",
			url: "assets/js/citiesList.json",
			}).done(function(data) {
				stateData  = data;
				citiesData = Object.keys(data);
		});
		var prodUrl = $('#someone-purchased').attr('data-url');
		setInterval(function(){
		    // get random product from catalog----
		    $.ajax({  
				type: "GET",
				url: prodUrl,
				success:  function(data) {
				    var productBock = $('#someone-purchased .hidden');
				    productBock.html('').append(data);
				    var title = productBock.find('form a').html();
				    var link  = productBock.find('form a').attr('href');
				    var image = productBock.find('img').attr('src');
				    
        			var stateNum = getRandomInt(0,citiesData.length);
        			var citiNum  = getRandomInt(0,stateData[citiesData[stateNum]].length);
        			var state    = citiesData[stateNum];
        			var citi     = stateData[citiesData[stateNum]][citiNum];
        			
        			//Get random name from Rest Api----
        			$.ajax({
        				url: 'https://randomuser.me/api/',
        				dataType: 'json',
        				success: function(data) {
        					var html =  '<div class="col-xs-3"><img src="'+image+'"></div>'+
                                    '<div class="col-xs-9"><a href="'+link+'">'+title+'</a>'+
                                    '<p class="label">purchased about '+getRandomInt(4,40)+' minutes ago</p>'+
                                    '<h4 class="label">by '+data.results[0].name.first+' from '+state+' '+citi+'</h4></div>';
				            $('#someone-purchased').attr('class','card').find('.row').html(html);
				            
				            setTimeout(function(){
		                        $('#someone-purchased .close').click();
				            }, 7000)
        				}
        			});
        			//Get random name from Rest Api----
				}
			});
			// get random product from catalog----
		}, getRandomInt(30000,50000))
		
		$('#someone-purchased .close').on('click', function(){
		  $(this).parents('#someone-purchased').addClass('hidden');
		});

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
					  miniShop2.Message.error('Error!');
					}} 
			}); 
		 });
		//Ajax mini cart----------------

		//E-mail Ajax Send--------------
		$("form.sendmail").submit(function() {
			var th = $(this);
			$.ajax({
				type: "POST",
				url: this.action,
				data: th.serialize()
			}).done(function() {
				alert("Thank you!");
				th.trigger("reset");
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

		var promoBottle = $('.promo-img img');
		$(document).scroll(function(){	
			var scrl = $(document).scrollTop();
			if(scrl < main.winH()){
				promoBottle.css({'margin-top': scrl/3+'px'});
			};
		});	

		$('section').waypoint({
			handler: function(event, direction){
				if(direction === "down") {
					$(event.target).addClass('active')
					if($(event.target).hasClass('benefits')){
						$('.w-benefit .circle-img').trigger("redraw");
					}else if($(event.target).hasClass('water-choice')){						
						$('.water-choice .w-choice-block').addClass('animated fadeInUp');
					}else if($(event.target).hasClass('elements')){
						$('.elements-slider .flip-card').addClass('animated fadeInRight');
					};
				}else if(direction === "up"){
					$(event.target).removeClass('active');					
					if($(event.target).hasClass('benefits')){
						$('.w-benefit .circle-img').trigger('reverse');
					};
				};
			},
			offset: '35%'
		});

		$('.w-benefit .circle-img').svgprogress({
			figure: "circle",
			progressFill: '#1565C0',
      progressWidth: 2,
      animationDuration: 1.5,
      unitsOutput: ''
		});


	});
});
