$(document).ready(function () {
	$("#updateLeft").focus();
});

$(document).keypress(function (e) {
	if (e.which == 13) {
		sendMsgFormLeft();
		sendMsgFromRight();
	}
});

function sendMsgFormLeft() {
	var leftmsg = document.getElementById("updateLeft");
	if (leftmsg.value != "") {
		document.getElementById("chatCanvas").innerHTML +=
			'<div class="leftMessage"><span class="text-left d-inline-block px-3 py-1 text-white my-1">' +
			leftmsg.value +
			'</span> <br> <small class="text-muted">' +
			new Date().toLocaleDateString() +
			" " +
			new Date().toLocaleTimeString() +
			"</div>";
		leftmsg.value = "";
	}
}

function sendMsgFromRight() {
	var righttmsg = document.getElementById("updateRight");
	if (righttmsg.value != "") {
		document.getElementById("chatCanvas").innerHTML +=
			'<div class="rightMessage text-right"><span class="text-left d-inline-block bg-secondary text-white px-3 py-1 my-1">' +
			righttmsg.value +
			'</span> <br> <small class="text-muted">' +
			new Date().toLocaleDateString() +
			" " +
			new Date().toLocaleTimeString() +
			"</samll></div>";
		righttmsg.value = "";
	}
}
