
//var cellId = null; // 2-24 at 7:42a

function onCompleteRecalc(c) {
	// if (cellId != null)
	// document.getElementById(cellId).focus();
	// $.unblockUI();
}

function onStartRecalc(c) {
	// cellId = null;
	// $.blockUI(
	// {
	// message : '<h2>Recalculating...</h2>'
	// });
}


function onBlurCell(c) {
}

function onFocusCell(c) {
	// cellId = c.id;
}

var timeIntervalForAutoLogOut;
var systemLogOutTime;
var CountLogoutTime = 0;
var idleTimeIntervalForAutoLogOut;

function initializeFields() {
	$("#createdReportDate").datetimepicker({dateFormat: 'MM-dd-yyyy HH:mm'});
	$("#scheduleDate").datetimepicker({dateFormat: 'dd-MM-yyyy'});
	$("#fromTime").datetimepicker({dateFormat: 'dd-MM-yyyy'});
	
	updateBackDateLabel();
	changingIconInGridSection();
	/*$(document).keypress(resetTime);
	$("div[id*='rptForm:mainNotes']").find('iframe').contents().find("body").keypress(resetTime);*/
	
	highlightEmptyInputFields();
	autoSaveReport();
	checkTimeAfterLoadingReport();
	if(document.getElementById('serviceTableColumnLength') != null) {
		updateServiceGridHeaderCss();
	}
	
	if($(location).attr('pathname').split("/")[3] === "edit_service_report.jsf"){
		//Disabling the report menu action bar
		$(".reportMenuActionBar > div:nth-child(3)").find("div[class*='toolbar-left']").find("button").attr("disabled",true);
		reOrderServiceReportSections();
		$("input[id*='rptForm:createdDate_input']").css("visibility","hidden");
		$("span[id*='rptForm:createdDate'] > button").css("color","white").css("background-color","#337ab7").css("font-size","small").css("margin-left","34px");
		$("thead[id*='rptForm:metricsToExport'] > tr > th:nth-child(2)").css("background-color","#D9E3E8");
	}
	
	if($(location).attr('pathname').split("/")[3] != "edit_service_report.jsf"){
		setTimeout(function(){ mainNotesEditor('');}, 3000);
	}
	
	if($(location).attr('pathname').split("/")[3] === "edit_log_report.jsf"){
		$("div[id*='rptForm:dataTable'] > div:nth-child(2)").removeAttr("style");
	}
	
	$("button[id='rptForm:dummyButton']").click();
	$("button[id='rptForm:displayErrorMessage']").click();
	
	$("button[id*='displayErrorMessage']").click();
	settingColorForCell();
}
function uploadClick(){
	$(".reportMenuActionBar > div:nth-child(3)").find("div[class*='toolbar-left']").find("button").attr("disabled",true);
}

function checkEnterPressForTestSearch(id){
	if (event.keyCode == 13){
		fireJsfLinkClick(id);
		$("input[id*='setKeyCodeValue']").val(event.keyCode);
	}
}

function serviceGridTableCss(){
	$("div[id*='tplForm:gridTable'] > div > table > tbody > tr").each(function () {
		$("div[id*='tplForm:gridTable'] > div > table > tbody > tr > td > a").each(function () {
			if($(this).attr("title") == "Edit Cell"){
				if($(this).find("img").attr("src").split("/")[3].split("?")[0] == "cellOn.png.jsf"){
					$("img[src*='/javax.faces.resource/template/cellOn.png.jsf?ln=img']").hide();
					$(this).removeClass("ui-commandlink ui-widget").addClass("btn btn-default fa fa-gear Fs20 gray");
				}
			}else if($(this).attr("title") == "Visible Cell"){
				if($(this).find("img").attr("src").split("/")[3].split("?")[0] == "visibleOn.png.jsf"){
					$("img[src*='/javax.faces.resource/template/visibleOn.png.jsf?ln=img']").hide();
					$(this).removeClass("ui-commandlink ui-widget").addClass("btn btn-default fa fa-power-off Fs20 green").attr("style","color:#5fcf80;");
				}else if($(this).find("img").attr("src").split("/")[3].split("?")[0] == "visibleOff.png.jsf"){
					$("img[src*='/javax.faces.resource/template/visibleOff.png.jsf?ln=img']").hide();
					$(this).removeClass("ui-commandlink ui-widget").addClass("btn btn-default fa fa-power-off Fs20 green").attr("style","color:#e60000;");
				}
			}
		});	
		$("div[id*='tplForm:gridTable'] > div > table > tbody > tr > td").each(function () {
			if($(this).find("span").text() == "" && $(this).find("a").attr("class") == undefined){
				$(this).html('<i class="fa fa-ban Fs40" style="margin-left: 30%;color: #DDD;"></i>');
			}
		});
	});	
}

function progressBar(index,eleName){
	if(eleName == 'Next'){
		index = index + 2;
		$('.progress-bar').css('width', index * 20 + '%');
	}else if(index == 1 && eleName == 'Previous'){
		$('.progress-bar').css('width', 20 + '%');
	}else if(index == 2 && eleName == 'Previous'){
		$('.progress-bar').css('width', 40 + '%');
	}else if(index == 3 && eleName == 'Previous'){
		$('.progress-bar').css('width', 60 + '%');
	}else if(index == 4 && eleName == 'Previous'){
		$('.progress-bar').css('width', 80 + '%');
	}else if(index == 5 && eleName == 'Previous'){
		$('.progress-bar').css('width', 100 + '%');
	}
}

function onOffBtnChangeForGridSection(id,btnId,btnText){
	$("."+ id).click();
	if(btnText == 'off'){
		$("."+btnId+" > label:nth-child(1)").addClass("active");
		$("."+btnId+" > label:nth-child(2)").removeClass("active");
	}else{
		$("."+btnId+" > label:nth-child(2)").addClass("active");
		$("."+btnId+" > label:nth-child(1)").removeClass("active");
	}
}

function applyingCssForUnitOnUnitChange(){
	var id = $("input[id*='unitForm:unitValue']").val();
	$(".unitName").each(function () {
		$(this).find("label").removeClass("btn btn-success active").addClass("btn btn-default");
		$(this).find("label").find("i").removeClass("fa fa-building Fs22 white animated swing infinite").addClass("fa fa-building Fs22").css("color","#864001");
	});
	if(id != ""){
		$("."+id).find("label").removeClass("btn btn-default").addClass("btn btn-success active");
		$("."+id).find("label").find("i").removeClass("fa fa-building Fs22").addClass("fa fa-building Fs22 white animated swing infinite").removeAttr("style");
	}
}

function onOffBtnChangeForUnitSection(id, btnId){
	$("div[class*='"+id+"']").click();
	if($("div[class*='"+id+"']").text() == "OFF"){
		$("div[id*='offUnit_"+btnId+"']").parent().show();
		$("div[id*='onUnit_"+btnId+"']").parent().hide();
	}else {
		$("div[id*='offUnit_"+btnId+"']").parent().hide();
		$("div[id*='onUnit_"+btnId+"']").parent().show();
	}
}

function onOffBtnChangeForUnitSectionReady(id){
	if($("div[class*='"+id+"']").text() == "OFF"){
		$("div[id*='offUnit_"+btnId+"']").parent().show();
		$("div[id*='onUnit_"+btnId+"']").parent().hide();
	}else {
		$("div[id*='offUnit_"+btnId+"']").parent().hide();
		$("div[id*='onUnit_"+btnId+"']").parent().show();
	}
}

function onOffBtnChangeForServiceGridSection(id,btnId,btnText){
	$("."+ id).click();
	localStorage.setItem("btnText", btnText);
	localStorage.setItem("btnId", btnId);
	applyingActiveClass();
}

function applyingClassForOnOffBtn(){
	var btnId = localStorage.getItem("btnId");
	var btnText = localStorage.getItem("btnText");
	if(btnText == 'off'){
		$("."+btnId+" > label:nth-child(1)").addClass("active");
		$("."+btnId+" > label:nth-child(1)").css({"background-color": "#990000"});
		$("."+btnId+" > label:nth-child(2)").removeClass("active");
		$("."+btnId+" > label:nth-child(2)").css("background-color", "");
	}else{
		$("."+btnId+" > label:nth-child(2)").addClass("active");
		$("."+btnId+" > label:nth-child(2)").css({"background-color": "#009900"});
		$("."+btnId+" > label:nth-child(1)").removeClass("active");
		$("."+btnId+" > label:nth-child(1)").css("background-color", "");
	}
	localStorage.clear();
}

function activeOnOffBtn(id){
	$("."+id+" > div > table > tbody > tr").each(function () {
		if($(this).find("td:nth-child(5) > div:nth-child(4) > span:nth-child(3)").text() == 'OFF'
			&& !($(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(1)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(1)").addClass("active");
		}else if($(this).find("td:nth-child(5) > div:nth-child(4) > span:nth-child(3)").text() == 'ON'
			&& !($(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(2)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(2)").addClass("active");
		}else if($(this).find("td:nth-child(5) > div:nth-child(2) > span:nth-child(3)").text() == 'OFF'
			&& !($(this).find("td:nth-child(5) > div:nth-child(1) > label:nth-child(1)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(1) > label:nth-child(1)").addClass("active");
		}else if($(this).find("td:nth-child(5) > div:nth-child(2) > span:nth-child(3)").text() == 'ON'
			&& !($(this).find("td:nth-child(5) > div:nth-child(1) > label:nth-child(2)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(1) > label:nth-child(2)").addClass("active");
		}else if($(this).find("td:nth-child(5) > div:nth-child(4) > span:nth-child(3)").text() == 'OFF'
			&& !($(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(1)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(1)").addClass("active");
		}else if($(this).find("td:nth-child(5) > div:nth-child(4) > span:nth-child(3)").text() == 'ON'
			&& !($(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(2)").hasClass("active"))){
			$(this).find("td:nth-child(5) > div:nth-child(3) > label:nth-child(2)").addClass("active");
		}
	});
}


function activeOnOffBtnUnitAttributes(){
		if($("div[id*='inputSwitch1'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address1'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address1'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch1']").hide();
		if($("div[id*='inputSwitch2'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address2'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address2'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch2']").hide();
		if($("div[id*='inputSwitch3'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address3'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address3'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch3']").hide();
		if($("div[id*='inputSwitch4'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address4'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address4'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch4']").hide();
		if($("div[id*='inputSwitch5'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address5'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address5'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch5']").hide();
		if($("div[id*='inputSwitch6'] > div:nth-child(1) > span:nth-child(1)").css("margin-right") === "0px"){
			$("div[id*='input_address6'] > label:nth-child(1)").addClass("active");
		}else {
			$("div[id*='input_address6'] > label:nth-child(2)").addClass("active");
		}$("div[id*='newAttrPanel:inputSwitch6']").hide();
}


function timeOutOnOffBtn(){  
    setTimeout(function(){ callActiveGridSectinOnOffBtn();}, 1000);
}

function timeOutEditorBtn(){  
    setTimeout(function(){ fireJsfLinkClick('dummyAnnoncementButton');}, 1000);
}

function growlMessage(){  
	$("div[class*='ui-growl ui-widget']").css("z-index","999999");
}

function addingPlaceHolder(){  
	$("input[id*='reportForm:fromTime_input']").attr("placeholder","MM/DD/YYYY");
	$("input[id*='reportForm:toTime_input']").attr("placeholder","MM/DD/YYYY");
	$("input[id*='reportForm:scheduleDate_input']").attr("placeholder","MM/DD/YYYY 00:00:00");
}

function validateForm() {
    var x = $("input[id*='emailForm:to']").val();
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	fireJsfButtonClick('reportMenuSendEmailFailed');
    }else {
    	fireJsfButtonClick('reportMenuSendEmail');
    }
}

function callActiveGridSectinOnOffBtn(){
	activeReportGridSectionOnOffBtn('SERVICE_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('PUMP_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('INVENTORY_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('EQUIPMENT_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('WATERMETER_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('NOTES_GRID_PANEL_HEADER');
	activeReportGridSectionOnOffBtn('onOffBtnForGridSection_signatureOnOffBtn');
}

function activeReportGridSectionOnOffBtn(id){
	if(id != 'onOffBtnForGridSection_signatureOnOffBtn'){
		if($("."+id+" > div > div:nth-child(3) > div:nth-child(3) > span:nth-child(3)").text() == "OFF" && 
			!($("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(1)").hasClass("active"))){
				$("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(1)").addClass("active");
				$("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(1)").css({"background-color": "#990000"});
		}else if($("."+id+" > div > div:nth-child(3) > div:nth-child(3) > span:nth-child(3)").text() == "ON" && 
			!($("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(2)").hasClass("active"))){
			$("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(2)").addClass("active");
			$("."+id+" > div > div:nth-child(3) > div:nth-child(2) > label:nth-child(2)").css({"background-color": "#009900"});
		}
	}else{
		if($("."+id+" > span").text() == "OFF" && !($(".btn_signatureOnOffBtn > label:nth-child(1)").hasClass("active"))){
			$(".btn_signatureOnOffBtn > label:nth-child(1)").addClass("active");
			$(".btn_signatureOnOffBtn > label:nth-child(1)").css({"background-color": "#990000"});
		}else if($("."+id+" > span").text() == "ON" && !($(".btn_signatureOnOffBtn > label:nth-child(2)").hasClass("active"))){
			$(".btn_signatureOnOffBtn > label:nth-child(2)").addClass("active");
			$(".btn_signatureOnOffBtn > label:nth-child(2)").css({"background-color": "#009900"});
		}
	}
}
function gridTableCss() {
	$(".reportcreated > button").html("Backdate Report");
	$(".reportcreated > button").css("padding", "4px");
	$(".reportcreated > button").css("width", "120px");
}

function changingIconInGridSection() {
	$("a[class*='ui-commandlink ui-widget fa fa-search fa-fw Fs30']").removeClass("ui-commandlink ui-widget fa fa-search fa-fw Fs30").addClass("fa fa-search fa-fw Fs30");
	$("a[class*='ui-commandlink ui-widget fa fa-trash fa-fw Fs30']").removeClass("ui-commandlink ui-widget fa fa-trash fa-fw Fs30").addClass("fa fa-trash fa-fw Fs30");
}

function calenderPopUpforCreateReport() {
	$("div[id*='ui-datepicker-div']").removeAttr("style").css("position","fixed").css("top","144.861px").css("display","block").css("z-index","222220000000");
}

function rangesForServiceReport() {
	$("table[id*='rptForm:rangeList'] > tbody > tr > td").css("padding-right","10px");
}

function rangesStereotypeForServiceReport() {
	$("table[id*='rptForm:rangeList'] > tbody > tr > td").css("color","black");
}

function onOffButtonAttributes(id) {
	$("div[id*='"+id+"']").click();
}

function headerFooterCheckboxChecked(id) {
	if(id == null){
		if ($("input[id*='headerFooterChkBox']").val() == "true") {
			$(".input_yes").click();
			$(".desc").hide();
		} else {
			$(".input_no").click();
			$(".desc").show();
		}
	}else if(id == 'Yes'){
		$(".input_yes").click();
		$(".desc").hide();
		$("input[id*='headerFooterChkBox']").val("true");
		$(".notesCheckBox").click();
	}else if(id == 'No'){
		$(".input_no").click();
		$(".desc").show();
		$("input[id*='headerFooterChkBox']").val("false");
		$(".notesCheckBox").click();
	}
	fireJsfButtonClick('ButtonForCustomerHeaders');
}

function aligningHeaderFooterContext(value,id){
	$("input[id*='"+id+"']").val(value);
}

function buttonForUnitsReports(id){
	if(id == "unitController"){
		$("button[id*='reportController']").hide();
	}else if(id == "reportController"){
		$("button[id*='unitController']").hide();
	}
}
function fireJsfLinkHrefClick(href){
	$("a[href*='"+href+"']").click()
}

function chartTypeContext(value,id){
	$("input[id*='chartTypeValue']").val(value);
	fireJsfLinkClick(id);
}

function reportMenuUpoloadFile() { 
	$("input[id*='reportEmailFileUpload']").click();
}

function reportMenuEmail(){
	if($('div[id="emailBtn"]').parent().text().trim() == "Submit"){
		$('button[id="reportMenuEmailButton"]').prop('disabled', true);
	}else{
		$('button[id="reportMenuEmailButton"]').prop('disabled', false);
	}
}

function hiddingSaveAndInsertBtn(val){
	$("input[id*='hiddingSaveOrInsertBtn']").val(val);
	$('button[id="managePanelModalSave"]').hide();
	$('button[id="managePanelModalInsert"]').hide();
}

function pumpValuesForSave(){
	var val = $("input[id*='userId']").val();
	
}

function showSaveOrInsertBtnBtn(){
	var value = $("input[id*='hiddingSaveOrInsertBtn']").val();
	if(value === '1' && ($("input[id*='createPanelServiceForm:newPanelName']").val() != "" 
			|| $("select[id='createPanelServiceForm:allPanelName'] option:selected").text() != "Select" 
			|| $("select[id='createPanelServiceForm:oldPanelName'] option:selected").text() != "Select")){
		$('button[id="managePanelModalInsert"]').show();
	}else if(value === '2' && ($("input[id*='createPanelServiceForm:newPanelName']").val() != "" 
			|| $("select[id='createPanelServiceForm:allPanelName'] option:selected").text() != "Select" 
			|| $("select[id='createPanelServiceForm:oldPanelName'] option:selected").text() != "Select")){
		$('button[id="managePanelModalSave"]').show();
	}else{
		$('button[id="managePanelModalInsert"]').hide();
		$('button[id="managePanelModalSave"]').hide();
	}
}

function fireJSFImageManagerActive() {
	$('#tab1').removeClass('active');
	$('#tab2').removeClass('active');
	$('#tab3').removeClass('active');
	$('#tab4').removeClass('active');
	$('#tab5').removeClass('active');
	$('#tab6').removeClass('active');
}

function fireJsfDialogBusySign() {
	$("div[class*='ui-dialog']").css("z-index","9999999999");
}

function fireJsfLinkClick(eleID) {
	$("a[id*='"+eleID+"']").click();
}

function fireJsfVedioLinkClick(eleID) {
	$("div[id*='"+eleID+"']").find('a')[0].click();
	setTimeout(function(){ divClassDisplay();}, 500);
}

function divClassDisplay() {
	$("div[class*='ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow']").css("display","block");
}


function fireJsfButtonClick(eleID) {
	$("button[id*='"+eleID+"']").click();
}

function fireJsfModalShow(eleID) {
	$('#'+eleID).modal('show');
}

function fireJsfModalHide(eleID) {
	$('#'+eleID).modal('hide');
}

function fireJsfLinkInATable(eleID) {
	$("div[id='"+eleID+"']").parent().click();
}

function errorValidationForForms(id, spanId,buttonId){
	if(id == "equipName"){
		var name = $("input[name='rptForm:equipGridForm:equipName']").val();
		var currentReading = $("input[name='rptForm:equipGridForm:currentReading']").val();
		var previousReading = $("input[name='rptForm:equipGridForm:previousReading']").val();
		var avgGPD = $("input[name='rptForm:equipGridForm:averageGPD']").val();
		var avgGPM = $("input[name='rptForm:equipGridForm:averageGPM']").val();
		
		var isNumCurrentReading = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(currentReading);
		var isNumPreviousReading =  /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(previousReading);
		var isNumAvgGPD = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(avgGPD);
		var isNumAvgGPM = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(avgGPM);
		
		if(!(name!="")){
			$("span[id*='" +spanId+ "']").addClass("error");
			$("span[id*='"+ spanId +"']").text("Name can not be blank.");
		}else if(!isNumCurrentReading || !(currentReading!="")){
			$("span[id*='" +spanId+ "']").addClass("error");
			$("span[id*='"+ spanId +"']").text("Water Meter current reading has to be number and it should be greater than zero and it cannot be empty");
		}else if(!isNumPreviousReading){
			$("span[id*='" +spanId+ "']").addClass("error");
			$("span[id*='"+ spanId +"']").text("Water Meter previous reading has to be number and it should be greater than zero");
		}else if(!isNumAvgGPD || !(avgGPD!="")){
			$("span[id*='" +spanId+ "']").addClass("error");
			$("span[id*='"+ spanId +"']").text("Water Meter Avg. GPD has to be number and it should be greater than zero and it cannot be empty");
		}else if(!isNumAvgGPM || !(avgGPM!="")){
			$("span[id*='" +spanId+ "']").addClass("error");
			$("span[id*='"+ spanId +"']").text("Water Meter Avg. GPM has to be number  and it should be greater than zero and it cannot be empty");
		}
		else {
			fireJsfLinkClick(buttonId);
		}
	}
	else if($("input[id*='"+ id +"']").val() == ""){
		$("span[id*='" +spanId+ "']").addClass("error");
		$("span[id*='"+ spanId +"']").text("Name is required");
	}else if(id == 'name' && $("select[id*='addForm:calculated']").val() == 'true'){
		var formula = $("input[id*='addForm:formula']").val();
		var num = formula.indexOf("_");
		if(num > 0){
			$("span[id*='errorMessageFormula']").addClass("error");
			$("span[id*='errorMessageFormula']").text("Formula test token should not contain '_', it should contain only alphanumeric characters.");
		}else{
			fireJsfLinkClick(buttonId);
		}
	}else {
		fireJsfLinkClick(buttonId);
	}
}

function autoCompleteFunctionality() {
	var length = $("input[id*='searchReports']").val().length;
	if(length >= 3){
		fireJsfLinkClick('searchIconLinkInsertPanels');
	}else {
		fireJsfLinkClick('searchInsertPanelsClose');
	}
}

function iconReplacingForReportMenu(){
	if($('button[id="rptForm:j_idt92:reportSubmitButton"]').text() == "Submit"){
		$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
		$(this).find('td:nth-child(5) > button:nth-child(5)').show();
		$(this).find('td:nth-child(5) > button:nth-child(7)').show();
	}
}

function initializeDataTable() {
	$('[data-toggle="confirmation"]').confirmation();
}

function viewDetails() {
	$("tbody[id*='userTableForm:empTable_data'] > tr > td:nth-child(6) > button:nth-child(1)").click(function() {
		$(event.target.parentElement).parents('td').find("button[id*='empViewdetails']").click();
	});
}

function JSFInitPanel() {
	$("a[id*='panelForm:initpanel']").click();
}

function fireJSFfileUpload() {
	$("input[id*='custTabs:fileupload_input']").click();
}

function fireJSFfileUploadForProduct(eleId) {
	$("input[id*='"+ eleId +"']").click();
}

function fireJSFfireEmailUploadAttch() {
	$("input[id*='emailAttch_input']").click();
}

function openRadioInput(){
	$("input[value*='opt3']").click();
}

function reportModalHideShow(){
	$('#manageTestModal').modal('hide');
	$('#managePanelModal').modal('show');	
}

function reportMenuCalculator(){
	$('#myModal_calc').modal('show');
}

var globalId;
function InitializeVariable(id) {
	globalId = id;
}

function fireJSFDelete() {
	$(event.target.parentElement).parents('td').find('button').confirmation('hide'); // close the small popup
	if (globalId == 'tableDelBtn') {
		$(event.target.parentElement).parents('td').find("a[id*='tableDelBtn']").click(); // Fire JSF button click
	} else if(globalId == 'userGroupDelBtn'){
		$("a[id*='userGroupDelBtn']").click(); //Fire html link click on usergroup.html for deleting the usergroup.
		$(".popover").hide()
	} else {
		$(event.target.parentElement).parents('td').find("a[id*='tableCopyBtn']").click();
	}
}

function fireJSFEditingGridName(id){
	$(id).toggle();
}

function fireJSFOpen() {
	$("div[id*='collapseTwo']").show();
}

function fireJSFClose() {
	$("div[id*='collapseTwo']").hide();
}

function fireJSFShowComponentPanelDetail() {
	$('#myModal7').modal('show');
}

function fireJsfCloseCreateAppointment() {
	$('#schedule_new_eventModal').modal('hide');
}

function fireJSFPermissions() {
	$("a[href*='#collapseTwo']").click();
}

function fireJSFUserSubordinates() {
	$("a[href*='#collapseThree']").click();
}

function fireJSFUserCustomers() {
	$("a[href*='#collapseFour']").click();
}

function fireJSFAccordianClose() {
	if ($("span[id*='outputText']").text() != "Update") {
		if ($("input[id*='userId']").val().length != 0
				&& $("input[id*='pwd1']").val().length != 0
				&& $("input[id*='pwd2']").val().length != 0 && $("input[id*='emailID']").val().length != 0 && !($("input[id*='userId']").val().indexOf(' ') >= 0)) {
				$("#userModal").modal("hide");
		}else {
			if($("input[id*='userId']").val().length == 0){
				$("span[id*='errorMessageUserId']").addClass("error");
				$("span[id*='errorMessageUserId']").text("UserId is required");
			}
			else if($("input[id*='pwd1']").val().length == 0){
				$("span[id*='errorMessagePwd']").addClass("error");
				$("span[id*='errorMessagePwd']").text("password is required");
			}
			else if($("input[id*='emailID']").val().length == 0){
				$("span[id*='errorMessageEmail']").addClass("error");
				$("span[id*='errorMessageEmail']").text("Email is required");
			}
		}
	} else if ($("span[id*='outputText']").text() == "Update") {
		if($("input[id*='emailID']").val().length != 0)
			$("#userModal").modal("hide");
			else{
				$("span[id*='errorMessageEmail']").addClass("error");
				$("span[id*='errorMessageEmail']").text("Email is required");
			}
	}else {
		if($("input[id*='userId']").val().length == 0){
			$("span[id*='errorMessageUserId']").addClass("error");
			$("span[id*='errorMessageUserId']").text("UserId is required");
		}
		if($("input[id*='pwd1']").val().length == 0){
			$("span[id*='errorMessagePwd']").addClass("error");
			$("span[id*='errorMessagePwd']").text("password is required");
		}
		if($("input[id*='emailID']").val().length == 0){
			$("span[id*='errorMessageEmail']").addClass("error");
			$("span[id*='errorMessageEmail']").text("Email is required");
		}
	}
} 

function fireJSFAccordianCloseController() {
	if($("input[id*='name']") .val().length != 0 && $("input[id*='serialNumber']") .val().length != 0 &&
			$("input[id*='userName']") .val().length != 0 && $("input[id*='password']") .val().length != 0){
		$("#myModal9").modal("hide");
	}
	
	if($("input[id*='name']") .val().length != 0 && $("input[id*='serialNumber']") .val().length != 0 &&
			$("input[id*='userName']") .val().length != 0 && $("input[id*='password']") .val().length != 0){
		$("#myModal9").modal("hide");
	}
}

function fireJSFTogglePanel() {
	$("#collapseOne").slideToggle();
}

function fireJSFPanelToggle(){
	$("#collapseOne").show();
}

function fireJSFToggleTests() {
	$("#collapseOne").toggle();
}

function fireJSFFormReset() {
	$("#editUserForm").find('input:text, input:password, input:file, select, textarea').val('');
}

function fireJsfPanelDetails() {
	$(event.target.parentElement).parents('td').find("a[id*='panelDetailsBtn']").click();
}

function fireJSFAssociatedTestOpen() {
	$("div[id*='collapseExample2']").show();
}

function fireJSFEditAssociatedTest() {
	$(event.target.parentElement).parents('td').find("a[id*='associatedTestEditBtn']").click();
}

function fireJsfAssoiciatedTestDetails() {
	$(event.target.parentElement).parents('td').find("a[id*='associatedTestForPanel']").click();
}

function fireJSFEditPanel() {
	$(event.target.parentElement).parents('td').find("a[id*='panelEditBtn']").click();
}

function fireJSFEditRepReport(){
	$(event.target.parentElement).parents('td').find("a[id*='repReportEditBtn']").click();
}

function fireJSFEditUnits() {
	$(event.target.parentElement).parents('td').find("a[id*='editUnits']").click();
}

function fireJSFViewUnit() {
	$(event.target.parentElement).parents('td').find("a[id*='unitDetails']").click();
}

var count = 0;
function fireJsfONOFF() {
	count++;
	if (count != 0) {
		if ($("tbody[id*='custTabs:unitTable'] > tr:nth-child(" + count + ") > td:nth-child(3) > div > span").text() == 'ON') {
			$("tbody[id*='custTabs:unitTable'] > tr:nth-child(" + count	+ ") > td:nth-child(3) >button:nth-child(2)").prop("disabled", false);
		} else {
			$("tbody[id*='custTabs:unitTable'] > tr:nth-child(" + count	+ ") > td:nth-child(3) >button:nth-child(2)").prop("disabled", true);
		}
	}
}

function initCount() {
	count = 0;
}

function fireNewUnitOnSaveToggle() {
	$("div[id*='collapseOne']").toggle();
}

function fireNewUnitOnSaveToggle1() {
	if ($("input[id*='newUnitName']").val().length != 0) {
		$("div[id*='collapseOne']").toggle();
	}
}

function fireJsfAdd() {
	$("a[id*='tableAddBtn']").click();
}

function fireJsfEdit() {
	$(event.target.parentElement).parents('td').find("a[id*='tableEditBtn']").click();
}

function fireJsfBooleanCheckBoxForExceptionReport() {
	$("div[id*='reportForm:exceptionReportAlarmType_panel']").css("z-index","2222222222222");
}

function fireJsfBooleanCheckBoxForSyncPanel() {
	$("div[id*='associatedTemp_panel']").css("z-index","99999999999999999");
}

function fireJsfBooleanCheckBoxForTemplateApplyRanges() {
	$("div[id*='tplForm:templateApplyButton_panel']").css("z-index","9999999999999");
}

function fireJsfBooleanCheckBoxForServiceApplyRanges() {
	$("div[id*='rptForm:serviceGridApplyButton_panel']").css("z-index","9999999999");
}

function fireJsfBooleanCheckBoxForPanelRemoveList() {
	$("div[id*='exportUnitModal']").css("z-index","");
}

function fireJsfBooleanCheckBox() {
	$("div[id*='emailForm:menuCustomer_panel']").css("z-index","2222222222222");
}

function fireJsfBooleanCheckBoxForMetrics() {
	$("div[id*='tblForm:masterrecordtype_panel']").css("z-index","2222222222222");
}

function fireJsfCalenderInModal() {
	$("div[id*='ui-datepicker-div']").css("z-index","999999999999");
}

function fireJsfBooleanCheckBoxForSubordinates() {		
	$("div[id*='editUserForm:subList_panel']").css("z-index","9999999999");		
}		
function fireJsfBooleanCheckBoxForCus() {		
	$("div[id*='editUserForm:custList_panel']").css("z-index","9999999999");		
}

function fireJsfZeroClipButton(id) {
	if(id == "urlButton"){
		$("button[id*='htmlButton']").removeAttr('style');
		$("button[id*='urlButton']").css("background-color","#ddd");
		$("button[id*='urlButton']").css("border-style","solid");
		$("button[id*='urlButton']").css("border-width","2px");
		$("button[id*='urlButton']").css("border-color","CornflowerBlue");
		
	}else if(id == "htmlButton"){
		$("button[id*='urlButton']").removeAttr('style');
		$("button[id*='htmlButton']").css("background-color","#ddd");
		$("button[id*='htmlButton']").css("border-style","solid");
		$("button[id*='htmlButton']").css("border-width","2px");
		$("button[id*='htmlButton']").css("border-color","CornflowerBlue");
		
	}
}

function fireJsfZeroClipButtonMouseOut(id) {
	if(id == urlButton){
		$("button[id*='urlButton']").removeAttr('style');
	}else if(id == htmlButton){
		$("button[id*='htmlButton']").removeAttr('style');
	}
}

function fireJsfMetricAssociate() {
	$(event.target.parentElement).parents('td').find("a[id*='associate']").click();
}

function fireJsfDetails() {
	$(event.target.parentElement).parents('td').find("a[id*='tableDetailsBtn']").click();
}

function fireJsfComponent() {
	$("button[id*='unitComponent']").click();
}

function fireAttchDetails(id) {
	var menuId = id;
	if (menuId == 'msds') {
		$("a[id*='custTabs:msds']").click();
	}
	if (menuId == 'pds') {
		$("a[id*='custTabs:pds']").click();
	}
	if (menuId == 'trainingmaterial') {
		$("a[id*='custTabs:TrainingMaterial']").click();
	}
	if (menuId == 'youtube') {
		$("a[id*='custTabs:YouTube']").click();
	}
}

function fireAttchDetailsClose() {
	$('#attachmentsModal').modal('hide');
	$('#attachmentsModal2').modal('hide');
}

function reOrderServiceReportSections(){  
	if($('#rptForm\\:panelOrder').val() != undefined){
		var arrOfId = $('#rptForm\\:panelOrder').val().split(","); 
	    $('#tempServiceReport').append($("#serviceReportSections > [class*='Grid']"));    
	    for(i=0;i<arrOfId.length;i++)
	        $('#serviceReportSections').append($("#tempServiceReport  > [class*='" + arrOfId[i] + "']"));
	    
	    //setInterval(function(){ onOFFReportSection();}, 2000);
	    var ua = navigator.userAgent.toLowerCase(), iOS = /iPhone|iPad|iPod/i.test(ua);
		if (iOS) {
			setTimeout(function(){ mainNotesEditor('service');}, 25000);
		}else{
			setTimeout(function(){ mainNotesEditor('service');}, 12000);
		}
	}
}

function serviceReportNoteSections(){  
	var ua = navigator.userAgent.toLowerCase(), iOS = /iPhone|iPad|iPod/i.test(ua);
	if (iOS) {
		setTimeout(function(){ mainNotesEditor('service');}, 25000);
		editorHeights();
	}else{
		fireJsfButtonClick('initNoteEditor');
	}
}

function editorHeights() {
	$("div[class*='ui-editor ui-widget-content']").css("height","500px");
	$("div[class='ui-editor ui-widget-content'] > iframe").css("height", "435px");
}

function mainNotesEditor(id){
	if(id == 'service'){
		onOFFReportSection();
		callActiveGridSectinOnOffBtn();
		//Enabling the report menu action bar after page load 
		$(".reportMenuActionBar > div:nth-child(3)").find("div[class*='toolbar-left']").find("button").attr("disabled",false);
	}
	var ua = navigator.userAgent.toLowerCase(), iOS = /iPhone|iPad|iPod/i.test(ua); // Test for iPhone/iTouch/iPad
	if (iOS) {
		if(PF('mainNotes') != null){
			if(PF('mainNotes') != undefined ){
				var $this = PF('mainNotes'), contentWindow = $this.editor.$frame[0].contentWindow, doc = $this.editor.doc = contentWindow.document, $doc = $(doc), buttons = $this.editor.$toolbar.find(".ui-editor-button");
				$this.editor.$frame.show();
				$this.editor.$area.hide();
				$doc.on("keyup mouseup",function() {
					if (!$this.editor.focused) {
						$this.editor.$frame[0].contentWindow.focus();
						window.focus();
						$this.editor.focused = true;
					}
					enabledButtons(buttons);
				});
				buttons.on('click', function(e) {
					setTimeout(function() {
						enabledButtons(buttons);
					}, 2);
				});
			}
		}
	}
}

function serviceCellNotesEditor(id){
	if(id == 'service'){
		onOFFReportSection();
		callActiveGridSectinOnOffBtn();
		//Enabling the report menu action bar after page load 
		$(".reportMenuActionBar > div:nth-child(3)").find("div[class*='toolbar-left']").find("button").attr("disabled",false);
	}
	var ua = navigator.userAgent.toLowerCase(), iOS = /iPhone|iPad|iPod/i.test(ua); // Test for iPhone/iTouch/iPad
	
	if (iOS) {
		var $this = PF('cellComment'), contentWindow = $this.editor.$frame[0].contentWindow, doc = $this.editor.doc = contentWindow.document, $doc = $(doc), buttons = $this.editor.$toolbar.find(".ui-editor-button");
		$this.editor.$frame.show();
		$this.editor.$area.hide();
		$doc.on("keyup mouseup",function() {
			if (!$this.editor.focused) {
				$this.editor.$frame[0].contentWindow.focus();
				window.focus();
				$this.editor.focused = true;
			}
			enabledButtons(buttons);
		});
		buttons.on('click', function(e) {
			setTimeout(function() {
				enabledButtons(buttons);
			}, 2);
		});
	}
}

function userCommentEditor(id){
	var ua = navigator.userAgent.toLowerCase(), iOS = /iPhone|iPad|iPod/i.test(ua); // Test for iPhone/iTouch/iPad
	if (iOS) {
		var $this = PF(id), contentWindow = $this.editor.$frame[0].contentWindow, doc = $this.editor.doc = contentWindow.document, $doc = $(doc), buttons = $this.editor.$toolbar.find(".ui-editor-button");
		$this.editor.$frame.show();
		$this.editor.$area.hide();
		$doc.on("keyup mouseup",function() {
			if (!$this.editor.focused) {
				$this.editor.$frame[0].contentWindow.focus();
				window.focus();
				$this.editor.focused = true;
			}
			enabledButtons(buttons);
		});
		buttons.on('click', function(e) {
			setTimeout(function() {
				enabledButtons(buttons);
			}, 2);
		});
	}
}

function enabledButtons(buttons) {
	$.each(buttons, function(idx, elem) {
		var $elem = $(elem);
		$elem.removeClass('ui-editor-disabled');
		$elem.removeAttr('disabled');
	});
}

function enabledButtons(buttons) {
	$.each(buttons, function(idx, elem) {
		var $elem = $(elem);
		$elem.removeClass('ui-editor-disabled');
		$elem.removeAttr('disabled');
	});
}

function handleClose() {
	var dateValue = $("input[id*='reportForm:rptTabs:scheduleDate_input']").val();
	var emailValue = $("textarea[id*='reportForm:rptTabs:emailId']").val();
	if (dateValue != "" && emailValue != "") {
		PF('scheduleExceptionRptDialog').hide();
	}
}

/*function iconReplacingForReportOption(){
	var permission = $("input[id*='usesrPermission']").val()
	$("tbody[id*='reportForm:rptTable_data'] > tr").each(function () {
		if($(this).find('td:nth-child(3)').text() == "RELEASED"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(5)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "DRAFT" || $(this).find('td:nth-child(3)').text() == "AUTO SAVE NEW"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').show();
			$(this).find('td:nth-child(5) > button:nth-child(5)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(11)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "SUBMITTED"){
			if(permission != "ServiceRep"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(5)').show();
			$(this).find('td:nth-child(5) > button:nth-child(7)').show();
			$(this).find('td:nth-child(5) > button:nth-child(11)').show();
			}else{
				$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
				$(this).find('td:nth-child(5) > button:nth-child(5)').hide();
				$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
				$(this).find('td:nth-child(5) > button:nth-child(11)').show();
			}
		}
	});	
	//reportStatusColor();
}*/

function iconReplacingForReportOption(){
	var permission = $("input[id*='usesrPermission']").val()
	$("tbody[id*='reportForm:rptTable_data'] > tr").each(function () {
		if($(this).find('td:nth-child(3)').text() == "RELEASED"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "DRAFT" || $(this).find('td:nth-child(3)').text() == "AUTO SAVE NEW"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').show();
			$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "SUBMITTED"){
			if(permission != "ServiceRep"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(7)').show();
			}else{
				$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
				$(this).find('td:nth-child(5) > button:nth-child(7)').show();
			}
		}
	});	
}

/*function reportStatusColor(){
	$("tbody[id*='reportForm:rptTable_data'] > tr").each(function () {
		if($(this).find('td:nth-child(3)').text() == "RELEASED"){
			$(this).find('td:nth-child(3)').css("background-color","#adebad");
		}else if($(this).find('td:nth-child(3)').text() == "DRAFT"){
			$(this).find('td:nth-child(3)').css("background-color","#ffcc80");
		}else if($(this).find('td:nth-child(3)').text() == "SUBMITTED"){
			$(this).find('td:nth-child(3)').css("background-color","#ffff99");
		}else if($(this).find('td:nth-child(3)').text() == "AUTO SAVE NEW"){
			$(this).find('td:nth-child(3)').css("background-color","#ffb3b3");
		}
	});	
}*/

function helpShowHide(val,showId,hideId){
	$("table[id*='help'] > tbody > tr").each(function () {
		if($(this).attr("data-tt-parent-id") == val && $(this).css("display") == "none"){
			$(this).show();
			$("button[id*='"+ showId +"']").show();
			$("button[id*='"+ hideId +"']").hide();
		}else if($(this).attr("data-tt-parent-id") == val && $(this).css("display") != "none"){
			$(this).hide();
			$("button[id*='"+ showId +"']").show();
			$("button[id*='"+ hideId +"']").hide();
		}
	});	
}

var colName;
var rowIdxForCopyRange;
var colIdxForCopyRange;

function colAndRowIdxForCopyRange(){
	$("input[id*='rowInx']").val(rowIdxForCopyRange);
	$("input[id*='colInx']").val(colIdxForCopyRange);
	colName = $("div[id*='rptForm:serviceTable'] > div >table >thead > tr>th >span>span")[colIdxForCopyRange].title;
	$("input[id*='colName']").val(colName);
	$("button[id*='dummyColReportButton']").click();
}

function initPanelName() {
	$("button[id*='rowColReportButton']").click();
}

// Highlighting when working in the corresponding cell
function highlightSelectedDatatableRowAndColumn(rowIdx, colIdx) {
	rowIdxForCopyRange = rowIdx;
	colIdxForCopyRange = colIdx;
	var prevRowIdx = $("input[id*='rowInx']").val();
	var prevColIdx = $("input[id*='colIdx']").val();
	//Obtaining the particular row and column ID
	//findIcons(rowIdx, colIdx);
	$("div[id*='rptForm:serviceTable']").parents('table').find('tr > td').each(function () {     //Selecting the table, along with tr and td
		$(this).css("background-color","");                                  // Removing the background-color
	});
	prevRowIdx = rowIdx;
	prevColIdx = colIdx;
	// this method highlight the empty cells with gray color in report section
	//highlightEmptyInputFields();
	
	var colCount = 0
	colIdx = colIdx + 1;
	$("div[id*='rptForm:serviceTable:"+rowIdx+":']").parents('tr').find( "td" ).each(function () {       //Selecting the row 
		if(colCount < colIdx) {
			$(this).css("background-color","#BDD8F6");                                      // Highlighting the row
			colCount ++;
		}
	});
	
	$("div[id*='rptForm:serviceTable']").parents('table')
		.find('tr > td:nth-child('+(colIdx + 1)+')') 
			.each(function (index, value ) {    //Selecting the column
		if(index <rowIdx) {
			$(this).css("background-color","#BDD8F6");                                    // Highlighting the column
		}
		if(index == rowIdx) {							
			$(this).css("background-color","#6297B1");  								  // Highlighting the delected cell
		}
	});
}

function reportStatusForSubmitting(){
	if(($("input[id='rptForm:status']").val() == 'SUBMITTED') || ($("input[id='rptForm:status']").val() == 'RELEASED')){
		$("div[id*='formulaPanel']").find("input,button,textarea,select").attr("disabled", "disabled");
		$("div[id*='rangeId']").find("input,button,textarea,select").attr("disabled", "disabled");
	}
}

function findIcons(rowIdx, colIdx){
	calculatingColorForReport(rowIdx,colIdx);
 	var r = "";
	var id="rangeValue_"+rowIdx+"_"+colIdx;
	var valId = "cellInput_"+rowIdx+"_"+colIdx;
	var integerNum = $("input[class*='"+valId+"']").val();
	if(integerNum!=null && integerNum.indexOf(',') > -1){
		integerNum = integerNum.replace(',','');
	}
	var val = parseFloat(integerNum); 
	//val.replace(',','');
	// val = val.split(',').join('');
	if(integerNum == ""){
		r=$('<i/>').attr({
			class: "fa fa-gear Fs16",
			title: "Edit Cell Notes, Ranges, and View History"
		});
		$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
		$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
	}
	if(val === 0 || val != undefined && val != null && val != ""){
		//val = val.replace(/,/g, "");
		$("input[id*='"+id+"']").each(function (){
			if(r === "" || r[0].className !== "fa fa-check-circle green"){
				if($(this).attr("data-type") == 'HIGHER' || $(this).attr("data-type") == 'LOWER'){
					if($(this).attr("data-min") !== undefined || $(this).attr("data-max") !== undefined) {
						if($(this).attr("data-type") == 'HIGHER'){
							if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
								r=$('<i/>').attr({
									class: "fa fa-exclamation-triangle orange",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-check-circle green');
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-tint yellow');
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-tint red');
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-exclamation-triangle orange");
								}
							}
						}else{
							if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
								r=$('<i/>').attr({
									class: "fa fa-exclamation-triangle orange",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-check-circle green');
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-tint yellow');
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").removeClass('fa fa-tint red');
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-exclamation-triangle orange");
								}
							}
						}
					}
				}else if($(this).attr("data-type") == 'NORMAL'){
					if($(this).attr("data-min") !== undefined || $(this).attr("data-max") !== undefined) {
						if((((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)) || (($(this).attr("data-min") != undefined && val >= $(this).attr("data-min")) && 
										($(this).attr("data-max") != undefined && val <= $(this).attr("data-max")))){
							r=$('<i/>').attr({
								class: "fa fa-check-circle green",
								title: "Edit Cell Notes, Ranges, and View History"
							});
							$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
							$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
							$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
	
							if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
							} else {
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-check-circle green");
							}
						}
					}
				}else if($(this).attr("data-type") == 'HIGHEST' || $(this).attr("data-type") == 'LOWEST'){
					if($(this).attr("data-min") !== undefined || $(this).attr("data-max") !== undefined) {
						if($(this).attr("data-type") == 'HIGHEST'){
							if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
								r=$('<i/>').attr({
									class: "fa fa-tint red",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-tint red");
								}
							}
						}else{
							if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
								r=$('<i/>').attr({
									class: "fa fa-tint red",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-tint red");
								}
							}
						}
					}
				}else if($(this).attr("data-type") == 'HIGH' || $(this).attr("data-type") == 'LOW'){
					if($(this).attr("data-min") !== undefined || $(this).attr("data-max") !== undefined) {
						if($(this).attr("data-type") == 'HIGH'){
							if((((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)) ||
									($(this).attr("data-min") == undefined && $(this).attr("data-max") != undefined && val <= $(this).attr("data-max"))){
								r=$('<i/>').attr({
									class: "fa fa-exclamation-triangle yellow",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").remove();
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-tint yellow");
								}
							}
						}else{
							if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
									((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
								r=$('<i/>').attr({
									class: "fa fa-exclamation-triangle yellow",
									title: "Edit Cell Notes, Ranges, and View History"
								});
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").css("display","initial");
								$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").remove();
								$("button[id*='rangeBtn_"+rowIdx+"_"+colIdx+"']").css("display","none");
								$("button[id*='rangeBtnEmpty_"+rowIdx+"_"+colIdx+"']").css("display","none");
								if($("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class") === undefined){
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"']").append(r);
								} else {
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","");
									$("button[id*='rangeButton_"+rowIdx+"_"+colIdx+"'] > i").attr("class","fa fa-tint yellow");
								}
							}
						}
					}
				}
			}
		});
	} 
}

function onOFFReportSection(){
	if($("input[id*='SERVICE_GRID']").val() == "true"){
		$("div[id*='serviceGridReportSection']").css("display","show");
	}else{
		$("div[id*='serviceGridReportSection']").css("display","none");
	}
	
	if($("input[id*='PUMP_GRID']").val() == "true"){
		$("div[id*='pumpGridReportSection']").css("display","show");
	}else{
		$("div[id*='pumpGridReportSection']").css("display","none");
	}
	
	if($("input[id*='INVENTORY_GRID']").val() == "true"){
		$("div[id*='invetoryGridReportSection']").css("display","show");
	}else{
		$("div[id*='invetoryGridReportSection']").css("display","none");
	}
	
	if($("input[id*='EQUIPMENT_GRID']").val() == "true"){
		$("div[id*='equipmentGridReportSection']").css("display","show");
	}else{
		$("div[id*='equipmentGridReportSection']").css("display","none");
	}
	if($("input[id*='WATERMETER_GRID']").val() == "true"){
		$("div[id*='waterMeterGridReportSection']").css("display","show");
	}else{
		$("div[id*='waterMeterGridReportSection']").css("display","none");
	}
	
	if($("input[id*='NOTES_GRID']").val() == "true"){
		$("div[id*='mainNotesUploader']").css("display","show");
		$("div[id*='mainPhrase']").css("display","show");
		$("div[id*='rptForm:mainNotes']").css("display","show");
	}else{
		$("div[id*='mainNotesUploader']").css("display","none");
		$("div[id*='mainPhrase']").css("display","none");
		$("div[id*='rptForm:mainNotes']").css("display","none");
	}
	
	if($("input[id*='signatureOnOffBtn']").val() == "true"){
		$("div[id*='rptForm:signatureSection']").css("display","show");
		$("div[id*='rptForm:signatureSectionfForPdf']").css("display","show");
	}else{
		$("div[id*='rptForm:signatureSection']").css("display","none");
		$("div[id*='rptForm:signatureSectionfForPdf']").css("display","none");
	}
}

function customerHeaderFooterSelection(){
	if($("input[id*='custTabs:custForm:customerHeaderFooterId']").val() == "false"){
		PF('customerHeaderFooterDialog').show();
	}
}

function checkReportSave(){
	if($(location).attr('pathname').split("/")[3] === "edit_service_report.jsf" && (mainNotesFlag || notesFlag)){
		if(($("input[id='rptForm:status']").val() != 'SUBMITTED') && ($("input[id='rptForm:status']").val() != 'RELEASED')){
			PF('rptSaveConfirm').show();
			mainNotesFlag = false;
			notesFlag = false;
		} else {
			$('#myModal_pdf').modal('show');
	    }
	}else{
		$('#myModal_pdf').modal('show');
	}
}

var renderPdfDialog;
function exportPdfDialog() {
	renderPdfDialog = localStorage.getItem("renderPdfDialog");
	if (renderPdfDialog) {
		$('#myModal_pdf').modal('show');
	}
	localStorage.clear();
}

function settingExportPdfFlag() {
	renderPdfDialog = true;
	localStorage.setItem("renderPdfDialog", renderPdfDialog);
	$('#myModal_pdf').modal('show');
}

function cancelRptSave() {
	mainNotesFlag = false;
	notesFlag = false;
	PF('rptSaveConfirm').hide();
	$('#myModal_pdf').modal('show');
}

function updateBackDateLabel() {
	$(".reportcreated > button").html("Backdate Report");
	$(".reportcreated > button").css("padding", "4px");
	$(".reportcreated > button").css("width", "120px");
}

// Implementation for StereoImages
function onChangeOfStereotype(currentElement) {
	var tempId = "" + currentElement.id; // Obtaining the ID of the current Element
	if (currentElement.value == "") { // Checking weather the value is "none"
		return;
	}
	var ele = $('[id="' + tempId.replace("input", "label") + '"]'); // Replacing the ID with label
	ele.children('img').each(function() {
		$(this).remove(); // Removing the img tag in the child element
	});
	ele.prepend("<img src='resources/img/range/icon-" + currentElement.value
			+ ".png' >");

}

function check(currentElement) {
	currentElement++;
	if ($("div[id*='rangeId'] > div >  div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,6) == 'NORMAL') {
		$("div[id*='rangeId'] > div  > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#aaff80");
		$("div[id*='rangeId'] > div  > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	} else if ($("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,4) == "LOW	" || 
				$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,5) == "HIGH	"){
		$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ffff66");
		$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","black");
	} else if ($("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,6) == "LOWER	" ||
			$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,7) == "HIGHER	") {
		$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ff944d");
		$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	}else if ($("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,7) == "LOWEST	" ||
			$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,8) == "HIGHEST	") {
		$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ff4d4d");
		$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	}else if($("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,6) == 'NORMAL'){
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#aaff80");
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	}else if($("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,4) == "LOW	" ||
			$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,5) == "HIGH	"){
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ffff66");
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","black");
	}else if($("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,6) == "LOWER	"||
			$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,7) == "HIGHER	"){
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ff944d");
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	}else if($("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,7) == "LOWEST	"||
			$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").text().slice(0,8) == "HIGHEST	"){
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("background-color", "#ff4d4d");
		$("div[id*='rangeId']  > div > div:nth-child(2) > div > table > tbody > tr:nth-child("+ currentElement + ") > td:nth-child(3)").css("color","white");
	}
}

function responseColor(rowIdx){
	rowIdx++;
	if($("div[id*='rangeId'] > div >  div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,6) == 'NORMAL' ||
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,6) == 'NORMAL'){
		$(".rangeResponse").css("background-color", "green");
		$(".rangeResponse").css("color", "black");
	}else if ($("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,4) == "LOW	" ||
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,4)== "LOW	" ||
			$("div[id*='rangeId']  > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,5) == "HIGH	"||
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,5) == "HIGH	" ) {
		$(".rangeResponse").css("background-color", "yellow");
	} else if ($("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,6) == "LOWER	" || 
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").slice(0,6) == "LOWER	" ||
			$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,7) == "HIGHER	" || 
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").slice(0,7) == "HIGHER	" ) {
		$(".rangeResponse").css("background-color", "orange");
	}else if ($("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,8) == "HIGHEST	" || 
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").slice(0,8) == "HIGHEST	" ||
			$("div[id*='rangeId'] > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").text().slice(0,7) == "LOWEST	" || 
			$("div[id*='rangeId'] > div > div > div > table > tbody > tr:nth-child("+ rowIdx + ") > td:nth-child(3)").slice(0,7) == "LOWEST	" ) {
		$(".rangeResponse").css("background-color", "red");
	}
}



function initializeStereoColors() {
	$("div[id*='"+stereoTypeFormID+"'] li > img").each(function () {       //Removing the img for li
		$(this).remove();
	});
	
	$("div[id*='"+stereoTypeFormID+"'] label > img").each(function () {    //Removing the img for label
		$(this).remove();
	});
	 
	$("div[id*='"+stereoTypeFormID+"'] li:contains('NORMAL')").prepend( "<img src='resources/img/range/icon-NORMAL.png' >" );// Adding the images   
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('LOW')").filter(function() {
		return $(this).text() === "LOW";
	}).prepend( "<img src='resources/img/range/icon-LOW.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('LOWER')").prepend( "<img src='resources/img/range/icon-LOWER.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('LOWEST')").prepend( "<img src='resources/img/range/icon-LOWEST.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('HIGH')").filter(function() {
		return $(this).text() === "HIGH";
	}).prepend( "<img src='resources/img/range/icon-HIGH.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('HIGHER')").prepend( "<img src='resources/img/range/icon-HIGHER.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] li:contains('HIGHEST')")
		.prepend( "<img src='resources/img/range/icon-HIGHEST.png' >" );

	$("div[id*='"+stereoTypeFormID+"'] label:contains('NORMAL')").prepend( "<img src='resources/img/range/icon-NORMAL.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('LOW')").filter(function() {
		return $(this).text() === "LOW";
	}).prepend( "<img src='resources/img/range/icon-LOW.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('LOWER')").prepend( "<img src='resources/img/range/icon-LOWER.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('LOWEST')").prepend( "<img src='resources/img/range/icon-LOWEST.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('HIGH')").filter(function() {
		return $(this).text() === "HIGH";
	}).prepend( "<img src='resources/img/range/icon-HIGH.png' >" );
	
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('HIGHER')").prepend( "<img src='resources/img/range/icon-HIGHER.png' >" );
	
	$("div[id*='"+stereoTypeFormID+"'] label:contains('HIGHEST')").prepend( "<img src='resources/img/range/icon-HIGHEST.png' >" );
	
	//highlightEmptyInputFields();
	highlightEmptyInputFields();
}

// Highlighting when working in the corresponding cell
function highlightSelectedDatatableRowAndColumnForTemplate(i, rowIdx, colIdx,currentEle, eventType) { // Obtaining the particular row and column ID
	var rowSource = currentEle.source;
	var arr = rowSource.split(':');
	rowIdx = parseInt(arr[2]);
	colIdx = colIdx +1;
	$("input[id*='tplForm:rowInx']").val(rowIdx);
	$("input[id*='tplForm:colName']").val(i);
	$("button[id*='dummyColButton']").click();
	$("button[id*='rowColButton']").click();
	
	
	$("div[id='tplForm:gridTable']").find('tr > td').each(function() { 
		$(this).css("background-color", ""); // Removing the background-color
	});

	var colCount = 0
	$("div[id='tplForm:gridTable']").find('tr:nth-child(' + (rowIdx + 1) + ')').find("td").each(function() { // Selecting the row
		if (colCount < colIdx) {
			$(this).css("background-color", "#BDD8F6"); // Highlighting the row
			colCount++;
		}
	});

	$("div[id='tplForm:gridTable']").find('tr > td:nth-child(' + (colIdx + 1) + ')').each(function(index, value) { // Selecting the column
		if (index < rowIdx) {
			$(this).css("background-color", "#BDD8F6"); // Highlighting the column
		}
		if (index == rowIdx) {
			$(this).css("background-color", "#6297B1"); // Highlighting the delected cell
		}
	});

	// added for edit cell bulb popup
	if (eventType === 'bulbClick') {
		// PF('editCellPanelDialog').show();
		$('#myModal1').modal('show');
		initializeDataTable();
	}
	$('.onoffswitch-label').addClass("template");
	//serviceGridTableCss();
}

//Coloring Report
var globalColor;
function calculatingColorForReport(rowIdx, colIdx) {
	var id="rangeValue_"+rowIdx+"_"+colIdx;
	var valId = "cellInput_"+rowIdx+"_"+colIdx;
	 var integerNum = $("input[class*='"+valId+"']").val();
	 var cellColorId = "cellColor_"+rowIdx+"_"+colIdx;
	 if(integerNum!=null && integerNum.indexOf(',') > -1){
		 integerNum = integerNum.replace(',','');
	 }
	 var val = parseFloat(integerNum); 
	var color = "";
	if(val != ""){
		$("input[id*='"+id+"']").each(function () { 
			if(($(this).attr("data-type") == 'HIGHER' || $(this).attr("data-type") == 'LOWER') && globalColor === ""){
		    /*if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  	    
		  	     color = "ORANGE";
		  	     
		  	    }*/
				if($(this).attr("data-type") == 'HIGHER'){
					if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
					  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
					  	    
					  	     color = "ORANGE";
					  	     
					  	    }
				}else{
					if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
					  	      ((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
					  	    
					  	     color = "ORANGE";
					  	     
					  	    }
				}
		  	   }else if($(this).attr("data-type") == 'NORMAL' && globalColor === ""){
		  	    if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  	     color =  "GREEN";
		  	     
		  	    }
		  	   }else if(($(this).attr("data-type") == 'HIGHEST' || $(this).attr("data-type") == 'LOWEST') && globalColor === ""){
		  	    /*if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  	     color =  "RED";
		  	     
		  	    }*/
		  	    if($(this).attr("data-type") == 'HIGHEST'){
		  	    	if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  		  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  		  	     color =  "RED";
		  		  	    }
		  	    }else{
		  	    	if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  		  	      ((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  		  	     color =  "RED";
		  		  	    }
		  	    }
		  	   }else if(($(this).attr("data-type") == 'HIGH' || $(this).attr("data-type") == 'LOW') && globalColor === ""){
		  	    /*if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  	    
		  	       color =  "YELLOW";
		  	     
		  	    }*/
		  		   if($(this).attr("data-type") == 'HIGH'){
		  			 if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  			  	      ((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  			  	    
		  			  	       color =  "YELLOW";
		  			  	     
		  			  	    }
		  		   }else{
		  			 if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
		  			  	      ((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
		  			  	    
		  			  	       color =  "YELLOW";
		  			  	     
		  			  	    }
		  		   }
		  	   }
			globalColor = color;
		});
	}
	$("input[id*='"+cellColorId+"']").val(globalColor);
	//alert(globalColor);
	globalColor ="";
}

var globalColorForCell;
function settingColorForCell() {
	var rowIdx;
	var colIdx;
	$("input[id*='cellInput']").each(function () {
		rowIdx = $(this).attr("class").split(" ")[5].split("_")[1];
		colIdx = $(this).attr("class").split(" ")[5].split("_")[2];
		var cellInputTextId = "cellInput_"+rowIdx+"_"+colIdx;
		var cellColorId = "cellColor_"+rowIdx+"_"+colIdx;
		var integerNum = $("input[class*='"+cellInputTextId+"']").val();
		if(integerNum!=null && integerNum.indexOf(',') > -1){
			integerNum = integerNum.replace(',','');
		}
		var val = parseFloat(integerNum); 
		var id="rangeValue_"+rowIdx+"_"+colIdx;
		$("input[id*='"+id+"']").each(function () {
			var color="";
			if(val != ""){
				if($(this).attr("data-type") == 'HIGHER' || $(this).attr("data-type") == 'LOWER'){
					if($(this).attr("data-type") == 'HIGHER'){
						if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){

							color = "ORANGE";

						}
					}else{
						if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){

							color = "ORANGE";

						}
					}
				}else if($(this).attr("data-type") == 'NORMAL'){
					if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
							((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
						color =  "GREEN";

					}
				}else if($(this).attr("data-type") == 'HIGHEST' || $(this).attr("data-type") == 'LOWEST'){
					if($(this).attr("data-type") == 'HIGHEST'){
						if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
							color =  "RED";

						}
					}else{
						if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){
							color =  "RED";

						}
					}

				}else if($(this).attr("data-type") == 'HIGH' || $(this).attr("data-type") == 'LOW'){
					if($(this).attr("data-type") == 'HIGH'){
						if(((val > $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val <= $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){

							color =  "YELLOW";

						}
					}else{
						if(((val >= $(this).attr("data-min") || $(this).attr("data-min") == undefined)) && 
								((val < $(this).attr("data-max")) || $(this).attr("data-max") == undefined)){

							color =  "YELLOW";

						}
					}

				}
				if(color != ""){
					globalColorForCell = color;
				}
			}else{
				globalColorForCell ="";
			}
		});
		if($("input[id*='"+id+"']")[0] != undefined && integerNum != ""){
			$("input[id*='"+cellColorId+"']").val(globalColorForCell);
		}else{
			$("input[id*='"+cellColorId+"']").val("");
		}
	});
}



var settingGlobalColor ="";

function settingColor(){
	$("input[class*='cellColor']").each(function () {
		if($(this).val() != "" && settingGlobalColor != 'RED'){
			if($(this).val() != 'GREEN'){
				settingGlobalColor = $(this).val();
			}
		}
	});
	if(settingGlobalColor == ""){
		settingGlobalColor = 'GREEN';
	}
	$("input[id*='reportColor']").val(settingGlobalColor);
	if(settingGlobalColor == 'RED'){
		$("input[id*='reportPriority']").val("1");	
	}else if(settingGlobalColor == 'ORANGE'){
		$("input[id*='reportPriority']").val("2");
	}else if(settingGlobalColor == 'YELLOW'){
		$("input[id*='reportPriority']").val("3");
	}else if(settingGlobalColor == 'GREEN'){
		$("input[id*='reportPriority']").val("4");
	}
	//fireJsfButtonClick('saveUpdate');
}
function settingColorForReport(){
	settingGlobalColor = "";
	$("input[class*='cellColor']").each(function () {
		if($(this).val() != "" && settingGlobalColor != 'RED'){
			if($(this).val() != 'GREEN'){
				settingGlobalColor = $(this).val();
			}
		}
	});
	if(settingGlobalColor == ""){
		settingGlobalColor = 'GREEN';
	}
	$("input[id*='reportColor']").val(settingGlobalColor);
	if(settingGlobalColor == 'RED'){
		$("input[id*='reportPriority']").val("1");	
	}else if(settingGlobalColor == 'ORANGE'){
		$("input[id*='reportPriority']").val("2");
	}else if(settingGlobalColor == 'YELLOW'){
		$("input[id*='reportPriority']").val("3");
	}else if(settingGlobalColor == 'GREEN'){
		$("input[id*='reportPriority']").val("4");
	}
}

//This method will update all the default check-boxes to true/false, if the master check-box is true/false.
function updateAllDefaultResponses(currentElement) {
	var checked = currentElement.checked;
	// performing click event on all the "Include Response?" check boxes
	var clickEvent = jQuery.Event("click", {
		metaKey : true
	});
	if (checked) {
		for (var count = 0; count < $('div[id*="singleResponse"]').length; count++) {
			currElement = $('div[id*="singleResponse"] > div  span:nth-child(1)')[count].parentElement;
			if (!$(currElement).hasClass('ui-state-active')) {
				$(currElement).trigger(clickEvent);
			}
		}
	} else {
		for (var count = 0; count < $('div[id*="singleResponse"] > div  span:nth-child(1)').length; count++) {
			currElement = $('div[id*="singleResponse"] > div  span:nth-child(1)')[count].parentElement;
			if ($(currElement).hasClass('ui-state-active')) {
				$(currElement).trigger(clickEvent);
			}
		}
	}
}

// This method apply gray color if cell value is null in the reort section.
function highlightEmptyInputFields() {
	// All the input element
	$("div[id='rptForm:serviceTable']").find('td:has(input)').each(function() {
		$(this).addClass("myClass");
	});


	// All the input element -- DAV
	$("div[id='rptForm:serviceTable']").find('td:not(:has(input))').each(function() {
		$(this).addClass("myClass2"); // hide empty
	});
	$("div[id='rptForm:serviceTable']").find('tr td:first-child').each(function() {
		$(this).addClass("myClass3"); // hide empty
	});


	
	$("input[id*='editCellVal']").each(function() {
		if($(this).val() == 'MULTIPLE'){
			$(this).next().hide();
		}
	});

	var count = 0;
	$("div[id='rptForm:serviceTable']").find('td').each(function() {
		count++;
		if ($(this).hasClass('myClass') || count == 1 || count == 2) {
		} else if($(this).text() == "" || $(this).text() == null) {
			$(this).html("<div style=\"text-align: center;\"><i class=\"fa fa-ban Fs40\" style=\"text-align: center; color: #DDD;\"></i></div>");
		}
	});
}

function fireJSFAssociatedTestClose() {
	$("div[id*='collapseExample2']").hide();
}
function fireJSFAssociatedTestOpen() {
	$("div[id*='collapseExample2']").show();
}

var mainNotesFlag;
var mainNotesKeyPressCount=0;
var mainNotesBlurCount=0;
function mainnotesiframe() {
	
	$("div[id*='rptForm:mainNotes']").find('iframe').contents().find("body").blur(function(e) {
		mainNotesFlag = true;
		mainNotesBlurCount = mainNotesBlurCount + 1;
		if(mainNotesKeyPressCount == mainNotesBlurCount){
			submitMainNotes();
			mainNotesKeyPressCount = 0;
			mainNotesBlurCount = 0;
		}
	});
	
	var autoSaveTime = ($("input[id*='rptForm:autoSaveTime']").val()) * 60 * 1000;
	window.clearTimeout(idleInterval);
	idleInterval = null;
	idleInterval = window.setTimeout(triggerAutoSaveReport, autoSaveTime); // every 2 second
	mainNotesKeyPressCount = mainNotesKeyPressCount + 1;
}
function mainnotesiframeForCustomerReport() {
	$("div[id*='custReviewRptForm:mainNotes']").find('iframe').contents().find("body").blur(function(e) {
			submitMainNotes();
			mainNotesKeyPressCount = 0;
			mainNotesBlurCount = 0;
	});
}

function mainnotesiframeForOutOfSpec() {
	$("div[id*='testReportForm:editor']").find('iframe').contents().find("body").blur(function(e) {
			submitMainNotes()
	});
}

var supportNotesFlag;
var supportNotesKeyPressCount=0;
var supportNotesBlurCount=0;
function notesiframeForSupport() {
	$("div[id*='supportAndFeedBackMail']").find('iframe').contents().find("body").blur(function(e) {
		supportNotesFlag = true;
		supportNotesBlurCount = supportNotesBlurCount + 1;
		if(supportNotesKeyPressCount == supportNotesBlurCount){
			supportEmailNotes();
			supportNotesKeyPressCount = 0;
			supportNotesBlurCount = 0;
		}
	});
	
	supportNotesKeyPressCount = supportNotesKeyPressCount + 1;
}

function notesiframeForFeedBack() {
	$("div[id*='supportAndFeedBackMail']").find('iframe').contents().find("body").blur(function(e) {
		$("button[id*='submitMainNotes']").click();
	});
}
var notesFlag;
var cellNotesKeyPressCount=0;
var cellNotesBlurCount=0;
function notesiframe() {
	$("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").blur(function(e) {
		notesFlag = true;
		cellNotesBlurCount = cellNotesBlurCount + 1;
		if(cellNotesKeyPressCount == cellNotesBlurCount){
			submitCellNotes();
			cellNotesKeyPressCount = 0;
			cellNotesBlurCount = 0;
		}
	});
	
	var autoSaveTime = ($("input[id*='rptForm:autoSaveTime']").val()) * 60 * 1000;
	window.clearTimeout(idleInterval);
	idleInterval = null;
	idleInterval = window.setTimeout(triggerAutoSaveReport, autoSaveTime); // every 2 second
	cellNotesKeyPressCount = cellNotesKeyPressCount + 1;
}

var mailNotesKeyPressCount=0;
var mailNotesBlurCount=0;
function submitEmailContent() {
	$("div[id*='rptForm:emailForm:emailContent']").find('iframe').contents().find("body").blur(function(e) {
		mailNotesBlurCount = mailNotesBlurCount + 1;
		if(mailNotesKeyPressCount == mailNotesBlurCount){
			fireJsfLinkClick('emailContentData');
			mailNotesKeyPressCount = 0;
			mailNotesBlurCount = 0;
		}
	});
	
	mailNotesKeyPressCount = mailNotesKeyPressCount + 1;
}
var equipNotesFlag;
var equipNotesKeyPressCount=0;
var equipNotesBlurCount=0;
function equipnotesiframe() {
	
	$(".equipNotes").find('iframe').contents().find("body").blur(function(e) {
		equipNotesFlag = true;
		equipNotesBlurCount = equipNotesBlurCount + 1;
		if(equipNotesKeyPressCount == equipNotesBlurCount){
			submitEquipNotes();
			equipNotesKeyPressCount = 0;
			equipNotesBlurCount = 0;
		}
	});
	
	equipNotesKeyPressCount = equipNotesKeyPressCount + 1;
}

function bindiframe() {
	var imax = 5000;
	var mtemp;
	var noOfStrucks = 0; 
	
	$("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").on('keyup',function(e) {
		
		if(noOfStrucks == 0) {
			var ilength = $("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").text().length;
			if(mtemp ==  undefined){
				mtemp = document.getElementById("rptForm:txt").innerHTML ;
			}
			mtemp = imax - ilength;
			document.getElementById("rptForm:txt").innerHTML = mtemp;
			/*if (ilength > imax) {
				var content = document.getElementById("rptForm:txt").innerHTML.find('iframe').contents().find("body").text().substring(0, 5000);
				$("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").html(content);
			}*/
		} else {
			if(noOfStrucks > 50) {
				noOfStrucks = -1;
			} else {
				document.getElementById("rptForm:txt").innerHTML = mtemp--;
			}
		} 
		
		noOfStrucks ++;
	});

	if ($("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").children().length > 0) {
		var temp = $("div[id*='rptForm:cellComment']").find('iframe').contents().find("body").text().length;
		mtemp = imax - temp;
		document.getElementById("rptForm:txt").innerHTML = mtemp;
	}
}

function changeNotesSectionHeight() {
	$("div[id*='rptForm:mainNotes'] > div").css({
		height : "400px"
	});
	$("div[id*='rptForm:mainNotes'] > div").css({
		display : "inline-table"
	});
	$(document.getElementsByTagName("iframe")).css({
		height : "400px"
	});
}

function savePhrase(){
	var selectedText = PF('mainNotes').editor.selectedText();
	document.getElementById('rptForm:selectedText').value = selectedText;
}


function insertPhrase(){
	if($("select[id='rptForm:availablePhrases'] option:selected").text() != "Select Quick Phrase:"){
		$("div[class*='mainNotes'] > div > iframe").focus();
		var selectedPhrase = $("select[id='rptForm:availablePhrases'] option:selected").text();
		PF('mainNotes').editor.execCommand("inserttext", selectedPhrase, null, null);
	}
}

function insertPhraseForGridRows(){
	if($("select[id='rptForm:cellEditorForm:availablePhrasesForGridRows'] option:selected").text() != "Select Quick Phrase:"){
		$("div[class*='equipNotes'] > div > iframe").focus();
		var selectedPhrase = $("select[id='rptForm:cellEditorForm:availablePhrasesForGridRows'] option:selected").text();
		PF('cellNotes').editor.execCommand("inserttext", selectedPhrase, null, null);
	}
}

function insertPhraseForPump(){
	if($("select[id*='availablePhrasesForPumpRows'] option:selected").text() != "Select Quick Phrase:"){
		var selectedPhrase = $("select[id*='availablePhrasesForPumpRows'] option:selected").text();
		var val = $("textarea[id*='pumpComment']").val();
		$("textarea[id*='pumpComment']").val(val + selectedPhrase);
	}
}

function savePhraseForPump(){
	var textarea = $("textarea[id*='pumpComment']")[0];
	var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selectedText = textarea.value.substring(start, end);
    $("input[id*='selectedTextForPump']")[0].value = selectedText;
}

function insertPhraseForInvn(){
	if($("select[id*='availablePhrasesForInvn'] option:selected").text() != "Select Quick Phrase:"){
		var selectedPhrase = $("select[id*='availablePhrasesForInvn'] option:selected").text();
		var val = $("textarea[id*='invnComment']").val();
		$("textarea[id*='invnComment']").val(val + selectedPhrase);
	}
	fireJsfButtonClick('buttonForInvnComment');
}

function savePhraseForInvn(){
	var textarea = $("textarea[id*='invnComment']")[0];
	var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selectedText = textarea.value.substring(start, end);
    $("input[id*='selectedTextForInvn']")[0].value = selectedText;
}

function savePhraseForGridRows(){
	var selectedText = PF('cellNotes').editor.selectedText();
	document.getElementById('cellEditorForm:selectedTextForGridRows').value = selectedText;
}

function savePhraseForCells(){
	var selectedText = PF('cellComment').editor.selectedText();
	document.getElementById('rptForm:selectedTextForCell').value = selectedText;
}

function insertPhraseForCells(){
	if($("select[id='rptForm:availablePhrasesForCells'] option:selected").text() != "Select Quick Phrase:"){
		$("div[class*='cellComment'] > div > iframe").focus();
		var selectedPhrase = $("select[id='rptForm:availablePhrasesForCells'] option:selected").text();
		PF('cellComment').editor.execCommand("inserttext", selectedPhrase, null, null);
	}
}

function resetTheDropdownValue(id){
	$("select[id*='"+ id +"']").prop('selectedIndex',0);
	ServiceHistory.removePlotLines();
	fireJsfButtonClick('buttonPlotLines');
}

function updateServiceGridHeaderCss() {
	var tempWidth = 0;
	var tdWidth = 0;
	var noOfCols = document.getElementById('serviceTableColumnLength').value;

	if (noOfCols < 7)
		return;

	if (jQuery.browser.chrome == true) {
		tdWidth = $("div[id='rptForm:serviceTable'] div:nth-child(2) th:nth-child(1)").width() + 21.635;
	} else {
		tdWidth = $("div[id='rptForm:serviceTable'] div:nth-child(2) th:nth-child(1)").width() + 20.35;
	}

	if (noOfCols == 7)
		tdWidth = $("div[id='rptForm:serviceTable'] div:nth-child(2) th:nth-child(1)").width() + 19.25;

	tempWidth = noOfCols * tdWidth;
	if (noOfCols > 8 && noOfCols < 12)
		tempWidth = tempWidth - 12;

	$(".serviceTableCSS .ui-datatable-header").css({
		width : tempWidth
	});
}

function openEditorForAllRows(tableCss) {
	jQuery('.' + tableCss + ' tr').find('span.ui-icon-pencil').each(function() {
		jQuery(this).click()
	});
}

function openEditorForAllRows1(tableCss) {
	jQuery('.' + tableCss + ' .ui-row-editor .ui-icon-pencil').each(function() {
		jQuery(this).click()
	});
}

function saveAllEditedRows(tableCss) {
	jQuery('.' + tableCss + ' .ui-row-editor .ui-icon-check').each(function() {
		jQuery(this).click()
	});
}

function closeEditorForAllRows(tableCss) {
	jQuery('.' + tableCss + ' .ui-row-editor .ui-icon-close').each(function() {
		jQuery(this).click()
	});
}

function fireJSFHomeCreateAppointment() {
	$("button[id*='openCreateAppointment']").click();
}

function openEditorForAllRowsTemplate() {
	$("tbody[id*='rangeTable'] > tr > td:nth-child(4)").find('span.ui-icon-pencil').click();
}

function closeEditorForAllRowsTemplate() {
	$("tbody[id*='rangeTable'] > tr > td:nth-child(4)").find('span.ui-icon-check').click();
}

//setting this to 25 min
var timePassed = 25 * 60 * 1000;
var idleTimeIntervalForLogOut;

function checkTimeAfterLoadingReport(){	 
	
	if(idleTimeIntervalForLogOut !== undefined){
		window.clearTimeout(idleTimeIntervalForLogOut);
	}
	idleTimeIntervalForLogOut = window.setTimeout(triggerSafetyLogoutModelShow, timePassed);
}

//setting to 3 min
var timePassedForSafetyLogout = 3 * 60 * 1000;
var idleTimeIntervalForLogOutModelShow;
function triggerSafetyLogoutModelShow(){
	$('#myModal_auto_logout').modal('show');
	//this button will trigger 'no' button on safety logout model if no action is taken after 2 min
	idleTimeIntervalForLogOutModelShow = window.setTimeout(onclickOfYesInSafetyLogout, timePassedForSafetyLogout);
}

//this method is called onclick of 'no' on safety logout model.
function onclickOfNoInSafetyLogout(){
	dummyLogout();
}

//this method is called onclick of 'yes' on safety logut model
function onclickOfYesInSafetyLogout(){
	triggerAutoSaveReport();
	//this is for logout after 5 sec
	var idleTimeIntervalForLogOutModelShow = window.setTimeout(onclickOfNoInSafetyLogout, 5000);
}

//this method is called to save and continue for safety logut model
function onclickOfSaveAndContinue(){
	/*if($("button[id='saveOrUpdate']") != null){
		$("button[id='saveOrUpdate']").click();
	}*/
	window.clearTimeout(idleTimeIntervalForLogOutModelShow);
	$("a[id='rptForm:buttonFormSubmitforAutoSave']").click();
}

var idleInterval;

function autoSaveReport() {
	var autoSaveTime = ($("input[id*='rptForm:autoSaveTime']").val()) * 60 * 1000;
	//var autoSaveTime = 1 * 5 * 1000 ;
	// Zero the idle timer on mouse movement.

	$(this).keypress(function(e) {
		window.clearTimeout(idleInterval);
		idleInterval = null;
		idleInterval = window.setTimeout(triggerAutoSaveReport, autoSaveTime); // every 2 second
	});
}

function triggerAutoSaveReport() {
	console.log('In triggerAutoSaveReport');
	if(document.getElementById('reportStatusField') != null){
		document.getElementById('reportStatusField').value = "AUTO_SAVE_NEW";
	}
	
	if($('#serviceCellDialog').is(':visible') === true){
		$('#serviceCellDialog').modal('hide');
	}
	
	if($('#myModal_invn_grid').is(':visible') === true){
		errorValidationForForms('invnName','errorMessageName','gridInvnSave');
		$('#myModal_invn_grid').modal('hide');
	}
	
	if($('#myModal_pump_grid').is(':visible') === true){
		errorValidationForForms('pumpName','errorMessageName','pumpSettingsSave');
		$('#myModal_pump_grid').modal('hide');
	}
	if($('#myModal').is(':visible') === true){
		errorValidationForForms('equipName','errorMessageName','saveWaterMeter');
		$('#myModal').modal('hide');
	}
	
	
	if($('#myModal_auto_email').is(':visible') === true){
		$('#myModal_auto_email').modal('hide');
	}
	settingColor();
	// performing click event on updatecell
	var cellNotesClickEvent = jQuery.Event("click", {
		metaKey : true
	});
	var cellNotesElement = $("[id$='saveUpdateCell']");
	$(cellNotesElement).trigger(cellNotesClickEvent);

	// performing click event on save or update report
	var clickEvent = jQuery.Event("click", {
		metaKey : true
	});
	var currElement = $("[id*='saveUpdate']")[0];
	$(currElement).trigger(clickEvent);
	
	
	
}

function tranposeTable(table) {
	table.find('thead tr').detach().prependTo(table.find('tbody'));
	var t = table.find('tbody').eq(0);
	var r = t.find('tr');
	var cols = r.length;
	var rows = r.eq(0).find('td,th').length;
	var cell, next, tem, i = 0;
	var tb = $('<tbody></tbody>');

	while (i < rows) {
		cell = 0;
		tem = $('<tr></tr>');
		while (cell < cols) {
			next = r.eq(cell++).find('td,th').eq(0);
			tem.append(next);
		}
		tb.append(tem);
		++i;
	}
	table.find('tbody').remove();
	$(tb).appendTo(table);
	/*
	 * $(table) .find('tbody tr:eq(0)') .detach() .appendTo( table.find('thead') )
	 * .children() .each(function(){ $(this).replaceWith('<th scope="col">'+$(this).html()+'</th>');
	 * });
	 */
	$(table).find('tbody tr th:first-child').each(function() {
		$(this).replaceWith('<td scope="row">' + $(this).html() + '</td>');
	});
	table.show();
}

function transposeServiceTable() {
	// tranposeTable($("tbody[id*='rptForm:serviceTable_data']").parent());
	// tranposeTable($("tbody[id*='rptForm:serviceTableColumn_data']").parent());

	$("tbody[id*='rptForm:serviceTableColumn_data']").parent().transpose();
}

function showCellNotesEditor(rowIdx, eventType) {
	if (eventType === 'cellEditorClick') {
		//PF('cellEditorDilog').show();
		$('#cellEditorModel').modal('show');
		setTimeout(function(){ $("button[id*='renderEditor']").click();}, 3000);
		//$('#myModal_grid_notes').modal('show');
	}
}

function showColumnName(name) {
	var tbodyId = name+"Table_data";
	var theadId = name+"Table_head";
	$("tbody[id*='"+tbodyId+"'] > tr > td:nth-child("+idx+1+")").append($("thead[id*='"+theadId+"']").find("table").find("span").clone()[idx]);
}

function gridSectionIndexValidation() {
	var serviceSectionVal = $("input[id*='cfgForm:configTabs:serviceSectionId']").val()
	var pumpSectionVal = $("input[id*='cfgForm:configTabs:pumpSectionId']").val()
	var invnSectionVal = $("input[id*='cfgForm:configTabs:inventorySectionId']").val()
	var equipSectionVal = $("input[id*='cfgForm:configTabs:equipmentSectionId']").val()
	var notesSectionVal = $("input[id*='cfgForm:configTabs:notesSectionId']").val()

	if (serviceSectionVal != null) {
		if ((serviceSectionVal == pumpSectionVal) || (serviceSectionVal == invnSectionVal)
				|| (serviceSectionVal == equipSectionVal) || (serviceSectionVal == notesSectionVal)) {
			$("input[id*='cfgForm:configTabs:serviceSectionId']").val("")
		}
	}

	if (pumpSectionVal != null) {
		if ((pumpSectionVal == serviceSectionVal) || (pumpSectionVal == invnSectionVal)
				|| (pumpSectionVal == equipSectionVal) || (pumpSectionVal == notesSectionVal)) {
			$("input[id*='cfgForm:configTabs:pumpSectionId']").val("");
		}
	}

	if (invnSectionVal != null) {
		if ((invnSectionVal == pumpSectionVal) || (invnSectionVal == serviceSectionVal)
				|| (invnSectionVal == equipSectionVal) || (invnSectionVal == notesSectionVal)) {
			$("input[id*='cfgForm:configTabs:inventorySectionId']").val("");
		}
	}

	if (equipSectionVal != null) {
		if ((equipSectionVal == invnSectionVal) || (equipSectionVal == pumpSectionVal)
				|| (equipSectionVal == serviceSectionVal) || (equipSectionVal == notesSectionVal)) {
			$("input[id*='cfgForm:configTabs:equipmentSectionId']").val("");
		}
	}

	if (notesSectionVal != null) {
		if ((notesSectionVal == equipSectionVal) || (notesSectionVal == invnSectionVal)
				|| (notesSectionVal == pumpSectionVal) || (notesSectionVal == serviceSectionVal)) {
			$("input[id*='cfgForm:configTabs:notesSectionId']").val("");
		}
	}
}

function handleValidationError(xhr, status, args, eleId) {
	if (xhr.responseText.indexOf('ui-message-error-icon') >= 0) {
		PF(eleId).jq.effect("shake", {
			times : 5
		}, 100);
	} else {
		PF(eleId).hide();
	}
}

var changeLogVal="";
function OnTemplateChange(str){
	if(changeLogVal.indexOf(str, 0)!==-1){
		return;
	}else{
		changeLogVal = str+"<br/>" +changeLogVal;
	}
}

function editField() {
	var st = $("div[id*='tplForm:editCellPanel'] > div:nth-child(2) > div > div > div > span").text();
	changeLogVal += "-" + st.substr(5) + " was edited<br/>";
}

function setChangeLogDesc(id){
	if (id.indexOf('EditServiceTemplateBean') >= 0)
		document.getElementById('tplForm:setChangeLogDesc').value = changeLogVal;
		$("button[id*='tplForm:dummyForChangeLogDesc']").click();
}

function settingId(id){
	localStorage.setItem("tabId", id);
}

function tabClick(){
	var id = localStorage.getItem("tabId");
	$("a[href='"+id+"']").click();
	//localStorage.clear();
	
	window.clearTimeout(idleTimeIntervalForAutoLogOut);
	this.CountLogoutTime = 0;
	var currentLogoutTime = document.getElementById("currentLogoutTime");
	if(currentLogoutTime != null && currentLogoutTime.value.split(" ")[0] != NaN){
		if(currentLogoutTime.value.split(" ")[0] == "")
			timeIntervalForAutoLogOut = 2;
		else
		    timeIntervalForAutoLogOut = parseInt(currentLogoutTime.value.split(" ")[0]);
		autoLogOutTime();
	}
}

function eachTabClick(){
	localStorage.clear();
}


function reportProgressBar(value, id, type) {
	if ($("a[href*='#tab1']").text() == "GeneralGeneral") {
		var sum1;
		var sum2;
		if ((type == "service" || type == "log" || type == "coupon")
				&& ($("input[class*='enable_reportCycleStart']").is(":checked") == true)) {
			if (($("select[id*='tplForm:reportCycleStartMonth']").val() == "MM")
					|| ($("select[id*='tplForm:reportCycleStartDate']").val() == "DD")
					|| ($("select[id*='tplForm:reportCycleStartYear']").val() == "YYYY")) {
				$('.progress-bar').width('33%');
				fireJsfLinkClick('reportTemplateName1');
				return;
			}else{
				sum1=$("select[id*='tplForm:reportCycleStartMonth']").val()+'/'+$("select[id*='tplForm:reportCycleStartDate']").val()+
				'/'+$("select[id*='tplForm:reportCycleStartYear']").val();
			}
		}
			if ((type == "service" || type == "log" || type == "coupon") && $("input[class*='enable_reportCycleEnd']").is(":checked") == true) {
				if (($("select[id*='tplForm:reportCycleEndMonth']").val() == "MM")
						|| ($("select[id*='tplForm:reportCycleEndDate']").val() == "DD")
						|| ($("select[id*='tplForm:reportCycleEndYear']").val() == "YYYY")) {
					$('.progress-bar').width('33%');
					fireJsfLinkClick('reportTemplateName1');
					return;
				}else{
					sum2 = $("select[id*='tplForm:reportCycleEndMonth']").val() 
					+'/'+$("select[id*='tplForm:reportCycleEndDate']").val()+'/'+$("select[id*='tplForm:reportCycleEndYear']").val();
				}
			}
		
			var record1 = new Date(sum1);
		    var record2 = new Date(sum2); 
		    if(record2 < record1)
		    {
		    	$('.progress-bar').width('33%');
		    	fireJsfButtonClick('tplForm:triggerValidation');
		    	return;
		    }else if ($("input[id*='tplForm:name']").val() != "") {
			$('.progress-bar').width(value);
		} else {
			fireJsfLinkClick('reportTemplateName1');
			return;
		}
	}
	if (type == 'service') {
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").attr("data-toggle", "tab");
		$("a[href*='gridTable']").attr("data-toggle", "tab");
		$("a[href*='tab5']").attr("data-toggle", "tab");
		$('.progress-bar').width(value);
		if ($("a[href*='tab2']").text() == "Header & FooterHeader & Footer") {
			headerFooterCheckboxChecked(null);
			// $("a[id*='tplForm:initGridTableBtn']").click();
		}
		if (id == 'Grid') {
			$('.next').hide();
			$("ul[class*='pager wizard']").hide();
			$("a[id*='tplForm:initGridTableBtn']").click();
		} else {
			$('.next').show();
			$("ul[class*='pager wizard']").show();
		}
	} else if (type == 'coupon') {
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").attr("data-toggle", "tab");
		$('.progress-bar').width(value);
		if ($("a[href*='tab2']").text() == "Header & FooterHeader & Footer") {
			headerFooterCheckboxChecked(null);
			// $("a[id*='tplForm:initGridTableBtn']").click();
		}
		if (id == 'Ranges') {
			$('.next').hide();
			$("ul[class*='pager wizard']").hide();
		} else {
			$('.next').show();
			$("ul[class*='pager wizard']").show();
		}
	} else if (type == 'log') {
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").attr("data-toggle", "tab");
		$('.progress-bar').width(value);
		if ($("a[href*='tab2']").text() == "Header & FooterHeader & Footer") {
			headerFooterCheckboxChecked(null);
			// $("a[id*='tplForm:initGridTableBtn']").click();
		}
		if (id == 'Grid') {
			$('.next').hide();
			$("ul[class*='pager wizard']").hide();
		} else {
			$('.next').show();
			$("ul[class*='pager wizard']").show();
		}
	} else if (type == 'notes') {
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$('.progress-bar').width(value);
		if ($("a[href*='tab2']").text() == "Header & FooterHeader & Footer") {
			headerFooterCheckboxChecked(null);
			$("a[id*='tplForm:initGridTableBtn']").click();
		}
		if (id == 'Header & Footer') {
			$('.next').hide();
			$("ul[class*='pager wizard']").hide();
		} else {
			$('.next').show();
			$("ul[class*='pager wizard']").show();
		}
	}
}

function fireJSFfileUpload(){
	$("input[id*='custTabs:fileupload']").click();
}

function hideManageTestAndPanelsNextBtn(){
	$('button[id="reportNextButton"]').hide();
}

function showManageTestAndPanelsNextBtn() {
	if ($("input[id*='createTestServiceForm:addTestForm:newTestName']").val() != ""
			|| $("select[id='createTestServiceForm:addTestForm:oldTestName'] option:selected").text() != "Available Test") {
		$('button[id="reportNextButton"]').show();
	} else {
		$('button[id="reportNextButton"]').hide();
	}
}

function checkTypedSignatureRadioButton(){
	if($("input[id*='radio1']").is(":checked")){
		if($("input[id*='rptForm:signatureTyped']").is(":checked") != true){
			$("input[id*='rptForm:signatureTyped']").click();
			if($("input[id*='rptForm:savedUserSig']").is(":checked") == true){
				$("input[id*='rptForm:savedUserSig']").click();
			}
		}
	}
}
function checkDrawSignatureRadioButton(){
	if($("input[id*='radio2']").is(":checked")){
		if($("input[id*='rptForm:signatureTyped']").is(":checked") == true){
			$("input[id*='rptForm:signatureTyped']").click();
			if($("input[id*='rptForm:savedUserSig']").is(":checked") == true){
				$("input[id*='rptForm:savedUserSig']").click();
			}
		}
	}
}

function applyActivetab(){
	if($("input[id*='unitValue']").val()!= ""){
		$("a[href*='#tab1default']").parent().attr("class","active");
	}
}

function historyChart() {
	$(window).resize();
}

function checkButtonSelect(section){
	var content = $("input[id*='headerFooterAlignment_"+section+"']").val();
	if("text-align:left;"== content){
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(1)').attr("style","background-color: #31b0d5; color: #FFF;");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(2)').attr("style","background-color: none");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(3)').attr("style","background-color: none");
	}
	if("text-align:center;" == content){
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(1)').attr("style","background-color: none");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(2)').attr("style","background-color: #31b0d5; color: #FFF;");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(3)').attr("style","background-color: none");
		}
	if("text-align:right;"== content){
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(1)').attr("style","background-color: none");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(2)').attr("style","background-color: none");
		$("input[id*='headerFooterAlignment_"+section+"']").parent().find('button:nth-child(3)').attr("style","background-color: #31b0d5; color: #FFF;");
	}
}

function toHtml() {
	var $this = PF('cellComment'), contentWindow = $this.editor.$frame[0].contentWindow, doc = $this.editor.doc = contentWindow.document, $doc = $(doc), buttons = $this.editor.$toolbar
			.find(".ui-editor-button");
	// $this.editor.$frame.contents().find("html>body>div:nth-child(2)").click();
	// $this.editor.$frame.show();
	// $this.editor.$area.hide();
	var len = $this.editor.$frame.contents().find("html>body").find("img").length;
	var img = [];
	var i = 0;
	$this.editor.$frame.contents().find("html>body").find("img").each(
			function() {
				if(i<len){
				img[i] = $this.editor.$frame.contents().find("html>body").find("img")[i];
				i++;
				}
			});
	var j = 0;
	$this.editor.$frame.contents().find("html>body").find("img").each(
			function() {
				if(j<len){
						$this.editor.$frame.contents().find("html>body").html().replace($this.editor.$frame.contents().find("html>body").find("img")[j],'');
					}
				j++;
				});
	for(i=len-1;i>=0;i--){
		$this.editor.$frame.contents().find("html>body").prepend(img[len-1]);
	}
	
}
function editorUpdate(){
	setTimeout(function(){ $("button[id*='addForm:dummyId']").click();},3000 );
}

function checkEnterPressForSearch(id){
	if (event.keyCode == 13){
		fireJsfLinkClick(id);
		$("input[id*='setKeyCodeValue']").val(event.keyCode);
		fireJsfLinkClick('setKeyCodeValueLink');
	}
	
}

function checkEnterPressForUserPermissionSearch(id){
	if (event.keyCode == 13){
		fireJsfLinkClick(id);
	}
	
}

function JumpToTop(){
	 $("body").scrollTop(0);
}

function jumpToModal(){
	$("html, body").animate({ scrollTop: 0 }, "slow");
}

function scheduleEventValue(){
	 var month = $("select[id*='scheduleEventMonth']").val();
	 var date = $("select[id*='scheduleEventDate']").val();
	 var year = $("select[id*='scheduleEventYear']").val();
	 var hour = $("select[id*='scheduleEventHours']").val();
	 var minutes = $("select[id*='scheduleEventMinutes']").val();
	 $("input[id*='scheduleEventValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
	 $("button[id*='scheduleEventButton']").click();
}
function editScheduleEventValue(){
	if($("input[id*='custTabs:scheduleDate_input']").val() != undefined){
	var arrayEnd = $("input[id*='custTabs:scheduleDate_input']").val().split(' ');
	var arrayEnd1 = arrayEnd[0].split('/');
	var arrayEnd2 = arrayEnd[1].split(':');
	$("select[id*='scheduleEventMonth']").val(arrayEnd1[0]);
	$("select[id*='scheduleEventYear']").val(arrayEnd1[2]);
	$("select[id*='scheduleEventDate']").val(arrayEnd1[1]);
	$("select[id*='scheduleEventHours']").val(arrayEnd2[0]);
	$("select[id*='scheduleEventMinutes']").val(arrayEnd2[1]);
	}
}

function checkSelectFontOptionForHeader(selectId, InputId){
	var content = $("input[id*='"+ InputId +"']").val();
	$("select[id*='"+ selectId +"']").val(content);
}

function aligningHeaderFont(dropDownId, hiddenTextID){
	var content = $("select[id*='"+ dropDownId +"']").val();
	$("input[id*='"+ hiddenTextID +"']").val(content);
}

function iconReplacingForCouponReportOption(){
	$("tbody[id*='reportForm:controllerTable_data'] > tr").each(function () {
		if($(this).find('td:nth-child(3)').text() == "RELEASED"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(5)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "DRAFT" || $(this).find('td:nth-child(3)').text() == "AUTO SAVE NEW"){
			$(this).find('td:nth-child(5) > button:nth-child(3)').show();
			$(this).find('td:nth-child(5) > button:nth-child(5)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(7)').hide();
		}else if($(this).find('td:nth-child(3)').text() == "SUBMITTED"){
			
			$(this).find('td:nth-child(5) > button:nth-child(3)').hide();
			$(this).find('td:nth-child(5) > button:nth-child(5)').show();
			$(this).find('td:nth-child(5) > button:nth-child(7)').show();
			
		}
	});
}

//Below Commented methods is for Customer user permissions.

/*function checkAndUncheckAllButtonForExpandCustomerPermission(bool) {
	if (bool == 'true') {
		if ($("th[id*='testForm:reportPermission:test'] > div > div").find(
				"span").attr("class") != "ui-chkbox-icon ui-icon ui-c ui-icon-check") {
			$("div[class*='ui-chkbox ui-chkbox-all ui-widget'] > div").click();
		}
	} else if (bool == 'false') {
			if ($("th[id*='testForm:reportPermission:test'] > div > div").find(
			"span").attr("class") == "ui-chkbox-icon ui-icon ui-c ui-icon-check"){
				if ($("input[name*='testForm:reportPermission_checkbox']").is(":checked")) {
					$("div[class*='ui-chkbox ui-chkbox-all ui-widget'] > div").click();
				}
			}else{
				$("div[class*='ui-chkbox ui-chkbox-all ui-widget'] > div").click();
				$("div[class*='ui-chkbox ui-chkbox-all ui-widget'] > div").click();
			}
		}
	}

function checkAndUncheckAllButtonForSaveCustomerPermission(bool) {
	if (bool == 'true'){
		$("tbody[id*='testForm:rootNode_data'] > tr").each(function() {
			if (($(this).find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-icon-check ui-c") ||
					($(this).find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-c ui-icon-check")) {
				$(this).find("td > div > div > span").click();
			}
		});
	}else if(bool == 'false'){
		$("tbody[id*='testForm:rootNode_data'] > tr").each(function(){
			if (($(this).find("td > div > div > span").attr("class") == "ui-chkbox-icon ui-icon ui-icon-check ui-c") ||
					($(this).find("td > div > div > span").attr("class") == "ui-chkbox-icon ui-icon ui-c ui-icon-check")) {
				$(this).find("td > div > div > span").click();
			}
		});
	}
}*/

/*function selectAllInTreeTable(widgetVar) {
	   widgetVar.tbody.find('tr').each(function() {
	      widgetVar.selectNodesInRange($(this));
	   });
	}*/
var customer_name; 
function checkAllSelectedcustomer(){
	var id = customer_name;
	var cust_id = id.replace ("customer_", "");
	var id = $("div[id='test_"+cust_id+"']").parent().parent().attr("id");
	$("div[id='test_0']").parent().each(function(){
		var child = $(this).find("span").attr("class");
		var name = $(this).text().trim();
		if(name == cust_id.trim() && child != "ui-treetable-indent"){
			 $(this).click();
		}
	});
	//hideDefaultTemplate();
	/*if (($("tr[id*='"+id+"']").find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-icon-check ui-c") ||
			($("tr[id*='"+id+"']").find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-c ui-icon-check")) {
		$("div[id='test_"+cust_id+"']").parent().parent().find("td").click();
	}*/
	
	/*$("tr[id*='"+id+"']").each(function (){
		var rowId = $(this).attr("id");
		var len = rowId.split("_");
		var leng = len.length
		if(leng == '5' && rowId.substring(27, 28) != undefined &&  rowId.substring(27, 28) == '0'){
			$(this).css("display", "none");
		}
	});*/
	checkAllDefaultTemplateForUserPermission();
	customer_name = "";
}


function fireJsfRowForCustomerPermission(customer){
	customer_name = customer;
	if($("div[id='"+customer+"']").parent().find("div:nth-child(2)").find("span").attr("class") != "ui-chkbox-icon ui-icon ui-c ui-icon-check"){
		$("div[id='"+customer+"']").parent().find("div:nth-child(2)").find("span").click();
	}
	//this method is called to add the selected customer to right hand side..
	fireJsfButtonClick('expandCustomer');
}

function fireJsfRowForCustomerGroupPermission(){
	var len = $("div[id='testForm:dummycustomerName'] > div > table > tbody > tr").length;
	for(var i = 1; i <= len; i++) {
        var name = $("div[id='testForm:dummycustomerName'] > div > table > tbody > tr:nth-child(" + i + ")")[0].innerText;
        var fName = "customer_" + name;
        fireJsfRowForCustomerPermission(fName);
        if(i != len){
        	checkAllSelectedcustomer();
        }
    }
	/*fireJsfButtonClick('saveCustomerPermission');*/
}

//load the values for reporting frerquency checkboxes
function reportingFrequencyCheckboxChecked(value, uniqueId) {
	if(value == null){
		if ($("input[id*='enable_"+uniqueId+"_chkBox']").val() == "true") {
			$(".enable_"+uniqueId+"").click();
		} else {
			$(".disable_"+uniqueId+"").click();
		}
	}else if(value == 'Yes'){
		$(".enable_"+uniqueId+"").click();
		$("input[id*='enable_"+uniqueId+"_chkBox']").val("true");
		if(uniqueId == "reportingFrequency"){
			$("input[name*='reportScheduleMonthsCheckbox']").attr('disabled', false);
			$("input[name*='reportCycleStartCheckBox']").attr('disabled', false);
			$("input[name*='reportCycleEndCheckBox']").attr('disabled', false);
		}
		
	}else if(value == 'No'){
		$(".disable_"+uniqueId+"").click();
		$("input[id*='enable_"+uniqueId+"_chkBox']").val("false");
		if(uniqueId == "reportingFrequency"){
			$("input[name*='reportScheduleMonthsCheckbox']").attr('disabled', true);
			$("input[name*='reportCycleStartCheckBox']").attr('disabled', true);
			$("input[name*='reportCycleEndCheckBox']").attr('disabled', true);
		}
		if(uniqueId == "reportCycleDays"){
			$("input[id*='reportCycleDays_input']").val(30);
			fireJsfButtonClick('reportCycleDaysButton');
		}
		
/*		if(uniqueId == "reportCycleMonth"){
		    $("select[id*='tplForm:requiredTotalReports']").val("1")
		    $("select[id*='tplForm:requiredTotalReports']").trigger('change');
		}*/
		
	}
	fireJsfButtonClick(uniqueId+"_hiddenButton");
}

function resetNoofReportsInReportingFrequecy() {
	$("select[id*='tplForm:requiredTotalReports']").val("1");
	$("select[id*='tplForm:requiredTotalReports']").trigger('change');
}

//enable or disable report cycle
function enableDisableReportCycle(value, uniqueId) {
	if(value == 'Yes'){
		$(".disable_"+uniqueId+"").click();
		$("input[id*='disable_"+uniqueId+"_chkBox']").val("false");
	}else if(value == 'No'){
		$(".enable_"+uniqueId+"").click();
		$("input[id*='enable_"+uniqueId+"_chkBox']").val("true");
	}
	fireJsfButtonClick(uniqueId+"_hiddenButton");
}

function onChangeReportingFrequencyEmailCheckBox(){
	var checkForFalsecheckBox = 'false';
	var checkFortruecheckBox = 'false';
	$("table[id = 'tplForm:reportNoticeEmails'] > tbody > tr").find("input").each(function(){
		if($(this).is(":checked") == false){
			$("input[name='reportingFrequencyEmail']").attr('checked', false);
			checkFortruecheckBox = 'true';
		}else{
			checkForFalsecheckBox = 'true';
		}
	});
	if(checkForFalsecheckBox == 'true' && checkFortruecheckBox == 'false'){
		$("input[name='reportingFrequencyEmail']").prop('checked', 'checked');
	}
}

//save date fields for reporting frequency
function reportingFrequencyValue(uniqueId){
	 var month = $("select[id*='"+uniqueId+"Month']").val();
	 var date = $("select[id*='"+uniqueId+"Date']").val();
	 var year = $("select[id*='"+uniqueId+"Year']").val();
	 var hour = $("select[id*='"+uniqueId+"Hours']").val();
	 var minutes = $("select[id*='"+uniqueId+"Minutes']").val();
	 $("input[id*='"+uniqueId+"DateValue']").val(month +"/"+date+"/"+year+"/"+hour+"/"+minutes);
//	 $("button[id*='"+uniqueId+"DateButton']").click();
}

//edit date fields for reporting frequency
function editReportingFrequencyValue(uniqueId){
	if($("input[id*='tplForm:"+uniqueId+"sOn_input']").val() != undefined){
	var arrayEnd = $("input[id*='tplForm:"+uniqueId+"sOn_input']").val().split(' ');
	if(arrayEnd != ""){
	var arrayEnd1 = arrayEnd[0].split('/');
	var arrayEnd2 = arrayEnd[1].split(':');
	$("select[id*='"+uniqueId+"Month']").val(arrayEnd1[0]);
	$("select[id*='"+uniqueId+"Year']").val(arrayEnd1[2]);
	$("select[id*='"+uniqueId+"Date']").val(arrayEnd1[1]);
	$("select[id*='"+uniqueId+"Hours']").val(arrayEnd2[0]);
	$("select[id*='"+uniqueId+"Minutes']").val(arrayEnd2[1]);
	}
	}
	var checkForFalsecheckBox = 'true';
	$("table[id = 'tplForm:reportNoticeEmails'] > tbody > tr").find("input").each(function(){
		if($(this).is(":checked") == true){
			$("input[name='reportingFrequencyEmail']").attr('checked', true);
		}else{
			checkForFalsecheckBox = 'false';
		}
	});
	if(checkForFalsecheckBox == 'false'){
		$("input[name='reportingFrequencyEmail']").attr('checked', false);
	}
	if($("table[id*='tplForm:reportNoticeEmails'] > tbody > tr > td:nth-child(2)").find("label").text() ==""){
		$("table[id*='tplForm:reportNoticeEmails']").hide();
	}
	
	var checkMonthsForFalseCheckBox = 'true';
	$("table[id = 'tplForm:reportScheduleMonths'] > tbody > tr").find("span").each(function(){
		if($(this).hasClass("ui-icon-check")){
			$("input[name='checkAllMonth']").attr('checked', true);
		}else{
			checkMonthsForFalseCheckBox = 'false';
		}
	});
	if(checkMonthsForFalseCheckBox == 'false'){
		$("input[name='checkAllMonth']").attr('checked', false);
	}
}

function editInputValuesPumpManufacturer(){
	if($('.pumpCheckboxManufacturer:checked').val() == "on"){
		$("input[id*='pumpManufacturerOnOff']").val("on");
	}else{
		$("input[id*='pumpManufacturerOnOff']").val("off");
	}
	fireJsfLinkClick('pumpManufacturerLink');
}
function editInputValuesProductName(){
	if($('.productName:checked').val() == "on"){
		$("input[id*='productNameOnOff']").val("on");	
	}else{
		$("input[id*='productNameOnOff']").val("off");
	}
	fireJsfLinkClick('productNameLink');
}
function editInputValuesFeedMethod(){
	if($('.feedMethod:checked').val() == "on"){
		$("input[id*='feedMethodOnOff']").val("on");
	}else{
		$("input[id*='feedMethodOnOff']").val("off");
	}
	fireJsfLinkClick('feedMethodLink');
}
function editInputValuesControllerName(){
	if($('.controllerName:checked').val() == "on"){
		$("input[id*='controllerNameOnOff']").val("on");
	}else{
		$("input[id*='controllerNameOnOff']").val("off");
	}
	fireJsfLinkClick('controllerNameLink');
}
function editInputValuesPumpModel(){
	if($('.pumpModel:checked').val() == "on"){
		$("input[id*='pumpModelOnOff']").val("on");
	}else{
		$("input[id*='pumpModelOnOff']").val("off");
	}
	fireJsfLinkClick('pumpModelLink');
}
function editInputValuesPumpSerial(){
	if($('.pumpSerial:checked').val() == "on"){
		$("input[id*='pumpSerialOnOff']").val("on");
	}else{
		$("input[id*='pumpSerialOnOff']").val("off");
	}
	fireJsfLinkClick('pumpSerialLink');
}


function pumpSettingCheckbox(){
	if($("input[id*='pumpManufacturerOnOff']").val() == "on"){
		$("input[class='pumpCheckboxManufacturer']").click();
	}
	if($("input[id*='productNameOnOff']").val() == "on"){
		$("input[class='productName']").click();
	}
	if($("input[id*='feedMethodOnOff']").val() == "on"){
		$("input[class='feedMethod']").click();
	}
	if($("input[id*='controllerNameOnOff']").val() == "on"){
		$("input[class='controllerName']").click();
	}
	if($("input[id*='pumpModelOnOff']").val() == "on"){
		$("input[class='pumpModel']").click();
	}
	if($("input[id*='pumpSerialOnOff']").val() == "on"){
		$("input[class='pumpSerial']").click();
	}
}

function inventorySectionCheckbox(id){
	$("div[id*='"+ id +"']").click();
}

function inventoryCheckbox(){
	if($("div[id*='currentInventoryVisibility'] > span").text() == "ON"){
		$("input[class='currentInventoryVisibility']").prop("checked","checked");
	}
	if($("div[id*='previousInventoryVisibility'] > span").text() == "ON"){
		$("input[class='previousInventoryVisibility']").prop("checked","checked");
	}
	if($("div[id*='chemicalConsumedVisibility'] > span").text() == "ON"){
		$("input[class='chemicalConsumedVisibility']").prop("checked","checked");
	}
}

function editInputValuesKeepTheAboveText(){
	if($('.keepTheAboveText:checked').val() == "on"){
		$("input[id*='keepTheAboveTextOnOff']").val("on");
	}else{
		$("input[id*='keepTheAboveTextOnOff']").val("off");
	}
	fireJsfLinkClick('keepTheAboveTextLink');
}

function editInputValuesPreserveReadings(){
	if($('.preserveReadings:checked').val() == "on"){
		$("input[id*='preserveReadingsOnOff']").val("on");
	}else{
		$("input[id*='preserveReadingsOnOff']").val("off");
	}
	fireJsfLinkClick('preserveReadingsLink');
}

function editInputValuesEmailNotify(){
	if($('.autoEmailNotify:checked').val() == "on"){
		$("input[id*='autoEmailNotifyOnOff']").val("on");
	}else{
		$("input[id*='autoEmailNotifyOnOff']").val("off");
	}
	fireJsfLinkClick('autoEmailNotifyLink');
}

function inventorySettingCheckbox(){
	if($("input[id*='keepTheAboveTextOnOff']").val() == "on"){
		$("input[class='keepTheAboveText']").prop("checked","checked");
	}
	if($("input[id*='preserveReadingsOnOff']").val() == "on"){
		$("input[class='preserveReadings']").prop("checked","checked");
	}
	if($("input[id*='autoEmailNotifyOnOff']").val() == "on"){
		$("input[class='autoEmailNotify']").prop("checked","checked");
	}
}

function editInputValuesSpeedAndStrokeSetting(){
	if($('.speedAndStrokeSetting:checked').val() == "on"){
		$("input[id*='speedAndStrokeSettingOnOff']").val("on");
		$("input[id*='bulkFeedSettingsOnOff']").val("off");
	}else{
		$("input[id*='speedAndStrokeSettingOnOff']").val("off");
	}
	fireJsfLinkClick('speedAndStrokeSettingLink');
}

function editInputValuesBulkFeedSettings(){
	if($('.bulkFeedSettings:checked').val() == "on"){
		$("input[id*='bulkFeedSettingsOnOff']").val("on");
		$("input[id*='speedAndStrokeSettingOnOff']").val("off");
	}else{
		$("input[id*='bulkFeedSettingsOnOff']").val("off");
	}
	fireJsfLinkClick('bulkFeedSettingsLink');
}

function editInputValuesKeepTheAboveTextLoad(){
	if(!$('.keepTheAboveTextLoad:checked').val()){
		$("input[id*='keepTheAboveTextLoadOnOff']").val("on");
	}
	else if($('.keepTheAboveTextLoad:checked').val() == "on"){
		$("input[id*='keepTheAboveTextLoadOnOff']").val("on");
	}else{
		$("input[id*='keepTheAboveTextLoadOnOff']").val("off");
	}
	fireJsfLinkClick('keepTheAboveTextLoadLink');
}

function pumpMetricsCheckbox(){
	if($("input[id*='speedAndStrokeSettingOnOff']").val() == "on"){
		$("input[class='speedAndStrokeSetting']").prop("checked","checked");
	}
	if($("input[id*='bulkFeedSettingsOnOff']").val() == "on"){
		$("input[class='bulkFeedSettings']").prop("checked","checked");
	}
	if($("input[id*='keepTheAboveTextLoadOnOff']").val() == "on"){
		$("input[class='keepTheAboveTextLoad']").prop("checked","checked");
	}
}

function callImageManagerSelectValues(){
	setTimeout(function(){ fireJsfLinkClick('imageManagerMenuLnk');}, 1000);
}

function setInputValueConfigBean(){
	$("input[id*='configBeanSharedImage']").val(true);
	fireJsfLinkClick('configBeanSharedImageLink')
}

function checkAllEmailReportingFrequencyEmail(){
	$("table[id = 'tplForm:reportNoticeEmails'] > tbody > tr").find("input").each(function(){
		if($("input[name='reportingFrequencyEmail']").is(":checked") == true){
			if($(this).is(":checked") == false){
				$(this).click();
			}
		}else if($("input[name='reportingFrequencyEmail']").is(":checked") == false){
			if($(this).is(":checked") == true){
				$(this).click();
			}
		}
	});
	
	/*$("table[id = 'tplForm:reportUserNoticeEmails'] > tbody > tr").find("input").each(function(){
		if($("input[name='reportingFrequencyEmail']").is(":checked") == true){
			if($(this).is(":checked") == false){
				$(this).click();
			}
		}else if($("input[name='reportingFrequencyEmail']").is(":checked") == false){
			if($(this).is(":checked") == true){
				$(this).click();
			}
		}
	});*/
}

function checkAllDefaultTemplateForUserPermission() {
	$("div[id='testForm:rootNode']").find("table > tbody > tr").each(
			function() {
				var rowId = $(this).attr("id");
				if (rowId != undefined) {
					var len = rowId.split("_");
					var leng = len.length
					if (rowId.substring(27, 28) == '_') {
						var str = rowId.substring(28, 29);
					} else {
						var str = rowId.substring(27, 28);
					}
					var leng = len.length
					if (leng == '5' && rowId.substring(27, 28) != undefined
							&& str == '0') {
						var styleClass = $(this).find("td > div > div > span")
								.attr("class").trim();
						$(this).css("display", "none");
					}
				}
			});
	$('.ui-icon-minus').parent().parent().parent().css('color', '#1464F6 !important');
	$('.ui-icon-minus').parent().parent().parent().css('background-color', '#eff3f5');
	$('.ui-icon-minus').addClass("ui-icon-check");
	
}

function hideDefaultTemplate(){
	$("div[id='testForm:rootNode']").find("table > tbody > tr").each(function(){
		
		var rowId = $(this).attr("id");
		if(rowId != undefined){
		var len = rowId.split("_");
		var leng = len.length
		var test = len[4];
		
		if(leng == '5' && test != undefined &&  test == '0'){
			if($(this).find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-icon-check ui-c" || 
					$(this).find("td > div > div > span").attr("class") != "ui-chkbox-icon ui-icon ui-c ui-icon-check"){
				$(this).css("display","none");
				//$(this).click();
			}
		}
		}
	});
	
	$('.ui-icon-minus').parent().parent().parent().css('color', '#1464F6 !important');
	$('.ui-icon-minus').parent().parent().parent().css('background-color', '#eff3f5');
	$('.ui-icon-minus').addClass("ui-icon-check");
}

function showDeleteButtonPump(){
	$("button[id*='deleteHtmlButtonPump']").css("display","block");
}

function hideDeleteButtonPump(){
	$("button[id*='deleteHtmlButtonPump']").css("display","none");
}

function showDeleteButtonInventory(id){
	if(id > 1){
		$("button[id*='deleteHtmlButtonInventory']").css("display","block");
	}else {
		$("button[id*='deleteHtmlButtonInventory']").css("display","none");
	}
	if(($("input[id='rptForm:status']").val() == 'SUBMITTED') || ($("input[id='rptForm:status']").val() == 'RELEASED')){
		$("button[id*='deleteHtmlButtonInventory']").css("display","none");
	}
}

function hideDeleteButtonInventory(){
	$("button[id*='deleteHtmlButtonInventory']").css("display","none");
}

function showDeleteButtonWaterMeter(){
	$("button[id*='deleteHtmlButtonWaterMeter']").css("display","block");
}

function hideDeleteButtonWaterMeter(){
	$("button[id*='deleteHtmlButtonWaterMeter']").css("display","none");
}

function disablehigherValues(){
	$("div[id*='rangeId']").find("tr[data-ri*='0']").css("display","none");
	$("div[id*='rangeId']").find("tr[data-ri*='1']").css("display","none");
	$("div[id*='rangeId']").find("tr[data-ri*='2']").css("display","none");
	$("div[id*='rangeId']").find("tr[data-ri*='3']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='4']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='5']").removeAttr("style");
}

function disableLowerValues(){
	$("div[id*='rangeId']").find("tr[data-ri*='0']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='1']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='2']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='3']").css("display","none");
	$("div[id*='rangeId']").find("tr[data-ri*='4']").css("display","none");
	$("div[id*='rangeId']").find("tr[data-ri*='5']").css("display","none");
}

function enableAllValues(){
	$("div[id*='rangeId']").find("tr[data-ri*='0']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='1']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='2']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='3']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='4']").removeAttr("style");
	$("div[id*='rangeId']").find("tr[data-ri*='5']").removeAttr("style");
}

function chemicalConsumedValue(){
	if($("input[id*='currentInventory']").val() != "" && $("input[id*='previousInventory']").val() !=  ""){
		diff = parseFloat($("input[id*='previousInventory']").val()) - parseFloat($("input[id*='currentInventory']").val());
		$("input[id*='InputChemicalConsumed']").val(Math.abs(diff.toFixed(2)));
	}else if($("input[id*='currentInventory']").val() != "" && $("input[id*='previousInventory']").val() !=  ""){
		diff = parseFloat($("input[id*='previousInventory']").val()) - parseFloat($("input[id*='currentInventory']").val());
		$("input[id*='InputChemicalConsumed']").val(Math.abs(diff.toFixed(2)));
	} else {
		$("input[id='InputChemicalConsumed']").val(0);
	}
	
}

function changeOfRanges(id) {
	if (id === "Report") {
		if (!$("div[class*='HIGHEST1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGHEST1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='HIGHEST1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGHEST1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
	if (id === "Report") {
		if (!$("div[class*='HIGHER1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGHER1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='HIGHER1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGHER1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
	if (id === "Report") {
		if (!$("div[class*='HIGH1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGH1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='HIGH1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='HIGH1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
	if (id === "Report") {
		if (!$("div[class*='LOW1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOW1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='LOW1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOW1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
	if (id === "Report") {
		if (!$("div[class*='LOWER1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOWER1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='LOWER1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOWER1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
	if (id === "Report") {
		if (!$("div[class*='LOWEST1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOWEST1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	} else if (id === "Template") {
		if ($("div[class*='LOWEST1']").find(
				$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
				.hasClass('ui-state-active')) {
			$("div[class*='LOWEST1']").find(
					$("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
					.click();
		}
	}
}

function loadOfRanges() {
	var highest = false;
	var higher = false;
	var high = false;
	var low = false;
	var lower = false;
	var lowest = false;
	
	if ($("div[class*='HIGHEST1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		highest = true;
	}
	if ($("div[class*='HIGHER1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		higher = true;
	}
	if ($("div[class*='HIGH1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		high = true;
	}
	if ($("div[class*='LOW1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		low = true;
	}
	if ($("div[class*='LOWER1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		lower = true;
	}
	if ($("div[class*='LOWEST1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']"))
			.hasClass('ui-state-active')) {
		lowest = true;
	}
	
	if(highest == false || higher == false || high == false || low == false || lower == false || lowest == false){
		if (highest == true){
			$("div[class*='HIGHEST1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		if (higher == true){
			$("div[class*='HIGHER1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		if (high == true){
			$("div[class*='HIGH1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		if (low == true){
			$("div[class*='LOW1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		if (lower == true){
			$("div[class*='LOWER1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		if (lowest == true){
			$("div[class*='LOWEST1']").find($("div[class*='ui-chkbox-box ui-widget ui-corner-all']")).click();
		}
		$("#opt100").prop("checked", true);
	}else {
		$("#opt101").prop("checked", true);
	}
}

function averageGPDValue(){
	var currReading = parseInt($("input[id*='currentReading']").val());
	var prevReading = parseInt($("input[id*='previousReading']").val());
	
	if($("input[id*='currentReading']").val() === undefined || $("input[id*='currentReading']").val() == ""){
		currReading = 0;
	}
	if($("input[id*='previousReading']").val() === undefined || $("input[id*='previousReading']").val() == ""){
		prevReading = 0;
	}
	if(currReading != undefined && prevReading != undefined){
		if($("input[id*='daysSincelastVisit']").val() != 0 && ((prevReading > currReading) || (prevReading < currReading))){
			diff = (currReading - prevReading) / $("input[id*='daysSincelastVisit']").val();
		}else if((prevReading > currReading) || (prevReading < currReading) || (prevReading === currReading)){
			diff = (currReading - prevReading);
		}
		$("input[id*='averageGPD']").val(diff.toFixed(2));
	}else {
		$("input[id*='averageGPD']").val(0);
	}
}

function averageGPMValue(){
	if($("input[id*='currentReading']").val() != "" && $("input[id*='previousReading']").val() !=  ""){
		var currReading = parseInt($("input[id*='currentReading']").val());
		var prevReading = parseInt($("input[id*='previousReading']").val());
		if($("input[id*='daysSincelastVisit']").val() != 0 && ((prevReading > currReading) || (prevReading < currReading))){
			diff = ((currReading - prevReading) / $("input[id*='daysSincelastVisit']").val()) / 1440;
		}else if((prevReading > currReading) || (prevReading < currReading) || (prevReading === currReading)){
			diff = (currReading - prevReading) / 1440;
		}
		$("input[id*='averageGPM']").val(diff.toFixed(2));
	}else {
		$("input[id*='averageGPM']").val(0);
	}
}

function settingTheValueTools(id){
	$("span[id='textForTools']").text(id);
}

function editAutoEmailNotificationText(){
	if($('.autoEmailNotification:checked').val() == "on"){
		$("input[id*='autoEmailNotificationText']").val("on");
	}else{
		$("input[id*='autoEmailNotificationText']").val("off");
	}
	fireJsfLinkClick('autoEmailNotificationLink');
}

function autoEmailNotification(){
	if($("input[id*='autoEmailInputText']").val() == "on"){
		fireJsfButtonClick('saveUpdateNo');
	}else{
		fireJsfModalShow('myModal_auto_email');
	}
}

function editshowWaterMeterReading(){
	if($('.showWaterMeterReading:checked').val() == "on"){
		$("input[id*='showWaterMeterReadingText']").val("1");
	}else{
		$("input[id*='showWaterMeterReadingText']").val("0");
	}
	fireJsfLinkClick('showWaterMeterReadingLink');
}

function editshowAverageGPM(){
	if($('.showAverageGPM:checked').val() == "on"){
		$("input[id*='showAverageGPMText']").val("1");
	}else{
		$("input[id*='showAverageGPMText']").val("0");
	}
	fireJsfLinkClick('showAverageGPMLink');
}

function editshowAverageGPD(){
	if($('.showAverageGPD:checked').val() == "on"){
		$("input[id*='showAverageGPDText']").val("1");
	}else{
		$("input[id*='showAverageGPDText']").val("0");
	}
	fireJsfLinkClick('showAverageGPDLink');
}

function waterMeterCheckboxReading(){
	if($("input[id*='showWaterMeterReadingText']").val() == "1"){
		$("input[class='showWaterMeterReading']").prop("checked","checked");
	}
	if($("input[id*='showAverageGPDText']").val() == "1"){
		$("input[class='showAverageGPD']").prop("checked","checked");
	}
	if($("input[id*='showAverageGPMText']").val() == "1"){
		$("input[class='showAverageGPM']").prop("checked","checked");
	}
}

function errorValidationForQuickPhrase(){
	if($("select[id*='quickPhraseCategory1']").val() == "" ){
		$("span[id*='errorMessageCategory']").addClass("error");
		$("span[id*='errorMessageCategory']").text("Category is required");
	}else if($("textarea[id*='quickPhraseSentence']").val() == ""){
		$("span[id*='errorMessageSentence']").addClass("error");
		$("span[id*='errorMessageSentence']").text("Phrase is required");
	}else {
		fireJsfModalHide('quickPhraseModal')
	}
	
}

function changeLabelOfserviceTable() {
	
	
	if($("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests") {
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
		$("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(1)").text("High Warning Alarm");
	}
	if($("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests"){
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
			$("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(1)").text("High Alarm");
	}
	if($("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests"){
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
			$("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(1)").text("High Control");
	}
	if($("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests"){
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
			$("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(1)").text("Low Control");
	}
	if($("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests"){
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
			$("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(1)").text("Low Alarm");
	}
	if($("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val() != "" && $("input[id*='panelSection']").val() != "tests"){
		var stereoValue = $("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(2) > div > div:nth-child(2) > div > select").val();
			$("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(1)").text(stereoValue);
	}else{
		$("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(1)").text("Low Warning Alarm");
	}
		$("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(1)").css("background-color","#f2dede");
		$("div[id*='rangeId']").find("tr[data-ri*='0'] > td:nth-child(2)").find("input[id*='lowestRange']").css("display","none");
		$("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(1)").css("background-color","#fcf8e3");
		$("div[id*='rangeId']").find("tr[data-ri*='1'] > td:nth-child(2)").find("input[id*='lowestRange']").css("display","none");
		$("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(1)").css("background-color","#dff0d8");
		$("div[id*='rangeId']").find("tr[data-ri*='2'] > td:nth-child(2)").find("input[id*='lowestRange']").css("display","none");	
		$("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(1)").css("background-color","#dff0d8");
		$("div[id*='rangeId']").find("tr[data-ri*='3'] > td:nth-child(2)").find("input[id*='highestRange']").css("display","none");
		$("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(1)").css("background-color","#fcf8e3");
		$("div[id*='rangeId']").find("tr[data-ri*='4'] > td:nth-child(2)").find("input[id*='highestRange']").css("display","none");
		$("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(1)").css("background-color","#f2dede");
		$("div[id*='rangeId']").find("tr[data-ri*='5'] > td:nth-child(2)").find("input[id*='highestRange']").css("display","none");
	}



function clickCheckboxForService(id){
		$("div[class*='"+ id +"'] > div").click();
}

function loadValuesOnPageLoad(){
	if($("div[class*='HIGHEST1'] > div").hasClass('ui-state-active') === true){
		$('.HIGHEST1').prop("checked","checked");
	}
	if($("div[class*='HIGHER1'] > div").hasClass('ui-state-active') === true){
		$('.HIGHER1').prop("checked","checked");
	}
	if($("div[class*='HIGH1'] > div").hasClass('ui-state-active') === true){
		$('.HIGH1').prop("checked","checked");
	}
	if($("div[class*='LOW1'] > div").hasClass('ui-state-active') === true){
		$('.LOW1').prop("checked","checked");
	}
	if($("div[class*='LOWER1'] > div").hasClass('ui-state-active') === true){
		$('.LOWER1').prop("checked","checked");
	}
	if($("div[class*='LOWEST1'] > div").hasClass('ui-state-active') === true){
		$('.LOWEST1').prop("checked","checked");
	}
}

function identifyUserType(){
	var pageName = $(location).attr('pathname').split("/")[3];
	if(pageName === 'employees.jsf'){
		$("input[class='userType']").val("Employees");
	} else if(pageName === 'clients.jsf') {
		$("input[class='userType']").val("Clients");
	} else if(pageName === 'user_operator.jsf') {
		$("input[class='userType']").val("Operators");
	}
}

function errorValidationForPasswordForUsers(spanId,buttonId){
	if($("input[name='editUserForm:pwd1']").val() != $("input[name='editUserForm:pwd2']").val()){
		$("span[id*='" +spanId+ "']").addClass("error");
		$("span[id*='"+ spanId +"']").text("Password should Match");
	}else {
		fireJsfLinkClick(buttonId);
	}
}

function checkReportSubmitOrAprovedToDisableOnOff(){
	if(($("input[id='rptForm:status']").val() == 'SUBMITTED') || ($("input[id='rptForm:status']").val() == 'RELEASED')){
		$("div[class*='btn-group btn_SERVICE_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_SERVICE_GRID']").children().css("pointer-events","none");
		$("button[id='applyCalculationButton']").hide();
		
		$("div[class*='btn-group btn_PUMP_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_PUMP_GRID']").children().css("pointer-events","none");
		$("button[id='addPumpButton']").hide();
		
		$("div[class*='btn-group btn_INVENTORY_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_INVENTORY_GRID']").children().css("pointer-events","none");
		$("button[id='addInventoryButton']").hide();
		
		$("div[class*='btn-group btn_WATERMETER_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_WATERMETER_GRID']").children().css("pointer-events","none");
		$("button[id='addWatermeterButton']").hide();
		
		$("div[class*='btn-group btn_EQUIPMENT_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_EQUIPMENT_GRID']").children().css("pointer-events","none");
		$("button[id='addEquipmentButton']").hide();
		
		$("div[class*='btn-group btn_NOTES_GRID']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_NOTES_GRID']").children().css("pointer-events","none");
		
		$("div[class*='btn-group btn_signatureOnOffBtn']").children().attr('disabled','disabled');
		$("div[class*='btn-group btn_signatureOnOffBtn']").children().css("pointer-events","none");
		
		$("button[id='saveAndClosePump']").hide();
		$("button[id='saveAndCloseInventory']").hide();
		$("button[id='deleteHtmlButtonWaterMeter']").hide();
		$("button[id='deleteHtmlButtonPump']").hide();
		$("button[id='deleteHtmlButtonInventory']").hide();
	}
}

function checkAllMonthsForreportingFrequency(){
	if($("input[name='checkAllMonth']").is(":checked")==true){
		$("table[id = 'tplForm:reportScheduleMonths'] > tbody > tr").find("span").each(function(){
			if(!$(this).hasClass("ui-icon-check")){
				$(this).click();
			}
		});
	}else if($("input[name='checkAllMonth']").is(":checked")==false){
		$("table[id = 'tplForm:reportScheduleMonths'] > tbody > tr").find("span").each(function(){
			if(!$(this).hasClass("ui-icon-blank")){
				$(this).click();
			}
		});
	}
}


function changeUsStates(){
	if($("select[id*='country']").val() == "US"){
		$("select[id*='usState']").css("display","block");
		var usVal =$("input[id*='setAdressFeild']").val();
		$("select[id*='usState']").val(usVal);
		$("select[id*='stateBrazil']").css("display","none");
		$("select[id*='stateMexico']").css("display","none");
		$("select[id*='stateCanada']").css("display","none");
			
	}else if($("select[id*='country']").val() == "Brazil"){
		$("select[id*='usState']").css("display","none");
		$("select[id*='stateMexico']").css("display","none");
		$("select[id*='stateCanada']").css("display","none");
		var brazilVal =$("input[id*='setAdressFeild']").val();
		$("select[id*='stateBrazil']").val(brazilVal);
		$("select[id*='stateBrazil']").css("display","block");
		
	} else if($("select[id*='country']").val() == "Mexico"){
		$("select[id*='usState']").css("display","none");
		$("select[id*='stateBrazil']").css("display","none");
		$("select[id*='stateCanada']").css("display","none");
		var mexicoVal =$("input[id*='setAdressFeild']").val();
		$("select[id*='stateMexico']").val(mexicoVal);
		$("select[id*='stateMexico']").css("display","block");
		
	} else if($("select[id*='country']").val() == "Canada"){
		$("select[id*='usState']").css("display","none");
		$("select[id*='stateBrazil']").css("display","none");
		$("select[id*='stateMexico']").css("display","none");
		var canadaVal =$("input[id*='setAdressFeild']").val();
		$("select[id*='stateCanada']").val(canadaVal);
		$("select[id*='stateCanada']").css("display","block");
	}
}

function setStateInAddress(){
	if($("select[id*='country']").val() == "US"){
		var usVal = $("select[id*='usState']").val();
		$("input[id*='setAdressFeild']").val(usVal);
		fireJsfButtonClick('dummyButtonForStateFeild');
	}else if($("select[id*='country']").val() == "Brazil"){
		var brazilVal = $("select[id*='stateBrazil']").val();
		$("input[id*='setAdressFeild']").val(brazilVal);
		fireJsfButtonClick('dummyButtonForStateFeild');
	}else if($("select[id*='country']").val() == "Mexico"){
		var mexicoVal = $("select[id*='stateMexico']").val();
		$("input[id*='setAdressFeild']").val(mexicoVal);
		fireJsfButtonClick('dummyButtonForStateFeild');
	}else if($("select[id*='country']").val() == "Canada"){
		var canadaVal = $("select[id*='stateCanada']").val();
		$("input[id*='setAdressFeild']").val(canadaVal);
		fireJsfButtonClick('dummyButtonForStateFeild');
	}	
}

function dummyLogout(){
	var contextName = $(location).attr('pathname').split("/")[1];
	var url = $(location).attr('origin') +"/"+ contextName + "/home/login.jsf";
	window.location.href = url;
}

function isNumberForServiceGrid(evt) {
	var celVal = evt.currentTarget.value;
	evt = (evt) ? evt : window.event;
	if(celVal.indexOf(".") != -1 && evt.charCode == 46){
		return false;
	}
	if($("input[id*='allowNegativeForcell_"+evt.currentTarget.name.split(":")[2]+"_"+evt.currentTarget.name.split(":")[4]+"'"+"]").val() =="true"){
		if(evt.charCode == 45){
			return true;
		}
	}
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
        return false;
    }
    
    if(charCode == 47){
    	return false;
    } else {
    	return true;
    }
}

function searchOnPressEnter(event, elementId){
	if(event.keyCode == 13){
		fireJsfLinkClick(elementId);
		event.preventDefault();
	}
}

function errorValidationForProduct(){
	if($("input[id*='productList']").val() == "" || $("select[id*='productList']").val() == "Select Product"){
		$("span[id*='errorMessageProduct']").addClass("error");
		$("span[id*='errorMessageProduct']").text("Product is required");
	}else {
		fireJsfLinkClick('invnReorderemailSend');
	}
}

function uniqueIdForSelect(){
	if($("div[id*='rowPanel_panel']").find("li").find("select").size() == 0){
		$("select[id*='rowsDropDown']").clone().appendTo($("div[id*='rowPanel_panel']").find("li"));
		$("div[id*='rowPanel_panel']").find("li").find("select").css("display","block");
	}
	$("div[id*='rowPanel_panel']").find("li").each(function(index, value) {
		var id = $(this).find("label").text();
		$(this).find("select").prop('selectedIndex',index);
		$(this).find("select").attr("class",id);
	});
}

function changeValueOfSelect(){
	$(document).on('change', 'select', function (e) {
		var id = $(this).attr('class');
		$("input[id*='rowsDropDownValue']").val($("select[class*='"+ id +"']").val());
		$("input[id*='rowsDropDownClass']").val(id);
		fireJsfLinkClick('rowsDropDownLink');
	});
}

function showDropDownRows(){
	PF('someVarNameRows').show();
	setTemplateRowDropdownWidth();
}

function uniqueIdForSelectColumns(){
	if($("div[id*='colPanel_panel']").find("li").find("select").size() == 0){
		$("select[id*='columnsDropDown']").clone().appendTo($("div[id*='colPanel_panel']").find("li"));
		$("div[id*='colPanel_panel']").find("li").find("select").css("display","block");
	}
	$("div[id*='colPanel_panel']").find("li").each(function(index, value) {
		var id = $(this).find("label").text();
		$(this).find("select").prop('selectedIndex',index);
		$(this).find("select").attr("class",id);
	});
}

function changeValueOfSelectColumns(){
	$(document).on('change', 'select', function (e) {
		var id = $(this).attr('class');
		$("input[id*='columnsDropDownValue']").val($("select[class*='"+ id +"']").val());
		$("input[id*='columnsDropDownClass']").val(id);
		fireJsfLinkClick('columnsDropDownLink');
	});
}

function showDropDownColumns(){
	PF('someVarNameColumns').show();
	setTemplateColumnDropdownWidth();
}

function fireUpdateButtonForTemplate(id){
	if(id == 'template'){
		fireJsfLinkClick('templateManageTests');
	}
}

/*function sendInventoryEmail(type){
	if(type=='Service'){
		if($("input[id*='autoEmailInputText']").val() == "on"){
			fireJsfButtonClick('reportSubmitButton');
		}else{
			fireJsfModalShow('myModal_auto_email');
		}
	}else{
		fireJsfButtonClick('reportSubmitButton');
	}
}*/

function sendInventoryEmail(type){
	if(type=='Service'){
		if($("input[id*='autoEmailInputText']").val() == "on"){
			fireJsfButtonClick('reportSubmitButton');
		}else if($("input[id*='hideOrShowLowInvPopUp']").val() == "true"){
			fireJsfModalShow('myModal_auto_email');
		}else{
			fireJsfButtonClick('reportSubmitButton');
		}
	}else{
		fireJsfButtonClick('reportSubmitButton');
	}
}

function validate(evt) {
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
	}

function fireReportSaveWaringOnDraftState(){
	if($("input[id='rptForm:status']").val() == 'DRAFT'){
		fireJsfModalShow('myModalReportClose');
	}else{
		fireJsfButtonClick('reportMenuClose');
	}
}

function applyingCssForExportToDestUnitOnUnitChange(){
	var id = $(".exportToUnitDestValue").val();
	
	$(".exportToUnitDestName").each(function () {
		$(this).find("label").removeClass("btn btn-success active").addClass("btn btn-default");
		$(this).find("label").find("i").removeClass("fa fa-building Fs22 white animated swing infinite").addClass("fa fa-building Fs22").css("color","#864001");
	});
	
	if(id != ""){
		$("."+id).find("label").removeClass("btn btn-default").addClass("btn btn-success active");
		$("."+id).find("label").find("i").removeClass("fa fa-building Fs22").addClass("fa fa-building Fs22 white animated swing infinite").removeAttr("style");
	}
}

function scheduleEmailDateTime(){
	 var month = $("select[id*='scheduleEmailMonth']").val();
	 var date = $("select[id*='scheduleEmailDate']").val();
	 var year = $("select[id*='scheduleEmailYear']").val();
	 var hours = $("select[id*='scheduleEmailHours']").val();
	 var minutes = $("select[id*='scheduleEmailMinutes']").val();
	 $("input[id*='sendEmailDateValue']").val(month +"/"+date+"/"+year+"/"+hours+"/"+minutes);
	 if(month != "MM" && date != "DD" && year != "YYYY" && hours != "HH" && minutes != "mm"){
		 $("input[id*='forStoreSendEmailDateValue']").val(month +"/"+date+"/"+year+" "+hours+":"+minutes);
	 }
	 $("button[id*='sendEmailDateButton']").click();
}

function setScheduleEmailDateTime(){
	 $("select[id*='scheduleEmailMonth']").val("MM");
	 $("select[id*='scheduleEmailDate']").val("DD");
	 $("select[id*='scheduleEmailYear']").val("YYYY");
	 $("select[id*='scheduleEmailHours']").val("HH");
	 $("select[id*='scheduleEmailMinutes']").val("mm");
}

function setReportPdfIcon(){
	$("tbody[id*='reportForm:rptTable_data'] > tr").each(function () {
		if(new Date($(this).find('td:nth-child(4)').text().split('by')[0]) <= new Date($("input[id*='compareDate']").val())){
			$("a[id*='newReport']").hide();
			$("a[id*='oldReport']").show();
		}else{
			$("a[id*='newReport']").show();
			$("a[id*='oldReport']").hide();
		}
	});
}

function displayChartAndPdfIcon(id){
	if(id === "outOfSpecTable"){
		if($(".outOfSpecTable").find("tbody > tr").length === 1 
				&& $(".outOfSpecTable").find("tbody > tr").text() === "SystemNo results found"){
			$(".outOfSpecPdf").hide();
		}
	}else{
		$(".timeMgmtPdf").hide();
	}
}

function initLocalVariables(){
	mainNotesFlag = false;
	notesFlag = false;
}
function loadWatermeterChart(){
	setTimeout(function(){ $("button[id='rptForm:equipGridForm:testButton']").click();}, 3000);
};

function initSupport(){
	setTimeout(function(){$("button[id*='supportButton']").click();}, 1000);
} 

function initFeedBack(){
	setTimeout(function(){$("button[id*='FeedbackButton']").click();}, 1000);
} 

function setCalenderZindex(){
	setTimeout(function(){$("#ui-datepicker-div").css('z-index','99999999999999999999999999999999999999999999')},1);
}

function setTemplateRowDropdownWidth(){
	setTimeout(function(){$("div[id*='tplForm:rowPanel_panel']").css('width','501px')},1);
	$("div[id*='tplForm:colPanel']").css("display","none");
}

function setTemplateColumnDropdownWidth(){
	setTimeout(function(){$("div[id*='tplForm:colPanel']").css('width','501px')},1);
	$("div[id*='tplForm:rowPanel_panel']").css("display","none");
}

function hideDisplayChart(){
	if(PF("waterMeterGraphActiveCheckbox").input.is(':checked')){
		$("div[id*='equipmentChart']").show();
	}
	else{
		$("div[id*='equipmentChart']").hide();
	}
}
function waterMeterShowGpd(){
	$(".showAverageGPD").prop('checked', true);
}

function checkShowWaterMeterReading(){
	$(".showWaterMeterReading").prop('checked', true);
}


/*function creatingFormulaDropDown(){
	var labels = [];
	var formula = $(".formulaDisplayToken").val();
	if(formula !== undefined){
		if(formula.includes("MAX")){
			formula = formula.replace(/MAX/g, "");
		} else if(formula.includes("MIN")){
			formula = formula.replace(/MIN/g, "");
		}
		var tempToken = formula.split('');
		for(var i=0;i<=tempToken.length-1;i++){
			if(tempToken[i].match("^[A-Z]+$") !== null){
				labels.push(tempToken[i]);
			}
		}
		$("div[class*='demo']").remove();
		for(var i=0;i<=labels.length-1;i++){
			if($("select[id*='insertMsr']").length === 1){
				$(".insertTest").append("<div class='demo' style='display:table;'></div>");
				$(".demo").append("<label class='demo' style='float: left;margin-right: 10px;margin-top: 6px;color: black;'>"+labels[i]+"</label>").append($("select[id*='insertMsr']").clone());
			} else {
				var id= "demo"+i;
				$("select[id*='insertMsr']").each(function() {
					$(".insertTest").append("<div class="+id+" style='display:table;'></div>");
					$("."+id).append("<label class="+id+" style='float: left;margin-right: 10px;margin-top: 6px;color: black;'>"+labels[i]+"</label>").append($(this).clone());
					return false;
				});
			}
		}
		
		fireJsfButtonClick('dummyButtonForFormulaDisplayToken');
	}
}

function settingFormulaTokenVal(){
	if($(".calculatedVal").text() === 'true'){
		var value ="";
		$("select[id*='insertMsr']").each(function() {
			if(value === ""){
				value = $(this).val();
			} else {
				value += "###" + $(this).val();
			}
		});

		if(new Date($(this).find('td:nth-child(4)').text().split('by')[0]) <= new Date($("input[id*='compareDate']").val())){
			$("a[id*='newReport']").hide();
			$("a[id*='oldReport']").show();
		}else{
			$("a[id*='newReport']").show();
			$("a[id*='oldReport']").hide();
		}

		$(".formulaToken").val(value);
		fireJsfButtonClick('dummyButtonForFormulaToken');
	}
	
	fireJsfModalHide('myModal1');
}

function settingValuesForDropdownOnLoad(){
	if($(".calculatedVal").text() === 'true'){
		var formulaTokenValue = $(".formulaToken").val().split("###");
		if($("select[id*='insertMsr']").length === formulaTokenValue.length){
			if(formulaTokenValue[formulaTokenValue.length-1] !== ""){
				formulaTokenValue.pop();
			}
		}
		for(var i=0;i<=formulaTokenValue.length-1;i++){
			if(i === 0){
				$(".demo").find("select").val(formulaTokenValue[i]);
			} else {
				var id="demo"+i;
				$("."+id).find("select").val(formulaTokenValue[i]);
			}
		}
	}
}

function settingValuesForDropdownOnLoadOfReport(){
	if($(".calculatedVal").text() === 'true'){
		var formulaTokenValue = $(".formulaToken").val().split("###");
		if($("select[id*='insertMsr']").length === formulaTokenValue.length){
			if(formulaTokenValue[formulaTokenValue.length-1] !== ""){
				formulaTokenValue.pop();
			}
		}
		for(var i=0;i<=formulaTokenValue.length-1;i++){
			$(".demo").find("select option").each(function() {
				var temp = "";
				if($(this).text().indexOf(formulaTokenValue[i]) >= 0){
					temp = $(this).text();
				}
				if(i === 0){
					$(".demo").find("select").val(temp);
				} else {
					var id="demo"+i;
					$("."+id).find("select").val(temp);
				}
				
				if(temp !== ""){
					return false;
				}
			});
		}
	}
}

function frameFormula(){
	var label=0,temp="";
	var maxVal = false;
	var labels = [];
	var formula = $(".formulaDisplayToken").val();
	if(formula !== undefined){
		if(formula.includes("MAX")){
			formula = formula.replace(/MAX/g, "");
			maxVal = true;
		} else if(formula.includes("MIN")){
			formula = formula.replace(/MIN/g, "");
		}
		var tempToken = formula.split('');
		
		for(var i=0;i<=tempToken.length-1;i++){
			if(tempToken[i].match("^[A-Z]+$") !== null){
				labels.push(tempToken[i]);
			}
		}
		
		$("div[class*='demo']").find("select").each(function() {
			localStorage.setItem(labels[label],$(this).val());
			label++;
		});
		
		for(var i=0;i<=tempToken.length-1;i++){
			if(tempToken[i].match("^[A-Z]+$") !== null){
				var val = localStorage.getItem(tempToken[i]);
				if(temp === ""){
					temp = val;
				} else {
					temp += val;
				}
			} else {
				if(temp !== ""){
					temp += tempToken[i];
				}
			}
		}
		
		if(maxVal === true){
			temp = "MAX(" + temp; 
		}
		$(".formula").val(temp);
	}
}*/
function settingFormulaTokenVal(){
}
function creatingFormulaDropDown(){
}
function settingValuesForDropdownOnLoad(){
	
}
function frameFormula(){
	
}

/*function customerReviewValidation(){
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if($("input[id*='customerReviewName']").val() == ""){
		fireJsfButtonClick('throwValidationName');
	}else if($("input[id*='timeFrom']").val() == "") {
		fireJsfButtonClick('throwValidationDate');
	}else if($("input[id*='timeTo']").val() == ""){
		fireJsfButtonClick('throwValidationDate');
	}else if(!emailReg.test($("input[id*='email']").val())) {
		fireJsfButtonClick('throwValidationEmail');
	}else {
		fireJsfButtonClick('customerReviewSaveBtn');
	}
}*/

function fetchchangeOfRanges(id, type) {
	if(type === "report") {
		if (id === "reportRangeStatus") {
			$("input[id*='reportRangeStatus']").val(true);
		}else {
			$("input[id*='reportRangeStatus']").val(false);
		}
		fireJsfLinkClick('rangeStatus');
	}
}

/*function customerReviewValidation(){
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if($("input[id*='customerReviewName']").val() == ""){
		fireJsfButtonClick('throwValidationName');
	}else if($("input[id*='timeFrom']").val() == "") {
		fireJsfButtonClick('throwValidationDate');
	}else if($("input[id*='timeTo']").val() == ""){
		fireJsfButtonClick('throwValidationDate');
	}else if(!emailReg.test($("input[id*='email']").val())) {
		fireJsfButtonClick('throwValidationEmail');
	}else {
		fireJsfButtonClick('customerReviewSaveBtn');
	}
}
}*/

function calModalInitForServicereport(){
	fireJsfButtonClick('calResetButton');
}

function calModalForServicereport(test){
	if(test=='lsi'){
		if($("select[id*='lsiDegreeSelectMenu']").val() == '°F' || $("select[id*='lsiDegreeSelectMenu']").val() == 'F°'){
			 var cTemp = $("input[id*='lsiDegreeCorF']").val();  
			 var cToFahr = cTemp * 9 / 5 + 32;  
			 $("input[id*='lsiDegreeCorF']").val(cToFahr.toFixed(1));
		}else{
			 var fTemp =  $("input[id*='lsiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='lsiDegreeCorF']").val(fToCel.toFixed(1));
		}
	}else if(test=='rsi'){
		if($("select[id*='rsiDegreeSelectMenu']").val() == '°F' || $("select[id*='rsiDegreeSelectMenu']").val() == 'F°'){
			 var cTemp = $("input[id*='rsiDegreeCorF']").val();  
			 var cToFahr = cTemp * 9 / 5 + 32;  
			 $("input[id*='rsiDegreeCorF']").val(cToFahr.toFixed(1));
		}else{
			 var fTemp =  $("input[id*='rsiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='rsiDegreeCorF']").val(fToCel.toFixed(1));
		}
	}else if(test ===  'psi'){
		if($("select[id*='psiDegreeSelectMenu']").val() == '°F' || $("select[id*='psiDegreeSelectMenu']").val() == 'F°'){
			 var cTemp = $("input[id*='psiDegreeCorF']").val();  
			 var cToFahr = cTemp * 9 / 5 + 32;  
			 $("input[id*='psiDegreeCorF']").val(cToFahr.toFixed(1));
		}else{
			 var fTemp =  $("input[id*='psiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='psiDegreeCorF']").val(fToCel.toFixed(1));
		}
	}
}

function assigneTempValue(test){
	if(test == 'lsi'){
		if($("select[id*='lsiDegreeSelectMenu']").val() == '°F'){
			 var fTemp =  $("input[id*='lsiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='lsiTemp']").val(fToCel.toFixed(1));
			 fireJsfLinkClick('lsiLink');
		}else if($("select[id*='lsiDegreeSelectMenu']").val() == '°C'){
			 var cTemp = $("input[id*='lsiDegreeCorF']").val();
			 $("input[id*='lsiTemp']").val(cTemp);
			 fireJsfLinkClick('lsiLink');
		}
	}if(test == 'rsi'){
		if($("select[id*='rsiDegreeSelectMenu']").val() == '°F'){
			 var fTemp =  $("input[id*='rsiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='rsiTemp']").val(fToCel.toFixed(1));
			 fireJsfLinkClick('rsiLink');
		}else if($("select[id*='rsiDegreeSelectMenu']").val() == '°C'){
			 var cTemp = $("input[id*='rsiDegreeCorF']").val();
			 $("input[id*='rsiTemp']").val(cTemp);
			 fireJsfLinkClick('rsiLink');
		}
	}if(test == 'psi'){
		if($("select[id*='psiDegreeSelectMenu']").val() == '°F'){
			 var fTemp =  $("input[id*='psiDegreeCorF']").val();  
			 var fToCel = (fTemp - 32) * 5 / 9;  
			 $("input[id*='psiTemp']").val(fToCel.toFixed(1));
			 fireJsfLinkClick('psiLink');
		}else if($("select[id*='psiDegreeSelectMenu']").val() == '°C'){
			 var cTemp = $("input[id*='psiDegreeCorF']").val();
			 $("input[id*='psiTemp']").val(cTemp);
			 fireJsfLinkClick('psiLink');
		}
	}
	
	
}
function initSignatureView(){
	if($("div[id*='rptForm:signatureTyped'] > div:nth-child(2)").hasClass("ui-state-active") == true){
		$( "#radio1" ).prop( "checked", true );
		$("#opt3").hide();
		$("#opt2").show();
	}else{
		$( "#radio2" ).prop( "checked", true );
		$("#opt3").show();
		$("#opt2").hide();
	}
}

function customerViewModel() {
	$("#myModal2").modal("hide");
}

function goAheadModel() {
	$("#myModal14").modal("hide");
}

function closeMailModel(){
	if($("select[id*='feedbackForm:allPanelName']").val() != ""){
		fireJsfModalHide('myModalFeedback');
	}
	if($("select[id*='supportForm:allPanelName']").val() != ""){
		fireJsfModalHide('myModalSupport');
	}
}

function loadFixedTestModel(status, editable){
	if(status && editable){
		fireJsfModalShow('myModal_report_calc');
	}
}

function fireJSFForgotPwdClose() {
	if ($("input[id*='f_username']").val().length != 0
			|| $("input[id*='f_Email']").val().length != 0){
		//$("#forgotPasswordModal").modal("hide");
	}else {
		$("span[id*='errorMessageUserId']").addClass("error");
		$("span[id*='errorMessageUserId']").text("UserId is required");
		$("span[id*='errorMessageEmail']").addClass("error");
		$("span[id*='errorMessageEmail']").text("Email is required");
	}
}

function resetForgetModel(){
	$("input[id*='f_username']").val('');
	$("input[id*='f_Email']").val('');
	fireJsfModalShow('forgotPasswordModal');
}

function fireJSFForgotPwdCloseFromMainLogin() {
	if($("input[id*='f_CompanyKey']").val().length == 0){
		$("span[id*='errorMessageCompanyKey']").addClass("error");
		$("span[id*='errorMessageCompanyKey']").text("Company key is required");
	}else{
		$("input[id*='comp']").val($("input[id*='f_CompanyKey']").val());
		if ($("input[id*='f_username']").val().length != 0
				|| $("input[id*='f_Email']").val().length != 0){
			//$("#forgotPasswordModal").modal("hide");
		}else {
			$("span[id*='errorMessageUserId']").addClass("error");
			$("span[id*='errorMessageUserId']").text("UserId is required");
			$("span[id*='errorMessageEmail']").addClass("error");
			$("span[id*='errorMessageEmail']").text("Email is required");
		}
	}
}

function hideForgetModel() {
	if ($("input[id*='f_username']").val().length != 0
			|| $("input[id*='f_Email']").val().length != 0){
			$("#forgotPasswordModal").modal("hide");
	}else {
		$("span[id*='errorMessageUserId']").addClass("error");
		$("span[id*='errorMessageUserId']").text("UserId is required");
		$("span[id*='errorMessageEmail']").addClass("error");
		$("span[id*='errorMessageEmail']").text("Email is required");
	}
}

function fireJSFResetPwd() {
	if(!($("input[id*='orgPwd']").val() === $("input[id*='linkPwd']").val())){
		$("span[id*='errorMessagePwd4']").addClass("error");
		$("span[id*='errorMessagePwd4']").text("Sorry, this link has been expired.");
	}else{
		if ($("input[id*='n_password']").val().length != 0
				&& $("input[id*='r_password']").val().length != 0){
			if($("input[id*='n_password']").val() === $("input[id*='r_password']").val()){
				fireJsfButtonClick('ResetPwd');
			}else{
				$("span[id*='errorMessagePwd3']").addClass("error");
				$("span[id*='errorMessagePwd3']").text("Password is not matching, Password must be same.");
			}
		}else {
			$("span[id*='errorMessagePwd1']").addClass("error");
			$("span[id*='errorMessagePwd1']").text("Password is srequired");
			$("span[id*='errorMessagePwd2']").addClass("error");
			$("span[id*='errorMessagePwd2']").text("Please Re-Enter Password.");
		}
	}
}

function refreshpEditor(){
	setTimeout(function(){ 
		fireJsfLinkClick('updatepEditorSupport');
		fireJsfButtonClick('setFeedback');
		fireJsfLinkClick('updatepEditorFeedback');
	}, 3000);
}

function remoteLoginToNewURL(){
	var URL = $("input[id*='URLAccess']").val();
	if(URL.indexOf("advantagecontrols") == -1){
		$("input[name*='submit']").click();
	}
}

function customerUpdate(){
	if($("input[id*='emailID']").val().length == 0){
		$("span[id*='errorMessageEmail']").addClass("error");
		$("span[id*='errorMessageEmail']").text("Email is required");
	}
}

function initializeReportingFrequency(){
	editReportingFrequencyValue('reportCycleStart');
	editReportingFrequencyValue('reportCycleEnd');
}

function fireJsfBooleanCheckBoxForCriticalAlert(eleID) {
	 $("div[id*='"+eleID+"']").css("z-index","99999999999999999");
}

function checkcriticalcheckbox(eleID){
	$("."+ eleID).click();
}

function fireJsfBooleanCheckBoxForImportTemplate(eleID) {
	 $("div[id*='"+eleID+"']").css("z-index","99999999999999999");
}

function addHypen(){
	$("input[id*='phone_num']").val($("input[id*='phone_num']").val().replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'));
}

function isvalidPhoneNumber(evt){
	var phoneNo = evt.currentTarget.value;
	var pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	 if(phoneNo.match(pattern)){
	     	return true;
	 	}else{
	 		return false;
	    }
}

function primarySecondaryTabs() {
	$("div[id*='userPermissionTree'] > ul > li:nth-child(1)").removeClass("active");
	$("div[id*='userPermissionTree'] > ul > li:nth-child(2)").removeClass("active");
	if($("input[id='testForm:PrimaryUserSetting']").val() == 'PRIMARY'){
		$("div[id*='userPermissionTree'] > ul > li:nth-child(1)").addClass("active");
	}else{
		$("div[id*='userPermissionTree'] > ul > li:nth-child(2)").addClass("active");
	}
}

function NonZeroVal(){
	if(($("input[id*='areaForCpn']").val() != null && $("input[id*='areaForCpn']").val() != "") && ($("input[id*='areaForCpn']").val() == 0 || $("input[id*='phone_num']").val() == 0.0)){
		$("span[id*='errorMessageArea']").addClass("error");
		$("span[id*='errorMessageArea']").text("Please enter a valid area.");
	}else{
		$("span[id*='errorMessageArea']").text("");
	}
}


function customTextSizeChecked(id) {
	if(id == null){
		if ($("input[id*='textSizeChange']").val() == "true") {
			$(".textChange_yes").click();
			$(".TextChange").hide();
		} else {
			$(".textChange_no").click();
			$(".TextChange").show();
		}
	}else if(id == 'Yes'){
		$(".textChange_yes").click();
		$(".TextChange").hide();
		$("input[id*='textSizeChange']").val("true");
	}else if(id == 'No'){
		$(".textChange_no").click();
		$(".TextChange").show();
		$("input[id*='textSizeChange']").val("false");
	}
	fireJsfButtonClick('textChangeSizeTemp');
}

function customTextEmailingChecked(id) {
	if(id == null){
		$(".emailOptChange").hide();
	}else if(id == 'yes'){
		$(".Email_yes").click();
		$(".emailOptChange").show();
		$("input[id*='AutoEmailingChange']").val("true");
	}else if(id == 'no'){
		$(".Email_no").click();
		$(".emailOptChange").hide();
		$("input[id*='AutoEmailingChange']").val("false");
	}
	fireJsfButtonClick('AutoEmailingChangeBtn');
}

function isUnitSelectedDelested(){
	$("input[id*='checkUnitSelected']").val("true");
	$("input[id*='checkUnitSelectedPrevious']").val("true");
}


function saveSelectedDeselectedUnit(){
	if($("input[id*='checkUnitSelected']").val() == "true"){
		fireJsfButtonClick('saveCustomerPermission');
		$("input[id*='checkUnitSelected']").val("false");
		setTimeout(function(){ 
			fireJsfButtonClick('loadNextCustomerPermission');
		}, 1000);
	}else {
		fireJsfButtonClick('loadNextCustomerPermission');
	}
	
	
}

function saveSelectedDeselectedUnitPrevious(){
	if($("input[id*='checkUnitSelectedPrevious']").val() == "true"){
		fireJsfButtonClick('saveCustomerPermission');
		$("input[id*='checkUnitSelectedPrevious']").val("false");
		setTimeout(function(){ 
			fireJsfButtonClick('loadPreviousCustomerPermission');
		}, 1000);
	}else{
		fireJsfButtonClick('loadPreviousCustomerPermission');
	}
	
}

/*function updateTestTextAutoSize(){
	if($("input[id*='TestTextBold']").is(":checked")){
		$("input[id*='TestTextActualSize']").val("false");fireJsfLinkInATable
	}
	fireJsfLinkClick('updateTestAutoText');
}*/

function fireJsfModalShowUserPermissionsValidationMsg(custID) {
	$('#primarySecondaryWarningMsg').modal('show');
	$('#primarySecondaryWarningMsgCustID').val(custID);
}

/*function primarySecondaryWarningMsgClick(eleID) {
	var custID = $('#primarySecondaryWarningMsgCustID').val();
	fireJsfRowForCustomerPermission(eleID);
	fireJsfModalHide("primarySecondaryWarningMsg");
}
*/

//setting AutoLogOutTime
function autoLogOutTime(){
	var timeCount = (timeIntervalForAutoLogOut * 60) / 30;
	
	if(CountLogoutTime >= timeCount){
		onclickOfNoInSafetyLogout();
	}else {
		CountLogoutTime = CountLogoutTime +  1;
		getApiCall();
	}
}

function getApiCall(){
	$.ajax({
    	type: "GET",
    	url : "/MTR/rest/login/autoLogoutApi",
    	success : function (data) {
    		if(data != null && data.success) {
    			checkLoginStatus();
    		}
    	}
    });
}

function checkLoginStatus(){
	idleTimeIntervalForAutoLogOut = window.setTimeout(autoLogOutTime,1800000);
}

function setNewLogOutTime(){
	window.clearTimeout(idleTimeIntervalForAutoLogOut);
	this.CountLogoutTime = 0;
	var newLogoutTime = document.getElementById("newLogoutTime").value;
	if(newLogoutTime != null && newLogoutTime.split(" ")[0] != NaN){
		timeIntervalForAutoLogOut = parseInt(newLogoutTime.split(" ")[0]);
		autoLogOutTime();
	}
}

