
jQuery(document).ready(function($) {
	/*var editor = $("#rptForm\\:mainNotes_input").cleditor();
	$(".ui-widget-content iframe").each(function(index, obj) {

		$(obj).contents().find('body').bind('paste', function() {

			setTimeout(function() {
				var temp = cleanHTML($(editor[index].doc.body).html())
				$(editor[index].doc.body).html(temp);

			}, 200);

		});
		$("#rptForm\\:mainNotes").css( "width", "900" );
		$("#rptForm\\:mainNotes .ui-editor").css( "width", "900" );
		$("#rptForm\\:mainNotes_input").css( "width", "900" );
		$("#rptForm\\:mainNotes iframe").css( "width", "900" );
	});*/
	
	//Disable form submit on hitting ENTER key
	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	        event.preventDefault();
	        return false;
	    }
	});
});

//removes MS Office generated guff
function cleanHTML(input) {
  // 1. remove line breaks / Mso classes
  var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g; 
  var output = input.replace(stringStripper, ' ');
  // 2. strip Word generated HTML comments
  var commentSripper = new RegExp('<!--(.*?)-->','g');
  var output = output.replace(commentSripper, '');
  
  var pSripper = new RegExp('<p (.*?)','g');
  var output = output.replace(pSripper, '<p');
  
  var poSripper = new RegExp('o:p','g');
  var output = output.replace(poSripper, 'p');
  
  var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
  // 3. remove tags leave content if any
  output = output.replace(tagStripper, '');
  // 4. Remove everything in between and including tags '<style(.)style(.)>'
  var badTags = ['style', 'script','applet','embed','noframes','noscript'];
  
  for (var i=0; i< badTags.length; i++) {
    tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
    output = output.replace(tagStripper, '');
  }
  // 5. remove attributes ' style="..."'
  var badAttributes = ['style', 'start'];
  for (var i=0; i< badAttributes.length; i++) {
    var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
    output = output.replace(attributeStripper, '');
  }
  return output;
}