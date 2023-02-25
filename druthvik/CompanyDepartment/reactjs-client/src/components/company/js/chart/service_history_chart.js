var globaltitle;
var ServiceHistory =
{
	chartOptions :
	{
		chart :
		{
			renderTo : null, // to be set
			type : 'spline'
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
		yAxis :
		{
			title :
			{
				text : null
			},
			
			plotLines: []
			  
		},
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
			data : [ 1, 2, 3, 4 ]
		} ]
	},

	chart : null, // to be set by drawChart()

	drawChart : function(container, title, xTitle , yTitle, data)
	{
		this.chartOptions.chart.renderTo = container;
		this.chartOptions.title.text = title;
		this.chartOptions.yAxis.plotLines;
		this.chartOptions.yAxis.title.text = yTitle;
		this.chartOptions.series[0].name = xTitle;
		this.chartOptions.series[0].data = data;
		globaltitle = xTitle;
		this.chartOptions.chart.width = 350;
		this.chartOptions.chart.height = 400;
		this.chart = new Highcharts.Chart(this.chartOptions);
	},
	
	removePlotLines : function(){
		if(this.chartOptions.yAxis.plotLines.length != 0){
			this.chartOptions.yAxis.plotLines = [];
		}
	},
	
	drawPlotLines : function(range)
	{
		var range1 = range;
		var i=0;
		for(i=0;i<range.length;){
			var options =  ServiceHistory.settingLowerRangeColorValues(range[i],range[i+1]);
			var options1 =  ServiceHistory.settingUpperRangeColorValues(range[i],range[i+1]);
			this.chartOptions.yAxis.plotLines.push(options);
			this.chartOptions.yAxis.plotLines.push(options1);
			i= i+2;
		}
		
	},
	
	settingLowerRangeColorValues : function(range,range1)
	{
		var color;
		var label;
		if(range1 == "LOWEST" || range1 == "HIGHEST"){
			color = '#F20800';
			label = range1[0];
		}else if(range1 == "LOWER" || range1 == "HIGHER"){
			color = '#FEC710';
			label = range1[0];
		}else if(range1 == "LOW" || range1 == "HIGH"){
			color = '#e6e600';
			label = range1[0];
		}else if(range1 == "NORMAL"){
			color = '#0B871B';
			label = range1[0];
		}
		var options ={
				value: range[0],
	            color: color,
	            width: 4,
	            id: 'plot-line-1',
            	label: { 
            	    //text: label, // Content of the label.  
            	  }
	        };
		var arr= options;
		return arr; 
	},
	
	settingUpperRangeColorValues : function(range,range1)
	{
		var color;
		var label;
		if(range1 == "LOWEST" || range1 == "HIGHEST"){
			color = '#F20800';
			label = range1[0];
		}else if(range1 == "LOWER" || range1 == "HIGHER"){
			color = '#FEC710';
			label = range1[0];
		}else if(range1 == "LOW" || range1 == "HIGH"){
			color = '#e6e600';
			label = range1[0];
		}else if(range1 == "NORMAL"){
			color = '#0B871B';
			label = range1[0];
		}
		var options1 ={
				value: range[1],
	            color: color,
	            width: 4,
	            id: 'plot-line-2',
            	label: { 
            	    //text: label, // Content of the label.  
            		y :12
            	  }
	        };
		var arr= options1;
		return arr; 
	}
};

