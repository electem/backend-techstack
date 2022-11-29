var globaltitle;
var InventoryGrids =
{
		chartOptions :
			{
				chart :
				{
					renderTo : null, // to be set
					type : null
				},
				credits :
				{
					enabled : false
				},
				title :
				{
					text : null, // to be set
					margin : 20
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
			    xAxis : {
					type : 'datetime',
					maxZoom : 7 * 24 * 3600000,
					title : {
						text : null
					},
					labels: {
			            formatter: function () {
			                return Highcharts.dateFormat('%b-%Y', this.value);
			            }
						
			        },
			        tickPixelInterval: null,
			        tickInterval: 30 * 24 * 3600 * 1000
				},yAxis : {
					title : {
						text : 'Chemical consumed'
					},
					startOnTick : false,
					showFirstLabel : false,
					plotLines: []
				},
				series : []
			},
		chart : null, // to be set by drawChart()
		
		drawChartForInventories : function(container, title, xTitle , yTitle, chartType)
		{
			this.chartOptions.chart.renderTo = container;
			//this.chartOptions.chart.type= 'line';
			//chartType = "area";
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
			this.chartOptions.chart.type= chartType;
			this.chartOptions.title.text = "Inventory Charts";
			this.chartOptions.series = $.parseJSON($("input[id*='unitForm:_chartSeries']").val());
			this.chartOptions.chart.height = 400;
			globaltitle = yTitle;
			if(this.chartOptions.series != null && this.chartOptions.series.length > 0 && this.chartOptions.series.length != "[]"){
				this.chart = new Highcharts.Chart(this.chartOptions);
			}
		},
		
		drawChartForInventoriesPdf : function(container, title, xTitle , yTitle, chartType, series)
		{
			this.chartOptions.chart.renderTo = container;
			//this.chartOptions.chart.type= 'line';
			//chartType = "area";
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
			this.chartOptions.chart.type= chartType;
			this.chartOptions.title.text = "Inventory Charts";
			this.chartOptions.series = series;
			this.chartOptions.chart.height = 400;
			globaltitle = yTitle;
			if(this.chartOptions.series != null && this.chartOptions.series.length > 0 && this.chartOptions.series.length != "[]"){
				this.chart = new Highcharts.Chart(this.chartOptions);
			}
		}
};
