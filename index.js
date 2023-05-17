const cards = document.querySelectorAll('.card');
let images = ["images/Cartoon_Forest_BG_01.png", "images/Cartoon_Forest_BG_02.png"]

addToSessionStorage();
addToLocalStorage();

setInterval(() => {
    let random = Math.floor(Math.random() * 2)
    $("#hero").css("backgroundImage", "url(" + images[random] + ")");
    $("#hero").css("transition", "background-image 1s");
}, 20000)

function addToLocalStorage() {
    const wizard = {
        class: 'wizard',
        magic: 'fire',
        attacks: [{
            name: "fire-ball",
            damage: 29,
            mana: 15,
            efficientAgainst: ['ice'],
            noEffectOn: ['earth']
        }]
    };
    localStorage.setItem('wizardInfo', JSON.stringify(wizard));
}

function addToSessionStorage() {
    const knight = {
        class: 'knight',
        weapon: 'sword',
        attacks: [{
            name: "slash",
            damage: 18,
            mana: 10,
            efficientAgainst: ['humans', 'monsters'],
            noEffectOn: ['ghost']
        }]
    };
    sessionStorage.setItem('knightInfo', JSON.stringify(knight));
}

$(function () {
    const ninja = {
        class: 'ninja',
        weapon: 'shuriken',
        attacks: [{
            name: "throw-shuriken",
            damage: 16,
            mana: 8,
            efficientAgainst: ['humans', 'undergroud-monsters'],
            noEffectOn: ['ghost']
        }]
    }

    document.cookie = 'ninjaInfo=' + JSON.stringify(ninja);
})