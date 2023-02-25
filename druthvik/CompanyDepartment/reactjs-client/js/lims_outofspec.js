/*function newDonutChart(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
	  var redCount, yellowCount, greenCount;
	  redCount = $(".redCount").val();
	  yellowCount = $(".yellowCount").val();
	  greenCount = $(".greenCount").val();
	  var data = google.visualization.arrayToDataTable([
	      ['Task', 'Hours per Day'],
	      ['Highly out of Spec', parseInt(redCount)],
	      ['Slightly out of Spec',parseInt(yellowCount)],
	      ['In Spec', parseInt(greenCount)]
	    ]);
	
	  var options = {
	     legend: 'none',
		 pieSliceText: 'none',
	     slices: {
		     0: { color: 'red' },
		     1: { color: 'yellow'},
		     2: { color: 'green'},
		 }
	  };
	
	  var chart = new google.visualization.PieChart(document.getElementById('outOfSpecChart'));
	
	  chart.draw(data, options);
  }
}*/
function pieChart(){
	  var redCount, yellowCount, greenCount;
	  redCount = $(".redCount").val();
	  yellowCount = $(".yellowCount").val();
	  greenCount = $(".greenCount").val();
    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [];
       
        colors.push('red');
		colors.push('yellow');
        colors.push('green');
              
        return colors;
    }());

    // Build the chart
    Highcharts.chart('outOfSpecChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'System History Report' ,
            style: { 
            	fontWeight: 'bold', "text-decoration": "underline"
            }
        },
        credits : {
			href : 'http://www.mytechreports.com',
			text : "MyTechReports"
		},
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        series: [{
            name: 'Results',
            data: [
                { name: 'Highly out of Spec', y: parseInt(redCount) },
                { name: 'Slightly out of Spec', y: parseInt(yellowCount) },
                { name: 'In Spec', y:  parseInt(greenCount) },
            ]
        }]
    });
}
