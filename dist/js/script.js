// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1000,
//         slidesToShow: 1,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_slider.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right_slider.png"></button>',
//         responsive:[
//             {
//                 breakpoint: 992,
//                 settings: {
//                   dots: true,
//                   arrows: false

//                 }
//             }
//         ]
//       });
//   });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    controls: false,
    nav: false,
  });

document.querySelector('.slick-prev').addEventListener('click', function () {
    slider.goTo('prev');
  });

document.querySelector('.slick-next').addEventListener('click', function () {
    slider.goTo('next');
  });

(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
    });

    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal=consult]').on('click', function(){
      $('.overlay, #consult').fadeIn();
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consult, #order, #thanks').fadeOut();
    });
    $('.button_buy').on('click', function(){
    });
    $('.button_buy').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      });
    });


    function validateForms(form){
      $(form).validate({
        rules:{
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages:{
          name:"Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email:"Неправильно введен адрес почты"
          }
        }
      });
    }
    validateForms('#order form');
    validateForms('#consult form');
    validateForms('#consultation-form');

    //mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // forms
    $('form').submit(function(e){
      e.preventDefault();

      if (!$(this).valid()){
        return;
      }

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val("");
        $("#consult, #order").fadeOut();
        $(".overlay, #thanks").fadeIn();
        
        $('form').trigger('reset');
      });
      return false;
    });


    //Smooth scorll, pgup
    
    $(window).scroll(function(){
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn(100);
      } else {
        $('.pageup').fadeOut(100);
      }
    });


    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        let hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 1000, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    new WOW().init();

    })(jQuery);