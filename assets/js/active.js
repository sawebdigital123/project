(function ($) {
  'use strict';

  // Wait for the document to be fully loaded
  $(document).ready(function() {
    // Preloader
    $('#container').addClass('loaded');
    
    // Remove preloader after delay
    if ($('#container').hasClass('loaded')) {
      $('#preloader')
        .delay(500)
        .queue(function() {
          $(this).remove();
        });
    }

    // Initialize WOW.js
    if (typeof WOW === 'function') {
      new WOW().init();
    }

    // Initialize Isotope if it exists
    if (typeof $.fn.isotope === 'function') {
      var $projectContainer = $('.projects-container');
      if ($projectContainer.length) {
        $projectContainer.imagesLoaded(function() {
          $projectContainer.isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            percentPosition: true,
            fitRows: {
              gutter: '.gutter-sizer'
            }
          });
        });

        // Filter items on button click
        $('.project-filter ul li span').on('click', function() {
          $('.project-filter ul li span.active').removeClass('active');
          $(this).addClass('active');
          var filterValue = $(this).data('filter');
          $projectContainer.isotope({ filter: filterValue });
        });
      }
    }

    // Initialize Owl Carousel for Skills
    if (typeof $.fn.owlCarousel === 'function') {
      $('.skills-slider').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        responsive: {
          0: { items: 1 },
          438: { items: 2 },
          650: { items: 3 },
          768: { items: 3 },
          850: { items: 4 },
          1050: { items: 5 },
          1270: { items: 6 },
          1470: { items: 7 },
          1700: { items: 8 }
        }
      });

      // Initialize Brands Carousel
      $('.brands-slider').owlCarousel({
        loop: true,
        autoplay: true,
        smartSpeed: 1500,
        margin: 100,
        dots: false,
        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          1040: { items: 4 },
          1200: { items: 5 }
        }
      });
    }

    // Fixed Header on Scroll
    var $fixedTop = $('.header-section');
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 105) {
        $fixedTop.addClass('menu-fixed animated fadeInDown').removeClass('slideInUp');
        $('body').addClass('body-padding');
      } else {
        $fixedTop.removeClass('menu-fixed fadeInDown').addClass('slideInUp');
        $('body').removeClass('body-padding');
      }
    });

    // Mobile Menu Toggle
    $('.header-bar').on('click', function() {
      $('.main-menu, .header-bar').toggleClass('active');
    });

    // Mobile Menu Dropdown
    $('.main-menu li a').on('click', function(e) {
      var $element = $(this).parent('li');
      if ($element.hasClass('open')) {
        $element.removeClass('open').find('li').removeClass('open');
        $element.find('ul').slideUp(300);
      } else {
        $element.siblings('li').removeClass('open').find('li').removeClass('open');
        $element.addClass('open').find('ul').slideDown(300);
        $element.siblings('li').find('ul').slideUp(300);
      }

      if ($element.find('ul').length === 0) {
        $('.main-menu, .header-bar').removeClass('active');
      }
    });

    // Sidebar Toggle
    $('.remove-click').on('click', function() {
      $('.subside-barmenu').toggleClass('active');
    });

    // One Page Nav
    if (typeof $.fn.onePageNav === 'function') {
      $('.one-page-nav').onePageNav({
        currentClass: 'current-menu',
        changeHash: false,
        easing: 'swing'
      });
    }

    // Magnific Popup
    if (typeof $.fn.magnificPopup === 'function') {
      $('.modal-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'popup-mfp'
      });
    }

    // Service Items Toggle
    $('.service-item-wrapper > .service-item').on('click', function() {
      $(this)
        .toggleClass('is-active')
        .siblings('.service-item')
        .removeClass('is-active')
        .find('.service-panel, .btn-wrapper')
        .slideUp();

      $(this)
        .find('.service-txt .service-panel, .btn-wrapper')
        .slideToggle('ease-out');
    });

    // Blog Items Toggle
    $('.blog-item-wrap > .blog-item').on('click', function() {
      $(this)
        .toggleClass('is-active')
        .siblings('.blog-item')
        .removeClass('is-active')
        .find('.blog-panel')
        .slideUp();

      $(this).find('.blog-panel').slideToggle('ease-out');
    });

    // Testimonial Navigation
    $('.next').on('click', function() {
      $('.slider .slides:first-child').appendTo('.slider').addClass('sliding');
      setTimeout(function() {
        $('.slider .slides').removeClass('sliding');
      }, 500);
    });

    $('.prev').on('click', function() {
      $('.slider .slides:last-child').prependTo('.slider').addClass('sliding');
      setTimeout(function() {
        $('.slider .slides').removeClass('sliding');
      }, 500);
    });

    // Smooth scroll to hash
    if (window.location.hash) {
      var $target = $(window.location.hash);
      if ($target.length) {
        $('html, body').stop().animate({
          scrollTop: $target.offset().top
        }, 1000, 'easeInOutExpo');
      }
    }

    // Initialize active states
    $('.service-item.is-active .service-panel, .service-item.is-active .btn-wrapper').show();
    $('.blog-item.is-active .blog-panel').show();

    // Back to Top Functionality
    var $backToTop = $('.progress-wrap');
    
    // Show/hide back to top button on scroll
    function toggleBackToTop() {
      if ($(window).scrollTop() > 300) {
        $backToTop.addClass('active-progress');
      } else {
        $backToTop.removeClass('active-progress');
      }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Update on scroll
    $(window).on('scroll', toggleBackToTop);
    
    // Smooth scroll to top when clicked
    $backToTop.on('click', function(e) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: 0
      }, 1000, 'easeInOutExpo');
      return false;
    });
    
    // Also handle window resize to ensure proper positioning
    $(window).on('resize', toggleBackToTop);

  });

  // Handle window resize
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Update any layout-dependent code here
      if (typeof $('.projects-container').isotope === 'function') {
        $('.projects-container').isotope('layout');
      }
    }, 250);
  });

})(jQuery);