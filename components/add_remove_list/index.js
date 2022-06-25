let input = $('#getItemVal');
let items = [];
let text = "";

$(input).keyup(function(event){
	if(event.keyCode == 13){
		add();
	}
});

function add(){
	var value = input.val().trim();
	if(value !== ""){
		input.removeClass('border border-danger');
		items.push(value);
		printHere();
		input.val("");
		console.log(items);
	}else{
		input.addClass('border border-danger');
	}
}

function printHere(){
	let myItems = items.map((item, index) => '<li class="d-flex justify-content-between pb-2"><div>'+item+'</div><button type="button" class="btn px-3 btn-sm btn-danger deleteItem rounded-pill" id="delete_'+index+'" key="'+index+'">Delete</button></li>'); 
	$('.items').html(myItems);
}

$(document).on("click", ".deleteItem", function(){
	let key = $(this).attr('key');
	items.splice(key, 1);
	console.log(items)
	printHere();
})

