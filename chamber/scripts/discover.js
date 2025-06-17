document.addEventListener('DOMContentLoaded', () => {
    // --- Footer Logic ---
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    }

    // --- Visitor Message Logic ---
    const messageElement = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisitTimestamp');
    const now = Date.now(); // Current timestamp in milliseconds

    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const timeDifferenceMs = now - lastVisitDate;
        const daysSinceLastVisit = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            messageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    // Store the current visit timestamp for the next visit
    localStorage.setItem('lastVisitTimestamp', now.toString());


    // --- Dynamic Attraction Cards Logic ---
    const attractionCardsContainer = document.getElementById('attraction-cards-container');

    async function getAttractionData() {
        try {
            const response = await fetch('data/attractions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const attractions = await response.json();
            displayAttractions(attractions);
        } catch (error) {
            console.error('Error fetching attractions data:', error);
            attractionCardsContainer.innerHTML = '<p>Failed to load attractions. Please try again later.</p>';
        }
    }

    function displayAttractions(attractions) {
        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('attraction-card');

            const h2 = document.createElement('h2');
            h2.textContent = attraction.name;

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = attraction.image;
            img.alt = attraction.name;
            img.loading = 'lazy'; // Native lazy loading
            img.width = "300"; // Specified width for optimization
            img.height = "200"; // Specified height for optimization

            const figcaption = document.createElement('figcaption');
            figcaption.textContent = attraction.name; // Can be just name or "Photo of " + name

            figure.appendChild(img);
            figure.appendChild(figcaption);

            const address = document.createElement('address');
            address.textContent = attraction.address;

            const p = document.createElement('p');
            p.textContent = attraction.description;

            const learnMoreButton = document.createElement('a');
            learnMoreButton.href = attraction.link;
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.classList.add('learn-more');
            learnMoreButton.target = '_blank'; // Open link in new tab

            card.appendChild(h2);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(p);
            card.appendChild(learnMoreButton);

            attractionCardsContainer.appendChild(card);
        });
    }

    getAttractionData();
});