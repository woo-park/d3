
let Linechart = function() {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 40;
    
    var dataset, xScale, yScale;  //Empty, for now
    //For converting strings to Dates
    var parseTime = d3.timeParse("%m/%d/%y");
    //For converting Dates to strings
    var formatTime = d3.timeFormat("%b %e");
    //Function for converting CSV values from strings to Dates and numbers
    var rowConverter2 = function(d) {
        console.log(d,'d');
    }


    //Load in the data
    d3.csv("time_scale_data.csv", rowConverter, function(d) {
        //Copy data into global dataset
        console.log(d);
        return {
            Date: parseTime(d.Date),
            Amount: +d.Amount
        };
        
    }).then(function(data){
        console.log(data,'dataaa');
        dataset = data
         //Create scale functions
         xScale = d3.scaleTime()
                       .domain([
                            d3.min(dataset, function(d) { return d.Date; }),
                            d3.max(dataset, function(d) { return d.Date; })
                        ])
                       .range([padding, w - padding]);
        yScale = d3.scaleLinear()
                       .domain([
                            d3.min(dataset, function(d) { return d.Amount; }),
                            d3.max(dataset, function(d) { return d.Amount; })
                        ])
                       .range([h - padding, padding]);

        //Create SVG element
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
        //Generate date labels first, so they are in back
         svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                    return formatTime(d.Date);
            })
            .attr("x", function(d) {
                    return xScale(d.Date) + 4;
            })
            .attr("y", function(d) {
                    return yScale(d.Amount) + 4;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "#bbb");
        //Generate circles last, so they appear in front
        svg.selectAll("circle")
           .data(dataset)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return xScale(d.Date);
           })
           .attr("cy", function(d) {
                   return yScale(d.Amount);
           })
           .attr("r", 2);

        let xAxis = d3.axisBottom();
        //!important 
        // at a minimum, each axis also needs to be told on what scale to operate. 
        //i.e. pass in the xScale from the scatterplot code

        xAxis.scale(xScale); //or just let xAxis = d3.axisBottom(xScale);
        
        svg.append("g")
           .attr("class", "axis")
           .attr("transform", `translate(0, ${h-padding})`)
           .call(xAxis);

           
    }); // promise then 
}

export default Linechart;