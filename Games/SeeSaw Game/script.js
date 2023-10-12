const leftPlank = document.getElementById("leftPlank");
const rightPlank = document.getElementById("rightPlank");
const gameBall = document.getElementById("gameBall");

let angle = 0;
let direction = 1;

function animate() {
    angle += 1 * direction;
    leftPlank.style.transform = `rotate(${angle}deg)`;
    rightPlank.style.transform = `rotate(-${angle}deg)`;

    if (angle > 30 || angle < -30) {
        direction *= -1;
    }

    requestAnimationFrame(animate);
}

animate();
