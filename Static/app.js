function getPlots(id) {
//Reading of  samples.json
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
    // Code to get only top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    // Code get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
     // Code to get the top 10 labels for the plot
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        // Code to create data variable
        var data = [trace];

        // Creation of layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        // Creation to get the bar plot
    Plotly.newPlot("bar", data, layout);
        // The bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        // Code to set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // Creation of the data variable 
        var data1 = [trace1];

    // Creation of the bubble plot
    Plotly.newPlot("bubble", data1, layout_2); 
    
    });
}  
// Creating the function to get the necessary data
function getDemoInfo(id) {
// Reading the json file to get data
    d3.json("samples.json").then((data)=> {
// get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

      // Code to filter the meta data info by id
       var result = metadata.filter(meta => meta.id.toString() === id)[0];
      // Code to Select demographic panel to put data
       var demographicInfo = d3.select("#sample-metadata");
        
     // Code to Empty the demographic info panel each time before getting new id info
       demographicInfo.html("");

     // Code to grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}
// Code to create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// Code create the function for the initial data rendering
function init() {
    // Selecting dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Code to read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // Code get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Code to call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();
