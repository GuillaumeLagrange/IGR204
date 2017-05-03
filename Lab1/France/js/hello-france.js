/*globals d3:false, console:false */

var w = 600;
var h = 600;
var dataset = [];
var x;
var y;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
var popText = d3.select("body").append("p");

popText.html("").style("text-align", "center");

d3.tsv("data/france.tsv")
    .row(function (d, i) {
        return {
            codePostal: +d["Postal Code"],
            inseeCode: +d.inseecode,
            place: d.place,
            longitude: +d.x,
            latitude: +d.y,
            population: +d.population,
            density: +d.density
        };
    })
    .get(function(error, rows) {
        console.log("Loaded " + rows.length + " rows");
        if (rows.length > 0) {
            console.log("First row", rows[0]);
            console.log("Last  row", rows[rows.length-1]);
            dataset = rows;
            x = d3.scale.linear()
                .domain(d3.extent(rows, function(row) { return row.longitude; }))
                .range([0, w]);
            y = d3.scale.linear()
                .domain(d3.extent(rows, function(row) { return row.latitude; } ))
                .range([0, h]);
            draw();
        }
    });

function draw() {
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", 1)
        .attr("height", 1)
        .attr("x", function(d) { return x(d.longitude); })
        .attr("y", function(d) { return h-y(d.latitude); })
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
}

function mouseOver(d) {
    d3.select(this).attr("width", 10).attr("height", 10)
        .attr("x", function(d) { return x(d.longitude) - 5; })
        .attr("y", function(d) { return h - y(d.latitude) - 5; });
    var text = d.codePostal + " - Name: " + d.place + " - Population: " + d.population +
        " - Density: " + d.density;
    popText.html(text);
}

function mouseOut(d) {
    d3.select(this).attr("width", 1).attr("height", 1)
        .attr("x", function(d) { return x(d.longitude); })
        .attr("y", function(d) { return h-y(d.latitude); });
    popText.html("");
}