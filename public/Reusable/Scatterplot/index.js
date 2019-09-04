let Scatterplot = function () {
    let dataset = [[5,20],[480,90],[250,50],[100,33],[330,95],[410,12]];
    let w = 500;
    let h = 300;

    let svg = d3.select("body")
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d[0];
        })
        .attr("cy", function(d) {
            return d[1];
        })
        .attr('r', 5);
}



export default Scatterplot;