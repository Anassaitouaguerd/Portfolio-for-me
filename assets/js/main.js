/* main js */
(function ($) {
    "use strict";

    /* Loader */
    $(window).on("load", function () {
        $(".bix-loader").fadeOut("slow");
    });

    /* Aos animation on scroll */
    AOS.init({
        once: true,
    });

    
    /* Header fixed */
    $(function () {
        var header = $(".bix-static");
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('bix-static').addClass("bix-fixed");
            } else {
                header.removeClass("bix-fixed").addClass('bix-static');
            }
        });
    });

  /* Mobile menu slider */
$('.navbar-toggler').on("click", function () {
    $('.bix-sidebar-overlay').removeClass('hidden').fadeIn();
    $('.bix-mobile-menu').removeClass('translate-x-[-100%]');
});

$('.bix-sidebar-overlay, .bix-close').on("click", function () {
    $('.bix-sidebar-overlay').fadeOut(function() {
        $(this).addClass('hidden');
    });
    $('.bix-mobile-menu').addClass('translate-x-[-100%]');
});
/* Close menu when clicking menu items */
$('.bix-menu .nav-item').on("click", function () {
    $('.bix-sidebar-overlay').fadeOut(function() {
        $(this).addClass('hidden');
    });
    $('.bix-mobile-menu').addClass('translate-x-[-100%]');
});

    function ResponsiveMobilemsMenu() {
        let $msNav = $(".bix-menu-content, .overlay-menu"),
            $msNavSubMenu = $msNav.find(".sub-menu");
        $msNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

        $msNav.on("click", "li a, .menu-toggle", function (e) {
            let $this = $(this);
            if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }

    ResponsiveMobilemsMenu();

    $('.mobile-menu li a').on("click", function () {
        $('.bix-sidebar-overlay').fadeOut();
        $('.bix-mobile-menu').removeClass("bix-menu-open");
    });

    /*-- On click menu scroll section to section -- */
    // Cache selectors
    var lastId,
        topMenu = $(".bix-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* Hero parallax mouse */
    if (matchMedia('only screen and (min-width: 991px)').matches) {
        $(window).on('mousemove', function (e) {
            var w = $(window).width();
            var h = $(window).height();
            var offsetX = 0.5 - e.pageX / w;
            var offsetY = 0.5 - e.pageY / h;

            $(".hero-parallax").each(function (i, el) {
                var offset = parseInt($(el).data('offset'));
                var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

                $(el).css({
                    '-webkit-transform': translate,
                    'transform': translate,
                    'moz-transform': translate
                });
            });
        });
    }
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };


    /* for the texts in projects section  */
    $(document).ready(function() {
        // First, limit the text to 20 words
        $('.description-text').each(function() {
            const fullText = $(this).text();
            const words = fullText.split(' ');
            if (words.length > 20) {
                const truncatedText = words.slice(0, 20).join(' ') + '...';
                $(this).text(truncatedText);
                $(this).data('fullText', fullText); // Store full text
            }
        });
    
        // Handle Read More click
        $('.read-more-btn').click(function(e) {
            e.preventDefault();
            const $descriptionText = $(this).siblings('.description-text');
            
            if ($(this).text() === 'Read More') {
                $descriptionText.text($descriptionText.data('fullText'));
                $(this).text('Read Less');
            } else {
                const truncatedText = $descriptionText.data('fullText').split(' ').slice(0, 20).join(' ') + '...';
                $descriptionText.text(truncatedText);
                $(this).text('Read More');
            }
        });
    });

    /* Testimonials */
    $('.testimonials-slider').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: false,
        pagination: false,
        autoplay: true,
        autoplaySpeed: 2000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1,
            }
        }
    });

    /* Blog */
    $('.bix-blog-wrap').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: false,
        pagination: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    /* Tab to top */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    });

    var bixprogressPath = document.querySelector('.back-to-top-wrap path');
    var pathLength = bixprogressPath.getTotalLength();
    bixprogressPath.style.transition = bixprogressPath.style.WebkitTransition = 'none';
    bixprogressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    bixprogressPath.style.strokeDashoffset = pathLength;
    bixprogressPath.getBoundingClientRect();
    bixprogressPath.style.transition = bixprogressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        bixprogressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top-wrap').addClass('active-progress');
        } else {
            jQuery('.back-to-top-wrap').removeClass('active-progress');
        }
    });
    jQuery('.back-to-top-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })

    /* Footer Date */
    // var date = new Date().getFullYear();
    // document.getElementById("copyright_year").innerHTML = date;

    /* Skill Progress */
    var progress = $('#progress');
    $(window).scroll(function () {
        var a = 0;
        var b = 0;
        var oTop = 0;
        if (progress.length) {
            var oTop = progress.offset().top - window.innerHeight;
            if (b == 0 && $(window).scrollTop() > oTop) {

                var max = -219.99078369140625;
                forEach(document.querySelectorAll('.progress'), function (index, value) {
                    var percent = value.getAttribute('data-progress');
                    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    value.querySelector('.value').innerHTML = percent + '%';
                });

                b = 1;
            }
        }
    });

    // -----------------------------------------------



    $(document).ready(function() {
        $('.filter').click(function() {
            const filterValue = $(this).data('filter');
            const allProjects = $('.item');
            
            $('.filter').removeClass('active');
            $(this).addClass('active');
    
            if (filterValue === 'all') {
                allProjects.fadeOut(300, function() {
                    allProjects.fadeIn(400);
                });
                return;
            }
    
            const javaProjects = ['E - bankify', 'Citronix', 'BatiCuisine'];
            const laravelProjects = ['Evento', 'Travelling TogEether', 'E-learning - I MasteryLab'];
            const fullstackProjects = ['E-learning - I MasteryLab'];
    
            allProjects.fadeOut(300, function() {
                allProjects.each(function() {
                    const title = $(this).find('h5 a').text().trim();
                    let shouldShow = false;
    
                    switch(filterValue) {
                        case '.java':
                            shouldShow = javaProjects.includes(title);
                            break;
                        case '.laravel':
                            shouldShow = laravelProjects.includes(title);
                            break;
                        case '.fullstack':
                            shouldShow = fullstackProjects.includes(title);
                            break;
                    }
    
                    if (shouldShow) {
                        $(this).fadeIn(400);
                    }
                });
            });
        });
    
        $('.item').show();
    });
    
    // ------------------


    //  -------------- contact ---------------
    (function() {
        emailjs.init("FlcU7aMS5OFR1G9N8"); // Add your public key
    })();
    
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const formData = {
            from_name: this.querySelector('input[type="email"]').value,
            reply_to: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };
    
        emailjs.send('service_qft0rrl', 'template_cawb989', formData)
            .then(function() {
                alert('Message sent successfully!');
                form.reset();
            }, function(error) {
                console.error('Failed to send message:', error);
                alert('Failed to send message. Please try again.');
            });
    });

    // ------------ end contsact --------------

    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

    $(document).ready(function () {
        // Show first tab by default
        $(".tab[data-id='tab1']").addClass("tab-active");
        
        // Tab switching functionality
        $('.bix-tab a').click(function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            const targetId = $(this).attr('data-id');
            
            // Remove active classes from all tabs and contents
            $(".tab").removeClass('tab-active');
            $(".bix-tab").removeClass('active');
            
            // Add active classes to clicked tab and its content
            $(".tab[data-id='" + targetId + "']").addClass("tab-active");
            $(this).parent(".bix-tab").addClass('active');
        });
    });

    /**  Custom Popup  **/
    $(".modal-trigger").on("click", function () {
        $(".bix-modal-overlay").fadeIn();
        $(".bix-modal").fadeIn();
    });
    $(".bix-modal-overlay, .bix-close-modal").on("click", function () {
        $(".bix-modal-overlay").fadeOut();
        $(".bix-modal").fadeOut();
    });
})(jQuery);