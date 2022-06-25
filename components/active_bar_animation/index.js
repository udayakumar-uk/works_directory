// tab ui
var ul = $(".nav-tabs");
var ulli = $(".nav-tabs .nav-item");
var ullia = $(".nav-tabs .nav-item a");
var slider = $(".nav-tabs .slider");

var actPosition = ul.find(".active").parent().position();
var actWidth = ul.find(".active").parent().width();
var calcLeft = actWidth / 2;
var sliderWidth = slider.width() / 2;
slider.css({
	left: actPosition.left + calcLeft + -sliderWidth,
	width: actWidth
});

ullia.click(function () {
	var getPosition = $(this).parent().position();
	var getWidth = $(this).parent().width();
	slider.css({
		left: getPosition.left + calcLeft + -sliderWidth,
		width: getWidth
	});
});
