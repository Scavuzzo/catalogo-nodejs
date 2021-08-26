$(document).ready(function () {
    // Btn Hamburger
    $('.btn-hamb').click(function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('#header-nav').toggleClass('nav-open');
        $('.header__logo').toggleClass('header__logo-nav');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).is('.btn-hamb')) {
            if (!$(e.target).is('.header .header__nav, .header .header__nav *')) {
                $('.btn-hamb').removeClass('active');
                $('#header-nav').removeClass('nav-open');
            }
        }
    });
});
