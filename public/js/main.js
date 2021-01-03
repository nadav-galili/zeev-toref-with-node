
// carousel

$(document).ready(function () {

    $('.owl-carousel').owlCarousel({
        mouseDrag: false,
        loop: true,
        margin: 2,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    });

    $('.owl-prev').click(function () {
        $active = $('.owl-item .item.show');
        $('.owl-item .item.show').removeClass('show');
        $('.owl-item .item').removeClass('next');
        $('.owl-item .item').removeClass('prev');
        $active.addClass('next');
        if ($active.is('.first')) {
            $('.owl-item .last').addClass('show');
            $('.first').addClass('next');
            $('.owl-item .last').parent().prev().children('.item').addClass('prev');
        } else {
            $active.parent().prev().children('.item').addClass('show');
            if ($active.parent().prev().children('.item').is('.first')) {
                $('.owl-item .last').addClass('prev');
            } else {
                $('.owl-item .show').parent().prev().children('.item').addClass('prev');
            }
        }
    });

    $('.owl-next').click(function () {
        $active = $('.owl-item .item.show');
        $('.owl-item .item.show').removeClass('show');
        $('.owl-item .item').removeClass('next');
        $('.owl-item .item').removeClass('prev');
        $active.addClass('prev');
        if ($active.is('.last')) {
            $('.owl-item .first').addClass('show');
            $('.owl-item .first').parent().next().children('.item').addClass('prev');
        } else {
            $active.parent().next().children('.item').addClass('show');
            if ($active.parent().next().children('.item').is('.last')) {
                $('.owl-item .first').addClass('next');
            } else {
                $('.owl-item .show').parent().next().children('.item').addClass('next');
            }
        }
    });

});




// form-validation
// const requiredText='שדה זה הוא חובה'
// const minText='יש להזין לפחות 2 תווים'


  
  $.validator.addMethod("regexp", function (value, element, regexp) {
  
    return new RegExp(regexp).test(value);
    $.validator.messages["regexp"] = errors[element.id];
  });
  
  /* טקסט בעברית */
   $('#contact-form').validate({
    rules: {
      name: { required: true, minlength: 2, maxlength: 70 },
      email: { required: true, email: true },
      phone: { required: true, regexp: /^0[2-9]\d{7,8}$/ },
      message: { required: true, minlength: 2, maxlength: 2000 }
    },
    messages: {
      name: {
        required: 'שדה זה הוא חובה',
        minlength: 'נא הכנס שתי אותיות לפחות',
        maxlength: 'הגזמת חביבי'
      },
      email: {
        required: 'שדה זה הוא חובה',
        email: 'אנא הכנס אימייל תקני'
      },
      phone: {
        required: 'שדה זה הוא חובה',
        regexp: 'נא הכנס מספר טלפון תקני בישראל',
        maxlength: 'הגזמת חביבי'
      },
      message: {
        required: 'שדה זה הוא חובה',
        minlength: 'נא הכנס שתי אותיות לפחות',
        maxlength: 'בשדה זה ניתן להכניס עד 2,000 תווים'
      }
    }
  }); 