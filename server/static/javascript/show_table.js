// -*- coding: utf-8 -*-

google.load("visualization", "1", {packages: ["table"]});
google.setOnLoadCallback(drawFusionTable);


function drawFusionTable() {
    var queryText = encodeURIComponent("SELECT text, topic, report, status FROM 946168");
    var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
  
    query.send(function(response) {
	    drawTable(response.getDataTable());
	});
}

function drawTable(data) {
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
		rtlTable : true,
		page     : 'enable',
        allowHtml : true
        //showRowNumber : true
    });
}
