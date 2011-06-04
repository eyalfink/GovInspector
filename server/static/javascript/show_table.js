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


////////////////////////////////////////////////////////////
//   Office list table
////////////////////////////////////////////////////////////
function createOfficeTable() {
    var queryText = encodeURIComponent(
        "SELECT office, count(status) FROM " + gii.TABLE_NUMBER + " GROUP BY office");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);
  
    query.send(function(response) {
	    drawOfficeTable(response.getDataTable());
	});
}

function drawOfficeTable(data) {
    var tableEl = document.getElementById('gii_office_list_view')
    var table = new google.visualization.Table(tableEl);
    table.draw(data,{
	width           : '40%',
	rtlTable: true});
}

////////////////////////////////////////////////////////////
//   Office performance chart
////////////////////////////////////////////////////////////
function createPerformanceChart() {
    var queryText = encodeURIComponent(
        "SELECT report, average(status) FROM " + gii.TABLE_NUMBER + " GROUP BY report");
    var query = new google.visualization.Query(gii.FT_URL  + queryText);
  
    query.send(function(response) {
	    drawPerformanceChart(response.getDataTable());
	});
}

function drawPerformanceChart(data) {
    var chartEl = document.getElementById('gii_performance_view');
    var chart = new google.visualization.BarChart(chartEl);
    chart.draw(data, {
    });

}


////////////////////////////////////////////////////////////
//   Issues table
////////////////////////////////////////////////////////////
function createIssuesTable() {
    var queryText = encodeURIComponent(
        "SELECT text, topic, report, status FROM " + gii.TABLE_NUMBER);
    var query = new google.visualization.Query(gii.FT_URL  + queryText);
  
    query.send(function(response) {
	    drawIssuesTable(response.getDataTable());
	});
}

function drawIssuesTable(data) {
    var tableEl = document.getElementById('gii_issues_list_view')
    var table = new google.visualization.Table(tableEl);
    table.draw(data, {showRowNumber: true,
		page: 'enable',
		rtlTable: true});
}
