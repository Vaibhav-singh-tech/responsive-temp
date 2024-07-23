// JavaScript to handle navigation and section display

// Function to show the selected section and hide others
function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('.section');

    // Loop through sections and hide them
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Initial display of home section
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

const blogPosts = [
    {
        title: 'How to Start Blogging',
        content: 'Blogging is a great way to share your thoughts with the world. In this post, we will discuss how to start blogging...',
        tags: ['blogging', 'start', 'guide']
    },
    {
        title: 'Top 10 Blogging Tips',
        content: 'Want to improve your blog? Here are the top 10 tips to help you succeed in the blogging world...',
        tags: ['tips', 'blogging', 'success']
    },
    {
        title: 'SEO for Bloggers',
        content: 'Search Engine Optimization (SEO) is crucial for bloggers. Learn how to optimize your blog for better search engine rankings...',
        tags: ['SEO', 'blogging', 'optimization']
    }
];
function searchBlogs(query) {
    return blogPosts.filter(post => {
        const lowerCaseQuery = query.toLowerCase();
        return post.title.toLowerCase().includes(lowerCaseQuery) ||
               post.content.toLowerCase().includes(lowerCaseQuery) ||
               post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
    });
}


// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    alert(`Search for: ${query}`);
});
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    const results = searchBlogs(query);

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        results.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
            `;

            resultsContainer.appendChild(postElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }

    showSection('search-results'); // Show the search results section
});


// Event listener for the contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    const formData = JSON.stringify({ name, email, message });

    fetch('http://127.0.0.1:5500/index.html#', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Message sent successfully!');
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
