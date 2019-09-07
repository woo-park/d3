
let Datachart = function() {
    //Width and height
    var w = 500;
    var h = 300;
    var padding = 40;
    
    var dataset, xScale, yScale;  //Empty, for now

    //Load in the data
    d3.csv("mauna_loa_co2.csv", function(d) {
        //Copy data into global dataset
        // console.log(d);  //before conversion
        return {
            date: new Date(+d.year, (+d.month-1)),
            average: parseFloat(d.average)
        };
    }).then(function(data){
        // console.table(data);//dont use this 
        dataset = data      //set the data
        // console.table(dataset, ["date","average"]);//use this


        




         //Create scale functions
        xScale = d3.scaleTime()
                       .domain([
                            d3.min(dataset, function(d) { return d.date; }),
                            d3.max(dataset, function(d) { return d.date; })
                        ])
                       .range([padding, w - padding]);
        yScale = d3.scaleLinear()
                       .domain([
                            d3.min(dataset, function(d) { return d.average; }),
                            d3.max(dataset, function(d) { return d.average; })
                        ])
                       .range([h - padding, padding]);

        //Create SVG element
        var svg = d3.select("body")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
        
              

        //!important 
        // at a minimum, each axis also needs to be told on what scale to operate. 
        //i.e. pass in the xScale from the scatterplot code
        let xAxis = d3.axisBottom(xScale)
                
        let formatAsPercentage = d3.format(".1%");     // use this when value is like 0.54321 ish
        let yAxis = d3.axisLeft(yScale)
                // .tickFormat(formatAsPercentage)        // use this when value is like 0.54321 ish and need the percentile sign
                .ticks(5);

        //positions the x-axis below the graph
        svg.append("g")
           .attr("class", "axis")
           .attr("transform", `translate(0, ${h-padding})`)
           .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate( ${padding}, 0)`)
            .call(yAxis);
           
        // let line = d3.line()
        //         .defined(function(d) {return d;})        //checking if value even exists at all
        //         .defined(function(d) {return d.average >= 0; })     //adding conditions
        //         .x(function(d) {return xScale(d.date)})
        //         .y(function(d) {return yScale(d.average)})

        
        let line = d3.line()
                .defined(function(d) { return d.average >= 0 && d.average <= 350; })
                .x(function(d) {return xScale(d.date) })
                .y(function(d) {return yScale(d.average) })
        let dangerLine = d3.line()
                .defined(function(d) {return d.average >= 350; })
                .x(function(d) {return xScale(d.date)})
                .y(function(d) {return yScale(d.average)})

        svg.append("path")
            .datum(dataset)
            .attr('class','line')
            .attr('d', line);   //pass in the built line
        
        svg.append("path")
            .datum(dataset)
            .attr('class','dangerLine')
            .attr('d', dangerLine);
            

        //this applied to Linechart/index.js
        //Generate date labels first, so they are in back
        //  svg.selectAll("text")
        //     .data(dataset)
        //     .enter()
        //     .append("text")
        //     .text(function(d) {
        //             return formatTime(d.Date);
        //     })
        //     .attr("x", function(d) {
        //             return xScale(d.Date) + 4;
        //     })
        //     .attr("y", function(d) {
        //             return yScale(d.Amount) + 4;
        //     })
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "11px")
        //     .attr("fill", "#bbb");
        //Generate circles last, so they appear in front
        // svg.selectAll("circle")
        //    .data(dataset)
        //    .enter()
        //    .append("circle")
        //    .attr("cx", function(d) {
        //            return xScale(d.date);
        //    })
        //    .attr("cy", function(d) {
        //            return yScale(d.average);
        //    })
        //    .attr("r", 2);
        //
           
    }); // promise then 
}

export default Datachart;