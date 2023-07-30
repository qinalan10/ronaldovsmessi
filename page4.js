// Load data from the CSV file
d3.csv('data/ronaldo_messi_shots.csv', function (d) {
    // Data preprocessing and parsing (if needed)
    return {
      gameID: +d.gameID,
      playerID: +d.playerID,
      player_name: d.player_name,
      team: d.team,
      goals: +d.goals,
      shots: +d.shots,
      xGoals: +d.xGoals,
      xGoalsChain: +d.xGoalsChain,
      xGoalsBuildup: +d.xGoalsBuildup,
      assists: +d.assists,
      keyPasses: +d.keyPasses,
      xAssists: +d.xAssists,
      leagueID: +d.leagueID,
      season: +d.season,
      situation: d.situation,
      shotType: d.shotType,
      shotResult: d.shotResult,
      xGoal: +d.xGoal,
      positionX: +d.positionX,
      positionY: +d.positionY,
    };
  }).then(function (data) {
    // Create the soccer pitch SVG
    const fieldWidth = 1150;
    const fieldHeight = 740;
  
    const svg = d3.select('#pitch')
      .append('svg')
      .attr('width', fieldWidth)
      .attr('height', fieldHeight)
      .style('background-color', '#f0f0f0');
  
    // Draw the soccer field
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', fieldWidth)
      .attr('height', fieldHeight)
      .style('fill', 'green');
  
    // Draw the center circle
    svg.append('circle')
      .attr('cx', fieldWidth / 2)
      .attr('cy', fieldHeight / 2)
      .attr('r', 50)
      .style('fill', 'none')
      .style('stroke', 'white')
      .style('stroke-width', 2);
      const fieldLengthMeters = 100;
      const fieldWidthMeters = 64;
      
      // Convert meters to pixels based on the visualization dimensions
      const metersToPixelsX = fieldWidth / fieldWidthMeters;
      const metersToPixelsY = fieldHeight / fieldLengthMeters;
      

      // Draw the 6-yard box
      const sixYardBoxWidthMeters = 7; // 5.5
      const sixYardBoxLengthMeters = 7; //18.3
      const sixYardBoxWidth = sixYardBoxWidthMeters * metersToPixelsY; // Swap width and height for the rotated pitch
      const sixYardBoxHeight = sixYardBoxLengthMeters * metersToPixelsX;
      const sixYardBoxY = (fieldHeight - sixYardBoxHeight) / 2;
      svg.append('rect')
        .attr('x', 0) // Left 6-yard box
        .attr('y', sixYardBoxY)
        .attr('width', sixYardBoxWidth)
        .attr('height', sixYardBoxHeight)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 2);
      svg.append('rect')
        .attr('x', fieldWidth - sixYardBoxWidth) // Right 6-yard box
        .attr('y', sixYardBoxY)
        .attr('width', sixYardBoxWidth)
        .attr('height', sixYardBoxHeight)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 2);
      
      // Draw the 18-yard box
      const eighteenYardBoxWidthMeters = 25; // 16.5
      const eighteenYardBoxLengthMeters = 20.5; //40.3
      const eighteenYardBoxWidth = eighteenYardBoxWidthMeters * metersToPixelsY; // Swap width and height for the rotated pitch
      const eighteenYardBoxHeight = eighteenYardBoxLengthMeters * metersToPixelsX;
      const eighteenYardBoxY = (fieldHeight - eighteenYardBoxHeight) / 2;
      svg.append('rect')
        .attr('x', 0) // Left 18-yard box
        .attr('y', eighteenYardBoxY)
        .attr('width', eighteenYardBoxWidth)
        .attr('height', eighteenYardBoxHeight)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 2);
      svg.append('rect')
        .attr('x', fieldWidth - eighteenYardBoxWidth) // Right 18-yard box
        .attr('y', eighteenYardBoxY)
        .attr('width', eighteenYardBoxWidth)
        .attr('height', eighteenYardBoxHeight)
        .style('fill', 'none')
        .style('stroke', 'white')
        .style('stroke-width', 2);
    // Create a group for the shots
    const shotsGroup = svg.append('g')
      .attr('class', 'shots-group');
    const defaultFilters = {
        shotType: 'all',
        playerName: 'all',
        season: 'all'//,
        //situation: 'all'
    };
    
    // Function to update the visualization based on the selected filters
    function updateVisualization(selectedFilters) {
      // Filter the data based on the selected shot type
        const selectedShotType = selectedFilters.shotType;
        const selectedPlayerName = selectedFilters.playerName;
        const selectedSeason = selectedFilters.season; // Do not parse the season to an integer
        // const selectedSituation = selectedFilters.situation;

        const filteredData = data.filter(d => {
            return (
            (selectedShotType === 'all' || d.situation === selectedShotType) &&
            (selectedPlayerName === 'all' || d.player_name === selectedPlayerName) &&
            (selectedSeason === 'all' || d.season === parseInt(selectedSeason)) //&& // Parse only when comparing
            // (selectedSituation === 'all' || d.shotResult === selectedSituation)
            );
        });
      // DATA JOIN
      const shots = shotsGroup.selectAll('circle')
        .data(filteredData, d => d.gameID); // Use a unique key function, e.g., gameID
        console.log(filteredData)
      // ENTER selection (for new elements)
      // ENTER selection (for new elements)
      shots.enter()
      .append('circle')
      .attr('r', 3)
      .attr('opacity', 0.8)
      .attr('class', d => (d.player_name === 'Messi') ? 'messi-circle' : 'ronaldo-circle')
      .attr('cx', d => d.positionX * fieldWidth)
      .attr('cy', d => d.positionY * fieldHeight)
      .merge(shots) // Combine enter and existing elements
      .attr('cx', d => d.positionX * fieldWidth)
      .attr('cy', d => d.positionY * fieldHeight)
      .attr('class', d => (d.player_name === 'Messi') ? 'messi-circle' : 'ronaldo-circle');

        const messiData = filteredData.filter(d => d.player_name === 'Messi');
        const messiShots = messiData.length;
        const messiGoals = messiData.filter(d => d.shotResult === 'Goal').length;

        // Calculate the number of shots and goals for Ronaldo
        const ronaldoData = filteredData.filter(d => d.player_name === 'Ronaldo');
        const ronaldoShots = ronaldoData.length;
        const ronaldoGoals = ronaldoData.filter(d => d.shotResult === 'Goal').length;

        // Update Messi's legend
        const messiLegend = document.getElementById('messiLegend');
        messiLegend.innerHTML = `<span style="color: skyblue;">Messi <br> shots: ${messiShots}  <br> goals: ${messiGoals} `;

        // Update Ronaldo's legend
        const ronaldoLegend = document.getElementById('ronaldoLegend');
        ronaldoLegend.innerHTML = `<span style="color: red;">Ronaldo <br> shots: ${ronaldoShots} <br> goals: ${ronaldoGoals} `;
      // EXIT selection (for elements that are not in the filtered data)
      shots.exit().remove();
    }

    // Get the filters' values (e.g., shot type, shot result) and call updateVisualization()
    function handleFilterChange() {
        const selectedFilters = {
          shotType: document.getElementById('shotTypeSelect').value,
          playerName: document.getElementById('playerNameSelect').value,
          season: document.getElementById('seasonSelect').value,
        //   shotResult: document.getElementById('siutationSelect').value,
        };
        console.log('Selected Filters:', selectedFilters);
        updateVisualization(selectedFilters);
      }
    
      // Add event listener to the filter dropdowns to trigger handleFilterChange()
      document.getElementById('shotTypeSelect').addEventListener('change', handleFilterChange);
      document.getElementById('playerNameSelect').addEventListener('change', handleFilterChange);
      document.getElementById('seasonSelect').addEventListener('change', handleFilterChange);
    //   document.getElementById('siutationSelect').addEventListener('change', handleFilterChange);
    
      // Initial call to updateVisualization() to show the visualization with the default filter values
      updateVisualization(defaultFilters);
  }).catch(function (error) {
    console.error('Error loading the data:', error);
  });
