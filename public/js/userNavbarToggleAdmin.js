document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");
  const adminLoginButton = document.getElementById("adminLoginButton");

  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
      // Token exists, show profile button and hide login, register, and admin login buttons
      console.log("Token exists");
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      adminLoginButton.classList.add("d-none");
  } else {
      // Token does not exist, show login, register, and admin login buttons and hide profile and logout buttons
      console.log("Token does not exist");
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
      adminLoginButton.classList.remove("d-none");
  }

  logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      window.location.href = "index.html";
  });
});
