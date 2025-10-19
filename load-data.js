// Exercise 6: Data Loading
// This file loads the TV data and initializes all visualizations

d3.csv("data/Ex6_TVdata.csv").then(data => {
    // Convert strings to numbers and clean data
    data.forEach(d => {
        d.energyConsumption = +d.energyConsumption;
        d.star2 = +d.star2;
        d.screenSize = +d.screenSize;
        d.brand = d.brand || "Unknown";
        d.model = d.model || "Unknown";
        d.screenTech = d.screenTech || "Unknown";
    });

    // Filter out invalid data
    data = data.filter(d =>
        !isNaN(d.energyConsumption) &&
        !isNaN(d.star2) &&
        d.energyConsumption > 0 &&
        d.energyConsumption < 1000  // Remove outliers
    );

    console.log(`Loaded ${data.length} valid TV records`);
    console.log("Sample data:", data.slice(0, 3));

    // Draw visualizations
    drawHistogram(data);
    drawScatterplot(data);

    // Set up interactivity
    populateFilters(data);
    createTooltip();
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading data:", error);

    // Show error messages on page
    d3.select("#histogram-chart").append("p")
        .attr("class", "loading")
        .text("Error loading data. Please ensure you're running a local server and data/Ex6_TVdata.csv exists.");

    d3.select("#scatter-chart").append("p")
        .attr("class", "loading")
        .text("Error loading data. Please ensure you're running a local server and data/Ex6_TVdata.csv exists.");
});
