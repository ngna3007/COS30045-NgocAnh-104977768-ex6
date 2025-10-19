# Exercise 6 - Interactive Visualizations

## Overview
This exercise demonstrates interactive data visualization techniques using D3.js, including filtering and tooltips. Users can explore TV energy consumption data through an interactive histogram with technology filters and a scatterplot with hover tooltips.

## Files Structure
```
Exercise 6/
├── index.html              # Main webpage
├── base.css                # Base styling (layout, buttons)
├── chart.css               # Chart-specific styling
├── shared-constants.js     # Shared variables and configurations
├── load-data.js            # Data loading and initialization
├── histogram.js            # Histogram chart (Exercise 6.1)
├── scatterplot.js          # Scatterplot chart (Exercise 6.2)
├── interactions.js         # Filters and tooltips
├── data/
│   └── Ex6_TVdata.csv      # Clean TV data (4847 records)
└── README.md               # This file
```

## Features

### Exercise 6.1: Interactive Histogram with Filtering
**Visualization**: Energy consumption distribution histogram

**Interactive Elements**:
- **Filter Buttons**: Screen technology filters (All, LCD, LED, OLED)
- **Dynamic Updates**: Histogram redraws with smooth transitions
- **Bin Aggregation**: 30 bins for energy consumption distribution
- **Count Display**: Shows number of TVs in each filtered view

**Implementation**:
- D3 bin generator for histogram creation
- Button state management
- Data filtering by screen technology
- Smooth transitions (enter/update/exit pattern)
- Y-axis rescaling based on filtered data

### Exercise 6.2: Interactive Scatterplot with Tooltips
**Visualization**: Energy consumption vs. Star rating

**Interactive Elements**:
- **Hover Tooltips**: Display screen size and brand on hover
- **Circle Highlighting**: Circles enlarge and highlight on mouseover
- **Color Coding**: Different colors for screen technologies
- **Legend**: Technology type legend

**Implementation**:
- Custom tooltip with SVG rect and text
- Mouse event handlers (mouseenter/mouseleave)
- Intelligent tooltip positioning (stays in bounds)
- Smooth transitions for circle and tooltip
- 2000 sampled data points for performance

## How to Run

### ⚠️ IMPORTANT: Must Use Local Server
File system loading won't work due to CORS. Use one of these methods:

### Method 1: VS Code Live Server (Easiest)
```bash
1. Install "Live Server" extension
2. Right-click index.html
3. Select "Open with Live Server"
```

### Method 2: Python
```bash
cd "Exercise 6"
python -m http.server 8000
# Open http://localhost:8000
```

### Method 3: Node.js
```bash
cd "Exercise 6"
npx http-server -p 8000
```

## How It Works

### File Loading Order (CRITICAL!)
```html
<!-- Must load in this exact order: -->
<script src="shared-constants.js"></script>  <!-- 1. Constants first -->
<script src="histogram.js"></script>         <!-- 2. Chart functions -->
<script src="scatterplot.js"></script>       <!-- 3. Chart functions -->
<script src="interactions.js"></script>      <!-- 4. Interaction functions -->
<script src="load-data.js"></script>         <!-- 5. Load data & call everything -->
```

### Data Flow
1. `load-data.js` loads CSV data
2. Converts strings to numbers, cleans invalid data
3. Calls `drawHistogram(data)` and `drawScatterplot(data)`
4. Calls `populateFilters(data)` to create filter buttons
5. Calls `createTooltip()` and `handleMouseEvents()` for interactivity

### Histogram Filtering Logic
```javascript
1. User clicks filter button (e.g., "LED")
2. Filter button marked as active
3. Data filtered: filter(d => d.screenTech === "LCD (LED)")
4. New bins created with filtered data
5. Y-scale updated for new max value
6. Bars transition to new heights
```

### Tooltip Logic
```javascript
1. Mouse enters circle
2. Get circle position (cx, cy)
3. Get data bound to circle (screen size, brand)
4. Position tooltip near circle (with bounds checking)
5. Show tooltip with fade-in
6. Mouse leaves -> hide tooltip with fade-out
```

## D3 Concepts Demonstrated

### Data Binding & Updates
- `.data()` for binding
- `.join()` with enter/update/exit pattern
- Transitions for smooth updates

### Scales
- `d3.scaleLinear()` for continuous data
- `d3.scaleBand()` for categorical (if needed)
- `d3.scaleOrdinal()` for colors
- `d3.bin()` for histogram binning

### Interactivity
- Event listeners (`.on("click")`, `.on("mouseenter")`)
- Dynamic filtering
- Tooltip creation and positioning
- Button state management

### Shared State
- Global variables for charts and scales
- Separate constants for histogram vs scatterplot
- Bin generator reused for updates

### Transitions
- `.transition().duration(600)` for smoothness
- Coordinated y-axis and bar transitions
- Tooltip fade in/out

## Data Preparation

Data cleaned from main dataset using pandas:
```python
# Convert numeric columns
df['energyConsumption'] = pd.to_numeric(...)
df['star2'] = pd.to_numeric(...)
df['screenSize'] = pd.to_numeric(...)

# Remove invalid/missing data
df_clean = df.dropna()

# Remove outliers (> 1000 kWh is unrealistic)
df_clean = df_clean[df_clean['energyConsumption'] < 1000]
```

Result: 4847 clean TV records

## Design Decisions

### Performance
- **Scatterplot sampling**: 2000 points instead of 4800+ for smooth interactions
- **Bin count**: 30 bins balances detail vs readability
- **Transition duration**: 600ms feels responsive but not jarring

### Usability
- **Filter placement**: Above chart for easy discovery
- **Active state**: Clear visual feedback on selected filter
- **Tooltip positioning**: Intelligently avoids chart edges
- **Color coding**: Distinct colors for technologies

### Code Organization
- **Modular files**: Each chart in separate file
- **Shared constants**: Avoid duplication, enable coordination
- **Separation of concerns**: Data loading separate from visualization

## Common Issues & Solutions

### Issue: "Cannot read data"
**Solution**: Running local server? File path correct?

### Issue: Filters don't work
**Solution**: Check file load order in HTML

### Issue: Tooltip doesn't appear
**Solution**: Ensure `createTooltip()` and `handleMouseEvents()` called after scatterplot drawn

### Issue: Histogram doesn't update
**Solution**: Verify `innerChart` variable is accessible globally

## GitHub Pages Deployment

To deploy on GitHub Pages:
1. Push all files to GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`) and root folder
4. GitHub will provide URL: `https://username.github.io/repo-name/Exercise 6/`

**Note**: Make sure all file paths use relative paths (no absolute paths like `C:/...`)

## GenAI Usage

Created with Claude Code (Anthropic) assistance:
- Interactive filtering implementation
- Tooltip positioning logic
- Enter/update/exit pattern for transitions
- CSS for button states
- Data loading and error handling
- Code modularization strategy
- Documentation and comments

## Key Learnings

1. **Modular Code**: Breaking into multiple files improves maintainability
2. **Shared State**: Global variables enable coordination between charts
3. **Event Handling**: D3's `.on()` method for interactivity
4. **Transitions**: Enter/update/exit pattern for smooth data updates
5. **Performance**: Sampling large datasets for interactive visualizations
6. **Tooltip Patterns**: Standard approach for hover information
7. **Filter Logic**: Managing button states and data filtering

## Browser Compatibility

Requires:
- ES6+ JavaScript
- SVG support
- Modern D3.js v7

Tested on Chrome 120+, Firefox 120+, Edge 120+, Safari 17+

## Credits

- **Student**: Nguyen Ngoc Anh (ID: 104977768)
- **Data Source**: Australian/New Zealand Energy Rating Database
- **D3.js Version**: 7
- **Reference**: Dufour & Meeks (2024) "D3.js in Action" 3rd Edition
- **GenAI Assistant**: Claude Code by Anthropic
