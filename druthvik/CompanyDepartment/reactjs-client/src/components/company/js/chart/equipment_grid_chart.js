var globaltitle;
var EquipmentGrid =
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
	   
	                return Highcharts.dateFormat('%b %e', this.value);
	            }
	        },
	        tickPixelInterval: 200
		},
        yAxis : [ { // Primary yAxis
            title :
            {
            	text : 'Water Meter Reading,Avg. GPD'
            },
         }, { // Secondary yAxis
                title :
                {
                	text : 'Avg. GPM'
                },
            opposite: true
         }],
		plotOptions :
		{
			spline :
			{
				marker :
				{
					enabled : true,
					radius : 5,
					states :
					{
						hover :
						{
							enabled : true,
							radius : 5
						}
					}
				},
				shadow : false,
				states :
				{
					hover :
					{
						lineWidth : 1
					}
				}
			},
			color: {
			    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
			    stops: [
			        [0, '#003399'],
			        [1, '#3366AA']
			    ]
			},
			series :
			{
				cursor : 'pointer',
				point :
				{
					events :
					{
						click : function()
						{
							var unitstToDisplay = globaltitle;
							var regExp = /\(([^)]+)\)/;
							var matches = regExp.exec(unitstToDisplay);
							var display = '';
							if(matches != null){
								display = '('+matches[1]+')';
							}
							hs.htmlExpand(null,
							{
								headingText : this.series.name,
								maincontentText : Highcharts.dateFormat('%A, %b %e, %Y', this.x)
										+ ':<br/> ' + this.y + ' ' + display,
								width : 240
							});
						}
					}
				},
				marker :
				{
					lineWidth : 1
				}
			},
		},
		series : [
		{
			name : null, // to be set
			data : [ 1, 2, 3, 4 ],
		}, {
            name: null,
            data: [1, 2, 3, 4]
        }, {
            name: null,
            yAxis: 1,
            data: [1, 2, 3, 4]
        } ]
	},

	chart : null, // to be set by drawChart()

	drawChart : function(container, title, xTitle , yTitle, data1, data2, data3, chartType)
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
		this.chartOptions.title.text = title;
		this.chartOptions.subtitle.text = yTitle;
		this.chartOptions.series[0].name = "Water Meter Reading";
		this.chartOptions.series[0].data = data1;
		this.chartOptions.series[1].name = "Avg. GPD";
		this.chartOptions.series[1].data = data2;
		this.chartOptions.series[2].name ="Avg. GPM";
		this.chartOptions.series[2].data = data3;
		//this.chartOptions.chart.width = 250;
		this.chartOptions.chart.height = 400;
		globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	},
	
	drawChartEquipment : function(container, title, xTitle , yTitle, data1, data2, data3, chartType)
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
		this.chartOptions.subtitle.text = yTitle;
		this.chartOptions.chart.type= chartType;
		this.chartOptions.exporting = false;
		this.chartOptions.series[0].name = "Water Meter Reading";
		this.chartOptions.series[0].data = data1;
		this.chartOptions.series[1].name = "Avg. GPD";
		this.chartOptions.series[1].data = data3;
		this.chartOptions.series[2].name = "Avg. GPM";
		this.chartOptions.series[2].data = data2;
		this.chartOptions.chart.width = 240;
		this.chartOptions.chart.height = 400;
		globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	}
};

