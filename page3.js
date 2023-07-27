// Load data from the CSV file
d3.csv('data/page2_data.csv', function (d) {
  return {
    playerID: +d.playerID,
    player_name: d.player_name,
    season: +d.season,
    goals: +d.goals,
    assists: +d.assists,
    shots: +d.shots,
    'g+a': +d['g+a'],
  };
}).then(function (data) {
  // Set up chart dimensions
  const margin = { top: 40, right: 30, bottom: 100, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = 750 - margin.top - margin.bottom;

  // Create SVG container for the chart
  const svg = d3
    .select('#goalChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Set up scales for X and Y axes
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.season))
    .range([0, width])
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.goals)])
    .range([height, 0]);

  // Create a tooltip container
  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute') // Set position to absolute for proper positioning
    .style('pointer-events', 'none');

  // Function to show tooltip
  function showTooltip(event, d) {
    tooltip.transition().duration(200).style('opacity', 0.9);
    tooltip.html(`Player: ${d.player_name}<br>Season: ${d.season}<br>Goals: ${d.goals}`)
      .style('left', `${event.pageX + 10}px`) // Position tooltip relative to cursor
      .style('top', `${event.pageY - 10}px`);
  }

  // Function to hide tooltip
  function hideTooltip() {
    tooltip.transition().duration(500).style('opacity', 0);
  }

  // Create and append the bars for Messi's data
  svg.selectAll('.bar-messi')
    .data(data.filter((d) => d.player_name === 'Messi'))
    .enter()
    .append('rect')
    .attr('class', 'bar-messi')
    .attr('x', (d) => xScale(d.season))
    .attr('width', xScale.bandwidth() / 2) // Divide by 2 to separate the bars
    .attr('y', (d) => yScale(0))
    .attr('height', 0)
    .attr('data-year', (d) => d.season) // Add data-year attribute
    .style('fill', 'skyblue')
    .transition()
    .duration(1000) // Transition duration of 1 second
    .attr('y', (d) => yScale(d.goals))
    .attr('height', (d) => height - yScale(d.goals)); // Final height of the bar

  // Add mouseover and mouseout event listeners for the tooltip for Messi's bars
  svg.selectAll('.bar-messi')
    .on('mouseover', function (event, d) { // Updated event signature
      showTooltip(event,d);
    })
    .on('mouseout', function () {
      hideTooltip();
    });

  // Create and append the bars for Ronaldo's data
  svg.selectAll('.bar-ronaldo')
    .data(data.filter((d) => d.player_name === 'Ronaldo'))
    .enter()
    .append('rect')
    .attr('class', 'bar-ronaldo')
    .attr('x', (d) => xScale(d.season) + xScale.bandwidth() / 2) // Shift by half a band width
    .attr('width', xScale.bandwidth() / 2) // Divide by 2 to separate the bars
    .attr('y', (d) => yScale(0))
    .attr('height', 0)
    .attr('data-year', (d) => d.season) 
    .style('fill', 'darkgreen')
    .transition()
    .duration(1000) // Transition duration of 1 second
    .attr('y', (d) => yScale(d.goals))
    .attr('height', (d) => height - yScale(d.goals)); // Final height of the bar

  // Add mouseover and mouseout event listeners for the tooltip for Ronaldo's bars
  svg.selectAll('.bar-ronaldo')
    .on('mouseover', function (event, d) { // Updated event signature
      showTooltip(event,d);
    })
    .on('mouseout', function () {
      hideTooltip();
    });

  // Add X-axis
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y-axis
  svg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(yScale));

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -margin.top / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'chart-title')
    .text('Career Achievements: Total Goals Scored by Season');

  // Add X-axis label
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .text('Season');

  // Add Y-axis label
  svg.append('text')
    .attr('x', -height / 2)
    .attr('y', -margin.left / 1.5)
    .attr('text-anchor', 'middle')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .text('Total Goals Scored');

  // Add the legend
  const legend = svg
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${width - 100}, 0)`); // Position the legend to the right of the chart

  // Messi's legend
  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', 'skyblue');

  legend
    .append('text')
    .attr('x', 20)
    .attr('y', 10)
    .attr('alignment-baseline', 'middle')
    .text('Messi');

  // Ronaldo's legend
  legend
    .append('rect')
    .attr('x', 0)
    .attr('y', 20)
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', 'darkgreen');

  legend
    .append('text')
    .attr('x', 20)
    .attr('y', 30)
    .attr('alignment-baseline', 'middle')
    .text('Ronaldo');


// Define the coordinates of the annotation text and line
const annotationX = xScale(data[0].season) + xScale.bandwidth() / 4;
const annotationY = yScale(data[0].goals) - 30;
const lineStartX = xScale(data[0].season) + xScale.bandwidth() / 2;
const lineStartY = yScale(data[0].goals);
const lineEndX = annotationX + 10; // Adjust line length
const lineEndY = annotationY;

// Append a group element for the annotation
const annotation = svg.append('g').attr('class', 'annotation');

// Append the pointing line
annotation.append('line')
  .attr('x1', lineStartX)
  .attr('y1', lineStartY)
  .attr('x2', lineEndX)
  .attr('y2', lineEndY)
  .attr('stroke', 'black')
  .attr('stroke-width', 2);

// Append the annotation text
annotation.append('text')
  .attr('x', annotationX)
  .attr('y', annotationY)
  .text("Messi won the Ballon d'Or that year despite scoring fewer goals")
  .attr('class', 'annotation-text')
  .attr('text-anchor', 'start'); // Align the text to the left

// Get the bounding box of the annotation text
const textBBox = annotation.select('.annotation-text').node().getBBox();

// Adjust the box size based on the text width
const boxPaddingX = 10; // Padding around the text on the x-axis
const boxWidth = textBBox.width + boxPaddingX * 2;
const boxHeight = textBBox.height + boxPaddingX;

// Calculate the y-position of the box to center it around the text
const boxY = annotationY - boxHeight / 2;

// Add the box around the annotation
annotation.insert('rect', '.annotation-text')
  .attr('x', annotationX - 5)
  .attr('y', boxY - 5) // Use the calculated y-position
  .attr('width', boxWidth)
  .attr('height', boxHeight)
  .attr('rx', 5) // Rounded corner radius
  .attr('ry', 5) // Rounded corner radius
  .style('fill', 'white')
  .style('stroke', 'black')
  .style('stroke-width', 1);
// Define the coordinates of the new annotation text and lines
const annotationX2 = (xScale(2016) + xScale(2017)) / 3; // Place the annotation between the 2016 and 2017 bars
const annotationY2 = annotationY + textBBox.height + 10; // Position the annotation just under the first annotation
const lineStartX2016 = xScale(2016) + xScale.bandwidth() / 2;
const lineStartX2017 = xScale(2017) + xScale.bandwidth() / 2;
const lineStartY2 = annotationY + textBBox.height + 250; // Position the lines just under the first line
const lineEndY2 = annotationY2 + 10;

// Append the new annotation text
annotation.append('text')
  .attr('x', annotationX2)
  .attr('y', annotationY2)
  .text("Ronaldo won the Ballon d'Or these years despite scoring fewer goals")
  .attr('class', 'annotation-text')
  .attr('text-anchor', 'start'); // Align the text to the left

// Get the bounding box of the new annotation text
const textBBox2 = annotation.select('.annotation-text:last-of-type').node().getBBox();

// Adjust the box size based on the text width
const boxPaddingX2 = 10; // Padding around the text on the x-axis
const boxWidth2 = textBBox2.width + boxPaddingX2 * 2;
const boxHeight2 = textBBox2.height + boxPaddingX2;

// Calculate the y-position of the box to center it around the text
const boxY2 = annotationY2 - boxHeight2 / 2;

// Add the box around the new annotation
annotation.insert('rect', '.annotation-text:last-of-type')
  .attr('x', annotationX2 - 5)
  .attr('y', boxY2 - 5) // Use the calculated y-position
  .attr('width', boxWidth2)
  .attr('height', boxHeight2)
  .attr('rx', 5) // Rounded corner radius
  .attr('ry', 5) // Rounded corner radius
  .style('fill', 'white')
  .style('stroke', 'black')
  .style('stroke-width', 1);

// Append the new pointing lines
svg.append('line')
  .attr('x1', lineStartX2016)
  .attr('y1', lineStartY2)
  .attr('x2', lineStartX2016)
  .attr('y2', lineEndY2)
  .attr('stroke', 'black')
  .attr('stroke-width', 2);

svg.append('line')
  .attr('x1', lineStartX2017)
  .attr('y1', lineStartY2)
  .attr('x2', lineStartX2017)
  .attr('y2', lineEndY2)
  .attr('stroke', 'black')
  .attr('stroke-width', 2);

}).catch(function (error) {
  console.error('Error loading the data:', error);
});
