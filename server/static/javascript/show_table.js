// -*- coding: utf-8 -*-

google.load("visualization", "1", {packages: ["table",
					      "corechart"]});
google.setOnLoadCallback(createDashboard);

var gii = gii || {};
//gii.FT_URL = 'http://www.google.com/fusiontables/gvizdata?tq=';
gii.FT_URL = '/ft_bridge?tq=';
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
    // Overwrite db column header labels.
    data.setColumnLabel(0, "משרד");
    data.setColumnLabel(1, "ליקויים");

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
    
    COLUMNS = {}
    COLUMNS.ISSUE = 0;
    COLUMNS.TOPIC = 1;
    COLUMNS.REPORT = 2;
    COLUMNS.NUMERIC_STATUS = 3;


    // Overwrite db column header labels.
    data.setColumnLabel(COLUMNS.ISSUE, "ליקוי");
    data.setColumnLabel(COLUMNS.TOPIC, "נושא");
    data.setColumnLabel(COLUMNS.REPORT, "דו\"ח");

    formattedStatus = ['<img src="/static/media/reddot.png"> טרם החל', 
		       '<img src="/static/media/yellowdot.png"> בטיפול',
		       '<img src="/static/media/greendot.png"> הסתיים'];
    // Replace the status numbers with color image
    COLUMNS.STATUS = data.addColumn("string", "טיפול");
    for( var i=0; i < data.getNumberOfRows(); i++) {
	var status = data.getValue(i, COLUMNS.NUMERIC_STATUS);
	if (status != null) {
	    data.setValue(i, COLUMNS.STATUS, formattedStatus[status]);
	    data.setProperty(i, COLUMNS.STATUS, "className", "gii_status_col");
	}
    }

    gii.issuesTable.draw(data, {
		rtlTable  : true,
		page      : 'enable',
        allowHtml : true
        //showRowNumber : true
    });
}
