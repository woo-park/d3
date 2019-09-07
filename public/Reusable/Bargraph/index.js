const Bargraph = function () {
        //temporary dataset
    let dataset = [ 25, 7, 5, 26, 11];

    // //1st
    // //none svg // just straight up into body // which is nahh
    // d3.select("body")
    //     .append("p")
    //     .text("Adding new para with d3");

    // d3.select("body")
    //     .selectAll('div')   //at this point, div dont exists
    //     .data(dataset)      //think of doing for-loop on data-set array - then putting on each div
    //     .enter()            //instantiates placeholder
    //     .append('div')      //putting 'div' on the placeholder
    //     .attr('class', 'bar')
    //     .style('height', function(d){   //returning data
    //         let barHeight = d * 5;
    //         return barHeight + 'px';
    //     })          //boring

    // //2nd


    let w = 500;
    let h = 200;
    let barPadding = 1;
    let svg = d3.select("body")                   //svg window setup 500*100
        .append("svg")
        .attr('width', w)
        .attr('height', h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            // return 21 * i;          //width of 20 plus 1 for padding
            return i * (w / dataset.length);    //responsive
        })       //x pos & y pos
        .attr("y", function(d) {
            return h - d;
        })
        .attr("width", function() {
            return w / dataset.length - barPadding; // -padding orelse it will fill up entirely
        })
        .attr("height", function(d) {
            return d;
        })
        .attr("fill", function(d) {
            return `rgb(0,0, ${Math.round(d * 10)} )`
        });
}


export default Bargraph;