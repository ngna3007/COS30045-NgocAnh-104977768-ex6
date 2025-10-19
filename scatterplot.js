// Exercise 6.2: Interactive Scatterplot with Tooltips

function drawScatterplot(data) {
    // Sample data for performance (use 2000 random points)
    const sampledData = data.sort(() => 0.5 - Math.random()).slice(0, 2000);

    // Dimensions
    const marginS = { top: 40, right: 120, bottom: 60, left: 70 };
    const widthS = 900 - marginS.left - marginS.right;
    const heightS = 450 - marginS.top - marginS.bottom;

    // Create SVG
    const svg = d3.select("#scatter-chart")
        .append("svg")
        .attr("width", widthS + marginS.left + marginS.right)
        .attr("height", heightS + marginS.top + marginS.bottom);

    // Create inner chart group (use innerChartS to avoid conflicts)
    innerChartS = svg.append("g")
        .attr("transform", `translate(${marginS.left}, ${marginS.top})`);

    // Define scales
    xScaleS = d3.scaleLinear()
        .domain([0, d3.max(sampledData, d => d.energyConsumption) * 1.1])
        .range([0, widthS]);

    yScaleS = d3.scaleLinear()
        .domain([0, d3.max(sampledData, d => d.star) + 1])
        .range([heightS, 0]);

    // Configure color scale with actual data
    const technologies = [...new Set(sampledData.map(d => d.screenTech))];
    colorScale.domain(technologies);

    // Add X axis
    innerChartS.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${heightS})`)
        .call(d3.axisBottom(xScaleS).ticks(10));

    // X axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("x", widthS / 2)
        .attr("y", heightS + 45)
        .attr("text-anchor", "middle")
        .text("Energy Consumption (kWh/year)");

    // Add Y axis
    innerChartS.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(yScaleS).ticks(7));

    // Y axis label
    innerChartS.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -heightS / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Star Rating");

    // Draw circles
    innerChartS.selectAll(".scatter-circle")
        .data(sampledData)
        .join("circle")
        .attr("class", "scatter-circle")
        .attr("cx", d => xScaleS(d.energyConsumption))
        .attr("cy", d => yScaleS(d.star))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.screenTech));

    // Add legend
    const legend = svg.append("g")
        .attr("transform", `translate(${widthS + marginS.left + 10}, ${marginS.top})`);

    technologies.forEach((tech, i) => {
        const legendItem = legend.append("g")
            .attr("class", "legend-item")
            .attr("transform", `translate(0, ${i * 25})`);

        legendItem.append("rect")
            .attr("class", "legend-rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", colorScale(tech));

        legendItem.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .text(tech);
    });

    // Add title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", (widthS + marginS.left + marginS.right) / 2)
        .attr("y", 25)
        .text(`Energy vs. Star Rating (n=${sampledData.length})`);

    console.log(`Scatterplot created with ${sampledData.length} points`);
}
