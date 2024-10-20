// Popravljen kod animacije zvezdanog neba

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d");

let scale = 1, // device pixel ratio
  width,
  height;

let stars = [];

let pointerX = null,
  pointerY = null;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
    });
  }
}

function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function recycleStar(star) {
  let direction = "z";

  let vx = Math.abs(velocity.x),
    vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    let axis;
    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? "h" : "v";
    } else {
      axis = Math.random() < vy / (vx + vy) ? "v" : "h";
    }

    if (axis === "h") {
      direction = velocity.x > 0 ? "l" : "r";
    } else {
      direction = velocity.y > 0 ? "t" : "b";
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  if (direction === "z") {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else if (direction === "l") {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === "r") {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === "t") {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  } else if (direction === "b") {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }
}

function resize() {
  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);
}

function update() {
  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach((star) => {
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
}

function render() {
  stars.forEach((star) => {
    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.strokeStyle = STAR_COLOR;

    context.moveTo(star.x, star.y);

    var tailX = velocity.x * 2,
      tailY = velocity.y * 2;

    context.lineTo(star.x + tailX, star.y + tailY);

    context.stroke();
  });
}

function movePointer(x, y) {
  if (pointerX !== null && pointerY !== null) {
    let ox = x - pointerX,
      oy = y - pointerY;

    velocity.tx += (ox / 8) * scale * (touchInput ? 1 : -1);
    velocity.ty += (oy / 8) * scale * (touchInput ? 1 : -1);
  }

  pointerX = x;
  pointerY = y;
}

function onMouseMove(event) {
  touchInput = false;
  movePointer(event.clientX, event.clientY);
}

function onTouchMove(event) {
  touchInput = true;
  movePointer(event.touches[0].clientX, event.touches[0].clientY);
  event.preventDefault();
}

function onMouseLeave() {
  pointerX = null;
  pointerY = null;
}


// navbar effect
// Wait for the DOM to load
// document.addEventListener("DOMContentLoaded", function () {
//   // Get all nav-link elements
//   const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

//   // Function to remove the 'active-nav' class from all links
//   function removeActiveClass() {
//       navLinks.forEach(link => {
//           link.classList.remove('active-nav');
//       });
//   }

//   // Add a click event listener to each link
//   navLinks.forEach(link => {
//       link.addEventListener('click', function () {
//           // Remove the 'active-nav' class from all links
//           removeActiveClass();

//           // Add the 'active-nav' class to the clicked link
//           this.classList.add('active-nav');
//       });
//   });

//   // Optionally, you can highlight the active link based on the current URL
//   // This will ensure the correct nav link is highlighted when the page loads
//   const currentPath = window.location.pathname.split("/").pop();
//   navLinks.forEach(link => {
//       if (link.getAttribute('href') === currentPath) {
//           link.classList.add('active-nav');
//       }
//   });
// });
