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
    var tableEl = document.getElementById('gii_issues_list_view')
    var table = new google.visualization.Table(tableEl);
    table.draw(data, {showRowNumber: true,
		page: 'enable',
		rtlTable: true});
}
