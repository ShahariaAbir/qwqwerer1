function checkBrowser() {
    const userAgent = navigator.userAgent;
    
    // Check if it's a search engine bot
    const isBot = /Googlebot|bingbot|Baiduspider|DuckDuckBot|YandexBot|Slurp|Sogou|Exabot|facebot|ia_archiver/i.test(userAgent);
    
    if (isBot) {
        // Hide everything from bots
        document.body.innerHTML = '';
        document.body.style.display = 'none';
        return; // Exit function early
    }
    
    const isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFacebookBrowser = /FBAN|FBAV/.test(userAgent);
    const isYoutubeBrowser = /YJApp|UCBrowser/.test(userAgent);
    
    const mainContent = document.getElementById('main-content');
    const browserWarning = document.getElementById('browser-warning');

    // Check if it's a mobile device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isChrome || isEdge) {
        // Continue with Chrome or Edge
        mainContent.style.display = 'block';
        browserWarning.style.display = 'none';
    } else if (isMobile && (isFacebookBrowser || isYoutubeBrowser)) {
        // For Facebook or YouTube in-app browsers on mobile, show a special redirect option
        mainContent.style.display = 'none';
        browserWarning.style.display = 'block';
        browserWarning.innerHTML = `
            <h2>For the best experience, please open in Chrome</h2>
            <p>This application works best in Google Chrome.</p>
            <a href="intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end" 
               class="chrome-button">Open in Chrome</a>
            <p>Or copy this URL and paste it in Chrome:</p>
            <div class="url-box">${window.location.href}</div>
        `;
    } else {
        // For other browsers, show standard warning
        mainContent.style.display = 'none';
        browserWarning.style.display = 'block';
    }
}

const configs = [
    {
        id: 1,
        totalSeats: 500,
        takenSeats: 500,
        joinLink: 'https://adrinolinks.in/c7SXN',
        expiryDate: '2025-5-20'
    },
    {
        id: 2,
        totalSeats: 500,
        takenSeats: 500,
        joinLink: 'https://adrinolinks.in/4Oco0',
        expiryDate: '2025-5-20'
    }
];

function updateContent() {
    // First check if it's a bot - if so, don't update anything
    const userAgent = navigator.userAgent;
    const isBot = /Googlebot|bingbot|Baiduspider|DuckDuckBot|YandexBot|Slurp|Sogou|Exabot|facebot|ia_archiver/i.test(userAgent);
    if (isBot) return;
    
    configs.forEach(config => {
        const progressPercentage = (config.takenSeats / config.totalSeats) * 100;
        const progressBar = document.getElementById(`progress-bar-${config.id}`);
        progressBar.style.width = progressPercentage + '%';

        const seatsInfo = document.getElementById(`seats-info-${config.id}`);
        seatsInfo.textContent = `${config.takenSeats} seats taken / ${config.totalSeats} total seats`;

        const joinButton = document.getElementById(`join-button-${config.id}`);
        const seatsFullNotice = document.getElementById(`seats-full-notice-${config.id}`);
        const seatsAvailable = document.getElementById(`seats-available-${config.id}`);
        const date = new Date(config.expiryDate);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });

        if (config.takenSeats >= config.totalSeats) {
            joinButton.classList.add('disabled');
            joinButton.onclick = (e) => e.preventDefault();
            seatsFullNotice.style.display = 'block';
            seatsFullNotice.textContent = `All seats are currently booked. Please check back on ${dayName}, ${formattedDate} for new openings.`;
            seatsAvailable.style.display = 'none';
        } else {
            joinButton.classList.remove('disabled');
            joinButton.onclick = () => window.location.href = config.joinLink;
            seatsFullNotice.style.display = 'none';
            seatsAvailable.style.display = 'block';
            const remainingSeats = config.totalSeats - config.takenSeats;
            seatsAvailable.textContent = `${remainingSeats} seats still available!`;
        }

        const expireDateElement = document.getElementById(`expire-date-${config.id}`);
        expireDateElement.textContent = `Expires: ${dayName}, ${formattedDate}`;

        if (progressPercentage >= 90) {
            progressBar.style.background = 'linear-gradient(90deg, #ff4444, #ff0000)';
        } else if (progressPercentage >= 75) {
            progressBar.style.background = 'linear-gradient(90deg, #ffa500, #ff6600)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #00c6ff, #0072ff)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkBrowser();
    updateContent();
});

function updateSeats(id, taken) {
    // First check if it's a bot - if so, don't update anything
    const userAgent = navigator.userAgent;
    const isBot = /Googlebot|bingbot|Baiduspider|DuckDuckBot|YandexBot|Slurp|Sogou|Exabot|facebot|ia_archiver/i.test(userAgent);
    if (isBot) return;
    
    const config = configs.find(c => c.id === id);
    if (config) {
        config.takenSeats = taken;
        updateContent();
    }
}
