$(function() {
  // smooth-scroll for anchor links
  smoothScroll.init();

  // navbar theme switch
  $(window).on('activate.bs.scrollspy', function() {
    var $navbar = $('#navbar-front');
    var showLightNavbar = $('.nav-link.active', $navbar).data('navbar-light') !== undefined;
    if (showLightNavbar) {
      $navbar.removeClass('navbar-inverse').addClass('navbar-light');
    } else {
      $navbar.removeClass('navbar-light').addClass('navbar-inverse');
    }
  });
});
