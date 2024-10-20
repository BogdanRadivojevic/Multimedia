// Primer 1: Crtanje kruga
function drawCircle() {
    var canvas = document.getElementById('circleCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Očisti canvas
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
}
// Primer 2: Animacija kvadrata sa odbijanjem
var squareX = 0;  // Pozicija kvadrata
var squareSpeed = 2;  // Početna brzina kretanja kvadrata
var canvasWidth = 300;  // Širina canvas-a
var squareDirection = 1;  // 1 za desno, -1 za levo
var clickCount = 0;  // Brojač klikova
var animationRunning = false;  // Proverava da li je animacija u toku

function animateSquare() {
    clickCount++;

    // Povećaj brzinu svakog klika
    if (clickCount <= 3) {
        squareSpeed += 2;  // Povećaj brzinu za 2
    }

    // Ako je brojač klikova dostigao 3, zaustavi animaciju
    if (clickCount === 3) {
        animationRunning = false;
        squareSpeed = 0;  // Zaustavi kvadrat
        // alert("Kvadrat je zaustavljen!"); // Poruka korisniku
        clickCount = 0; // Resetuj brojač klikova
        return; // Izađi iz funkcije
    }

    // Pokreni animaciju ako nije već u toku
    if (!animationRunning) {
        animationRunning = true; // Označi da je animacija pokrenuta
        draw(); // Pokreni crtačku funkciju
    }
}

function draw() {
    var canvas = document.getElementById('squareCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Očisti canvas
    ctx.fillStyle = 'red';
    ctx.fillRect(squareX, 100, 50, 50); // Nacrtaj kvadrat

    // Promeni poziciju kvadrata
    squareX += squareSpeed * squareDirection;

    // Proveri da li je kvadrat udario u ivicu
    if (squareX + 50 > canvasWidth || squareX < 0) {
        squareDirection *= -1; // Promeni smer
    }

    if (squareSpeed > 0) {
        requestAnimationFrame(draw); // Nastavi animaciju ako je brzina veća od 0
    }
}

// Primer 3: Promena boje
function changeColor() {
    var canvas = document.getElementById('colorCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = getRandomColor();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
