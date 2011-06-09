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
    var query = new google.visualization.Query('/ft_bridge?tq='  + queryText);
  
    query.send(function(response) {
	    drawChart(response.getDataTable());
	});
}

function drawChart(data) {
    var chart = new google.visualization.BarChart(document.getElementById('ministry_avg_chart'));

    $.each(data.F, function (i, ministry) {  // Calculate average points for each ministry. FIXME: Do this in GVis instead.
        ministry.c[1].v /= 2;
    });

    chart.draw(data, {
        width           : '100%',
        height          : 500,
        legend          : 'none',
        backgroundColor : '#DEECF9',
        vAxis           : {
            direction : 1,
            textStyle : { fontSize : 20 }
        },
        hAxis           : {
            textStyle : { fontSize : 14 },
            format    : '#,###%',
            maxValue  : 1
        }
    });
}
