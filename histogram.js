// Exercise 6.1: Interactive Histogram with Filtering

function drawHistogram(data) {
    // Create SVG
    const svg = d3.select("#histogram-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    // Create inner chart group
    innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create bins using the shared bin generator
    const bins = binGenerator(data);
    console.log(`Created ${bins.length} bins for histogram`);

    // Get bin boundaries
    const binMin = d3.min(bins, d => d.x0);
    const binMax = d3.max(bins, d => d.x1);

    // Define scales
    xScale = d3.scaleLinear()
        .domain([binMin, binMax])
        .range([0, width]);

    yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([height, 0]);

    // Add X axis
    innerChart.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(10));

    // X axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + 45)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Add Y axis
    innerChart.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yScale).ticks(8));

    // Y axis label
    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Frequency (Number of TVs)");

    // Draw histogram bars
    innerChart.selectAll(".histogram-bar")
        .data(bins)
        .join("rect")
        .attr("class", "histogram-bar")
        .attr("x", d => xScale(d.x0) + 1)  // +1 for gap
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))  // -2 for gap
        .attr("height", d => height - yScale(d.length))
        .attr("fill", primaryColor)
        .append("title")
        .text(d => `Energy: ${d.x0.toFixed(0)}-${d.x1.toFixed(0)} kWh\nCount: ${d.length} TVs`);

    // Add chart title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 25)
        .text(`TV Energy Consumption Distribution (n=${data.length})`);

    console.log("Histogram created successfully");
}
