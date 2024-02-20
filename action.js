function jGet(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}

$(document).ready(function() {


    $('.venobox').venobox();

    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function() {
        $(this).parent().removeClass('active');
    });


    $('.fm-calendar').datetimepicker({
        format: 'L'
    });


    $('.fm-calendar-line').datetimepicker({
        format: 'L',
        inline: true,
        sideBySide: true,

    });

    // $('.banner-main-carousel').trigger('play.owl.autoplay');
    // $('.banner-main-carousel').trigger('stop.owl.autoplay');


    var banner_main = $('.banner-main-carousel');
    banner_main.owlCarousel({
        dots: true,
        loop: true,
        rewind: true,
        nav: true,
        items: 1,
        margin: 0,
        smartSpeed: 800,
        fluidSpeed: 800,
        center: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: false,
        navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
    });

    var banner_canvas = $('.banner-main-carousel-canvas');
    banner_canvas.owlCarousel({
        dots: true,
        loop: false,
        rewind: false,
        nav: true,
        items: 1,
        margin: 0,
        smartSpeed: 800,
        fluidSpeed: 800,
        center: true,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: false,
        navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
    });


    var accessories_carousel = $('.accessories_carousel');
    accessories_carousel.owlCarousel({
        mouseDrag: false,
        touchDrag: false,
        dots: true,
        loop: true,
        rewind: true,
        nav: false,
        items: 1,
        margin: 0,
        smartSpeed: 800,
        fluidSpeed: 800,
        center: true,
        autoplay: false,
        navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
    });


    var stepChoice = $('.step-choice-cars');
    stepChoice.children().each(function(index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });
    stepChoice.owlCarousel({
        dots: true,
        loop: true,
        nav: true,
        items: 1,
        margin: 0,
        stagePadding: 0,
        smartSpeed: 800,
        fluidSpeed: 800,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        navText: ["<i class='icon-ic-left-bd-arrow'></i>", "<i class='icon-ic-right-bd-arrow'></i>"],
        responsive: {
            0: {
                mouseDrag: true,
                touchDrag: true,
                items: 1,
            },
            550: {
                mouseDrag: true,
                touchDrag: true,
                items: 2,
            },
            768: {
                items: 3,
            }
        }
    });

    $(document).on('click', '.owl-item>div', function() {
        stepChoice.trigger('to.owl.carousel', [$(this).data('position'), 800]);
    });




    $('.news-pagination-carousel').owlCarousel({
        loop: false,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        responsive: {
            0: {
                items: 5
            },
            600: {
                items: 5
            },
            1000: {
                items: 5
            }
        }
    })
    $('#suzukiStep').smartWizard({
        theme: 'Dots',
        useURLhash: false,
        showStepURLhash: false,
        enableURLhash:false,
        justified: true,
        toolbarSettings: {
            showNextButton: false,
            showPreviousButton: false,
        },
        keyboardSettings: {
            keyNavigation: false,
        },
    });

    // $('.testdrivestepnext').click(function() {
    //     $('#suzukiStep').smartWizard("next");
    // })
    // $('.testdriveStepprev').click(function() {
    //     $('#suzukiStep').smartWizard("prev");
    // })


    var galleryCarousel = $('.news-gallery-carousel');
    galleryCarousel.owlCarousel({
        loop: false,
        margin: 0,
        // animateOut: 'fadeOut',
        smartSpeed: 800,
        fluidSpeed: 800,
        nav: true,
        navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
        items: 1,
        dots: false,
    }).on('changed.owl.carousel', function(event) {
        var item = event.item.index + 1;
        $(".news-gallery-thumbnail a").removeClass('active')
        $('.news-gallery-thumbnail a[data-thumbnail-gallery=' + item + ']').addClass('active')
    });

    $(".item-group-gallery a").each(function() {
        $(this).click(function() {
            var id = $(this).attr("data-gallery") - 1;
            var thumbnail = id + 1
            $('#myGallery').modal('show')
            $('.news-gallery-carousel').trigger('to.owl.carousel', id)
            $(".news-gallery-thumbnail a").removeClass('active')
            $('.news-gallery-thumbnail a[data-thumbnail-gallery=' + thumbnail + ']').addClass('active')

        });
    });

    // $('#work_'+id).toggleClass("working-stop");


    $(".news-gallery-thumbnail a").each(function() {
        $(this).click(function() {
            var id = $(this).attr("data-thumbnail-gallery") - 1;
            $('.news-gallery-carousel').trigger('to.owl.carousel', id)
            $(".news-gallery-thumbnail a").removeClass('active')
            $(this).addClass('active')
        });
    });

    var clicked = false;


    $(".nav-item.megamenu .nav-link").each(function() {
        $(this).on('mouseover touchstart', function(e) {
            var id = $(this).attr("data-mega-menu");
            $('#block_submenu_' + id).addClass("active");
            $('body').addClass("menu_show");
        });
    });

    $(".section-body ,.nav-item.defaultmenu, .block-menu-header-section-1").mouseover(function() {
        $(".block-item-sub-menu").removeClass("active");
        $('body').removeClass("menu_show");
    });





    var dot_banner = $('.banner-main .owl-dot');
    var nav_banner = $('.banner-main .owl-nav');
    var nav_item = $('.banner-main .owl-prev');
    var dot_item = dot_banner.width() * dot_banner.length;
    nav_banner.css("width", dot_item + nav_item.width() * 2 + 30 + 'px');

    // console.log(dot_item);


    $(window).resize(function() {

        var dot_banner = $('.banner-main .owl-dot');
        var nav_banner = $('.banner-main .owl-nav');
        var nav_item = $('.banner-main .owl-prev');
        var dot_item = dot_banner.width() * dot_banner.length;
        nav_banner.css("width", dot_item + nav_item.width() * 2 + 30 + 'px');

    })

    var product_main = $('.product-main-carousel');
    product_main.children().each(function(index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });
    product_main.owlCarousel({
        dots: false,
        loop: true,
        nav: true,
        navText: ['<div class="arrow arrow--left"><span></span></div>', '<div class="arrow arrow--right"><span></span></div>'],
        items: 1,
        margin: 0,
        stagePadding: 0,
        smartSpeed: 400,
        fluidSpeed: 400,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        responsive: {
            0: {
                mouseDrag: true,
                touchDrag: true,
                autoWidth: true,
                items: 1,
            },
            550: {
                mouseDrag: true,
                touchDrag: true,
                items: 2,
            },
            768: {
                mouseDrag: true,
                touchDrag: true,
                items: 3,
            },
            1200: {
                mouseDrag: true,
                touchDrag: true,
                items: 5,
            }
        }
    });

    $(document).on('click', '.owl-item>div', function() {
        product_main.trigger('to.owl.carousel', [$(this).data('position'), 800]);
    });

    var product_main_fix = $('.product-main-carousel-fix');
    product_main_fix.children().each(function(index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });
    product_main_fix.owlCarousel({
        dots: false,
        loop: true,
        nav: true,
        navText: ['<div class="arrow arrow--left"><span></span></div>', '<div class="arrow arrow--right"><span></span></div>'],
        items: 1,
        margin: 0,
        startPosition: 0,
        stagePadding: 0,
        smartSpeed: 400,
        fluidSpeed: 400,
        mouseDrag: false,
        touchDrag: false,
        center: true,
        responsive: {
            0: {
                mouseDrag: true,
                touchDrag: true,
                autoWidth: true,
                items: 1,
            },
            550: {
                mouseDrag: true,
                touchDrag: true,
                items: 2,
            },
            768: {
                mouseDrag: true,
                touchDrag: true,
                items: 3,
            },
            1200: {
                mouseDrag: true,
                touchDrag: true,
                items: 5,
            }
        }
    });

    $(document).on('click', '.owl-item>div', function() {
        product_main_fix.trigger('to.owl.carousel', [$(this).data('position'), 800]);
    });


    $(document).ready(function() {
        var fixHeader = $(".header-main-menu");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            $('.block-menu-header-section-1').removeClass('show_search')
            if (scroll >= 5) {
                fixHeader.addClass("active");
            } else {
                fixHeader.removeClass("active");
            }
        });
    });



    //  < !-- // <-------== [ OWL specification ] ==-------->
    var owl_specification = $('.specification-main-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
        items: 1,
    })
    owl_specification.on('changed.owl.carousel', function(e) {
        // console.log("current: ", e.relatedTarget.current())
        // console.log("current: ", e.item.index) //same
        // console.log("total: ", e.item.count) //total
        for (var i = 0; i < e.item.count; i++) {
            if (i == e.relatedTarget.current()) {
                $('.c' + i).removeClass('hidden-mb');
            } else {
                $('.c' + i).addClass('hidden-mb');
            }
        }
    })

    if (jGet('grade') != "null") {
        owl_specification.trigger("to.owl.carousel", [jGet('grade'), 500, true]);
    }
    //  < !-- // <-------== [ OWL specification ] ==-------->

    //  < !-- // <-------== [ OWL performance ] ==-------->
    var owl_performance = $('.performance-main-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
            items: 1,
        })
        //  < !-- // <-------== [ OWL performance ] ==-------->


    function peopleCount() {
        setTimeout(function() { 
            var blockOwnyourjimnyRegisterContdown = $('.block-ownyourjimny-register-contdown')
            if(!blockOwnyourjimnyRegisterContdown.hasClass('itPass')){
                    $('#inCount_1').prop('Counter',9).animate({
                        Counter: $('#inCount_1').text()
                    }, {
                        duration: 500,
                        easing: 'linear',
                        step: function (now) {
                            $('#inCount_1').text(Math.ceil(now));
                        }
                    });
                    $('#inCount_2').prop('Counter',9).animate({
                        Counter: $('#inCount_2').text()
                    }, {
                        duration: 500,
                        easing: 'linear',
                        step: function (now) {
                            setTimeout(function() { 
                            $('#inCount_2').text(Math.ceil(now));
                        }, 500);

                        }
                    });
                    $('#inCount_3').prop('Counter',9).animate({
                        Counter: $('#inCount_3').text()
                    }, {
                        duration: 500,
                        easing: 'linear',
                        step: function (now) {
                            setTimeout(function() { 
                            $('#inCount_3').text(Math.ceil(now));
                        }, 1000);
                        }
                    });
                    $('#inCount_4').prop('Counter',9).animate({
                        Counter: $('#inCount_4').text()
                    }, {
                        duration: 500,
                        easing: 'linear',
                        step: function (now) {
                            setTimeout(function() { 
                            $('#inCount_4').text(Math.ceil(now));
                        }, 1500);
                        }
                    });
                blockOwnyourjimnyRegisterContdown.addClass('itPass')
            }
        }, 500);
    }

    function carCount() {
        setTimeout(function() {
            var blockOwnyourjimnyRegisterBar = $('.block-ownyourjimny-register-bar')
            if(!blockOwnyourjimnyRegisterBar.hasClass('itPass')){
                $('.carNumber span').each(function () {
                    $(this).prop('Counter',100).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
            }
            blockOwnyourjimnyRegisterBar.addClass('itPass')
        }, 500);
    }

    var scrollHeight = $("#animate-tw-scroll").height() - 300;

    var controller = new ScrollMagic.Controller();
    // console.log(scrollHeight);

    var scene = new ScrollMagic.Scene({ triggerElement: "#animate-tw-scroll", duration: scrollHeight, triggerHook: 0.07 })
        .setTween("#scroll_in", { bottom: "0" })
        // .addIndicators({ name: "scroll-in (duration: 100%)" })
        .addTo(controller);

        var scene2 = new ScrollMagic.Scene({triggerElement: ".block-ownyourjimny-register-contdown", duration: 2000, triggerHook: .7})
        .addTo(controller)
        // .addIndicators()
        .on("enter", function (e) {
            peopleCount()
        })

        var scene3 = new ScrollMagic.Scene({triggerElement: ".block-ownyourjimny-register-bar", duration: 2000, triggerHook: .5})
        .addTo(controller)
        // .addIndicators()
        .on("enter", function (e) {
            console.log('enter');
            carCount()
        })

});


    
// $(document).ready(function () {
//     $("body").kidkarnmaiPreloader({
//         setPercent: setPercent,
//         setPercentComplete: setPercentComplete
//     });
// });

// function setPercent(num) {
//     // console.log("setPercent : " + num);
// }

// function setPercentComplete() {
//     // console.log("setPercentComplete");
//     setTimeout(function() {
//         $('.ownyourjimny_load').addClass('loadPass')
//     }, 300);
// }


function setAOS() {
    AOS.init({
        once: true
    })
    document.addEventListener('aos:in:about_timeline', function() {
        // console.log('animated in');
        setInterval(function() {
            aboutTimeline3.trigger('next.owl.carousel');
        }, 5000);

    });

}





var btn = $('#back-to-top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});



var experience_tap = $('.block-tab-experience-carousel');
experience_tap.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

$('#btn-slide-left').click(function() {
    experience_tap.trigger('prev.owl.carousel');
})
$('#btn-slide-right').click(function() {
    experience_tap.trigger('next.owl.carousel');
})

var experience_tap = $('.product-main-carousel2');
experience_tap.children().each(function(index) {
    $(this).attr('data-position', index); // NB: .attr() instead of .data()
});
experience_tap.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    navText: ['<i class="icon-ic-left-arrow"></i>', '<i class="icon-ic-right-arrow"></i>'],
    items: 1,
    margin: 0,
    stagePadding: 0,
    smartSpeed: 400,
    fluidSpeed: 400,
    mouseDrag: false,
    touchDrag: false,
    center: true,
    responsive: {
        0: {
            mouseDrag: true,
            touchDrag: true,
            autoWidth: false,
            items: 2,
        },
        550: {
            mouseDrag: true,
            touchDrag: true,
            items: 2,
        },
        768: {
            mouseDrag: true,
            touchDrag: true,
            items: 3,
        }
    }
});

$('#btn-slide-left').click(function() {
    experience_tap.trigger('prev.owl.carousel');
})
$('#btn-slide-right').click(function() {
    experience_tap.trigger('next.owl.carousel');
})


$('.nav-search').click(function() {
    $('.block-menu-header-section-1').addClass('show_search')
})
$('.close_search').click(function() {
    $('.block-menu-header-section-1').removeClass('show_search')
})



$(function() {
    $('#accordion-menu .collapse').removeAttr("data-parent");
    $('#accordion-menu .collapse').collapse('show');

});



// $('#myCarousel01').carousel()
// $('#myCarousel02').carousel()
// $('#myCarousel03').carousel()
// $('#myCarousel04').carousel()
// $('#myCarousel05').carousel()
// $('#myCarousel06').carousel()
// $('#myCarousel07').carousel()
// $('#myCarousel08').carousel()
// $('#myCarousel09').carousel()


var accsories_main = $('.accessories-main-carousel');
accsories_main.owlCarousel({
    dots: true,
    loop: false,
    nav: false,
    items: 7,
    margin: 15,
    smartSpeed: 800,
    fluidSpeed: 800,
});

function thumbCarousel(elem) {
    // get all 'a' elements
    var a = document.getElementsByTagName('a');
    // loop through all 'a' elements
    for (i = 0; i < a.length; i++) {
        // Remove the class 'active' if it exists
        a[i].classList.remove('active')
    }
    // add 'active' classs to the element that was clicked
    elem.classList.add('active');
}

// $(function() {
//     var $sidebar   = $("#sticky-2"),
//         $window    = $(window),
//         offset     = $sidebar.offset(),
//         topPadding = 15;

//     $window.scroll(function() {
//         if ($window.scrollTop() > offset.top) {
//             $sidebar.stop().animate({
//                 marginTop: $window.scrollTop() - offset.top + topPadding
//             }, 400);
//         } else {
//             $sidebar.stop().animate({
//                 marginTop: 0
//             }, 400);
//         }
//     });
// });

