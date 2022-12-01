var chart1;
var chart2;
var chart3;
var chartAll;
var chartLog;
var chartOptions = {
	chart : {
		renderTo : 'chartDiv1',
		type : 'spline',
		zoomType : 'x',
	},
	title : {
		text : 'Test Data'
	},
	subtitle : {
		text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
				: 'Drag your finger over the plot to zoom in'
	},
	xAxis : {
		type : 'datetime',
		maxZoom : 7 * 24 * 3600000,
		title : {
			text : null
		},
		dateTimeLabelFormats : {
			day : '%e of %b',
			week : '%e of %b',
			month : '%b %Y',
			year : '%Y'
		}
	},
	yAxis : {
		title : {
			text : 'Test'
		},
		startOnTick : false,
		showFirstLabel : false,
		plotLines: []
	},
	tooltip : {
		formatter : function() {
			return '<b>'
					+ document.getElementById('chartForm:_chartTitle1').value
					+ '<br/>' + this.series.name + '</b><br/>'
					+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
					+ this.y;
		}
	},
	credits : {
		href : 'http://www.mytechreports.com',
		text : "MyTechReports"
	},
	legend : {
		enabled : true
	},
	
	series : []
};

var chartOptions2 = {
		chart : {
			renderTo : 'chartDiv2',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};
var chartOptions3 = {
		chart : {
			renderTo : 'chartDiv3',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
			
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle3').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

var chartOptions4 = {
		chart : {
			renderTo : 'chartDiv4',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

var chartOptions5 = {
		chart : {
			renderTo : 'chartDiv5',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

var chartOptions6 = {
		chart : {
			renderTo : 'chartDiv6',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

var chartOptions7 = {
		chart : {
			renderTo : 'chartDiv7',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

var chartOptions8 = {
		chart : {
			renderTo : 'chartDiv8',
			type : 'spline',
			zoomType : 'x',
			spacingRight : 20
		},
		title : {
			text : 'Test Data'
		},
		subtitle : {
			text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
					: 'Drag your finger over the plot to zoom in'
		},
		xAxis : {
			type : 'datetime',
			maxZoom : 7 * 24 * 3600000,
			title : {
				text : null
			},
			dateTimeLabelFormats : {
				day : '%e of %b',
				week : '%e of %b',
				month : '%b %Y',
				year : '%Y'
			},
		},
		yAxis : {
			title : {
				text : 'Test'
			},
			startOnTick : false,
			showFirstLabel : false,
			plotLines: []
		},
		tooltip : {
			formatter : function() {
				return '<b>'
						+ document.getElementById('chartForm:_chartTitle2').value
						+ '<br/>' + this.series.name + '</b><br/>'
						+ Highcharts.dateFormat('%b %e, %Y', this.x) + ': '
						+ this.y;
			}
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		legend : {
			enabled : true
		},
		
		series : []
	};

function drawChart() {
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle1').value != 'Test'){
		chartOptions.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType1').value;
		chartOptions.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle1').value;
		chartOptions.series = $.parseJSON(document
				.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries1').value);
		chartOptions.series.sort(sortAlphaNum);
		chartOptions.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
		
		chart1 = new Highcharts.Chart(chartOptions);
		$("#chartDiv1").show();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle2').value != 'Test'){
		drawChart2();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle3').value != 'Test'){
		drawChart3();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle4').value != 'Test'){
		drawChart4();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle5').value != 'Test'){
		drawChart5();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle6').value != 'Test'){
		drawChart6();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle7').value != 'Test'){
		drawChart7();
	}
	if(document.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle8').value != 'Test'){
		drawChart8();
	}
	
}

function drawChart2() {
	chartOptions2.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType2').value;
	chartOptions2.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle2').value;
	chartOptions2.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries2').value);
	chartOptions2.series.sort(sortAlphaNum);
	chartOptions2.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart2 = new Highcharts.Chart(chartOptions2);
	$("#chartDiv2").show();
	
}



function drawChart3() {
	chartOptions3.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType3').value;
	chartOptions3.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle3').value;
	chartOptions3.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries3').value);
	chartOptions3.series.sort(sortAlphaNum);
	chartOptions3.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart3 = new Highcharts.Chart(chartOptions3);
	$("#chartDiv3").show();
	
}

function drawChart4() {
	chartOptions4.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType3').value;
	chartOptions4.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle4').value;
	chartOptions4.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries4').value);
	chartOptions4.series.sort(sortAlphaNum);
	chartOptions4.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart4 = new Highcharts.Chart(chartOptions4);
	$("#chartDiv4").show();
	
}

function drawChart5() {
	chartOptions5.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType5').value;
	chartOptions5.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle5').value;
	chartOptions5.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries5').value);
	chartOptions5.series.sort(sortAlphaNum);
	chartOptions5.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart5 = new Highcharts.Chart(chartOptions5);
	$("#chartDiv5").show();
	
}
function drawChart6() {
	chartOptions6.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType6').value;
	chartOptions6.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle6').value;
	chartOptions6.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries6').value);
	chartOptions6.series.sort(sortAlphaNum);
	chartOptions6.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart6 = new Highcharts.Chart(chartOptions6);
	$("#chartDiv6").show();
	
}

function drawChart7() {
	chartOptions7.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType7').value;
	chartOptions7.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle7').value;
	chartOptions7.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries7').value);
	chartOptions7.series.sort(sortAlphaNum);
	chartOptions7.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart7 = new Highcharts.Chart(chartOptions7);
	$("#chartDiv7").show();
	
}

function drawChart8() {
	chartOptions8.chart.type = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartType8').value;
	chartOptions8.title.text = document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartTitle8').value;
	chartOptions8.series = $.parseJSON(document
			.getElementById('custReviewRptForm:customer_review_graph_form:_chartSeries8').value);
	chartOptions8.series.sort(sortAlphaNum);
	chartOptions8.yAxis.title.text = document.getElementById('custReviewRptForm:customer_review_graph_form:_chartYaxis1').value;
	chart8 = new Highcharts.Chart(chartOptions8);
	$("#chartDiv8").show();
	
}
var chartOptionsAll = {
	chart : {
		renderTo : 'chartDivAll',
		zoomType : 'xy',
	},
	title : {
		text : 'Test Data'
	},
	subtitle : {
		text : document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in'
				: 'Drag your finger over the plot to zoom in'
	},
	xAxis : {
		type : 'datetime',
		maxZoom : 7 * 24 * 3600000,
		title : {
			text : null
		},
		dateTimeLabelFormats : {
			day : '%e of %b',
			week : '%e of %b',
			month : '%b %Y',
			year : '%Y',
		}
	},
	yAxis : [ { // Primary yAxis
		labels : { // Test 1
			format : '',
			style : {
				color : Highcharts.getOptions().colors[4]
			}
		},
		title : {
			text : '',
			style : {
				color : Highcharts.getOptions().colors[4]
			}
		},
		opposite : true
	}, { // Secondary yAxis //Test 2
		gridLineWidth : 0,
		labels : {
			format : '',
			style : {
				color : Highcharts.getOptions().colors[0]
			}
		},
		title : {
			text : '',
			style : {
				color : Highcharts.getOptions().colors[0]
			}
		}

	}, { // Tertiary yAxis //Test3
		gridLineWidth : 0,
		title : {
			text : '',
			style : {
				color : Highcharts.getOptions().colors[3]
			}
		},
		labels : {
			format : '',
			style : {
				color : Highcharts.getOptions().colors[3]
			}
		},
		opposite : true

	} ],
	tooltip : {
		shared : true
	},

	credits : {
		href : 'http://www.mytechreports.com',
		text : "MyTechReports"
	},
	series : []
};
var displayUnit1 = '';
var displayUnit2 = '';
var displayUnit3 = '';
var seriesName1 = '';
var seriesName2 = '';
var seriesName3 = '';
var test2 = null;
var test3 = null;
function drawChartAll() {
	chartOptionsAll.chart.type = document
			.getElementById('chartForm:_chartTypeAll').value;
	chartOptionsAll.title.text = document
			.getElementById('chartForm:_chartTitleAll').value;

	var dataIndex = 0;
	var dataSeries1 = $.parseJSON(document
			.getElementById('chartForm:_chartSeries1').value);

	var regExp = /\(([^)]+)\)/;
	var unitstToDisplay1 = document.getElementById('chartForm:_chartTitle1').value;

	var matches1 = regExp.exec(unitstToDisplay1);
	if (matches1 != null) {
		displayUnit1 = '(' + matches1[1] + ')';
	}

	$.each(dataSeries1, function(i, item) {
		chartOptionsAll.series[dataIndex] = dataSeries1[i];
		chartOptionsAll.series[dataIndex].dashStyle = 'shortdot';
		chartOptionsAll.series[dataIndex].lineWidth = 2;
		chartOptionsAll.series[dataIndex++].type = 'spline';
	});
	if(chartOptionsAll.series[0].name == null) {
		chartOptionsAll.series[0].name = '';
	}else{
		chartOptionsAll.series[0].name += "-"+unitstToDisplay1;
	}
	chartOptionsAll.yAxis[0].labels.format = '{value}' + displayUnit1;
	chartOptionsAll.yAxis[0].title.text = document
			.getElementById('chartForm:_chartYaxis1').value;
	// chartOptionsAll.series[0].name =
	// document.getElementById('chartForm:_chartTitle1').value;
	seriesName1 = document.getElementById('chartForm:_chartTitle1').value;

	var dataSeries2 = $.parseJSON(document
			.getElementById('chartForm:_chartSeries2').value);
	if (dataSeries2 != null && dataSeries2.length > 0) {
		test2 = '';
		var unitstToDisplay2 = document
				.getElementById('chartForm:_chartTitle2').value;
		var matches2 = regExp.exec(unitstToDisplay2);

		if (matches2 != null) {
			displayUnit2 = '(' + matches2[1] + ')';
		}

		$.each(dataSeries2, function(i, item) {
			chartOptionsAll.series[dataIndex] = dataSeries2[i];
			chartOptionsAll.series[dataIndex].yAxis = 1;
			chartOptionsAll.series[dataIndex].dashStyle = 'shortdot';
			chartOptionsAll.series[dataIndex].lineWidth = 5;
			chartOptionsAll.series[dataIndex++].type = 'line';
		});
		chartOptionsAll.yAxis[1].labels.format = '{value}' + displayUnit2;
		chartOptionsAll.yAxis[1].title.text = document
				.getElementById('chartForm:_chartTitle2').value;
		// chartOptionsAll.series[1].name =
		// document.getElementById('chartForm:_chartTitle2').value;

		if(chartOptionsAll.series[1].name == null) {
			chartOptionsAll.series[1].name = '';
		}else{
			chartOptionsAll.series[1].name += "-"+unitstToDisplay2;
		}
		seriesName2 = document.getElementById('chartForm:_chartTitle2').value;
		// test2 = 'Test2 : <br/>'+ seriesNames[1] + '<br/> ' + displayUnit2 +
		// '<br/>';
	}

	var dataSeries3 = $.parseJSON(document
			.getElementById('chartForm:_chartSeries3').value);
	if (dataSeries3 != null && dataSeries3.length > 0) {
		test3 = '';
		var unitstToDisplay3 = document
				.getElementById('chartForm:_chartTitle3').value;
		var matches3 = regExp.exec(unitstToDisplay3);

		if (matches3 != null) {
			displayUnit3 = '(' + matches3[1] + ')';
		}

		$.each(dataSeries3, function(i, item) {
			chartOptionsAll.series[dataIndex] = dataSeries3[i];
			chartOptionsAll.series[dataIndex].type = 'spline';
			chartOptionsAll.series[dataIndex++].yAxis = 2;
		});
		chartOptionsAll.yAxis[2].labels.format = '{value}' + displayUnit3;
		chartOptionsAll.yAxis[2].title.text = document
				.getElementById('chartForm:_chartTitle3').value;
		// chartOptionsAll.series[2].name =
		// document.getElementById('chartForm:_chartTitle3').value;

		if(chartOptionsAll.series[2].name == null) {
			chartOptionsAll.series[2].name = '';
		}else{
			chartOptionsAll.series[2].name += "-"+unitstToDisplay3;
		}
		seriesName3 = document.getElementById('chartForm:_chartTitle3').value;
		// test3 = 'Test3 : <br/>'+ seriesNames[2] + '<br/> ' + displayUnit3 +
		// '<br/>';
	}
	chartAll = new Highcharts.Chart(chartOptionsAll);
}

function drawPlotLines()
{
	if(chartOptions.yAxis.plotLines.length != 0){
		chartOptions.yAxis.plotLines = [];
	}
	if(chartOptions2.yAxis.plotLines.length != 0){
		chartOptions2.yAxis.plotLines = [];
	}
	if(chartOptions3.yAxis.plotLines.length != 0){
		chartOptions3.yAxis.plotLines = [];
	}
	var range = $.parseJSON(document.getElementById('chartForm:_chartRanges1').value);
	var i=0;
	for(i=0;i<range[0].range.length;i++){
		var options =  settingLowerRangeColorValues(range[0].range[i]);
		var options1 =  settingUpperRangeColorValues(range[0].range[i]);
		chartOptions.yAxis.plotLines.push(options);
		chartOptions.yAxis.plotLines.push(options1);
		chartOptions2.yAxis.plotLines.push(options);
		chartOptions2.yAxis.plotLines.push(options1);
		chartOptions3.yAxis.plotLines.push(options);
		chartOptions3.yAxis.plotLines.push(options1);
	}
	
}

 function settingLowerRangeColorValues(range)
{
	var color;
	var label;
	var rangeLower = range[0].split(',')[0];
	var stereotype = range[1];
	
	if(stereotype == "LOWEST" || stereotype == "HIGHEST"){
		color = '#F20800';
		label = stereotype;
	}else if(stereotype == "LOWER" || stereotype == "HIGHER"){
		color = '#FEC710';
		label = stereotype;
	}else if(stereotype == "LOW" || stereotype == "HIGH"){
		color = '#e6e600';
		label = stereotype;
	}else if(stereotype == "NORMAL"){
		color = '#0B871B';
		label = stereotype;
	}
	var options ={
			value: rangeLower,
            color: color,
            width: 4,
            id: 'plot-line-1',
        	label: { 
        	    //text: label, // Content of the label.  
        	  }
        };
	var arr= options;
	return arr; 
}

function settingUpperRangeColorValues(range)
{
	var color;
	var label;
	var rangeUpper = range[0].split(',')[1];
	var stereotype = range[1];
	if(stereotype == "LOWEST" || stereotype == "HIGHEST"){
		color = '#F20800';
		label = stereotype;
	}else if(stereotype == "LOWER" || stereotype == "HIGHER"){
		color = '#FEC710';
		label = stereotype;
	}else if(stereotype == "LOW" || stereotype == "HIGH"){
		color = '#e6e600';
		label = stereotype;
	}else if(stereotype == "NORMAL"){
		color = '#0B871B';
		label = stereotype;
	}
	var options1 ={
			value: rangeUpper,
            color: color,
            width: 4,
            id: 'plot-line-2',
        	label: { 
        	   // text: label, // Content of the label.  
        	    y :12
        	  }
        };
	var arr= options1;
	return arr; 
}

function progressBar(index, eleName) {
	if (eleName == 'Next') {
		index = index + 2;
		$('.progress-bar').css('width', index * 20 + '%');
	} else if (index == 1 && eleName == 'Previous') {
		$('.progress-bar').css('width', 20 + '%');
	} else if (index == 2 && eleName == 'Previous') {
		$('.progress-bar').css('width', 40 + '%');
	} else if (index == 3 && eleName == 'Previous') {
		$('.progress-bar').css('width', 60 + '%');
	} else if (index == 4 && eleName == 'Previous') {
		$('.progress-bar').css('width', 80 + '%');
	} else if (index == 5 && eleName == 'Previous') {
		$('.progress-bar').css('width', 100 + '%');
	}
}

function allTimeCheckBox() {
	$("div[class*='alltimeStyleClass'] > div ").trigger("click");
}

function chartsProgressBar(value, id) {
	var width = $('.progress > div').attr("style");
	var len = width.substr(7, 2);
	$('.next').show();
	if (width === "width: 25%;" && value != "100" && value != "75" ) {
		if($('.selectedUnit').val() == ""){
			fireJsfLinkClick('unitValidation');
		}
		else if($("input[id*='chartForm:unitValue']").val() == "" || $("input[id*='chartForm:unitValue']").val()== null){
			fireJsfLinkClick('unitValidation');
		}else{
			$("a[href*='tab2']").attr("data-toggle", "tab");
			if(id != "Test"){
				fireJsfLinkClick('unitValidation');
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
			}
			$('.progress-bar').width('50%');
		}
		fireJsfLinkClick('unitValidation');
		hideCheckBox();
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
	} else if (width === "width: 50%;" && value != "100") {
		if (len < value) {
			if($("input[name*='serviceList1']:checked").length > 0){
				$("a[href*='tab3']").attr("data-toggle", "tab");
				$('.progress-bar').width('75%');
			}else{
				fireJsfLinkClick('componentValidation');
			}
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
		}else{
			$("a[href*='tab1']").attr("data-toggle","tab");
			if(id != "Customer Unit"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}
	} else if (width === "width: 75%;") {
		if(value == "100" || len < value){
			$("a[href*='tab4']").attr("data-toggle", "tab");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			if(id != "Chart Type"){
				$("a[href*='tab4']").attr("data-toggle", "tab");
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
				$('.next').hide();
			}
			fireJsfLinkClick('serviceChart');
			$('.progress-bar').width('100%');
			$("input[class*='splineRadioBtn']").click();
			if($("input[id*='combinedGraphSelection']").is(":checked")){
				$("input[id*='combinedGraphSelection']").click();
			}
			$('.next').hide();
		}else if(value === "25"){
			$("a[href*='tab1']").attr("data-toggle", "tab");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}else{
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").attr("data-toggle","tab");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('50%');
			if(id != "Test"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
		}	
	} else if (width === "width: 100%;") {
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").attr("data-toggle", "tab");
			if (len == 10) {
				$("a[href*='tab1']").removeAttr("data-toggle");
				$("a[href*='tab2']").removeAttr("data-toggle");
				$("a[href*='tab3']").attr("data-toggle","tab");
				$("a[href*='tab4']").removeAttr("data-toggle");
				$('.progress-bar').width('75%');
				if(id != "Time Frame"){
					$('.nav-tabs > .active').prev('li').find('a').trigger('click');
				}
			}
	}
	if(width === "width: 100%;" && value == "25"){
		$("a[href*='tab1']").attr("data-toggle", "tab");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('25%');
	}
	if(width === "width: 100%;" && value == "50"){
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('50%');
	}
	if (width === "width: 50%;" && value == "100"){
		if($("input[name*='serviceList1']:checked").length > 0){
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").attr("data-toggle", "tab");
			fireJsfLinkClick('serviceChart');
			if($("input[id*='combinedGraphSelection']").is(":checked")){
				$("input[id*='combinedGraphSelection']").click();
			}
			$('.next').hide();
			$('.progress-bar').width('100%');
		}
	}
	if(value == "100" || value == "75" || value == "50"){
		if(width === "width: 25%;"){
			fireJsfLinkClick('unitValidation');
		}
		if(width === "width: 50%;"){
			fireJsfLinkClick('componentValidation');
		}
	}
}
function chartsLogProgressBar(value, id) {
	var width = $('.progress > div').attr("style");
	var len = width.substr(7, 2);
	$('.next').show(); 
	if (width === "width: 25%;" && value != "100" && value != "75") {
		if($('.selectedUnit').val() == ""){
			fireJsfLinkClick('unitValidation');
		}
		else if($("input[id*='chartForm:unitValue']").val() == "" || $("input[id*='chartForm:unitValue']").val()== null){
		fireJsfLinkClick('unitValidation');
	}else{
		$("a[href*='tab2']").attr("data-toggle", "tab");
		if(id != "Test"){
			fireJsfLinkClick('unitValidation');
			$('.nav-tabs > .active').next('li').find('a').trigger('click');
		}
		$('.progress-bar').width('50%');
	}
	fireJsfLinkClick('unitValidation');
	$("a[href*='tab1']").removeAttr("data-toggle");
	$("a[href*='tab3']").removeAttr("data-toggle");
	$("a[href*='tab4']").removeAttr("data-toggle");
	} else if (width === "width: 50%;"  && value != "100") {
		if (len < value) {
			if($("input[name*='list']").is(":checked") ===false) {
  			  fireJsfLinkClick('componentListener');
  		  }
  		  else {
  			  fireJsfLinkClick('componentValidation');
  			  $("a[href*='tab3']").attr("data-toggle","tab");
  			  if(id != "Time Frame"){
  				  $('.nav-tabs > .active').next('li').find('a').trigger('click');
  			  }
  			  $('.progress-bar').width('75%');
  		  }
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
		}else{
			$("a[href*='tab1']").attr("data-toggle","tab");
			if(id != "Customer Unit"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}
	} else if (width === "width: 75%;") {
		if (value == "100" || len < value) {
			fireJsfLinkClick('logChart');
			$("a[href*='tab4']").attr("data-toggle","tab");
			if(id != "Chart Type"){
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
			}
			$('.progress-bar').width('100%');
			$("input[class*='splineRadioBtn']").click();
			$("a[href*='tab3']").removeAttr("data-toggle");
			$('.next').hide();
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
		}else if(value === "25"){
			$("a[href*='tab1']").attr("data-toggle", "tab");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}else{
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").attr("data-toggle","tab");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('50%');
			if(id != "Test"){
			$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
		}
	}else if(width === "width: 100%;"){
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").attr("data-toggle", "tab");
		if (len == 10) {
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").attr("data-toggle","tab");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('75%');
			if(id != "Time Frame"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
		}
	}
	if(width === "width: 100%;" && value == "25"){
		$("a[href*='tab1']").attr("data-toggle", "tab");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('25%');
	}
	if(width === "width: 100%;" && value == "50"){
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('50%');
	}
	if (width === "width: 50%;" && value == "100"){
		if($("input[name*='list']").is(":checked") ===true) {
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").attr("data-toggle", "tab");
			fireJsfLinkClick('logChart');
			$('.next').hide();
			$('.progress-bar').width('100%');
		}
	}
	if(value == "100" || value == "75" || value == "50"){
		if(width === "width: 25%;"){
			fireJsfLinkClick('unitValidation');
		}
		if(width === "width: 50%;"){
			fireJsfLinkClick('componentValidation');
		}
	}
}

function chartsCouponProgressBar(value, id) {
	var width = $('.progress > div').attr("style");
	var len = width.substr(7, 2);
	$('.next').show(); 
	if (width === "width: 35%;") {
		if($('.selectedUnit').val() == ""){
			fireJsfLinkClick('chartCouponCustomerUnit');
		}else if(value == '70'){
			$('.progress-bar').width('70%');
			$("a[href*='tab2']").attr("data-toggle", "tab");
			if(id != "Time Frame"){
				fireJsfLinkClick('chartCouponCustomerUnit');
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
			}
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
		}else if(value == '100'){
			$('.progress-bar').width('100%');
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").attr("data-toggle", "tab");
			fireJsfLinkClick('chartCouponTestFrame');
		}
	} else if (width === "width: 70%;") {
		if (value == "100" || len < value) {
			fireJsfLinkClick('chartCouponTestFrame');
			 $("a[href*='tab1']").removeAttr("data-toggle");
	       	 $("a[href*='tab2']").removeAttr("data-toggle");
	       	 $("a[href*='tab3']").attr("data-toggle", "tab");
	       	 if(id != "Chart Type"){
	       		 $('.nav-tabs > .active').next('li').find('a').trigger('click');
	       	 }
	       	 $('.progress-bar').width('100%');
	       	 $("input[class*='splineRadioBtn']").click();
			 $('.next').hide();
	}else{
		$("a[href*='tab1']").attr("data-toggle", "tab");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		if(id != "Customer Unit"){
			$('.nav-tabs > .active').prev('li').find('a').trigger('click');
		}
		$('.progress-bar').width('35%');
		}
	}else if(width === "width: 100%;"){
		if(id == "Time Frame"){
			$("ul[class*='pager wizard']").show();
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab2']").attr("data-toggle", "tab");
			$('.progress-bar').width('70%');
		  	$('.next').show();
		}
	}
	if(width === "width: 100%;" && value == "35"){
		$("a[href*='tab1']").attr("data-toggle", "tab");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$('.progress-bar').width('35%');
	}
}

function chartsInventoryProgressBar(value, id){
	var width = $('.progress > div').attr("style");
	var len = width.substr(7, 2);
	$('.next').show(); 
	if (width === "width: 25%;" && value != "100" && value != "75") {
		if($('.selectedUnit').val() == ""){
			fireJsfLinkClick('chartInventoryCustomerUnit');
		}else if($("input[id*='chartForm:unitValue']").val() == "" || $("input[id*='chartForm:unitValue']").val()== null){
			fireJsfLinkClick('chartInventoryCustomerUnit');
		}else{
			$("a[href*='tab2']").attr("data-toggle", "tab");
			if(id != "Grid"){
				fireJsfLinkClick('chartInventoryCustomerUnit');
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
			}
			hideCheckBox();
			$('.progress-bar').width('50%');
		}
		fireJsfLinkClick('chartInventoryCustomerUnit');
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
	}else if (width === "width: 50%;" && value != "100") {
		if (len < value) {
			if ($("input[name*='test']").is(":checked") === false
					|| $("input[name*='comp']").is(":checked") === false) {
				fireJsfLinkClick('chartInventoryGrid');
			}else{
				fireJsfLinkClick('chartInventoryGrid');
				$("a[href*='tab3']").attr("data-toggle", "tab");
				if(id != "Time Frame"){
					$('.nav-tabs > .active').next('li').find('a').trigger('click');
				}
				$('.progress-bar').width('75%');
				$("a[href*='tab1']").removeAttr("data-toggle");
				$("a[href*='tab2']").removeAttr("data-toggle");
				$("a[href*='tab4']").removeAttr("data-toggle");
			}
		}else{
			$("a[href*='tab1']").attr("data-toggle","tab");
			if(id != "Customer Unit"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}
	} else if (width === "width: 75%;") {
		if (value == 100 || len < value) {
			fireJsfLinkClick('chartInventoryTestFrame');
			$("a[href*='tab4']").attr("data-toggle", "tab");
			if(id != "Chart Type"){
				$('.nav-tabs > .active').next('li').find('a').trigger('click');
			}
			$("a[href*='tab3']").removeAttr("data-toggle");
			$('.progress-bar').width('100%');
			$("input[class*='splineRadioBtn']").click();
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
		}else if(value === "25"){
			$("a[href*='tab1']").attr("data-toggle", "tab");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('25%');
		}else{
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").attr("data-toggle","tab");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('50%');
			if(id != "Grid"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
		}
	}else if(width === "width: 100%;"){
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").attr("data-toggle", "tab");
		if (len == 10) {
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").attr("data-toggle","tab");
			$("a[href*='tab4']").removeAttr("data-toggle");
			$('.progress-bar').width('75%');
			if(id != "Time Frame"){
				$('.nav-tabs > .active').prev('li').find('a').trigger('click');
			}
		}
	}
	if(width === "width: 100%;" && value == "25"){
		$("a[href*='tab1']").attr("data-toggle", "tab");
		$("a[href*='tab2']").removeAttr("data-toggle");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('25%');
	}
	if(width === "width: 100%;" && value == "50"){
		$("a[href*='tab1']").removeAttr("data-toggle");
		$("a[href*='tab2']").attr("data-toggle", "tab");
		$("a[href*='tab3']").removeAttr("data-toggle");
		$("a[href*='tab4']").removeAttr("data-toggle");
		$('.progress-bar').width('50%');
	}
	if (width === "width: 50%;" && value == "100") {
		if ($("input[name*='test']").is(":checked") === true
				&& $("input[name*='comp']").is(":checked") === true) {
			fireJsfLinkClick('chartInventoryTestFrame');
			$("a[href*='tab1']").removeAttr("data-toggle");
			$("a[href*='tab2']").removeAttr("data-toggle");
			$("a[href*='tab3']").removeAttr("data-toggle");
			$("a[href*='tab4']").attr("data-toggle", "tab");
			$('.progress-bar').width('100%');
		}
	}
	if(value == "100" || value == "75" || value == "50"){
		if(width === "width: 25%;"){
			fireJsfLinkClick('chartInventoryCustomerUnit');
		}
		if(width === "width: 50%;"){
			fireJsfLinkClick('chartInventoryGrid');
		}
	}
}

function checkDeviceSelect(id, linkid, num1, num2) {
	if ($("input[id*='" + id + "']:checked").length > 0) {
		$("button[id*='clickSelect" + num1 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	} else {
		$("button[id*='clickSelect" + num2 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	}
}

function checkPanelSelect(id, linkid, num1, num2) {
	if ($("input[id*='" + id + "']:checked").length > 0) {
		$("button[id*='clickSelect" + num1 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	} else {
		$("button[id*='clickSelect" + num2 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	}
}

function addAllComponents(JSFcheckBoxid, htmlInputId) {
	$("div[id*='" + JSFcheckBoxid + "'] > div").click();
	if ($("input[name*='allcomponent']").is(":checked")) {
		$("input[name*='" + htmlInputId + "']").each(function() {
			if ($(this).is(":checked") != true) {
				$(this).click();
			}
		});
	} else {
		$("input[name*='" + htmlInputId + "']").click();
	}
}

function checkServiceDeviceSelect(id, linkid, num1, num2) {
	if ($("input[id*='" + id + "']:checked").length > 0) {
		$("button[id*='clickSelect" + num1 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	} else {
		$("button[id*='clickSelect" + num2 + "']").click();
		$("div[id*='" + linkid + "']").parent().click();
	}
}

function webadvantageLogReport() {
	$("div[id*='standardOption'] > div").click();
}

function allComponentSelect() {
	$("input[name*='list'] ").click();
}

function checkInventoryTestSelect(id, linkid) {
	if ($("input[id*='" + id + "']:checked").length > 0) {
		$("input[id*='isSelected1']").val("true");
		$("a[id*='clickSelect1']").click();
		$("div[id*='" + linkid + "']").parent().click();
	} else {
		$("input[id*='isSelected1']").val("false");
		$("a[id*='clickSelect1']").click();
		$("div[id*='" + linkid + "']").parent().click();
	}

}

function settingSelectedChartTitle(id){
	$("div[class*='selectedChartType']").html(id);
}

function checkForCombinedGraph(){
	if($("input[id*='combinedGraphSelection']").is(":checked") === true){
		$("a[id*='displayErrorChart']").click();
	}else {
		$("button[id*='buttonPlotLines']").click();
	}
}

function checkInventoryComponentSelect(id, linkid) {
	if ($("input[id*='" + id + "']:checked").length > 0) {
		$("input[id*='isSelected2']").val("true");
		$("a[id*='clickSelect1']").click();
		$("div[id*='" + linkid + "']").parent().click();
	} else {
		$("input[id*='isSelected2']").val("false");
		$("a[id*='clickSelect2']").click();
		$("div[id*='" + linkid + "']").parent().click();
	}
}

function addAllTest(JSFcheckBoxid, htmlInputId) {
	$("div[id*='" + JSFcheckBoxid + "'] > div").click();
	if ($("input[name*='allTest']").is(":checked")) {
		$("input[name*='" + htmlInputId + "']").each(function() {
			if ($(this).is(":checked") != true) {
				$(this).click();
			}
		});
	} else {
		$("input[name*='" + htmlInputId + "']").click();
	}
}
function addAllComp(JSFcheckBoxid, htmlInputId) {
	$("div[id*='" + JSFcheckBoxid + "'] > div").click();
	if ($("input[name*='allComp']").is(":checked")) {
		$("input[name*='" + htmlInputId + "']").each(function() {
			if ($(this).is(":checked") != true) {
				$(this).click();
			}
		});
	} else {
		$("input[name*='" + htmlInputId + "']").click();
	}
}
function hideCheckBox() {
	$("input[id*='test']").each(function() {
		if ($(this).is(":checked") === true) {
			$(this).click();
		}
	});
	$("input[id*='test']").hide();
	$("input[id*='comp']").hide();

}
function showCheckBox(id, checkBoxId) {
	if ($("input[id*='" + id + "']").is(":checked")) {
		$("input[id*='" + id + "']").prop("checked", false);
	}
	$("input[id*='" + id + "']").show();
	if ($("div[id*='chartForm:" + checkBoxId + "'] > div > input").is(
			":checked")) {
		$("div[id*='chartForm:" + checkBoxId + "'] > div > input").click();
	}
}

function untickAllTestCheckBox(name) {
	if ($("div[id*='chartForm:checkBoxAllTest'] > div > input").is(":checked") === false) {
		$("input[name*='" + name + "']").prop("checked", false);
	}
}

function untickAllCompCheckBox(name) {
	if ($("div[id*='chartForm:checkBoxAllComponent'] > div > input").is(
			":checked") === false) {
		$("input[name*='" + name + "']").prop("checked", false);
	}
}
function untickAllCheckBoxCallingFromBeanClass(name) {
	$("input[name*='" + name + "']").prop("checked", false);
}

function tickAllCheckBoxCallingFromBeanClass(name) {
	$("input[name*='" + name + "']").prop("checked", true);
}

function untickAllSrvTestCheckBoxCallingFromBeanClass(id) {
	$("input[id*='" + id + "']").prop("checked", false);
}

function tickAllSrvTestCheckBoxCallingFromBeanClass(id) {
	$("input[id*='" + id + "']").prop("checked", true);
}

function calenderMonthYear() {
	$("select[class*='ui-datepicker-month']").css("color","black");
	$("select[class*='ui-datepicker-year']").css("color","black")
}

function untickAllCompCheckBoxCallingFromBeanClass() {
	$("input[name*='allComp']").prop("checked", false);
}

function untickAllCompCheckBoxCallingFromBeanClass() {
	$("input[name*='allComp']").prop("checked", false);
}

function untickAllCompCheckBox() {
	if ($("div[id*='chartForm:serviceCheckBoxAllComponent1'] > div > input")
			.is(":checked") === false) {
		$("input[name*='" + name + "']").prop("checked", false);
	}
}
function applyingCssForUnitOnUnitChangeInChart(){
	var id = $("input[id*='chartForm:unitValue']").val();
	$(".unitName").each(function () {
		$(this).find("label").removeClass("btn btn-success active").addClass("btn btn-default");
		$(this).find("label").find("i").removeClass("fa fa-building Fs22 white animated swing infinite").addClass("fa fa-building Fs22").css("color","#864001");
	});
	if(id != ""){
		$("."+id).find("label").removeClass("btn btn-default").addClass("btn btn-success active");
		$("."+id).find("label").find("i").removeClass("fa fa-building Fs22").addClass("fa fa-building Fs22 white animated swing infinite").removeAttr("style");
	}
}


var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(a,b) {
    var aA = a.name.replace(reA, "");
    var bA = b.name.replace(reA, "");
    if(aA === bA) {
        var aN = parseInt(a.name.replace(reN, ""), 10);
        var bN = parseInt(b.name.replace(reN, ""), 10);
        return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
        return aA > bA ? 1 : -1;
    }
}

function untickAllComponent() {
	if ($("input[name*='allcomponent']").is(":checked")) {
		$("input[name*='allcomponent']").prop("checked", false);
	}
}