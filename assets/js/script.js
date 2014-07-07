//cart object
var cart = {
	items: []
};


//when document ready
$(function(){
	//look for search box
	var txtSearch = $("input#txt_search");
	if(txtSearch != null)
	{
		//bind with focus event
		txtSearch.focus(function(){
			$(this).val('');
		});
	}
});