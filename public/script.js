// Function to fetch a random joke and display it
function getRandomJoke() {
  fetch('http://localhost:3000/jokebook/random')  // Call the random joke route
    .then(response => response.json())
    .then(data => {
      const jokeText = document.getElementById('random-joke'); // Correct the element ID
      if (data.setup && data.delivery) {
        jokeText.innerHTML = `<h3>${data.setup}</h3><p>${data.delivery}</p>`;
      } else {
        jokeText.innerHTML = 'No jokes available.';
      }
    })
    .catch(error => {
      console.error('Error fetching random joke:', error);
      document.getElementById('random-joke').innerHTML = 'Failed to load joke.';  // Corrected ID
    });
}

document.addEventListener('DOMContentLoaded', function() {
  getRandomJoke();  // This will ensure your function is only called after the page has loaded
  getCategories();   // Call to load categories (if needed)
  document.getElementById('new-joke-form').addEventListener('submit', addJoke);  // Form submit listener
});

  // Fetch all categories and display them as buttons
  async function getCategories() {
    const response = await fetch('http://localhost:3000/jokebook/categories');
    const categories = await response.json();
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('category-button');
      button.textContent = category;
      button.onclick = () => getJokesByCategory(category);
      categoryList.appendChild(button);
    });
  }

  // Fetch jokes by category
  async function getJokesByCategory(category) {
    const response = await fetch(`http://localhost:3000/jokebook/joke/${category}`);
    const jokes = await response.json();
    let jokeListHTML = '';

    jokes.forEach(joke => {
      jokeListHTML += `
        <div class="joke-card">
          <h3>${joke.setup}</h3>
          <p>${joke.delivery}</p>
        </div>
      `;
    });

    document.getElementById('category-list').innerHTML = jokeListHTML;
  }

  // Add a new joke
  async function addJoke(event) {
    event.preventDefault();

    const category = document.getElementById('joke-category').value;
    const setup = document.getElementById('joke-setup').value;
    const delivery = document.getElementById('joke-delivery').value;

    const response = await fetch('http://localhost:3000/jokebook/joke/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: category,
        setup: setup,
        delivery: delivery
      })
    });

    const result = await response.json();
    if (result.error) {
      alert(result.error);
    } else {
      // Refresh the jokes in the selected category
      getJokesByCategory(category);
    }
  }

  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    getRandomJoke();
    getCategories();
    document.getElementById('new-joke-form').addEventListener('submit', addJoke);
  });
