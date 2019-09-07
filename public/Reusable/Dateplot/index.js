



let Dateplot = function() {
    /************** converting string to dates **************/    
    // let dataset;
    // let parseTime = d3.timeParse("%m/%d/%y");

    // let rowConverter = function (d) {        //more like it ensures them to be date(not string) & integers(not string)
    //     return {                            
    //         date: parseTime(d.Date),
    //         amount: parseInt(d.Amount)
    //     };
    // }        //doesn't work

    let w = 500;
    let h = 300;
    let padding = 40;
    
    let dataset, xScale, yScale;

    let parseTime = d3.timeParse("%m/%d/%y");

    let formatTime = d3.timeFormat("%b %e");

    let rowConverter = function(d) {
        return {
            Date: parseTime(d.Date),
            Amount: parseInt(d.Amount)
        };
    }

    d3.csv("time_scale_data.csv", rowConverter, function(data) {
        return dataset = data;

    });
    console.log(dataset);
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

        let svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return yScale(d.Amount) + 4;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "#bbb");

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


    // .then(function(data){               //rowconversion undone 
    //     dataset = data;
    //     console.log(dataset,'dataset of time_scale_data');
    // })
}

export default Dateplot;

/****************************************************************************************/   
/**************   one thing to note, data has to be in the root directory  **************/   
/**************   along with index.html - that calls main js               **************/   
/**************   whichever you are calling .csv file from,                **************/   
/**************   the path of the data file must be root directory         **************/   
/**************   since it "is" being called from the index.html - script  **************/   
/****************************************************************************************/   