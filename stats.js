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
