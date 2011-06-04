google.load("visualization", "1", {packages: ["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'משרד');
    data.addColumn('number', 'עמידה ביעדים');

    data.addRows(gii.data.length);

    $.each(gii.data, function (i, ministry) {
        data.setValue(i, 0, ministry.name);
        data.setValue(i, 1, ministry.avg);
    });

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
