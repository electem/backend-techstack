var globaltitle;
var InventoryGrid =
{
	chartOptions :
	{	
			chart :
			{
				renderTo : null, // to be set
				type : 'column'
			},
			 colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
		credits :
		{
			enabled : false
		},
		title :
		{	align: 'center',
			text : null, // to be set
			style: { "color": "#337ab7", "fontSize": "3em" },
			x: 100
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
			title :
			{
				text : null
			},
			labels: {
	            formatter: function () {
	                return Highcharts.dateFormat('%b-%Y', this.value);
	            }
				
	        },
	        tickPixelInterval: null,
	        tickInterval: 30 * 24 * 3600 * 1000
		},
        yAxis : [ { // Primary yAxis
            title :
            {
            	text : 'Chemical Consumed'
            },
         }],
		plotOptions :
		{
			column: {
		        colorByPoint: true
		    }
		},
		series : [
		{
			name : null, // to be set
			data : [1,2,3,4],
			pointWidth: 50
		}]
	},

	chart : null, // to be set by drawChart()

	drawChartInventory : function(container, title, xTitle , yTitle, data, chartType)
	{
		if(chartType == ''){
			chartType = 'column';
		}
		if(chartType == "Area"){
			chartType = 'area';
		}
		if(chartType == "Spline"){
			chartType = 'spline';
		}
		if(chartType == "Line"){
			chartType = 'line';
		}
		if(chartType == "Column"){
			chartType = 'column';
		}
		this.chartOptions.chart.renderTo = container;
		this.chartOptions.title.text = title;
		this.chartOptions.subtitle.text = null;
		this.chartOptions.chart.type= chartType;
		this.chartOptions.exporting = false;
		this.chartOptions.series[0].name = "Dates for respective inventories";
		this.chartOptions.series[0].data = data;
		this.chartOptions.chart.width = 700;
		this.chartOptions.chart.height = 500;
		this.chartOptions.chart.marginLeft = 80;
		globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	},
	drawChartInventoryforPdf : function(container, title, xTitle , yTitle, data, chartType)
	{
		if(chartType == ''){
			chartType = 'column';
		}
		if(chartType == "Area"){
			chartType = 'area';
		}
		if(chartType == "Spline"){
			chartType = 'spline';
		}
		if(chartType == "Line"){
			chartType = 'line';
		}
		if(chartType == "Column"){
			chartType = 'column';
		}
		this.chartOptions.chart.renderTo = container;
		this.chartOptions.title.text = title;
		this.chartOptions.subtitle.text = null;
		this.chartOptions.chart.type= chartType;
		this.chartOptions.exporting = false;
		this.chartOptions.series[0].name = "Dates for respective inventories";
		this.chartOptions.series[0].data = data;
		this.chartOptions.chart.width = 600;
		this.chartOptions.chart.height = 400;
		this.chartOptions.chart.marginLeft = 80;
		globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	}
};

