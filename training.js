// Welcome message effect
document.addEventListener("DOMContentLoaded", () => {
  const welcomeMsg = document.getElementById("welcomeMessage");
  const text = "We warmly welcome you to the Training & Placement Cell. Let's build your future together!";
  let i = 0;

  function typeEffect() {
    if (i < text.length) {
      welcomeMsg.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeEffect, 50);
    }
  }
  typeEffect();
});
