
function hideOrDisableReportButton() {
	if($("div[class*='ServiceReport']") != null && $("div[class*='ServiceReport']") != "" && $("div[class*='ServiceReport']") != undefined){
		var servicePermission = $("div[class*='ServiceReport']").text().split("_1")[0];
		if(servicePermission === "None"){
			$("button[class*='Service']").hide();
		}else if(servicePermission === "ViewOnly"){
			$("button[class*='Service']").prop("disabled",true);
		}
	}
	
	if($("div[class*='CouponReport']") != null && $("div[class*='CouponReport']") != "" && $("div[class*='CouponReport']") != undefined){
		var couponPermission = $("div[class*='CouponReport']").text().split("_1")[0];
		if(couponPermission === "None"){
			$("button[class*='Coupon']").hide();
		}else if(couponPermission === "ViewOnly"){
			$("button[class*='Coupon']").prop("disabled",true);
		}
	}
	
	if($("div[class*='LogReport']") != null && $("div[class*='LogReport']") != "" && $("div[class*='LogReport']") != undefined){
		var logPermission = $("div[class*='LogReport']").text().split("_1")[0];
		if(logPermission === "None"){
			$("button[class*='Log']").hide();
		}else if(logPermission === "ViewOnly"){
			$("button[class*='Log']").prop("disabled",true);
		}
	}
	
	if($("div[class*='NotesReport']") != null && $("div[class*='NotesReport']") != "" && $("div[class*='NotesReport']") != undefined){
		var notesPermission = $("div[class*='NotesReport']").text().split("_1")[0];
		if(notesPermission === "None"){
			$("button[class*='Notes']").hide();
		}else if(notesPermission === "ViewOnly"){
			$("button[class*='Notes']").prop("disabled",true);
		}
	}
}

function closeCollapseOne(){
	$("button[id='closeCollapseOne']").click();
}

function showErrorMessage(){
	$("div[class='ui-messages-error ui-corner-all']").css("visibility","visible");
}

function hideErrorMessage(){
	$("div[class='ui-messages-error ui-corner-all']").css("visibility","hidden");
}

function hideOrDisableTemplateButton() {
	if($("div[class*='ServiceTemplate']") != null && $("div[class*='ServiceTemplate']") != "" && $("div[class*='ServiceTemplate']") != undefined){
		var servicePermission = $("div[class*='ServiceTemplate']").text().split("_1")[0];
		if(servicePermission === "None"){
			$("button[class*='Service_Template']").hide();
			$("a[class*='Service_Template']").hide();
		}
	}
	
	if($("div[class*='CouponTemplate']") != null && $("div[class*='CouponTemplate']") != "" && $("div[class*='CouponTemplate']") != undefined){
		var couponPermission = $("div[class*='CouponTemplate']").text().split("_1")[0];
		if(couponPermission === "None"){
			$("button[class*='Coupon_Template']").hide();
			$("a[class*='Coupon_Template']").hide();
		}
	}
	
	if($("div[class*='LogTemplate']") != null && $("div[class*='LogTemplate']") != "" && $("div[class*='LogTemplate']") != undefined){
		var logPermission = $("div[class*='LogTemplate']").text().split("_1")[0];
		if(logPermission === "None"){
			$("button[class*='Log_Template']").hide();
			$("a[class*='Log_Template']").hide();
		}
	}
	
	if($("div[class*='NotesTemplate']") != null && $("div[class*='NotesTemplate']") != "" && $("div[class*='NotesTemplate']") != undefined){
		var notesPermission = $("div[class*='NotesTemplate']").text().split("_1")[0];
		if(notesPermission === "None"){
			$("button[class*='Notes_Template']").hide();
			$("a[class*='Notes_Template']").hide();
		}
	}
}