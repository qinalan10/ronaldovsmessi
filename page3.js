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
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

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
    .style('fill', 'skyblue')
    .transition()
    .duration(1000) // Transition duration of 1 second
    .attr('y', (d) => yScale(d.goals))
    .attr('height', (d) => height - yScale(d.goals)); // Final height of the bar

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
    .style('fill', 'darkgreen')
    .transition()
    .duration(1000) // Transition duration of 1 second
    .attr('y', (d) => yScale(d.goals))
    .attr('height', (d) => height - yScale(d.goals)); // Final height of the bar

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
}).catch(function (error) {
  console.error('Error loading the data:', error);
});
