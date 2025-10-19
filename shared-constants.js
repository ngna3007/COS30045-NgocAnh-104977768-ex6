// Exercise 6: Shared Constants
// This file contains constants and configurations used across multiple chart files

// Chart dimensions for histogram
const margin = { top: 40, right: 40, bottom: 60, left: 70 };
const width = 900 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// Background colors
const bodyBackgroundColor = "#f5f5f5";
const chartBackgroundColor = "#ffffff";

// Chart colors
const primaryColor = "#667eea";
const secondaryColor = "#764ba2";
const accentColor = "#4CAF50";

// Histogram-specific
let innerChart;  // Will hold the inner chart group for histogram
let xScale, yScale;  // Scales for histogram

// Scatterplot-specific (separate from histogram to avoid conflicts)
let innerChartS;  // Inner chart group for scatterplot
let xScaleS, yScaleS;  // Scales for scatterplot

// Tooltip dimensions
const tooltipWidth = 120;
const tooltipHeight = 50;

// Color scale for screen technologies
const colorScale = d3.scaleOrdinal()
    .domain(["LCD", "LCD (LED)", "OLED", "Plasma", "QLED"])
    .range(["#2196F3", "#4CAF50", "#FF9800", "#E91E63", "#9C27B0"]);

// Filter configurations for screen technology
const filters_screen = [
    { label: "All", id: "all", isActive: true },
    { label: "LCD", id: "LCD", isActive: false },
    { label: "LED", id: "LCD (LED)", isActive: false },
    { label: "OLED", id: "OLED", isActive: false }
];

// Bin generator for histogram (shared so it can be reused when filtering)
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(30);  // Number of bins

console.log("Shared constants loaded");
