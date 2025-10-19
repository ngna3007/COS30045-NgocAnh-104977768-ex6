// Exercise 6: Interactions - Filters and Tooltips

// ==================== HISTOGRAM FILTERING ====================

function populateFilters(data) {
    // Create filter buttons
    const filterContainer = d3.select("#filters-screen");

    filterContainer.selectAll(".filter-button")
        .data(filters_screen)
        .join("button")
        .attr("class", d => d.isActive ? "filter-button active" : "filter-button")
        .text(d => d.label)
        .on("click", function(event, d) {
            // Toggle active state
            filters_screen.forEach(f => f.isActive = false);
            d.isActive = true;

            // Update button appearances
            d3.selectAll(".filter-button")
                .classed("active", false);
            d3.select(this)
                .classed("active", true);

            // Update histogram with filtered data
            updateHistogram(d.id, data);
        });

    // Update histogram function
    function updateHistogram(filterId, fullData) {
        // Filter data based on selected technology
        let filteredData;
        if (filterId === "all") {
            filteredData = fullData;
        } else {
            filteredData = fullData.filter(d => d.screenTech === filterId);
        }

        console.log(`Filtered data: ${filteredData.length} records for ${filterId}`);

        // Create new bins with filtered data
        const updatedBins = binGenerator(filteredData);

        // Update y-scale domain for new data
        yScale.domain([0, d3.max(updatedBins, d => d.length)]);

        // Update y-axis
        innerChart.select(".axis")
            .transition()
            .duration(500)
            .call(d3.axisLeft(yScale).ticks(8));

        // Update bars with transition
        innerChart.selectAll(".histogram-bar")
            .data(updatedBins)
            .join(
                enter => enter.append("rect")
                    .attr("class", "histogram-bar")
                    .attr("x", d => xScale(d.x0) + 1)
                    .attr("y", height)
                    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
                    .attr("height", 0)
                    .attr("fill", primaryColor)
                    .call(enter => enter.transition()
                        .duration(600)
                        .attr("y", d => yScale(d.length))
                        .attr("height", d => height - yScale(d.length))
                    ),
                update => update
                    .call(update => update.transition()
                        .duration(600)
                        .attr("x", d => xScale(d.x0) + 1)
                        .attr("y", d => yScale(d.length))
                        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
                        .attr("height", d => height - yScale(d.length))
                    ),
                exit => exit
                    .call(exit => exit.transition()
                        .duration(400)
                        .attr("height", 0)
                        .attr("y", height)
                        .remove()
                    )
            )
            .select("title")
            .text(d => `Energy: ${d.x0.toFixed(0)}-${d.x1.toFixed(0)} kWh\nCount: ${d.length} TVs`);

        // Update title
        d3.select("#histogram-chart svg .chart-title")
            .text(`TV Energy Consumption Distribution (n=${filteredData.length})`);
    }

    console.log("Filters populated");
}

// ==================== SCATTERPLOT TOOLTIP ====================

function createTooltip() {
    // Create tooltip group
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Add background rectangle
    tooltip.append("rect")
        .attr("class", "tooltip-rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 5);

    // Add text elements
    tooltip.append("text")
        .attr("class", "tooltip-text")
        .attr("x", tooltipWidth / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("id", "tooltip-line1");

    tooltip.append("text")
        .attr("class", "tooltip-text")
        .attr("x", tooltipWidth / 2)
        .attr("y", 38)
        .attr("text-anchor", "middle")
        .attr("id", "tooltip-line2")
        .style("font-size", "11px")
        .style("fill", "#666");

    console.log("Tooltip created");
}

function handleMouseEvents() {
    // Select all scatter circles
    const circles = innerChartS.selectAll(".scatter-circle");

    circles
        .on("mouseenter", function(event, d) {
            // Highlight the circle
            d3.select(this)
                .transition()
                .duration(150)
                .attr("r", 6)
                .attr("stroke-width", 2);

            // Get circle position
            const cx = +this.getAttribute("cx");
            const cy = +this.getAttribute("cy");

            // Update tooltip text
            d3.select("#tooltip-line1")
                .text(`${d.screenSize}" Screen`);
            d3.select("#tooltip-line2")
                .text(`${d.brand.substring(0, 12)}`);

            // Position tooltip
            const tooltip = innerChartS.select(".tooltip");
            let tooltipX = cx + 10;
            let tooltipY = cy - tooltipHeight - 10;

            // Keep tooltip in bounds
            if (tooltipX + tooltipWidth > width) {
                tooltipX = cx - tooltipWidth - 10;
            }
            if (tooltipY < 0) {
                tooltipY = cy + 10;
            }

            // Show tooltip with transition
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 1)
                .attr("transform", `translate(${tooltipX}, ${tooltipY})`);
        })
        .on("mouseleave", function() {
            // Restore circle
            d3.select(this)
                .transition()
                .duration(150)
                .attr("r", 4)
                .attr("stroke-width", 1);

            // Hide tooltip
            innerChartS.select(".tooltip")
                .transition()
                .duration(200)
                .style("opacity", 0)
                .attr("transform", "translate(-1000, -1000)");  // Move off screen
        });

    console.log("Mouse event handlers attached to", circles.size(), "circles");
}
