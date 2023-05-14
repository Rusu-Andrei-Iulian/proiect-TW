const cards = document.querySelectorAll('.card');
let effect = document.getElementById("effect");
const hero = document.getElementsByClassName('hero')[0];
let images = ["images/Cartoon_Forest_BG_01.png", "images/Cartoon_Forest_BG_02.png"]

cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (!card.hasAttribute('active')) {
            updateActiveCard(card);
        } else card.removeAttribute('active')
    });
});

function updateActiveCard(activeCard) {
    cards.forEach((card) => {
        if (card === activeCard) {
            card.setAttribute('active', '');
        } else {
            card.removeAttribute('active');
        }
    })
}

function track(e) {
    effect.style.top = e.pageY + "px";
    effect.style.left = e.pageX + "px";
}
addEventListener("mousemove", track, false);

setInterval(() => {
    let random = Math.floor(Math.random() * 2)
    hero.style.backgroundImage = "url(" + images[random] + ")";
    hero.style.transition = "background-image 1s"
}, 20000)