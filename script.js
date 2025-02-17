// script.js
// Configuration Object - EDIT THESE VALUES AS NEEDED
const config = {
    // Team capacity settings
    totalSeats: 500,
    takenSeats: 156,
    
    // Join link
    joinLink: 'https://arolinks.com/eKt',
    
    // Expiry date (YYYY-MM-DD format)
    expiryDate: '2025-2-20'
};

// Update all dynamic content
function updateContent() {
    // Update progress bar
    const progressPercentage = (config.takenSeats / config.totalSeats) * 100;
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = progressPercentage + '%';

    // Update seats info
    const seatsInfo = document.querySelector('.seats-info');
    seatsInfo.textContent = `${config.takenSeats} seats taken / ${config.totalSeats} total seats`;

    // Get elements
    const joinButton = document.querySelector('.join-button');
    const seatsFullNotice = document.querySelector('.seats-full-notice');
    const seatsAvailable = document.querySelector('.seats-available');
    const date = new Date(config.expiryDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // Check if seats are full
    if (config.takenSeats >= config.totalSeats) {
        // Disable join button
        joinButton.classList.add('disabled');
        joinButton.onclick = (e) => e.preventDefault();
        
        // Show fully booked notice
        seatsFullNotice.style.display = 'block';
        seatsFullNotice.textContent = `All seats are currently booked. Please check back on ${dayName}, ${formattedDate} for new openings.`;
        
        // Hide available notice
        seatsAvailable.style.display = 'none';
    } else {
        // Enable join button
        joinButton.classList.remove('disabled');
        joinButton.onclick = () => window.location.href = config.joinLink;
        
        // Hide fully booked notice
        seatsFullNotice.style.display = 'none';
        
        // Show available notice
        seatsAvailable.style.display = 'block';
        const remainingSeats = config.totalSeats - config.takenSeats;
        seatsAvailable.textContent = `${remainingSeats} seats still available!`;
    }

    // Update expiry date
    const expireDateElement = document.querySelector('.expire-date');
    expireDateElement.textContent = `Expires: ${dayName}, ${formattedDate}`;

    // Update the color of the progress bar based on capacity
    if (progressPercentage >= 90) {
        progressBar.style.background = 'linear-gradient(90deg, #ff4444, #ff0000)';
    } else if (progressPercentage >= 75) {
        progressBar.style.background = 'linear-gradient(90deg, #ffa500, #ff6600)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #00c6ff, #0072ff)';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', updateContent);

// Function to simulate updating seats (for testing)
function updateSeats(taken) {
    config.takenSeats = taken;
    updateContent();
}
