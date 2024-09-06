const inputBar = document.querySelector('#filter');
const userList = document.querySelector('.user-list');

// The way the Promise is unpacked is quite untidy. Here, I pull out all the data I need and store it in a list for ease of access
const formattedUsersList = [];
getUsers();

inputBar.addEventListener('keyup', (e) => {
    const userInput = e.target.value;
    const userData = document.querySelectorAll('.user-info');
    userData.forEach((user) => {
        if (!user.innerText.includes(userInput)) {
            user.parentElement.classList.add('hide');
        } else {
            user.parentElement.classList.remove('hide');
        }
    });
    console.log(userInput);

    console.log(formattedUsersList);
=======
    let allHidden = true;
    const noResults = document.querySelector('.no-results');
    const userInput = e.target.value;
    const userData = document.querySelectorAll('.user-info');
    userData.forEach((user) => {
        if (!user.innerText.toLowerCase().includes(userInput.toLowerCase())) {
            user.parentElement.classList.add('hide');
        } else {
            user.parentElement.classList.remove('hide');
            allHidden = false;
        }
    });
    if (allHidden) {
        noResults.classList.remove('hide');
    } else {
        noResults.classList.add('hide');
    }
});

async function getUsers() {
    try {
        const data = await fetch('https://randomuser.me/api/?results=30');
        const parsedData = await data.json();
        const usersList = parsedData.results;
        usersList.forEach((user) => {
            const newUser = {
                full_name: user.name.first + ' ' + user.name.last,
                location: user.location.city + ', ' + user.location.country,
                url: user.picture.thumbnail,
            };
            formattedUsersList.push(newUser);
        });

        userList.innerHTML = `<li class="no-results hide">
                    <h3>No Results Found!</h3>
                </li>`;
        populateUsers(formattedUsersList);
    } catch (error) {
        console.log(error);
    }
}

function populateUsers(formattedUsersList) {
    formattedUsersList.forEach((user) => {
        const newUserHTML = `<li>
                            <img src="${user.url}" alt="${user.full_name}">
                            <div class="user-info">
                                <h4>${user.full_name}</h4>
                                <p>${user.location}</p>
                            </div>
                        </li>`;
        userList.innerHTML += newUserHTML;
    });
}
