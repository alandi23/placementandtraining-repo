
   /*  Sidebar Functions */
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}
   
    const DATA = [
      { name:"Aarti Sharma", course:"MS", specialization:"Computer Science", university:"Stanford University", country:"USA", year:2024, email:"aarti@example.com", notes:"Scholarship: 60%" },
      { name:"Priya Verma", course:"MBA", specialization:"Finance", university:"IIM Bangalore", country:"India", year:2023, email:"priya@example.com", notes:"Gold Medalist" },
      { name:"Sneha Patil", course:"PhD", specialization:"AI in Healthcare", university:"University of Cambridge", country:"UK", year:2025, email:"sneha@example.com", notes:"Published 2 papers" },
      { name:"Riya Kulkarni", course:"MS", specialization:"Data Science", university:"TU Munich", country:"Germany", year:2024, email:"riya@example.com", notes:"DAAD Scholar" },
      { name:"Neha Singh", course:"MBA", specialization:"Marketing", university:"Harvard Business School", country:"USA", year:2024, email:"neha@example.com", notes:"Intern @ Fortune 100" },
      { name:"Kavya Nair", course:"MTech", specialization:"Cybersecurity", university:"IIT Bombay", country:"India", year:2023, email:"kavya@example.com", notes:"GATE AIR 112" },
      { name:"Ishita Rao", course:"MPH", specialization:"Public Health Policy", university:"University of Toronto", country:"Canada", year:2025, email:"ishita@example.com", notes:"NGO Fellow" },
      { name:"Pooja Desai", course:"MS", specialization:"Robotics", university:"ETH Zürich", country:"Switzerland", year:2025, email:"pooja@example.com", notes:"Lab TA" }
    ];

    // ====== State & helpers ======
    const $ = (q)=>document.querySelector(q);
    const $$ = (q)=>document.querySelectorAll(q);
    const state = { view:"cards", filters:{ q:"", course:"", year:"", country:"" } };

    // Populate Year & Country filters dynamically
    const years = Array.from(new Set(DATA.map(d=>d.year))).sort();
    const countries = Array.from(new Set(DATA.map(d=>d.country))).sort();
    const yearSel = document.getElementById('year');
    years.forEach(y=>{ const o=document.createElement('option'); o.value=o.textContent=y; yearSel.appendChild(o); });
    const countrySel = document.getElementById('country');
    countries.forEach(c=>{ const o=document.createElement('option'); o.value=o.textContent=c; countrySel.appendChild(o); });

    // Filtering logic
    function applyFilters(){
      let rows = DATA.filter(r=>{
        const q = state.filters.q.toLowerCase();
        const text = `${r.name} ${r.university} ${r.country} ${r.specialization}`.toLowerCase();
        const matchQ = !q || text.includes(q);
        const matchCourse = !state.filters.course || r.course === state.filters.course;
        const matchYear = !state.filters.year || String(r.year) === String(state.filters.year);
        const matchCountry = !state.filters.country || r.country === state.filters.country;
        return matchQ && matchCourse && matchYear && matchCountry;
      });
      render(rows);
    }

    // Renderers
    function render(list){
      // count
      document.getElementById('count').textContent = `${list.length} record${list.length===1?'':'s'}`;

      // Cards
      const grid = document.getElementById('cardsView');
      grid.innerHTML = '';
      list.forEach(item=>{
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML = `
          <h3>${item.name}</h3>
          <div class="tagrow">
            <span class="tag">${item.course}</span>
            <span class="tag">${item.specialization}</span>
            <span class="tag">${item.year}</span>
            <span class="tag">${item.country}</span>
          </div>
          <div class="muted">${item.university}</div>
          <div class="actions">
            <button class="btn" data-name="${item.name}">View</button>
            <button class="btn ghost" onclick="copyLine('${cssEscape(item.name)}|${cssEscape(item.course)}|${cssEscape(item.university)}')">Copy</button>
          </div>
        `;
        el.querySelector('button.btn').addEventListener('click',()=>openModal(item));
        grid.appendChild(el);
      });

      // Table
      const tb = document.getElementById('tbody');
      tb.innerHTML = '';
      list.forEach(r=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${r.name}</td>
          <td>${r.course}</td>
          <td>${r.specialization}</td>
          <td>${r.university}</td>
          <td>${r.country}</td>
          <td>${r.year}</td>
          <td>${r.notes||''}</td>
        `;
        tb.appendChild(tr);
      });

      // View toggle visibility
      document.getElementById('cardsView').style.display = state.view==='cards'? 'grid':'none';
      document.getElementById('tableView').style.display = state.view==='table'? 'block':'none';
    }

    function cssEscape(s){
      return String(s).replace(/['"\\]/g,'').replace(/\n/g,' ');
    }

    // Modal
    const modal = document.getElementById('detailModal');
    function openModal(item){
      document.getElementById('mTitle').textContent = item.name;
      document.getElementById('mBody').innerHTML = `
        <p><strong>Course:</strong> ${item.course} – ${item.specialization}</p>
        <p><strong>University:</strong> ${item.university} (${item.country})</p>
        <p><strong>Year:</strong> ${item.year}</p>
        <p><strong>Email:</strong> <a href="mailto:${item.email}">${item.email}</a></p>
        <p><strong>Notes:</strong> ${item.notes||'-'}</p>
      `;
      modal.showModal();
    }
    document.getElementById('mClose').addEventListener('click',()=>modal.close());
    modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.close(); });

    // Export CSV
    function toCSV(rows){
      const cols = ['name','course','specialization','university','country','year','email','notes'];
      const head = cols.join(',');
      const body = rows.map(r=>cols.map(c=>`"${String(r[c] ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
      return head+'\n'+body;
    }
    document.getElementById('exportCsv').addEventListener('click',()=>{
      // current filtered set
      let rows = [];
      const q = state.filters.q.toLowerCase();
      rows = DATA.filter(r=>{
        const text = `${r.name} ${r.university} ${r.country} ${r.specialization}`.toLowerCase();
        const matchQ = !q || text.includes(q);
        const matchCourse = !state.filters.course || r.course === state.filters.course;
        const matchYear = !state.filters.year || String(r.year) === String(state.filters.year);
        const matchCountry = !state.filters.country || r.country === state.filters.country;
        return matchQ && matchCourse && matchYear && matchCountry;
      });
      const blob = new Blob([toCSV(rows)],{type:'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'higher-studies.csv'; a.click();
      URL.revokeObjectURL(url);
    });

    // Copy helper
    window.copyLine = (text)=>{
      navigator.clipboard.writeText(text).then(()=>{
        const b = document.createElement('div');
        b.textContent = 'Copied!';
        b.style.position='fixed';b.style.bottom='20px';b.style.right='20px';b.style.background='#111';b.style.color='#fff';b.style.padding='8px 10px';b.style.borderRadius='8px';b.style.opacity='0.95';
        document.body.appendChild(b); setTimeout(()=>b.remove(),1200);
      });
    }

    // Wire up filters & view toggle
    document.getElementById('search').addEventListener('input', e=>{ state.filters.q = e.target.value; applyFilters(); });
    document.getElementById('course').addEventListener('change', e=>{ state.filters.course = e.target.value; applyFilters(); });
    document.getElementById('year').addEventListener('change', e=>{ state.filters.year = e.target.value; applyFilters(); });
    document.getElementById('country').addEventListener('change', e=>{ state.filters.country = e.target.value; applyFilters(); });

    document.getElementById('reset').addEventListener('click', ()=>{
      state.filters = { q:"", course:"", year:"", country:"" };
      document.getElementById('search').value='';
      document.getElementById('course').value='';
      document.getElementById('year').value='';
      document.getElementById('country').value='';
      applyFilters();
    });

    document.getElementById('viewCards').addEventListener('click', ()=>{
      state.view='cards';
      document.getElementById('viewCards').classList.add('active');
      document.getElementById('viewTable').classList.remove('active');
      render(applyCurrentGet());
    });
    document.getElementById('viewTable').addEventListener('click', ()=>{
      state.view='table';
      document.getElementById('viewTable').classList.add('active');
      document.getElementById('viewCards').classList.remove('active');
      render(applyCurrentGet());
    });

    function applyCurrentGet(){
      const q = state.filters.q.toLowerCase();
      return DATA.filter(r=>{
        const text = `${r.name} ${r.university} ${r.country} ${r.specialization}`.toLowerCase();
        const matchQ = !q || text.includes(q);
        const matchCourse = !state.filters.course || r.course === state.filters.course;
        const matchYear = !state.filters.year || String(r.year) === String(state.filters.year);
        const matchCountry = !state.filters.country || r.country === state.filters.country;
        return matchQ && matchCourse && matchYear && matchCountry;
      });
    }

    // Init
    document.getElementById('yr').textContent = new Date().getFullYear();
    applyFilters();
  
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