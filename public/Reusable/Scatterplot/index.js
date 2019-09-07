let Scatterplot = function () {
    let dataset = [[5,20],[480,90],[250,50],[100,33],[330,95],[410,12],[600,150]];
    let w = 600;
    let h = 300;

    let svg = d3.select("body")
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    /************** custom scale **************/    
    let padding = 20;                   //padding to avoid going out svg boundary
    let xScale = d3.scaleLinear()                     //normalizes and puts it in between 0, width
        .domain([0, d3.max(dataset, function(d) {
            return d[0];        //x
        })])
        .range([padding, w - 2 * padding]);       //double the padding bc its still going out   

    let yScale = d3.scaleLinear()                   //normalizes and puts it in between 0, height
        .domain([0, d3.max(dataset, function(d) {
            return d[1];
        })])
        .range([h - padding, padding]); //swapped [0, h] to [h, 0]


    let rScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d[1];
        })])
        .range([2, 5])      //temporary 2,5 values

    let aScale = d3.scaleSqrt()     // 'a' stands for Area
        .domain([0, d3.max(dataset, function(d) {
            return d[1];
        })])
        .range([0, 10]);            // returns size from 0 to 10
    /************** custom scale **************/    

    /************** converting string to dates **************/    
        
    //check Date directory

    /************** converting string to dates **************/    


    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr('r', function(d) {        //values as an area; not as a radius
            // return Math.sqrt( (h - d[1]) / Math.PI );   //we can omit the PI
            // return aScale(d[1]);
            return rScale(d[1]);                           //either one works fine
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[0] + ',' + d[1];
        })
        .attr('x', function(d) {
            return xScale(d[0]);
        })
        .attr('y', function(d) {
            return yScale(d[1]);
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'green');
}



export default Scatterplot;