// Function to delete a user by their ID
function deleteUser(userId) {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem("token");
    // Construct the URL for the delete user endpoint
    const url = currentUrl + `/api/admin/deleteuser/${userId}`;

    // Define the callback function for the delete request
    const callbackForDelete = (responseStatus, responseData) => {
        // Check if the deletion was successful (204 No Content)
        if (responseStatus === 204) {
            console.log("User deleted successfully.");
            // Display success message
            alert("User deleted successfully.");
            // Redirect to the users.html page
            window.location.href = "users.html";
        } else {
            console.error("Failed to delete user.");
            // Display error message
            alert("Failed to delete user.");
            // Optionally, handle error cases here
        }
    };

    // Make a DELETE request to delete the user
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Callback function to handle the response from the API
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the container for the user list
        const UserList = document.getElementById("UserList");

        // Loop through each user in the response data
        responseData.forEach((user) => {
            // Create a new card element for each user
            const displayItem = document.createElement("div");
            // Set the class for the card element
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
            // Set the HTML content for the card element
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.username}</h5>
                        <p class="card-text">
                            Id: ${user.user_id} <br>
                            Email: ${user.email}<br>
                            Total Points: ${user.total_points} <br>
                        </p>
                        <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary mr-2">View Details</a>
                        <button class="btn btn-danger delete-user" data-user-id="${user.user_id}">Delete</button>
                    </div>
                </div>
            `;
            // Append the card element to the user list container
            UserList.appendChild(displayItem);
        });

        // Add event listeners to delete buttons for each user
        const deleteButtons = document.querySelectorAll(".delete-user");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                // Get the user ID from the button's data attribute
                const userId = event.target.dataset.userId;
                // Call the deleteUser function with the user ID
                deleteUser(userId);
            });
        });
    };

    // Fetch all users data from the API
    fetchMethod(currentUrl + "/api/admin/allusers", callback);
});
