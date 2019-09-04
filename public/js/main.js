
import Scatterplot from "../Reusable/Scatterplot/index.js";
import Bargraph from "../Reusable/Bargraph/index.js";
// import Dateplot from "../Reusable/Dateplot/index.js"
//import all modules 

Scatterplot();
Bargraph();
// Dateplot();



let dataset1;
let parseTime = d3.timeParse("%m/%d/%y");

function rowConverter (d) {        //more like it ensures them to be date(not string) & integers(not string)
        return {                            
            Date: parseTime(d.Date),
            Amount: parseInt(d.Amount)
        }
}
d3.csv("time_scale_data.csv", function(data) {
    console.log(data,'see it?');
})

console.log('hm');
    // .then(function(data) {
    //     console.log(data);
    // })