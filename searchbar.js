document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('results-container');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Placeholder image URL
    const placeholderImage = "images/placeholder.jpg";

    // Sample anime data with local image URLs
    const animeData = [
        { title: "Naruto", description: "A young ninja strives to be the Hokage in his village.", image: "images/naruto.png" },
        { title: "One Piece", description: "A pirate adventure to find the greatest treasure.", image: "images/one_piece.jpg" },
        { title: "Attack on Titan", description: "Humans fight for survival against giant creatures called Titan.", image: "images/attack_on_titan.jpg" },
        { title: "Noragami", description: "A minor god seeking to gain widespread worship teams up with a human girl he saved to gain fame, recognition and at least one shrine dedicated to him.", image: "images/noragami.jpg" },
        { title: "Demon Slayer", description: "Adventure of a boy who seek revenge for his family against demons.", image: "images/demon_slayer.jpg" }
    ];

    // Filter results based on query
    const results = animeData.filter(anime => anime.title.toLowerCase().includes(query));

    // Sort results: Prioritize titles that start with the query, then sort alphabetically
    results.sort((a, b) => {
        const aStartsWithQuery = a.title.toLowerCase().startsWith(query);
        const bStartsWithQuery = b.title.toLowerCase().startsWith(query);

        if (aStartsWithQuery && !bStartsWithQuery) {
            return -1;
        } else if (!aStartsWithQuery && bStartsWithQuery) {
            return 1;
        } else {
            return a.title.localeCompare(b.title);
        }
    });

    if (results.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.className = 'no-results';
        noResultsMessage.textContent = "No results found.";
        resultsContainer.appendChild(noResultsMessage);
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const img = document.createElement('img');
            img.src = result.image || placeholderImage; // Use the placeholder image if the actual image is missing
            img.alt = result.title;

            const details = document.createElement('div');
            details.className = 'details';

            const title = document.createElement('h3');
            title.textContent = result.title;

            const description = document.createElement('p');
            description.textContent = result.description;

            details.appendChild(title);
            details.appendChild(description);
            resultItem.appendChild(img);
            resultItem.appendChild(details);
            resultsContainer.appendChild(resultItem);
        });
    }
});