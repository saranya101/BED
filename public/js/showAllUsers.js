function deleteUser(userId) {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/admin/deleteuser/${userId}`;

    const callbackForDelete = (responseStatus, responseData) => {
        if (responseStatus === 204) {
            console.log("User deleted successfully.");
            alert("User deleted successfully.");
            // Redirect to users.html
            window.location.href = "users.html";
        } else {
            console.error("Failed to delete user.");
            alert("Failed to delete user.");
            // Optionally, handle error cases here
        }
    };

    // Make a DELETE request to delete the user
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}


document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const UserList = document.getElementById("UserList");
        responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
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
            UserList.appendChild(displayItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-user");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const userId = event.target.dataset.userId;
                deleteUser(userId);
            });
        });
    };

    fetchMethod(currentUrl + "/api/admin/allusers", callback);
});
