// -*- coding: utf-8 -*-

google.load("visualization", "1", {packages: ["table",
					      "corechart"]});
google.setOnLoadCallback(createDashboard);

var gii = gii || {};
gii.FT_URL = 'http://www.google.com/fusiontables/gvizdata?tq=';
gii.TABLE_NUMBER = 946168;

function createDashboard() {
    gii.officeTable = createOfficeTable();
    gii.performanceChart = createPerformanceChart();
    gii.issuesTable = createIssuesTable();

    // bind the events
    google.visualization.events.addListener(gii.officeTable,
    					    'select',
    					    updatePerformanceChart);
    google.visualization.events.addListener(gii.officeTable,
					    'select',
					    updateIssuesTable);

}


function createOfficeTable() {  // Office list table
    var tableEl = document.getElementById('gii_office_list_view')
    var table = new google.visualization.Table(tableEl);
    var queryText = encodeURIComponent(
        "SELECT office, count(status) FROM " + gii.TABLE_NUMBER + " GROUP BY office");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);
  
    query.send(function(response) {
	    drawOfficeTable(table, response.getDataTable());
	});
    return table;
}

function drawOfficeTable(table, data) {
    var headers = data.B;  // Overwrite db column header labels.

    headers[0].label = "משרד";
    headers[1].label = "ליקויים";

    gii.officesData = data;

    table.draw(data, {
        width    : '100%',
        rtlTable : true
    });

    table.setSelection([{ row : 0 }]);  // Select 1st row. FIXME: Doesn't trigger events.
    updatePerformanceChart();
    updateIssuesTable();
}


function createPerformanceChart() {  // Office performance chart
    var chartEl = document.getElementById('gii_performance_view');
    var chart = new google.visualization.BarChart(chartEl);
    return chart;
}

function updatePerformanceChart() {
    var selection = gii.officeTable.getSelection();
    if (!selection || !selection.length) {
	return;
    }
    var item = selection[0];
    if (item.row == null) {
	return;
    }
    var office = gii.officesData.getFormattedValue(item.row, 0);

    var queryText = encodeURIComponent(
        "SELECT report, average(status) FROM " +
	gii.TABLE_NUMBER + 
	" WHERE office = '" + office + "'" +
	" GROUP BY report");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);

    query.send(function (response) {
	    drawPerformanceChart(response.getDataTable());
	});
}

function drawPerformanceChart(data) {
    gii.performanceChart.draw(data, {
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
    var tableEl = document.getElementById('gii_issues_list_view')
    var table = new google.visualization.Table(tableEl);
    return table;
}

function updateIssuesTable() {
    var selection = gii.officeTable.getSelection();
    if (!selection || !selection.length) {
	return;
    }
    var item = selection[0];
    if (item.row == null) {
	return;
    }
    var office = gii.officesData.getFormattedValue(item.row, 0);
    var queryText = encodeURIComponent(
        "SELECT text, topic, report, status FROM " + gii.TABLE_NUMBER + 
				       " WHERE office = '" + office + "'");
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

    gii.issuesTable.draw(data, {
		rtlTable  : true,
		page      : 'enable',
        allowHtml : true
        //showRowNumber : true
    });
}
