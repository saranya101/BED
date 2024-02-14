// Execute the following code once the DOM content has loaded fully
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the signup form
  const signupForm = document.getElementById("signupForm");
  // Get references to the warning card and warning text elements for displaying signup errors
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Add an event listener to the signup form for form submission
  signupForm.addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Retrieve user input values from the form
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Perform signup logic
      if (password === confirmPassword) {
          // Passwords match, proceed with signup
          console.log("Signup successful");
          console.log("Username:", username);
          console.log("Email:", email);
          console.log("Password:", password);
          // Hide any previous warning messages
          warningCard.classList.add("d-none");

          // Prepare the data object containing the user information
          const data = {
              username: username,
              email: email,
              password: password,
          };

          // Define a callback function to handle server responses
          const callback = (responseStatus, responseData) => {
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);
              // Check if the server response indicates a successful signup (status code 200)
              if (responseStatus == 200) {
                  // If a token is provided in the response, store it in local storage
                  if (responseData.token) {
                      localStorage.setItem("token", responseData.token);
                      // Retrieve the user ID from the response data and store it in local storage
                      const user_id = responseData.userId; // Assuming the response contains user_id
                      if (user_id) {
                          localStorage.setItem("user_id", user_id);
                          // Log the stored user ID for debugging
                          console.log("user_id stored in local storage:", user_id);
                      }
                      // Redirect the user to their profile page or perform further actions for logged-in user
                      window.location.href = "profile.html";
                  }
              }else if (responseStatus == 409) {
                // If the signup failed due to conflict (status code 409), display an alert indicating that the username or email has been used already
                alert("Username or email has already been used.");
            } else {
                  // If the signup failed, display a warning message to the user
                  
                  warningText.innerText = responseData.message;
              }
          };

          // Send a POST request to the server's register endpoint with the user data
          fetchMethod(currentUrl + "/api/register", callback, "POST", data);

          // Reset the form fields after submission
          signupForm.reset();
      } else {
          // Passwords do not match, display an error message to the user
       
          warningText.innerText = "Passwords do not match";
      }
  });
});
