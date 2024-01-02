//Store the URL 
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

//Retrieve and store the file in D3
d3.json(url).then(function(data) {
    console.log(data);
});

//Functions to hold data for dropdown, bar and bubble chart
function init() {

    //dropdown list variable 
    let dropdown = d3.select("#selDataset");

    //gather the id data for dropdowns
    d3.json(url).then((data) => {
    
    let sample_ids = data.names;
    console.log(sample_ids);
        for (id of sample_ids){
            dropdown.append("option").attr("value", id).text(id);
        };
    
    //establish the first sample_id
    let first_sample = sample_ids[0];
    console.log(first_sample);
    })
}

//make first bar chart 
function makeBar(samples) {

    d3.json(url).then((data) => {
        let sample_data = data.samples;

        let results = sample_data.filter(id => id.id == sample);

        let first_result = results[0];
        console.log(first_result);

        //recieve the first 10 results 
        let sample_values = first_result.sample_values.slice(0, 10);
        let otu_ids = first_result.sample_values.slice(0, 10);
        let otu_lables = first_result.otu_lables.slice(0, 10);

        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_lables);

        //create the bar chart 
        let bar_chart = {
            x: sample_values.reverse(),
            y: otu_ids.map(item => `OTU ${item}`).reverse(),
            text: otu_lables.reverse(),
            type: 'bar',
            orientation: 'h'

        };

        Plotly.newPlot("bar", [bar_chart]);

    });

};

//make bubblechart 
function makeBubbles(samples) {

    d3.json(url).then((data) => {
        let sample_data = data.samples;

        let results = sample_data.filter(id => id.id == sample);

        let first_result = results[0];
        console.log(first_result);

        //recieve the first 10 results 
        let sample_values = first_result.sample_values.slice(0, 10);
        let otu_ids = first_result.sample_values.slice(0, 10);
        let otu_lables = first_result.otu_lables.slice(0, 10);

        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_lables);

        //create the bar chart 
        let bubble_chart = {
            x: otu_ids.reverse(),
            y: sample_values.reverse(),
            text: otu_lables.reverse(),
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };

        Plotly.newPlot("bubble", [bubble_chart]);

    });

};

//demographics chart 
function makeDemos(sample) {

    d3.json(url).then((data) => {
    
    let demo_info = data.metadata;

    let results = demo_info.filter(id => id.id == sample);

    let first_result = results[0];
    console.log(first_result);

    //clear out the previous entry 
    d3.select('#sample-metadata').text('');

    Object.entries(first_result).forEach(([key,value]) => {
        console.log(key, value);

        d3.select(`#sample-metadata`).append('h3').text(`${key}, ${value}`);

    });


    });

};
