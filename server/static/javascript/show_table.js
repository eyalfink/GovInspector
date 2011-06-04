// -*- coding: utf-8 -*-

google.load("visualization", "1", {packages: ["table", "corechart"]});
google.setOnLoadCallback(createDashboard);

var gii = gii || {};
gii.FT_URL = 'http://www.google.com/fusiontables/gvizdata?tq=';
gii.TABLE_NUMBER = 946168;

function createDashboard() {
    createOfficeTable();
    createPerformanceChart();
    createIssuesTable();
}


function createOfficeTable() {  // Office list table
    var queryText = encodeURIComponent(
        "SELECT office, count(status) FROM " + gii.TABLE_NUMBER + " GROUP BY office");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);

    query.send(function (response) {
	    drawOfficeTable(response.getDataTable());
	});
}

function drawOfficeTable(data) {
    var headers = data.B;  // Overwrite db column header labels.

    headers[0].label = "משרד";
    headers[1].label = "ליקויים";

    var tableEl = document.getElementById('gii_office_list_view')
    var table = new google.visualization.Table(tableEl);
    table.draw(data, {
        width    : '100%',
        rtlTable : true
    });
}


function createPerformanceChart() {  // Office performance chart
    var queryText = encodeURIComponent(
        "SELECT report, AVERAGE(status) FROM " + gii.TABLE_NUMBER + " GROUP BY report");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);

    query.send(function (response) {
	    drawPerformanceChart(response.getDataTable());
	});
}

function drawPerformanceChart(data) {
    var chartEl = document.getElementById('gii_performance_view');
    var chart = new google.visualization.BarChart(chartEl);

    chart.draw(data, {
        width           : '100%',
        height          : 200,
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


function createIssuesTable() {  // Issues table
    var queryText = encodeURIComponent(
        "SELECT text, topic, report, status FROM " + gii.TABLE_NUMBER);
    var query = new google.visualization.Query(gii.FT_URL  + queryText);
  
    query.send(function(response) {
	    drawIssuesTable(response.getDataTable());
	});
}

function drawIssuesTable(data) {
    var headers = data.B;  // Overwrite db column header labels.

    headers[0].label = "ליקוי";
    headers[1].label = "נושא";
    headers[2].label = "דו\"ח";
    headers[3].label = "טיפול";


    var formatter = new google.visualization.ColorFormat();

    formatter.addRange(0, 0.5, 'black', '#E77471');
    formatter.addRange(1, 1.5, 'black', '#FFF380');
    formatter.addRange(2, 2.5, 'black', '#C3FDB8');

    formatter.format(data, 3);  // Apply formatter to status column.


    var tableEl = document.getElementById('gii_issues_list_view');
    var table = new google.visualization.Table(tableEl);

    table.draw(data, {
		rtlTable  : true,
		page      : 'enable',
        allowHtml : true
        //showRowNumber : true
    });
}
