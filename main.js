
/* ==============================
   Sidebar Functions
============================== */
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}

/* ==============================
   Carousel Functions
============================== */
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function plusSlides(n) {
  slideIndex += n-1;
  showSlides();
}

/* ==============================
   Chatbot Functions
============================== */
// Predefined responses for frontend demo
const responses = {
  "hello": "Hi there! 👩‍🎓 How can I help you with training & placement today?",
  "courses": "We offer Computer, Mechanical, and E&TC Engineering courses. 😊",
  "placements": "Our T&P cell provides excellent support for internships and placements!",
  "training": "We have workshops, coding sessions, and career guidance for students.",
  "default": "Sorry, I am still learning! Try asking about courses, placements, or training."
};

// Send chat message
function sendChat() {
  const inputBox = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");
  const userText = inputBox.value.trim();
  if (!userText) return;

  // Show user message
  chatBody.innerHTML += `<div class="user-msg">${userText}</div>`;

  // Determine bot reply
  let reply = responses["default"];
  for (let key in responses) {
    if (userText.toLowerCase().includes(key)) {
      reply = responses[key];
      break;
    }
  }

  // Show bot message
  chatBody.innerHTML += `<div class="bot-msg">${reply}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
  inputBox.value = "";
}
