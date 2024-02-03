document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
        // Check if login was successful
        if (responseData.token) {
          // Store the token in local storage
          localStorage.setItem("token", responseData.token);
          // Redirect or perform further actions for logged-in user
          window.location.href = "adminProfile.html";
        }
      } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
      const admin_id = responseData.adminId; // Assuming the response contains user_id
      if (admin_id) {
        localStorage.setItem("admin_id", admin_id);
        console.log("user_id stored in local storage:", admin_id);
      }
    };
  
    const loginForm = document.getElementById("loginForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    loginForm.addEventListener("submit", function (event) {
      console.log("loginForm.addEventListener");
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const data = {
        username: username,
        password: password,
      };
      // Perform login request
      fetchMethod(currentUrl + "/api/admin/login", callback, "POST", data);
  
      // Reset the form fields
      loginForm.reset();
    });
  });