(function() {

var sarah = {
	init: function(){
		this.cacheDom();
		this.bindEvents();
		this.initSlider();
		this.navOverlay();
		this.totopButton();
		this.stickyHeader();
		this.initContactForm();
		this.enableGridGallery();
		this.enablePopupGallery();
	},
	cacheDom: function(){
		this.toTop = $('.totop');
		this._body = $('body');
		this.homepageSlider = $('.sh__slider');
		this.testimonialSlider = $('.sh__TestimonySlider');
		this.projectsSlider = $('.sh__projectsSlider');
		this._menuTrigger = $('.sh__hamburger-trigger');
		this._mainMenu = $('.sh__navOverlay--mainNav');
		this._overlayMenuHolder = $('.sh__navOverlay');
		this._overlayMenuClose = $('.sh__navOverlay-close');
		this.menuLinks = $('.sh__navOverlay--mainNav li a');
		this.galleryTabs = 	$('.sh__toolbar-item');
		this.galleryItem = $('.sh__gallery-item');
		this.contactInput = $('.sh__input');
		this.formComponent= $('.sh__form-component');
	},
	bindEvents: function(){
		var self = this;
		this.galleryTabs.on('click', self.changeActiveTab);
		this.galleryTabs.on('click', self.addGalleryFilter);
		this.contactInput.on('keyup', self.changeInputLabel);
		$(window).on('load', self.enablePreloader);
	},
	enablePopupGallery: function() {
		$('.sh__popupGallery').each(function() {
				$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						gallery: {
							enabled:true
						}
				});
		});
	},
	enablePreloader: function() {
		var preloader = $('#sh__page-loading');
		if ( preloader.length > 0 ) {
			preloader.fadeOut( "slow", function() {
				preloader.remove();
			});
		}
	},
	changeInputLabel: function() {
		var inputValue = $(this).val();
		if(inputValue !== '') {
			$(this).closest(sarah.formComponent).find(sarah.contactInput).addClass('hasContent');
		} else {
			$(this).closest(sarah.formComponent).find(sarah.contactInput).removeClass('hasContent');
		}
	},
	changeActiveTab: function() {
		$(this).closest('.sh__gallery-toolbar').find('.active').removeClass('active');
		$(this).addClass('active');
	},
	addGalleryFilter: function() {
		var value = $(this).attr('data-filter');
		if(value === 'all') {
			sarah.galleryItem.show('3000');
		} else {
			sarah.galleryItem.not('.'+ value).hide('3000');
			sarah.galleryItem.filter('.'+ value).show('3000');
		}
	},
	initSlider: function() {
		var self = this;
		/* homepage slider */
		self.homepageSlider.slick({
			infinite: true,
			arrows: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			 responsive: [
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
			]
		});
		/* testimonial slider */
		self.testimonialSlider.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			autoplay: true
		});
		/* projects slider */
		self.projectsSlider.slick({
			infinite: true,
			arrows: true,
			slidesToShow: 4,
			slidesToScroll: 2,
			responsive: [
			{
				breakpoint: 1200,
				settings: {
				slidesToShow: 3,
				slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
			]
		});
	},
	navOverlay: function() {
		var self = this;

		if(self._mainMenu.length > 0) {

			var closeMenu = function() {
				self._overlayMenuHolder.removeClass('is-active');
				self._overlayMenuHolder.addClass('sh__navOverlay--closed');
				self._menuTrigger.removeClass('is-active');
				setTimeout(function(){self._body.css('overflow','');}, 700);
			};
			var openMenu = function() {
				self._overlayMenuHolder.addClass('is-active');
				self._overlayMenuHolder.removeClass('sh__navOverlay--closed');
				self._menuTrigger.addClass('is-active');
				self._body.css('overflow','hidden');
			};
			var toggleOpen = function(){
				if( self._overlayMenuHolder.hasClass('is-active') ){
					closeMenu();
				}
				else {
					openMenu();
				}
			};

			/* open menu trigger */
			self._menuTrigger.on('click', function(e){
				e.preventDefault();
				toggleOpen();
			});

			/* Close Button */
			self._overlayMenuClose.on('click', function(e){
				e.preventDefault();
				toggleOpen();
			});

			/* Close menu if the menu links are clicked */
			self.menuLinks.on('click', function(e) {
				self._mainMenu.find('li .active').removeClass('active');
				$(this).addClass('active');
				toggleOpen();

				// Get the link id
				var $link = $(this),
					linkAttribute = $link.attr('href'),
					sectionId = linkAttribute.substring( linkAttribute.indexOf('#') ),
					$section = $( sectionId );

				if( $section.length !== 0 ){
					e.preventDefault();
				}

				var positionToTop = $section.offset().top,
					topOffset = $link.data('offset');

				// Check if link has offset
				if( topOffset ){
					positionToTop = positionToTop + topOffset;
				}

				// Scroll to element
				$('html, body').animate( {scrollTop: positionToTop }, 'slow' );

			});
		}
	},
	totopButton: function() {
		var self = this;

		/* Show totop button*/
		$(window ).scroll(function(){
			var toTopOffset = self.toTop.offset().top;
			var toTopHidden = 1000;

			if (toTopOffset > toTopHidden) {
				self.toTop.addClass('totop-vissible');
			} else {
				self.toTop.removeClass('totop-vissible');
			}
		});

		/* totop button animation */
		if(self.toTop && self.toTop.length > 0){
			self.toTop.on('click',function (e){
				e.preventDefault();
				// $( 'body' ).animate( {scrollTop: 0 }, 'slow' );
				$( 'html' ).animate( {scrollTop: 0 }, 'slow' );
			});
		}
	},
	stickyHeader: function() {

		var $el = $(".sh__stickyHeader"),
			headerHeight = $el.find('.sh__navbarContainer').outerHeight();

		$(window).on('scroll', function(event){
			if( $(window).scrollTop() > headerHeight ){
				$el.removeClass('header--not-sticked');
				$el.addClass('header--is-sticked');
			}
			else{
				$el.removeClass('header--is-sticked');
				$el.addClass('header--not-sticked');
			}
		});
	},
	initContactForm: function() {
		var contactForm = $('.sh__contact-form');
		if( typeof(contactForm) === 'undefined' ){
			return;
		}
		contactForm.on('submit', function(e) {
			e.preventDefault();
			e.stopPropagation();

			var self = $(this),
				submitButton = self.find('.sh__submit-form-btn');

			//#! Disable repetitive clicks on the submit button. Prevents postbacks
			self.addClass('js-disable-action');
			submitButton.addClass('js-disable-action');

			//#! Redirect to the specified url on success, ONLY if a url is present in the input value
			var redirectToInput = self.find('.sh__redirect-to'),
				redirectTo = ( typeof(redirectToInput) != 'undefined' ? redirectToInput.val() : '' ),
				//#! Holds the reference to the wrapper displaying the result message
				responseWrapper = self.find('.js-cf-message');

			//#! Clear message
			responseWrapper.empty().hide();

			//#! Execute the ajax request
			$.ajax({
				url: self.attr('action'),
				method: 'POST',
				cache: false,
				timeout: 20000,
				async: true,
				data: {
					'fields' : self.serialize()
				}
			}).done(function(response){
				responseWrapper.removeClass('js-response-success js-response-error');
				if(response && typeof(response.data) != 'undefined' ) {
					responseWrapper.empty();
					if( ! response.success ){
						responseWrapper.addClass('js-response-error');
						$.each( response.data, function(i, err) {
							responseWrapper.append('<p>'+err+'</p>');
						});
					}
					else {
						responseWrapper
							.addClass('js-response-success')
							.append('<p>'+response.data+'</p>');
						//#! Clear the form
						self.find('.sh__input').val('');
						//#! Redirect on success (maybe to a Thank you page, whatever)
						if( redirectTo.length > 0 ){
							window.setTimeout(function(){
								window.location.href = redirectTo;
							}, 2000);
						}
					}
					responseWrapper.fadeIn();
				}
				else {
					responseWrapper.removeClass('js-response-success');
					responseWrapper.empty().addClass('js-response-error').append('<p>An error occurred. Please try again in a few seconds.</p>').fadeIn();
				}
			}).fail(function(txt, err){
				responseWrapper.empty().addClass('js-response-error').append('<p>An error occurred: '+txt+' Err:'+err+'. Please try again in a few seconds.</p>').fadeIn();
			}).always(function() {
				self.removeClass('js-disable-action');
				submitButton.removeClass('js-disable-action');
			});
		});

	},
	enableGridGallery: function() {

		$('.sh__gridGallery').each(function( i, el ){
			var item = $(el).find('.sh__gridItem');
			$(el).masonry({
					itemSelector: '.sh__gridItem',
					columnWidth: '.sh__gridItem',
					horizontalOrder: true
			});
		});
	}
};

sarah.init();

})();
