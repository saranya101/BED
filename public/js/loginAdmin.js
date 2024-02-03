document.addEventListener("DOMContentLoaded", function () {
  // Define a callback function to handle the response from the server
  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      // Check the response status
      if (responseStatus == 200) {
          // Check if login was successful
          if (responseData.token) {
              // Store the token in local storage
              localStorage.setItem("token", responseData.token);
              // Redirect to admin profile page
              window.location.href = "adminProfile.html";
          }
      } else {
          // If login failed, show a warning message
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
      }
      
      // Store admin_id in local storage if provided in the response
      const admin_id = responseData.adminId;
      if (admin_id) {
          localStorage.setItem("admin_id", admin_id);
          console.log("admin_id stored in local storage:", admin_id);
      }
  };
  
  // Get references to form elements
  const loginForm = document.getElementById("loginForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  
  // Add event listener for form submission
  loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      
      // Get username and password from form fields
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      
      // Prepare data for login request
      const data = {
          username: username,
          password: password,
      };
      
      // Perform login request using fetchMethod
      fetchMethod(currentUrl + "/api/admin/login", callback, "POST", data);
      
      // Reset the form fields
      loginForm.reset();
  });
});
