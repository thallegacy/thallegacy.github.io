// from data.js
var tableData = data;

// Console check
console.log(tableData);

// Get a reference to the table body
var tbody = d3.select("tbody");

//Put the table loading process in a function to be use repeatedly for table filtering
var tableLoad = (loadData)  => {
// Loop through the data for each table UFO object
loadData.forEach((UFOSighting) => {

    // Append one table row using "tr" tag for each UFO Sighting object
    var row = tbody.append("tr");
    
    // Loop for appending the values for each newly created row
    Object.entries(UFOSighting).forEach(([key, value]) => {
    
        // Append a cell to the row for each value using "td" tag
        var cell = row.append("td");
         // Append the text from each value to the row
        cell.text(value);
    });
});
};

// Call table loading function with table data for use
tableLoad(tableData);


// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", dateFilter);
form.on("submit",dateFilter);

// Complete the event handler function for the form
function dateFilter() {


    // Prevent the page from refreshing
    d3.event.preventDefault();

    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    // Console check
    console.log(inputValue);

    // Filter on input value property of the input element
    var filteredData = tableData.filter(datevalue => datevalue.datetime === inputValue);
  
    // Console check
    console.log(filteredData);

    if(filteredData.length !== 0) 
    {
         // Clear table  
        tbody.html("")
        
        // Call table loading function with filtered table data for use
        tableLoad(filteredData);
    }
    else 
    {
        // Warning that the date entered or not entered was not found
        alert("Date not found. Please enter a value");

        // Reset to the orignal table dataset
        tableLoad(tableData);
    }  	
};