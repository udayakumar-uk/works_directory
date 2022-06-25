var dflex = document.getElementById("d_flex");
var dblock = document.getElementById("d_block");
var dinblock = document.getElementById("d_inline_block");
var ul = document.getElementById("ul");
var flexOptions = document.getElementById("flexOptions");
var row = document.getElementById("flex_row");
var row_rev = document.getElementById("flex_row_reverse");
var col = document.getElementById("flex_column");
var col_rev = document.getElementById("flex_column_reverse");
var start = document.getElementById("flex_start");
var center = document.getElementById("flex_center");
var end = document.getElementById("flex_end");
var alignstart = document.getElementById("flex_align_start");
var aligncenter = document.getElementById("flex_align_center");
var alignend = document.getElementById("flex_align_end");
var order = document.getElementById("flex_order");
var li = document.getElementsByTagName("li")[0];
flexOptions.classList.add("d-none");

// display events

dflex.addEventListener("click", function () {
	ul.className = "";
	ul.classList.add("d-flex");
	flexOptions.className = "";
	flexOptions.classList.add("d-block");
});
dblock.addEventListener("click", function () {
	ul.className = "";
	ul.classList.add("d-block");
	flexOptions.className = "";
	flexOptions.classList.add("d-none");
});
dinblock.addEventListener("click", function () {
	ul.className = "";
	ul.classList.add("d-in-block");
	flexOptions.className = "";
	flexOptions.classList.add("d-none");
});

// flex events

row.addEventListener("click", function () {
	$(".direction").removeClass("active");
	ul.style.flexDirection = "row";
	$(this).addClass("active");
});
row_rev.addEventListener("click", function () {
	$(".direction").removeClass("active");
	ul.style.flexDirection = "row-reverse";
	$(this).addClass("active");
});

col.addEventListener("click", function () {
	$(".direction").removeClass("active");
	ul.style.flexDirection = "column";
	$(this).addClass("active");
});
col_rev.addEventListener("click", function () {
	$(".direction").removeClass("active");
	ul.style.flexDirection = "column-reverse";
	$(this).addClass("active");
});

start.addEventListener("click", function () {
	$(".justify").removeClass("active");
	ul.style.justifyContent = "start";
	$(this).addClass("active");
});
center.addEventListener("click", function () {
	$(".justify").removeClass("active");
	ul.style.justifyContent = "center";
	$(this).addClass("active");
});
end.addEventListener("click", function () {
	$(".justify").removeClass("active");
	ul.style.justifyContent = "end";
	$(this).addClass("active");
});

alignstart.addEventListener("click", function () {
	$(".align").removeClass("active");
	ul.style.alignItems = "start";
	$(this).addClass("active");
});
aligncenter.addEventListener("click", function () {
	$(".align").removeClass("active");
	ul.style.alignItems = "center";
	$(this).addClass("active");
});
alignend.addEventListener("click", function () {
	$(".align").removeClass("active");
	ul.style.alignItems = "end";
	$(this).addClass("active");
});

order.addEventListener("click", function () {
	li.classList.toggle("order5");
	console.log($(this).css("background-color"));
	if ($(this).css("background-color") == "rgb(51, 51, 51)") {
		$(this).css("background-color", "#35509d");
	} else {
		$(this).css("background-color", "rgb(51, 51, 51)");
	}
});
