var globaltitle;
var ReportSummary =
{
     donutChart : function(redCount, orangeCount, yellowCount, greenCount, blueCount, indigoCount, violetCount){
      var options = {packages: ['corechart'], callback : drawChart};
      google.load('visualization', '1', options);
      function drawChart() {
       var data = google.visualization.arrayToDataTable([
    	    ['Task', 'Hours per Day'],
	   		['Highly out of Spec',    parseInt(redCount)],
	   		['Moderately out of Spec', parseInt(orangeCount)],
	   		['Slightly out of Spec', parseInt(yellowCount)],
	   		['In Spec',  parseInt(greenCount)],
	   		['BLUE',   parseInt(blueCount)],
	   		['INDIGO', parseInt(indigoCount)],
	   		['VIOLET', parseInt(violetCount)]
          ]);

        /*var options = {
          title: 'My Daily Activities'
        };*/
		
       var options = {
    	         chartArea:{left:20,top:5,width:'100%',height:'100%'},
    	         pieSliceText: 'none',
    	         slices: {
    	             0: { color: 'red' },
    	             1: { color: 'orange' },
    	             2: { color: 'yellow'},
    	             3: { color: 'green'},
    	             4: { color: 'blue'},
    	             5: { color: 'indigo'},
    	             6: { color: 'violet'}
    	           }
           };
        
       chart = new google.visualization.PieChart(document.getElementById('donutchart'));
       chart.draw(data, options);
        google.visualization.events.addListener(chart, 'select', onAreaSliceSelected);
        function onAreaSliceSelected(){
       	 var selectedItem = chart.getSelection()[0];
 	      	if (selectedItem) { 
 	      		OnClickPieChartReportColor(data.getValue(selectedItem.row, 0));
 	      	}
          }
      }
   }
};