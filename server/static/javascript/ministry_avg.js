google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawFusionTableChart);


function getStaticData() {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'משרד');
    data.addColumn('number', 'עמידה ביעדים');

    data.addRows(gii.data.length);

    $.each(gii.data, function (i, ministry) {
        data.setValue(i, 0, ministry.name);
        data.setValue(i, 1, ministry.avg);
    });
}

function drawStaticChart() {
    drawChart(getStaticData());
}

function drawFusionTableChart() {
    var queryText = encodeURIComponent("SELECT office, AVERAGE(status) as performance FROM 946168 group by office");
    var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
  
    query.send(function(response) {
	    drawChart(response.getDataTable());
	});
}

function drawChart(data) {
    var chart = new google.visualization.BarChart(document.getElementById('ministry_avg_chart'));
    chart.draw(data, {
        width           : '100%',
        height          : 500,
        title           : 'עמידה ביעדים',
        backgroundColor : '#DEECF9',
        vAxis: {
            title          : 'משרד',
            titleTextStyle : {color  : 'red'}
        },
    });
}
