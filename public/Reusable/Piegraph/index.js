
let Piechart = function() {
    //Width and height
    // var w = 500;
    // var h = 300;
    // var padding = 40;
    
    let w = 500;
    let h = 500;
    let outerRadius = w /2;
    let innerRadius = w / 14; // making donut
    let pie = d3.pie();
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    var dataset, xScale, yScale;  //Empty, for now

    let average = [];

    //Load in the data
    d3.csv("mauna_loa_co2.csv", function(d) {
        return {
            date: new Date(+d.year, (+d.month-1)),
            average: parseFloat(d.average)
        };
    }).then(function(data){
        // console.log(data.average);
        // data.forEach((d)=>{ average.push(Math.floor(d.average))})

        for(let i = 0; i < 9; i++){
            average.push(Math.floor(data[i].average))
        }
        console.log(average,'avg')

        dataset = data;      //set the data
       let dataset2 = [5,10,15,20]
        //Create SVG element
        var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr('class',"svg_container")

        let bandScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, 240])    // gonna use this num inbetween 0- 600 change color of text

        let arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
        // console.log(arc);

        //set up groups
        let arcs = svg.selectAll("g.arc")
            .data(pie(average))
            .enter()
            .append("g")
            .attr("class","arc")
            .attr("transform",`translate(${Math.floor(outerRadius)},${Math.floor(outerRadius)})`)

        // console.log(`${Math.floor(outerRadius)},${Math.floor(outerRadius)}`)
        

        arcs.append("path")
            .attr("fill", function(d, i) {
                let rgb = Math.floor(bandScale(i));
                // console.log(Math.floor(bandScale(i)));
                return color(i);
                // return `rgb(${rgb},0,${rgb})`
            })
            .attr("d", arc);

        

        //  //Create scale functions
        // xScale = d3.scaleTime()
        //                .domain([
        //                     d3.min(dataset, function(d) { return d.date; }),
        //                     d3.max(dataset, function(d) { return d.date; })
        //                 ])
        //                .range([padding, w - padding]);
        // yScale = d3.scaleLinear()
        //                .domain([
        //                     d3.min(dataset, function(d) { return d.average; }),
        //                     d3.max(dataset, function(d) { return d.average; })
        //                 ])
        //                .range([h - padding, padding]);

       
              

        // //!important 
        // // at a minimum, each axis also needs to be told on what scale to operate. 
        // //i.e. pass in the xScale from the scatterplot code
        // let xAxis = d3.axisBottom(xScale)
                
        // let formatAsPercentage = d3.format(".1%");     // use this when value is like 0.54321 ish
        // let yAxis = d3.axisLeft(yScale)
        //         // .tickFormat(formatAsPercentage)        // use this when value is like 0.54321 ish and need the percentile sign
        //         .ticks(5);

        // //positions the x-axis below the graph
        // svg.append("g")
        //    .attr("class", "axis")
        //    .attr("transform", `translate(0, ${h-padding})`)
        //    .call(xAxis);

        // svg.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", `translate( ${padding}, 0)`)
        //     .call(yAxis);
           
        // // let line = d3.line()
        // //         .defined(function(d) {return d;})        //checking if value even exists at all
        // //         .defined(function(d) {return d.average >= 0; })     //adding conditions
        // //         .x(function(d) {return xScale(d.date)})
        // //         .y(function(d) {return yScale(d.average)})

        
        // let line = d3.line()
        //         .defined(function(d) { return d.average >= 0 && d.average <= 350; })
        //         .x(function(d) {return xScale(d.date) })
        //         .y(function(d) {return yScale(d.average) })
        // let dangerLine = d3.line()
        //         .defined(function(d) {return d.average >= 350; })
        //         .x(function(d) {return xScale(d.date)})
        //         .y(function(d) {return yScale(d.average)})

        // svg.append("path")
        //     .datum(dataset)
        //     .attr('class','line')
        //     .attr('d', line);   //pass in the built line
        
        // svg.append("path")
        //     .datum(dataset)
        //     .attr('class','dangerLine')
        //     .attr('d', dangerLine);
            
    }); // promise then 
}

export default Piechart;