var globaltitle;
var CustomerReviewReprt =
{
	chartOptions :
	{
		chart :
		{
			renderTo : null, // to be set
			type : 'spline'
		},
		credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
		title :
		{
			text : null, // to be set
			margin : 20
		},
		subtitle :
		{
			text : null, // to be set
		},
		tooltip :
		{
			shared : true,
		},
		exporting: {
	        buttons: {
	            contextButtons: {
	                enabled: false,
	                menuItems: null
	            }
	        },
	        enabled: false
	    },
		xAxis :
		{
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
        yAxis :  { // Primary yAxis
            title :
            {
            	text : null
            },
            startOnTick : false,
			showFirstLabel : false,
			plotLines: []
         },
         
		series : []
	},

	chart : null, // to be set by drawChart()

	drawCustomerReviewGraph : function(container, title, xTitle , yTitle, data)
	{
		this.chartOptions.chart.renderTo = container;
		this.chartOptions.title.text = title;
		//this.chartOptions.subtitle.text = yTitle;
		this.chartOptions.exporting = false;
		this.chartOptions.series = data;
		this.chartOptions.yAxis.title.text= yTitle;
		//this.chartOptions.chart.width = 240;
		this.chartOptions.chart.height = 400;
		globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	}
};

