class StorageHelper {

    saveToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    getFromLocalStorage(key) {
        return localStorage.getItem(key);
    }

    saveToSessionStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    getFromSessionStorage(key) {
        return sessionStorage.getItem(key);
    }
}
const storageHelper = new StorageHelper();
const entitiesThatAreAlive = JSON.parse(storageHelper.getFromSessionStorage('entitiesThatAreAlive'));

class Entities {
    constructor() {
        this.deadEntities = {
            fireWizardIsDead: entitiesThatAreAlive != null ? entitiesThatAreAlive.fireWizardIsDead : false,
            knightIsDead: entitiesThatAreAlive != null ? entitiesThatAreAlive.knightIsDead : false,
            kunoichiIsDead: entitiesThatAreAlive != null ? entitiesThatAreAlive.kunoichiIsDead : false,
        };
    }

    setFireWizardToDead() {
        this.deadEntities.fireWizardIsDead = true;
    }

    setKnightToDead() {
        this.deadEntities.knightIsDead = true;
    }

    setKunoichiToDead() {
        this.deadEntities.kunoichiIsDead = true;
    }

    getDeadEntities() {
        return this.deadEntities;
    }
}

class User {
    constructor(firstName, lastName, email) {
        this.user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        }
    }

    saveUserToLocalStorage() {
        storageHelper.saveToLocalStorage('user', JSON.stringify(this.user));
    }
}


const entities = new Entities();
const images = ["images/Cartoon_Forest_BG_01.png", "images/Cartoon_Forest_BG_02.png"]
const fire_wizard = $("#fire_wizard");
const kunoichi = $("#kunoichi");
const knight = $("#knight");
const hero = $("#hero");
const kunoichiToolTip = $('.toolTiptextKunoichi')[0];
const wizardToolTip = $('.toolTiptextWizard')[0];
const knightToolTip = $('.toolTiptextKnight')[0];
const userFirstName = $('#firstName')[0];
const userLastName = $('#lastName')[0];
const userEmail = $('#email')[0];
const userFirstName2 = $('#firstName2')[0];
const userLastName2 = $('#lastName2')[0];
const userEmail2 = $('#email2')[0];
const form = $('#form');
const form2 = $('#form2');
const user = JSON.parse(storageHelper.getFromLocalStorage('user'));
const heroFirstName = $('#heroFirstName')[0];
const heroLastName = $('#heroLastName')[0];
const userIsBack = $('#userIsBack')[0];

if (user != null) {
    userIsBack.style.display = 'block'
    heroFirstName.innerText = user.firstName;
    heroLastName.innerText = user.lastName;
}

if (entitiesThatAreAlive != null) {
    if (entitiesThatAreAlive.fireWizardIsDead) {
        fire_wizard.remove();
    }
    if (entitiesThatAreAlive.knightIsDead) {
        knight.remove();
    }
    if (entitiesThatAreAlive.kunoichiIsDead) {
        kunoichi.remove();
    }
}

$(document).ready(() => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            kunoichiToolTip.innerText = response[0].quote;
        }
    };

    xhttp.open("GET", "https://api.api-ninjas.com/v1/quotes?category=beauty", true);
    xhttp.setRequestHeader('X-Api-Key', 'mWP5VUAu2rdAqjI+lkiMVA==OAegqHgbPLYEZU8p')
    xhttp.send();

    const xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp2.responseText);
            wizardToolTip.innerText = response[0].quote;
        }
    };

    xhttp2.open("GET", "https://api.api-ninjas.com/v1/quotes?category=knowledge", true);
    xhttp2.setRequestHeader('X-Api-Key', 'mWP5VUAu2rdAqjI+lkiMVA==OAegqHgbPLYEZU8p')
    xhttp2.send();

    const xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp3.responseText);
            knightToolTip.innerText = response[0].quote;
        }
    };

    xhttp3.open("GET", "https://api.api-ninjas.com/v1/quotes?category=leadership", true);
    xhttp3.setRequestHeader('X-Api-Key', 'mWP5VUAu2rdAqjI+lkiMVA==OAegqHgbPLYEZU8p')
    xhttp3.send();
})

setInterval(() => {
    let random = Math.floor(Math.random() * 2)
    hero.css("backgroundImage", "url(" + images[random] + ")");
    hero.css("transition", "background-image 1s");
}, 20000)



fire_wizard.on("click", () => {
    fire_wizard[0].src = 'images/wizard-dead.gif'
    entities.setFireWizardToDead();
    storageHelper.saveToSessionStorage('entitiesThatAreAlive', JSON.stringify(entities.getDeadEntities()))
    setTimeout(() => {
        fire_wizard.remove();
    }, 1500)
})

knight.on("click", () => {
    knight[0].src = 'images/knight-dead.gif'
    entities.setKnightToDead();
    storageHelper.saveToSessionStorage('entitiesThatAreAlive', JSON.stringify(entities.getDeadEntities()))
    setTimeout(() => {
        knight.remove();
    }, 1500)
})

kunoichi.on("click", () => {
    kunoichi[0].src = 'images/kunoichi-dead.gif'
    entities.setKunoichiToDead();
    storageHelper.saveToSessionStorage('entitiesThatAreAlive', JSON.stringify(entities.getDeadEntities()))
    setTimeout(() => {
        kunoichi.remove();
    }, 1200)
})

form.on("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    if (userFirstName.value === '') {
        $('#firstNameError')[0].innerText = 'Please enter your first name'
        isValid = false;
    }
    if (userLastName.value === '') {
        $('#lastNameError')[0].innerText = 'Please enter your last name'
        isValid = false;
    }

    if (userEmail.value === '') {
        $('#emailError')[0].innerText = 'Please enter your email'
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $('#successMessage')[0].style.display = 'block';
    const user = new User(userFirstName.value, userLastName.value, userEmail.value);
    user.saveUserToLocalStorage();
})

form2.on("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    if (userFirstName2.value === '') {
        $('#firstNameError2')[0].innerText = 'Please enter your first name'
        isValid = false;
    }
    if (userLastName2.value === '') {
        $('#lastNameError2')[0].innerText = 'Please enter your last name'
        isValid = false;
    }

    if (userEmail2.value === '') {
        $('#emailError2')[0].innerText = 'Please enter your email'
        isValid = false;
    }
    if (!isValid) {
        return;
    }
    $('#successMessage2')[0].style.display = 'block';
    const user = new User(userFirstName2.value, userLastName2.value, userEmail2.value);
    user.saveUserToLocalStorage();
})