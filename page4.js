document.addEventListener("DOMContentLoaded", function() {
    // Sample shot data (replace this with your actual shot data)
    const shotData = [
      // Your shot data goes here
    ];
  
    // Set up the SVG containers for the soccer pitch and shot map
    const pitchSVG = d3.select("#soccerPitch").append("svg").attr("id", "pitchBackground").attr("width", 800).attr("height", 600);
    const shotSVG = d3.select("#soccerPitch").append("svg").attr("id", "shotMap").attr("width", 800).attr("height", 600);
  
    // Define scales for x and y positions
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, 800]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);
  
    // Draw the soccer pitch background
    drawSoccerPitch(pitchSVG);
  
    // Plot the shots as circles on the shot map
    shotSVG.selectAll(".shot-marker")
      .data(shotData)
      .enter()
      .append("circle")
      .attr("class", (d) => `shot-marker ${d.shotResult.toLowerCase()}`)
      .attr("cx", (d) => xScale(d.positionX))
      .attr("cy", (d) => yScale(d.positionY))
      .attr("r", 5) // Customize the marker size
      .on("mouseover", (event, d) => {
        // Show tooltip or additional information here (e.g., using d3.select() and .append())
        console.log("Shot by", d.player_name, "Type:", d.shotType, "Result:", d.shotResult);
      });
  
    // Function to draw the soccer pitch background
    function drawSoccerPitch(svg) {
      // Draw the field outline
      svg.append("rect")
        .attr("width", 800)
        .attr("height", 600)
        .attr("fill", "green");
  
      // Draw the halfway line
      svg.append("line")
        .attr("x1", 400)
        .attr("y1", 0)
        .attr("x2", 400)
        .attr("y2", 600)
        .attr("class", "field-line");
  
      // Add other soccer pitch elements as needed...
    }
  });
  