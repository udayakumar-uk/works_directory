function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


$(document).on('ready', function() {
      $(".single-item").slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
      });
});
