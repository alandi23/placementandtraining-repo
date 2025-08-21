
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

// Chatbot functionality
let chatbotOpen = false;
function toggleChatbot() {
  const windowEl = document.getElementById('chatbot-window');
  const toggle = document.querySelector('.chatbot-toggle');
  const icon = document.getElementById('chatbot-icon');
  chatbotOpen = !chatbotOpen;
  if (chatbotOpen) {
    windowEl.classList.add('active');
    toggle.classList.add('active');
    icon.textContent = '✕';
  } else {
    windowEl.classList.remove('active');
    toggle.classList.remove('active');
    icon.textContent = '👩‍🎓';
  }
}

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  if (message) {
    addMessage(message, 'user');
    input.value = '';
    setTimeout(() => {
      const response = getBotResponse(message);
      addMessage(response, 'bot');
    }, 1000);
  }
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
  message = message.toLowerCase();

  const responses = {
    'admission': 'For admissions, please visit our admissions office or check our website.',
    'courses': 'We offer B.Tech programs in Computer Engineering, Electronics & Telecommunication, and Mechanical Engineering.',
    'facilities': 'Our campus features modern classrooms, labs, library, hostel, gym, and sports grounds.',
    'placement': 'Our Training & Placement cell ensures excellent placement opportunities.',
    'hostel': 'We provide well-maintained hostel facilities with Wi-Fi, mess, and recreation areas.'
  };

  // Return matching response or fallback
  return responses[message] || "Sorry, I don't have information on that. Please try asking about admission, courses, facilities, placement, or hostel.";
}

//event calender
const eventsWrapper = document.querySelector('.events-wrapper');
const prevBtn = document.querySelector('.event-nav.prev');
const nextBtn = document.querySelector('.event-nav.next');

if (eventsWrapper && prevBtn && nextBtn) {
  nextBtn.addEventListener('click', () => {
    eventsWrapper.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    eventsWrapper.scrollBy({ left: -300, behavior: 'smooth' });
  });
}

// PDF Modal Logic
const viewBtn = document.querySelector('.view-calendar .btn');
const pdfModal = document.getElementById('pdfModal');
const closeBtn = document.querySelector('.close-btn');

if (viewBtn && pdfModal && closeBtn) {
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    pdfModal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    pdfModal.style.display = 'none';
  });

  // Close modal if user clicks outside the box
  window.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      pdfModal.style.display = 'none';
    }
  });
}

// dept pdf
// ==============================
// PDF Modal Logic (Calendar + Department)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const pdfModal = document.getElementById('pdfModal');
  const pdfFrame = document.getElementById('pdfFrame');
  const closeBtn = document.querySelector('.close-btn');

  // Calendar View Button
  const viewBtn = document.querySelector('.view-calendar .btn');
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pdfFrame.src = "files/calendar.pdf"; // replace with actual path
      pdfModal.style.display = 'block';
    });
  }

  // Department Buttons
  const deptButtons = document.querySelectorAll('.visit-btn');
  deptButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfUrl = btn.getAttribute('data-pdf');
      pdfFrame.src = pdfUrl;
      pdfModal.style.display = 'block';
    });
  });

  // Close Modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      pdfModal.style.display = 'none';
      pdfFrame.src = "";
    });
  }

  // Close if clicked outside modal
  window.addEventListener('click', (e) => {
    if (e.target === pdfModal) {
      pdfModal.style.display = 'none';
      pdfFrame.src = "";
    }
  });
});

// 🔹 Login button click effect
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login-link");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      loginBtn.classList.add("clicked");
      setTimeout(() => {
        loginBtn.classList.remove("clicked");
      }, 300);
    });
  }
});



