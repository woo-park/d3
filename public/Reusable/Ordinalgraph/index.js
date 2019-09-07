//expaining the bandscale here


const Ordinalgraph = function () {
    //temporary dataset
let dataset = ["freshman","sophomore","junior","senior"];

let w = 500;
let h = 500;
let barPadding = 1;
let svg = d3.select("body")               
    .append("svg")
    .attr('class','svg_container')
    .attr('width', w)
    .attr('height', h);



    
let xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0,w])
    .paddingInner(0.7)      //HA! can be used to spread out

let bandScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .range([0, 240])    // gonna use this num inbetween 0- 600 change color of text

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr('x',function(d, i){
        return xScale(i);
    })
    .attr('y', function(d, i) {
        return 100;
    })
    .text(function(d){
        return d;
    })
    .style('fill', function(d, i) {
        return `rgb(${bandScale(i)},${bandScale(i)},${bandScale(i)}`;
    })
    // .x()
    // .y()
    // .width()
    // .height()
}


export default Ordinalgraph;