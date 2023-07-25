// Button click event to navigate to the next page (replace with your desired navigation logic)
const continueBtn = document.getElementById('continueBtn');
continueBtn.addEventListener('click', () => {
  // Replace this with logic to navigate to the next page of the narrative visualization
});
// Get references to the images and audio elements
const messiImage = document.getElementById('messiImage');
const ronaldoImage = document.getElementById('ronaldoImage');
const messiSound = document.getElementById('messiSound');
const ronaldoSound = document.getElementById('ronaldoSound');

// Function to play the sound associated with Messi
function playMessiSound() {
  // Pause the sound if it's already playing to enable multiple clicks
  messiSound.pause();
  messiSound.currentTime = 0; // Reset the sound to the beginning
  messiSound.play(); // Play the sound
}

// Function to play the sound associated with Ronaldo
function playRonaldoSound() {
  // Pause the sound if it's already playing to enable multiple clicks
  ronaldoSound.pause();
  ronaldoSound.currentTime = 0; // Reset the sound to the beginning
  ronaldoSound.play(); // Play the sound
}

// Add click event listeners to the images
messiImage.addEventListener('click', playMessiSound);
ronaldoImage.addEventListener('click', playRonaldoSound);