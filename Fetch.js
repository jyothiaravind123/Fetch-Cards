
const cardContainer = document.querySelector(".container-card");
const leftButton = document.createElement('button');
const rightButton = document.createElement('button');

leftButton.textContent = "←";
rightButton.textContent = "→";

document.body.appendChild(leftButton);
document.body.appendChild(rightButton);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(rightButton);
document.body.appendChild(buttonContainer);


let data = "https://jsonplaceholder.typicode.com/users";
let currentIndex = 0;
const cardsPerPage = 3;
let users = [];

// Fetching data and setting up cards
async function fetchingData() {
    try {
        let responseData = await fetch(data);
        users = await responseData.json();
        displayCards();
    } catch (err) {
        console.log(err);
    }
}

// Function to display cards based on current index
function displayCards() {
    cardContainer.innerHTML = '';
    const endIndex = Math.min(currentIndex + cardsPerPage, users.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        // Front card
        const frontCard = document.createElement('div');
        frontCard.classList.add('front-card');

        const userName = document.createElement('div');
        userName.textContent = `Name: ${users[i].name}`;

        const userUsername = document.createElement('div');
        userUsername.textContent = `Username: ${users[i].username}`;

        const userEmail = document.createElement('div');
        userEmail.textContent = `Email: ${users[i].email}`;

        frontCard.appendChild(userName);
        frontCard.appendChild(userUsername);
        frontCard.appendChild(userEmail);

        // Back card
        const backCard = document.createElement('div');
        backCard.classList.add('back-card');

        const streetName = document.createElement('div');
        streetName.textContent = `Street: ${users[i].address.street}`;
        backCard.appendChild(streetName);

        const cityName = document.createElement('div');
        cityName.textContent = `City: ${users[i].address.city}`;
        backCard.appendChild(cityName);


        userCard.appendChild(frontCard);
        userCard.appendChild(backCard);
        cardContainer.appendChild(userCard);

        // Toggle card visibility
        userCard.addEventListener('click', () => {
            frontCard.classList.toggle('hidden');
            backCard.classList.toggle('hidden');
        });
    }
}

// Button event listeners
leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= 1; // Move to the previous card
        displayCards();
    }
});

rightButton.addEventListener('click', () => {
    if (currentIndex + 1 < users.length) {
        currentIndex += 1; // Move to the next card
        displayCards();
    }
});

// Initialize data fetching
fetchingData();
