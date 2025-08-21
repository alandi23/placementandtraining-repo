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
let slides = document.querySelectorAll(".slides img");

function showSlides() {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 3000); // Change every 3s
}

function plusSlides(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex += n;
  if (slideIndex > slides.length) { slideIndex = 1 }
  if (slideIndex < 1) { slideIndex = slides.length }
  slides[slideIndex - 1].classList.add("active");
}

showSlides();





// Chart.js script for placement graph
const ctx = document.getElementById('placementChart').getContext('2d');

const placementChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [{
      label: 'Students Placed',
      data: [30, 65, 66, 70], // Dummy Data
      backgroundColor: ['#f9a1bc', '#f8d49d', '#b3d89c', '#a7c7e7'],
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Year-wise Placement Growth (2021 - 2024)',
        font: { size: 18 }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Students' } },
      x: { barPercentage: 0.3, categoryPercentage: 0.5, title: { display: true, text: 'Year' } }
    }
  }
});

// PDF Modal Script
const deptButtons = document.querySelectorAll('.visit-btn');
const pdfFrame = document.getElementById('pdfFrame');
const pdfModal = document.getElementById('pdfModal');
const closeModal = document.getElementById('closeModal');

deptButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const pdfUrl = btn.getAttribute('data-pdf');
    pdfFrame.src = pdfUrl;
    pdfModal.style.display = 'block';
  });
});

closeModal.addEventListener('click', () => {
  pdfModal.style.display = 'none';
  pdfFrame.src = '';
});

window.addEventListener('click', (e) => {
  if (e.target === pdfModal) {
    pdfModal.style.display = 'none';
    pdfFrame.src = '';
  }
});
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

