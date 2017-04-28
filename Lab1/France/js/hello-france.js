var w = 600;
var h = 600;
var dataset = [];

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

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
            draw();
        }
    });

function draw() {
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect");
}