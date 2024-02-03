// Execute the following code once the DOM content has loaded fully
document.addEventListener("DOMContentLoaded", function () {
    // Define a callback function to handle server responses
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get a reference to the container for displaying messages
        const MessageList = document.getElementById("MessageList");

        // Iterate over each message in the response data
        responseData.forEach((message) => {
            // Create a new div element to display each message
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-2"; // Set the CSS classes for styling
            displayItem.innerHTML = `
                <div class="card1">
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text">
                            Created By: ${message.username} <br>
                            Message_text: ${message.message_text}<br>
                            Created On :${message.created_at}<br>
                        </p>
                        <button class="btn btn-danger delete-message-btn" data-message-id="${message.id}">Delete</button>
                    </div>
                </div>
            `;
            // Append the message display item to the MessageList container
            MessageList.appendChild(displayItem);
        });

        // Create a container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "text-center mt-3"; // Center-align the content
        document.body.appendChild(buttonContainer); // Append the container to the body

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-message-btn");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                // Retrieve the message ID from the data attribute of the clicked button
                const messageId = event.target.dataset.messageId;
                // Call the deleteMessage function to delete the message
                deleteMessage(messageId);
            });
        });
    };

    // Fetch messages from the server and pass the callback function
    fetchMethod(currentUrl + "/api/messages", callback);
});

// Function to delete a message
function deleteMessage(messageId) {
    // Retrieve the token from local storage for authentication
    const token = localStorage.getItem("token");
    // Construct the URL for the DELETE request to delete the message with the given ID
    const url = currentUrl + `/api/admin/deletemessages/${messageId}`;

    // Define a callback function to handle the server response after attempting to delete the message
    const callbackForDelete = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            // If the message is deleted successfully, log a message and show an alert
            console.log("Message deleted successfully.");
            alert("Message deleted successfully.");
            // Redirect the user back to the admin messages HTML page
            window.location.href = "adminmessages.html";
        } else {
            // If deletion fails, log an error message
            console.error("Failed to delete message.");
            // Optionally, handle error cases here
        }
    };

    // Make a DELETE request to delete the message, passing the URL, callback function, request method, and token for authentication
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}
