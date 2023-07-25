// Sample data for achievements
const messiAchievements = [
    "La Liga Winner (2015, 2016, 2018)",
    "Copa del Rey Winner (2015, 2016, 2018)",
    "Champions League Winner (2015)",
    "FIFA Club World Cup Winner (2015)",
    "UEFA Super Cup Winner (2015)",
    "Ballon d'Or Winner (2015, 2019)",
    "Golden Boot Winner (2016, 2017, 2018)",

    // Add more achievements for Messi here...
  ];
  
  const ronaldoAchievements = [
    "La Liga Winner (2017, 2020)",
    "Copa del Rey Winner (2019)",
    "Champions League Winner (2016, 2017, 2018, 2020)",
    "FIFA Club World Cup Winner (2014, 2016, 2017, 2018)",
    "UEFA Super Cup Winner (2014, 2017)",
    "Ballon d'Or Winner (2016, 2017)",
    // Add more achievements for Ronaldo here...
  ];
  
  // Function to create and populate the achievements list for a player
  function createAchievementsList(playerId, achievements) {
    const list = document.getElementById(`${playerId}-achievements`);
    achievements.forEach((achievement) => {
      const listItem = document.createElement("li");
      listItem.textContent = achievement;
      list.appendChild(listItem);
    });
  }
  
  // Populate Messi's achievements
  createAchievementsList("messi", messiAchievements);
  
  // Populate Ronaldo's achievements
  createAchievementsList("ronaldo", ronaldoAchievements);
  // Apply fade-in animation to the content of page 3
document.addEventListener('DOMContentLoaded', function() {
  const page3Content = document.getElementById('page3');
  page3Content.classList.add('fade-in');
});
