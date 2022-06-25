var typeVal = $('#typeVal'), selectOpt = $('#selectOpt');
var checkChar = typeVal.val();

function submitVal(e){
	if(typeVal.val().trim() == ''){
		typeVal.css('border',"1px solid red");
		$('.error').text('Please check your input');
	}
	else if(typeVal.val().trim() !== ''){
		selectOpt.prepend('<option value="'+typeVal.val()+'" selected>'+typeVal.val()+'</option>');
		setAlert(typeVal);
	}
}

$('#selectOpt').on('change', function(){
    setAlert(selectOpt);
});

function setAlert(value) {
    $('.notify').append('<div class="addedValue flex-shrink-0" style="border-color:'+value.val()+';color:'+value.val()+';box-shadow: 0px 5px 25px -8px '+value.val()+' ">Added your value('+value.val()+') in dropdown</div>')
		setTimeout(function(){
			$('.notify .addedValue').first().remove();
		}, 5000);
	typeVal.val('');
}


$('#typeVal').keyup(function(e){
	if(e.keyCode == 13){
		submitVal();
	}
	if($(this).val().trim() !== ''){
		$(this).css('border-color','#555');
		$('.error').text('');
	}
});

