document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const MessageList = document.getElementById("MessageList");
        responseData.forEach((message) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 p-2"; 
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
            MessageList.appendChild(displayItem);
        });

        // Create container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "text-center mt-3"; // Center-align the content
        document.body.appendChild(buttonContainer); // Append the container to the body

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-message-btn");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const messageId = event.target.dataset.messageId;
                deleteMessage(messageId);
            });
        });
    };

    fetchMethod(currentUrl + "/api/messages", callback);
});

function deleteMessage(messageId) {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/admin/deletemessages/${messageId}`;

    const callbackForDelete = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Message deleted successfully.");
            // Show alert for successful deletion
            alert("Message deleted successfully.");
            // Redirect back to the admin messages HTML page
            window.location.href = "adminmessages.html";
        } else {
            console.error("Failed to delete message.");
            // Optionally, handle error cases here
        }
    };

    // Make a DELETE request to delete the message
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}
