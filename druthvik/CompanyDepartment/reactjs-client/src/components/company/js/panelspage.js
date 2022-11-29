




$(document).ready(function(){
    $('[data-toggle="duplicate"]').confirmation();   
});





$(document).ready(function(){
    $('#help-reoccurring').popover({
title: "HTML", 
content: "Blabla", 
html: true, placement: "left", trigger: "focus"}); 
});





$('.add').click(function(){
    $('.all').prop("checked",false);
    var items = $("#list1 input:checked:not('.all')");
    var n = items.length;
  	if (n > 0) {
      items.each(function(idx,item){
        var choice = $(item);
        choice.prop("checked",false);
        choice.parent().appendTo("#list2");
      });
  	}
    else {
  		alert("Choose an available item");
    }
});

$('.remove').click(function(){
    $('.all').prop("checked",false);
    var items = $("#list2 input:checked:not('.all')");
	items.each(function(idx,item){
      var choice = $(item);
      choice.prop("checked",false);
      choice.parent().appendTo("#list1");
    });
});

/* toggle all checkboxes in group */
$('.all').click(function(e){
	e.stopPropagation();
	var $this = $(this);
    if($this.is(":checked")) {
    	$this.parents('.list-group').find("[type=checkbox]").prop("checked",true);
    }
    else {
    	$this.parents('.list-group').find("[type=checkbox]").prop("checked",false);
        $this.prop("checked",false);
    }
});

$('[type=checkbox]').click(function(e){
  e.stopPropagation();
});

/* toggle checkbox when list group item is clicked */
$('.list-group a').click(function(e){
  
    e.stopPropagation();
  
  	var $this = $(this).find("[type=checkbox]");
    if($this.is(":checked")) {
    	$this.prop("checked",false);
    }
    else {
    	$this.prop("checked",true);
    }
  
    if ($this.hasClass("all")) {
    	$this.trigger('click');
    }
});





$(document).ready(function(){
    $('#help-reoccurring2').popover({
title: "HTML", 
content: "Blabla", 
html: true, placement: "left", trigger: "focus"}); 
});




function myFunctionx() {
    document.getElementById("myFormx").reset();
}



$(document).ready(function(){
    $('[data-toggle="stereo-low"]').confirmation();   
});








$(document).ready(function(){
    $('[data-toggle="stereo-normal"]').confirmation();   
});





$(document).ready(function(){
    $('[data-toggle="stereo-high"]').confirmation();   
});




$(document).ready(function(){
    $('[data-toggle="boundary-low"]').confirmation();   
});




$(document).ready(function(){
    $('[data-toggle="boundary-normal"]').confirmation();   
});



$(document).ready(function(){
    $('[data-toggle="boundary-high"]').confirmation();   
});








$(document).ready(function() {
    var $window = $(window);

        // Function to handle changes to style classes based on window width
        function checkWidth() {
        if ($window.width() < 980) {
            $('.modal-footer button').removeClass('btn-md').addClass('btn-sm');
            };

        if ($window.width() >= 980) {
            $('.modal-footer button').removeClass('btn-sm').addClass('btn-md');
        }
    }

    // Execute on load
    checkWidth();

    // Bind event listener
        $(window).resize(checkWidth);
});





$('.add').click(function(){
    $('.all').prop("checked",false);
    var items = $("#list1 input:checked:not('.all')");
    var n = items.length;
  	if (n > 0) {
      items.each(function(idx,item){
        var choice = $(item);
        choice.prop("checked",false);
        choice.parent().appendTo("#list2");
      });
  	}
    else {
  		alert("Choose an available item");
    }
});

$('.remove').click(function(){
    $('.all').prop("checked",false);
    var items = $("#list2 input:checked:not('.all')");
	items.each(function(idx,item){
      var choice = $(item);
      choice.prop("checked",false);
      choice.parent().appendTo("#list1");
    });
});

/* toggle all checkboxes in group */
$('.all').click(function(e){
	e.stopPropagation();
	var $this = $(this);
    if($this.is(":checked")) {
    	$this.parents('.list-group').find("[type=checkbox]").prop("checked",true);
    }
    else {
    	$this.parents('.list-group').find("[type=checkbox]").prop("checked",false);
        $this.prop("checked",false);
    }
});

$('[type=checkbox]').click(function(e){
  e.stopPropagation();
});

/* toggle checkbox when list group item is clicked */
$('.list-group a').click(function(e){
  
    e.stopPropagation();
  
  	var $this = $(this).find("[type=checkbox]");
    if($this.is(":checked")) {
    	$this.prop("checked",false);
    }
    else {
    	$this.prop("checked",true);
    }
  
    if ($this.hasClass("all")) {
    	$this.trigger('click');
    }
});





$(window).on('resize', function(event){
    var $table = $('#table');
    if ($(window).width() < 739){
			$table.bootstrapTable('toggleView', true);
        };
    });





//when modal opens
$('#collapseOne').on('shown.bs.collapse', function (e) {
  $(".mask").css({ opacity: 0.25 });
})

//when modal closes
$('#collapseOne').on('hidden.bs.collapse', function (e) {
  $(".mask").css({ opacity: 1 });
})

//when modal opens
$('#collapseTwo').on('shown.bs.collapse', function (e) {
  $(".mask").css({ opacity: 0.25 });
})

//when modal closes
$('#collapseTwo').on('hidden.bs.collapse', function (e) {
  $(".mask").css({ opacity: 1 });
})





$('#one').each(function(index, item) {
    $(item).find('.one').css(
        'width', 50 / $(item).find('.one').length + '%'
    )
});






$('#two').each(function(index, item) {
    $(item).find('.two').css(
        'width', 50 / $(item).find('.two').length + '%'
    )
});






