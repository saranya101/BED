// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the user ID from the URL parameters
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Callback function to display user information
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the element to display user information
        const UserInfo = document.getElementById("UserInfo");

        if (responseStatus == 404) {
            // Display message if user is not found
            UserInfo.innerHTML = `${responseData.message}`;
            return;
        }

        // Display user information
        UserInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        User ID: ${responseData.user.user_id} <br>
                        Username: ${responseData.user.username} <br>
                        Email: ${responseData.user.email} <br>
                        Total Points: ${responseData.user.total_points} <br>
                    </p>
                </div>
            </div>
        `;
    };

    // Fetch user information
    fetchMethod(currentUrl + `/api/admin/oneuser/${user_id}`, callbackForUserInfo);
});
