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

        const config = {
            totalSeats: 500,
            takenSeats: 400,
            joinLink: 'https://adrinolinks.in/XMESl',
            expiryDate: '2025-3-15'
        };

        function updateContent() {
            const progressPercentage = (config.takenSeats / config.totalSeats) * 100;
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = progressPercentage + '%';

            const seatsInfo = document.querySelector('.seats-info');
            seatsInfo.textContent = `${config.takenSeats} seats taken / ${config.totalSeats} total seats`;

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

            const expireDateElement = document.querySelector('.expire-date');
            expireDateElement.textContent = `Expires: ${dayName}, ${formattedDate}`;

            if (progressPercentage >= 90) {
                progressBar.style.background = 'linear-gradient(90deg, #ff4444, #ff0000)';
            } else if (progressPercentage >= 75) {
                progressBar.style.background = 'linear-gradient(90deg, #ffa500, #ff6600)';
            } else {
                progressBar.style.background = 'linear-gradient(90deg, #00c6ff, #0072ff)';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            checkBrowser();
            updateContent();
        });

        function updateSeats(taken) {
            config.takenSeats = taken;
            updateContent();
        }
