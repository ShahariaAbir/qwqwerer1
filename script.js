function checkBrowser() {
        const userAgent = navigator.userAgent;
        const isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent);
        const isEdge = /Edg/.test(userAgent);
        
        const mainContent = document.getElementById('main-content');
        const browserWarning = document.getElementById('browser-warning');

        if (isChrome || isEdge) {
            mainContent.style.display = 'block';
            browserWarning.style.display = 'none';
        } else {
            mainContent.style.display = 'none';
            browserWarning.style.display = 'block';
        }
    }

    const configs = [
        {
            id: 1,
            totalSeats: 500,
            takenSeats: 142,
            joinLink: 'https://adrinolinks.in/N0jeg',
            expiryDate: '2025-4-10'
        },
        {
            id: 2,
            totalSeats: 500,
            takenSeats: 121,
            joinLink: 'https://adrinolinks.in/ZvhKp',
            expiryDate: '2025-4-10'
        }
    ];

    function updateContent() {
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
        const config = configs.find(c => c.id === id);
        if (config) {
            config.takenSeats = taken;
            updateContent();
        }
    }
