// This script executes once the DOM content has loaded fully
document.addEventListener("DOMContentLoaded", function () {
  // Define a callback function to handle server responses
  const callback = (responseStatus, responseData) => {
      // Log the response status and data for debugging
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // Check if the server response indicates a successful login (status code 200)
      if (responseStatus == 200) {
          // If a token is provided in the response, store it in local storage
          if (responseData.token) {
              localStorage.setItem("token", responseData.token);
              // Redirect the user to their profile page
              window.location.href = "profile.html";
          }
      } else {
          // If the login failed, display a warning message to the user
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
      }

      // Retrieve the user ID from the server response
      const user_id = responseData.userId;
      // If a user ID is provided, store it in local storage for future reference
      if (user_id) {
          localStorage.setItem("user_id", user_id);
          // Log the stored user ID for debugging
          console.log("user_id stored in local storage:", user_id);
      }
  };

  // Get a reference to the login form
  const loginForm = document.getElementById("loginForm");

  // Get references to the warning card and warning text elements for displaying login errors
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Add an event listener to the login form for form submission
  loginForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the username and password entered by the user
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Prepare the data object containing the username and password
      const data = {
          username: username,
          password: password,
      };

      // Send a POST request to the server's login endpoint with the user credentials
      fetchMethod(currentUrl + "/api/login", callback, "POST", data);

      // Reset the form fields after submission
      loginForm.reset();
  });
});
