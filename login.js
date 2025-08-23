document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // ✅ Valid credentials
  const validEmail = "swatirao@cumminscollege.edu.in";
  const validPassword = "login@1234";

  if (email.toLowerCase() === validEmail.toLowerCase() && password === validPassword) {
    message.style.color = "green";
    message.textContent = "Login Successful ✅";

    // Redirect after 1 second
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "Invalid email or password ❌";
  }
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Form reload stop karega

  // Direct redirect to info.html
  window.location.href = "profile.html";
});
