// Company info data
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}


const companyData = {
  tcs: {
    name: "TCS",
    details: "TCS is one of the top IT services companies offering consulting and business solutions globally."
  },
  infosys: {
    name: "Infosys",
    details: "Infosys is a leader in next-generation digital services and consulting."
  },
  amazon: {
    name: "Amazon",
    details: "Amazon is a global leader in e-commerce, cloud computing, and AI-driven technologies."
  }
};

// Show company info modal
function showCompanyInfo(companyKey) {
  const modal = document.getElementById("company-info");
  document.getElementById("company-name").textContent = companyData[companyKey].name;
  document.getElementById("company-details").textContent = companyData[companyKey].details;
  modal.style.display = "flex";
}

// Close company info modal
function closeModal() {
  document.getElementById("company-info").style.display = "none";
}

// Show review modal
function showReview(student, review) {
  const modal = document.getElementById("review-modal");
  document.getElementById("review-student").textContent = student;
  document.getElementById("review-text").textContent = review;
  modal.style.display = "flex";
}

// Close review modal
function closeReview() {
  document.getElementById("review-modal").style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

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

