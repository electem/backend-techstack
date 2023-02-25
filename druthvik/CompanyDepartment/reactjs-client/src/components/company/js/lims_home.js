function initCalendar(){
	$("div[class*='fc-toolbar'] > div > button[type='button']").click(function() {
		var montYear = $("div[class*='fc-center'] ").text();
		$("input[id*='mainForm:monthYear']").val(montYear);
		$("button[id*='mainForm:dummyUpdate']").click();
		$("button[id*='mainForm:homeReportCountColours']").click();
		//initCountAndColour();
		$("button[id*='mainForm:clickOnCurrentDateButton']").click();
	});
	$("div[class*='fc-button-group'] > button[type='button']").click(function() {
		var montYear = $("div[class*='fc-center'] ").text();
		$("input[id*='mainForm:monthYear']").val(montYear);
		$("button[id*='mainForm:dummyUpdate']").click();
		$("button[id*='mainForm:homeReportCountColours']").click();
		
	});
}



/*function initCountAndColour(){
	$(".colorList > div > ul > li > input").each(function(){
		var c = $(this).attr("value");
		var date = c.substring(0,10);
		var count = c.substring(11,12);
		var size = c.length;
		var colour = c.substring(12,size);
		if(colour =='RED'){
		$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				append("<hr size=\"10\" style=\"border-top: 6px solid red;border-bottom-style: none;margin-top: 40px;\"/>");
		$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<span class=\"badge\" style=\"float:right\">"+count+"</span>");
		}
		else if(colour == 'ORANGE'){
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				append("<hr size=\"10\" style=\"border-top: 6px solid orange;border-bottom-style: none;margin-top: 40px;\"/>");
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<span class=\"badge\" style=\"float:right\">"+count+"</span>");
		}
		else{
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				append("<hr size=\"10\" style=\"border-top: 6px solid green;border-bottom-style: none;margin-top: 40px;\"/>");
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<span class=\"badge\" style=\"float:right\">"+count+"</span>");
		}
	});
}
*/

function initCountAndColour(){
	//$("button[id*='mainForm:buttonForUpdate']").click();
	$(".colorList > div > ul > li > p").each(function(){
		var id = $(this).text().split(" ");
		var date = id[1];
		var colorAndCount = id[2];
	//	var f = $("input[id*='dateValue1']").val();
		//var c = $(this).attr("value");
		//var size = f.length;
		//var countColour = c.substring(11,size);
		var count = colorAndCount.match(/(\d+)/g);
		var colour = colorAndCount.match( /([a-zA-Z]+)/g);
		if(colour =='RED'){
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<div><div class=\"cal-alert-cell alertsRed\"></div><span class=\"badge badge2\" style=\"\">"+count+"</span></div>"); 
		}else if (colour =='YELLOW') {
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<div><div class=\"cal-alert-cell alertsYellow\" style=\"position: static;\"></div><span class=\"badge badge2\" style=\"\">"+count+"</span></div>");
		} 
		else if (colour =='ORANGE') {
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<div><div class=\"cal-alert-cell alertsOrange\"></div><span class=\"badge badge2\" style=\"\">"+count+"</span></div>");
		} 
		else if (colour =='GREEN'){
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<div><div class=\"cal-alert-cell alertsGreen\"></div><span class=\"badge badge2\" style=\"\">"+count+"</span></div>"); 
		} 
		else{
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"']").
				prepend("<div><div class=\"cal-alert-cell alertsGrey\"></div><span class=\"badge badge2\" style=\"\">"+count+"</span></div>"); 
		} 
	});
}

function resetCountAndColours(){
	//$("button[id*='mainForm:buttonForUpdate']").click();
	$(".colorList > div > ul > li > p").each(function(){
		var id = $(this).text().split(" ");
		var date = id[1];
		var colorAndCount = id[2];
	//	var f = $("input[id*='dateValue1']").val();
		//var c = $(this).attr("value");
		//var size = f.length;
		//var countColour = c.substring(11,size);
		var count = colorAndCount.match(/(\d+)/g);
		var colour = colorAndCount.match( /([a-zA-Z]+)/g);
		if(colour =='RED'){
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"'] > div").remove("div");
		}else if (colour =='YELLOW') {
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"'] > div").remove("div");
		} 
		else if (colour =='ORANGE') {
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"'] > div").remove("div");
		} 
		else if (colour =='GREEN'){
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"'] > div").remove("div");
		} 
		else{
			$("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+date+"'] > div").remove("div"); 
		} 
	});
}


function fireJsfCreateAppointmentShow() {
	$('#schedule_new_eventModal').modal('show');
	$("input[name=default_header_footer]").attr('checked', false);
	$("div[id*='opt1']").hide();
	$("div[id*='opt2']").hide();
}

function endDateSetNull(){
	$("div[id*='dummyId'] > button").click();
}

function endDateAfter() {
	if ($("input[name='endOption']:checked").val() == "2") {
			$("div[id*='NumberWeek1']").show();
			$("div[id*='dummy3']").hide();
	}else if($("input[name='endOption']:checked").val() == "3") {
			$("div[id*='dummy3']").show();
			$("div[id*='NumberWeek1']").hide();
	}else{
		$("div[id*='dummy3']").hide();
		$("div[id*='NumberWeek1']").hide();	
	}

}

function hideRepeatEventFields()
{
	if($("div[id*='repeat'] > select").val() === "Monthly"){
		$("div[id*='dummyId']").show();
		$("div[id*='hideWeeklyBlock']").hide();
		$("div[id*='dummyRowHide']").hide();
		$("div[id*='AfterDiv']").hide();
	}
	if($("div[id*='repeat'] > select").val() === "Weekly"){
		$("div[id*='hideWeeklyBlock']").show();
		$("div[id*='AfterDiv']").show();
		$("div[id*='dummyRowHide']").hide();
	}if($("div[id*='repeat'] > select").val() === "Daily"){
		$("div[id*='dummyId']").show();
		$("div[id*='dummyRowHide']").show();
		$("div[id*='hideWeeklyBlock']").hide();
		$("div[id*='AfterDiv']").show();
	}
}

function JSFGetSelectedRadioButton(str){
	var str1 = str;
	$("div[id*='dummydiv'] > input").val(str);
	$("div[id*='dummydiv'] > input").click();
	$("button[id*='mytext']").click();
}


function donutChart(){
	var options = {packages: ['corechart'], callback : drawChart};
	google.load('visualization', '1', options);
     function drawChart() {
       var data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Highly out of Spec',    parseInt(redCount)],
		['Moderately out of Spec', parseInt(orangeCount)],
		['Slightly out of Spec', parseInt(yellowCount)],
		['In Spec',  parseInt(greenCount)],
		['BLUE',   parseInt(blueCount)],
		['INDIGO', parseInt(indigoCount)],
		['VIOLET', parseInt(violetCount)]
       ]);

       var options = {
		   legend: 'none',
	         chartArea:{left:20,top:5,width:'100%',height:'100%'},
	         pieSliceText: 'none',
	         pieHole: 0.4,
	         slices: {
	             0: { color: 'red' },
	             1: { color: 'orange' },
	             2: { color: 'yellow'},
	             3: { color: 'green'},
	             4: { color: 'blue'},
	             5: { color: 'indigo'},
	             6: { color: 'violet'}
	           }
       };
       chart = new google.visualization.PieChart(document.getElementById('donutchart'));
       chart.draw(data, options);
       google.visualization.events.addListener(chart, 'select', onAreaSliceSelected);
       
       function onAreaSliceSelected(){
      	 var selectedItem = chart.getSelection()[0];
	      	if (selectedItem) { 
	      		OnClickPieChartReportColor(data.getValue(selectedItem.row, 0));
	      	}
       	}
            
     }
     var selectedUserDate = $("input[id*='selectedDateInputBox']").val();
     var oldSelectedDate = $("input[id*='oldSelectedDateInputBox']").val();
     if(oldSelectedDate && oldSelectedDate != ""){
    	 $("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+oldSelectedDate+"']").attr('style', 'border: solid 1px #C6D6DF !important');
     }
     if(selectedUserDate && selectedUserDate != ""){
    	 $("div[class*='fc-content-skeleton'] > table > thead > tr > td[data-date*='"+selectedUserDate+"']").attr('style', 'border: solid 2px solid #1464F6 !important');
     }
}

function OnClickPieChartReportColor(reportColor) {
	$("div[id*='newpanel'] > a")
	.each(
			function() {
				if (reportColor == "Highly out of Spec") {
					if ($(this).attr("class") == "ui-commandlink ui-widget alert redcolor test123") {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else if (reportColor == "Moderately out of Spec") {
					if ($(this).attr("class") == "ui-commandlink ui-widget alert orangecolor test123") {
						$(this).show();
					} else {
						$(this).hide();
					}
				} else if(reportColor == "Slightly out of Spec")
					if ($(this).attr("class") == "ui-commandlink ui-widget alert yellowcolor test123"){
						$(this).show();
					}else{
						$(this).hide();
					}
				else {
					if ($(this).attr("class") == "ui-commandlink ui-widget alert greencolor test123") {
						$(this).show();
					} else {
						$(this).hide();
					}
				}
			})
	reportColor = null;
}

function colourCount(str){

	if(str === 'RED') {
		redCount ++ ;
	}
	if(str === 'ORANGE') {
		orangeCount ++ ;
	}
	if(str === 'YELLOW'){
		yellowCount ++ ;
	}
	if(str === 'GREEN'){
		greenCount ++ ;
	}
	if(str === 'BLUE'){
		blueCount ++ ;
	}
	if(str === 'INDIGO'){
		indigoCount ++ ;
	}
	if(str === 'VIOLET'){
		violetCount ++ ;
	}
}


function checkReminderDeleteMarkEvent1(str, id) {
	var nextDate = $("div[data-evetdate*='remDate'] > input:nth-child(2)").val();//next date.
	if (str != "" && str != null) {
		var ch = str.split("#");
		if(ch.indexOf(nextDate) != -1){
			$("div[data-eventNext*='"+id+"']").hide();
		}
	}
}

function checkReminderDeleteMarkEvent2(str, id) {
	var selectedDate = $("div[data-evetdate*='remDate'] > input:nth-child(1)").val();//selected date.
	if (str != "" && str != null) {
		var ch = str.split("#");
		if(ch.indexOf(selectedDate) != -1){
			$("div[data-eventSelected*='"+id+"']").hide();
			countrem--;
		}
		$("label[id*='eventcount'] ").text(countrem);
	}
}


function checkMarkComplete(str , id, isNext){
	var selectedDate = $("div[data-evetdate*='remDate'] > input:nth-child(1)").val();//selected date.
	var nextDate = $("div[data-evetdate*='remDate'] > input:nth-child(2)").val();//next date.
	if (str != "" && str != null){
		var ch = str.split("#");
		if(isNext === 'true' && ch.indexOf(nextDate) != -1 && $("div[data-editevent*='markCompleteEvent'] > div > span").text() == ""){
			$("div[data-editevent*='"+ id +"'] > div").css("display","block");
		}else {
			$("div[data-editevent*='"+ id +"'] > div").css("display","none");
		}
		if(isNext === 'false' && ch.indexOf(selectedDate) != -1 && $("div[data-editevent*='markCompleteEvent'] > div > span").text() == ""){
			$("div[data-editevent*='"+ id +"'] > div").css("display","block");
		}
	}
}

function checkSingleOrRepeat(id){
	if(id == 'Repeat'){
		$("input[id*=repeatTxt]").val('Daily');
		$("input[id*=repeatTxt]").click();
		$("button[id*='BtnForclick']").click();
	}else{
		$("input[id*=repeatTxt]").val('None');
		$("input[id*=repeatTxt]").click();
		$("button[id*='BtnForclick']").click();
	}
	$("div[data-callevent*='reminderListener'] > a").click();
	//fireJsfLinkClick('openCreateAppointment');
}

function checkCalenderTitleEmpty(event) {
	if (event === 'single') {
		if ($("input[id*='evtTitle']").val() == "") {
			$("button[id*='checkSingleTitleEmpty']").click();
		}
	}else if(event === 'edit'){
		if ($("input[id*='editEventTitle']").val() == "") {
			$("button[id*='checkSingleTitleEmpty']").click();
		}
	}
	else  {
		if ($("input[id*='evtTitle1']").val() == "") {
			$("button[id*='checkRepeatTitleEmpty']").click();
		}
	}
}
function checkEditCalenderTitleEmpty(){
	if ($("input[id*='editEventTitle']").val() == ""){
		$("button[id*='checkTitleEmpty']").click();
	}
}

function singleEventEndValue(){
	var month = $("select[id*='singleEventEndMonth']").val();
	var date = $("select[id*='singleEventEndDate']").val();
	var year = $("select[id*='singleEventEndYear']").val();
	var hour = $("select[id*='singleEventEndHours']").val();
	var minutes = $("select[id*='singleEventEndMinutes']").val();
	$("input[id*='singleEventEndValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='singleEventEndValueButton']").click();
}

function singleEventValues(){
	var month = $("select[id*='singleEventMonth']").val();
	var date = $("select[id*='singleEventDate']").val();
	var year = $("select[id*='singleEventYear']").val();
	var hour = $("select[id*='singleEventHours']").val();
	var minutes = $("select[id*='singleEventMinutes']").val();
	$("input[id*='singleEventValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='singleEventButton']").click();
}

function repeatEventEndValue(){
	var month = $("select[id*='repeatEventEndMonth']").val();
	var date = $("select[id*='repeatEventEndDate']").val();
	var year = $("select[id*='repeatEventEndYear']").val();
	var hour = $("select[id*='repeatEventEndHours']").val();
	var minutes = $("select[id*='repeatEventEndMinutes']").val();
	$("input[id*='repeatEventEndValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='repeatEventEndValueButton']").click();
}

function repeatEventValues(){
	var month = $("select[id*='repeatEventMonth']").val();
	var date = $("select[id*='repeatEventDate']").val();
	var year = $("select[id*='repeatEventYear']").val();
	var hour = $("select[id*='repeatEventHours']").val();
	var minutes = $("select[id*='repeatEventMinutes']").val();
	$("input[id*='repeatEventValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='repeatEventValueButton']").click();
}

function UpdateReminderListAfterSave(){
	$("a[id*='commandLinkForDisplayingReminderAfterSave']").click();
}

function editSingleEventValue(){
	var array = $("input[id*='evtFrom2_input']").val().split(' ');
	var array1 = array[0].split('/');
	var array2 = array[1].split(':');
	$("select[id*='editSingleEventMonth']").val(array1[0]);
	$("select[id*='editSingleEventDate']").val(array1[1]);
	$("select[id*='editSingleEventYear']").val(array1[2]);
	$("select[id*='editSingleEventHours']").val(array2[0]);
	$("select[id*='editSingleEventMinutes']").val(array2[1]);
	editSingleEventValueEnd();
}

function editSingleEventValueEnd(){
	var arrayEnd = $("input[id*='evtTo3_input']").val().split(' ');
	var arrayEnd1 = arrayEnd[0].split('/');
	var arrayEnd2 = arrayEnd[1].split(':');
	$("select[id*='editSingleEventMonthEnd']").val(arrayEnd1[0]);
	$("select[id*='editSingleEventYearEnd']").val(arrayEnd1[2]);
	$("select[id*='editSingleEventDateEnd']").val(arrayEnd1[1]);
	$("select[id*='editSingleEventHoursEnd']").val(arrayEnd2[0]);
	$("select[id*='editSingleEventMinutesEnd']").val(arrayEnd2[1]);
}

function editEventEndValue(){
	var month = $("select[id*='editSingleEventMonthEnd']").val();
	var date = $("select[id*='editSingleEventDateEnd']").val();
	var year = $("select[id*='editSingleEventYearEnd']").val();
	var hour = $("select[id*='editSingleEventHoursEnd']").val();
	var minutes = $("select[id*='editSingleEventMinutesEnd']").val();
	$("input[id*='editEventEndValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='editEventEndValueButton']").click();
}

function editEventValues(){
	var month = $("select[id*='editSingleEventMonth']").val();
	var date = $("select[id*='editSingleEventDate']").val();
	var year = $("select[id*='editSingleEventYear']").val();
	var hour = $("select[id*='editSingleEventHours']").val();
	var minutes = $("select[id*='editSingleEventMinutes']").val();
	$("input[id*='editEventValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	$("button[id*='editEventValueButton']").click();
}


/*function monthYear(){
	$("button[class*='fc-prev-button ui-button ui-state-default ui-corner-left']").click(function(){
		var montYear = $("div[class*='fc-center'] ").text();
		$("input[id*='mainForm:monthYear']").val(montYear);
		$("button[id*='mainForm:dummybutton']").click();
	}); 
	$("button[class*='fc-next-button ui-button ui-state-default ui-corner-right']").click(function(){
		var montYear = $("div[class*='fc-center'] ").text();
		$("input[id*='mainForm:monthYear']").val(montYear);
		$("button[id*='mainForm:dummybutton']").click()	;
	}); 
}*/

function removeBulletsFromDataList(){
	$("li[class*='ui-datalist-item']").attr('style', 'list-style: none !important');
	$("div[id*='dummyDataList']").attr('style', 'border:none');
}

function getPaginatorsNumber(){
	var num = PF('dummyDataList').paginator.getCurrentPage();
	var num = $('formPendingReportId:formPendingPanelId').pagination('getCurrentPage');
}

function tabRefresh(){
	setTimeout(function(){$("a[href*='#tab3worklistdefault']").click();}, 500);
	setTimeout(function(){$("a[href*='#tab1worklistdefault']").click();}, 1000);
}
function searchFavCustPressEnter(event, elementId){
	if(event.keyCode == 13){
		fireJsfButtonClick(elementId);
		event.preventDefault();
		}
	}
function loadPendingLateReport(){
	//alert('Hi');
	//$("a[href*='#tab1worklistdefault']").click();
	//$("a[href*='#tab3worklistdefault']").click();
	//$("a[href*='#tab1worklistdefault']").click();
	//$("div[id='myTabContentForworkList'] > div > div > div:nth-child(2)").find("div[class='tab-content']").find("div:nth-child(3)").removeClass('active');
	//$("div[id='myTabContentForworkList'] > div > div > div:nth-child(2)").find("div:nth-child(3)").removeClass("tab-pane text-center active in").addClass("tab-pane text-center in")
}

function loadproperdaysforselectedmonth(monthid, dayid){
	var value = $("select[id*='"+monthid+"']").val();
	$("select[id*='"+dayid+"']")[0][29].disabled = false;
	$("select[id*='"+dayid+"']")[0][30].disabled = false;
	$("select[id*='"+dayid+"']")[0][31].disabled = false;
	if(value === "01" || value == "03" || value == "05" || value == "07" || value == "08" || value == "10" || value == "12"){
		
		$("select[id*='"+dayid+"']")[0][31].disabled = false ;
	} else if(value == '04' || value == '06' || value == '09' || value == '11'){
		
		$("select[id*='"+dayid+"']")[0][31].disabled = true ;
	} else if(value == '02'){
		
		$("select[id*='"+dayid+"']")[0][29].disabled = true ;
		$("select[id*='"+dayid+"']")[0][30].disabled = true ;
		$("select[id*='"+dayid+"']")[0][31].disabled = true ;
	}
}
