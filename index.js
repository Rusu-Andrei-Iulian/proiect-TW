const cards = document.querySelectorAll('.card');
let effect = document.getElementById("effect");
const hero = document.getElementsByClassName('hero')[0];
let images = ["images/Cartoon_Forest_BG_01.png", "images/Cartoon_Forest_BG_02.png"]

setInterval(() => {
    let random = Math.floor(Math.random() * 2)
    hero.style.backgroundImage = "url(" + images[random] + ")";
    hero.style.transition = "background-image 1s"
}, 20000)