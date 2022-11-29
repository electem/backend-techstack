/*var redCount, yellowCount, greenCount;
function newDonutChart(redCount, yellowCount, greenCount){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
	 // redCount = $(".redCount").val();
	  //yellowCount = $(".yellowCount").val();
	  //greenCount = $(".greenCount").val();
	  var data = google.visualization.arrayToDataTable([
	      ['Task', 'Hours per Day'],
	      ['Highly out of Spec', parseInt(redCount)],
	      ['Slightly out of Spec',parseInt(yellowCount)],
	      ['In Spec', parseInt(greenCount)]
	    ]);
	
	  var options = {
	     slices: {
		     0: { color: 'red' },
		     1: { color: 'yellow'},
		     2: { color: 'green'},
		 }
	  };
	
	  var chart = new google.visualization.PieChart(document.getElementById('outOfSpecChart'));
	
	  chart.draw(data, options);
  }
}
*/
var globaltitle;
var outOfSpec =
{
		chartOptions :
		{
			chart :
			{
				renderTo : null, // to be set
				type : 'pie'
			},
			credits : {
				href : 'http://www.mytechreports.com',
				text : "MyTechReports"
			},
			title :
			{
				text : null, // to be set
				margin : 20,
				style: { 
	            	fontWeight: 'bold', "text-decoration": "underline"
	            }
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
	         plotOptions: {
	            pie: {
	                allowPointSelect: true,
                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme ) || 'black',
	                        fontSize:'150%'
	                    }
	                }
	            }
	        },
			 series: []
	},

	chart : null, // to be set by drawChart()
	
	newDonutChart : function(data)
	{
		this.chartOptions.chart.renderTo = 'outOfSpecChart';
		this.chartOptions.title.text = 'System History Report';
		//this.chartOptions.subtitle.text = yTitle;
		//this.chartOptions.exporting = false;
		this.chartOptions.series = data;
		//this.chartOptions.yAxis.title.text= yTitle;
		//this.chartOptions.chart.width = 240;
		//this.chartOptions.chart.height = 400;
		//globaltitle = yTitle;
		this.chart = new Highcharts.Chart(this.chartOptions);
	}
};

Highcharts.getOptions().plotOptions.pie.colors = (function () {
    var colors = [];
  
    colors.push('red');
	colors.push('yellow');
    colors.push('green');
          
    return colors;
}());
//var redCount, yellowCount, greenCount;
//function newDonutChart(redCount, yellowCount, greenCount){
//	  
//    // Build the chart
//    Highcharts.chart('outOfSpecChart', {
//        chart: {
//            
//        },
//        title: {
//            text: 'System History Report'
//        },
//        tooltip: {
//            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,
//                cursor: 'pointer',
//                dataLabels: {
//                    enabled: true,
//                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
//                    style: {
//                        color: (Highcharts.theme ) || 'black'
//                    }
//                }
//            }
//        },
//        series: [{
//            name: 'Brands',
//            data: [
//                { name: 'Highly out of Spec', y: parseInt(redCount) },
//                { name: 'Slightly out of Spec', y: parseInt(yellowCount) },
//                { name: 'In Spec', y:  parseInt(greenCount) },
//            ]
//        }]
//    });
//    
//    // Make monochrome colors and set them as default for all pies
//    Highcharts.getOptions().plotOptions.pie.colors = (function () {
//        var colors = [];
//       
//        colors.push('red');
//		colors.push('yellow');
//        colors.push('green');
//              
//        return colors;
//    }());
//}
