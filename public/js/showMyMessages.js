
function deleteMessage(messageId) {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/messages/${messageId}`;

    const callbackForDelete = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Message deleted successfully.");
            window.location.href = "ViewYourMessages.html";
            // Optionally, update the UI or perform any other actions here after deleting the message
        } else {
            console.error("Failed to delete message.");
            // Optionally, handle error cases here
        }
    };

    // Make a DELETE request to delete the message
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}
// Function to handle message editing
const editMessage = (messageId, currentText) => {
    const modal = document.getElementById("editMessageModal");
    const textarea = document.getElementById("editMessageTextarea");
    const form = document.getElementById("editMessageForm");

    // Set the current message text in the textarea
    textarea.value = currentText;

    // Define the callback function for the update request
    const callbackForEdit = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Message updated successfully.");
            alert("Message updated successfully."); // Add an alert message
            
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            window.location.href = "ViewYourMessages.html";
        } else {
            console.error("Failed to update message.");
            // Optionally, handle error cases here
        }
    };

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedText = textarea.value.trim();

        // Check if the updated text is not empty
        if (updatedText !== "") {
            // Construct the URL for the update message endpoint
            const url = currentUrl + `/api/messages/${messageId}`;

            // Make a PUT request to update the message
            const data = { message_text: updatedText };
            fetchMethod(url, callbackForEdit, "PUT", data, localStorage.getItem("token"));
        } else {
            // Show an alert if the updated text is empty
            alert("Please enter a non-empty message.");
        }
    });

    // Show the modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

// Event listener for edit button click
window.editMessage = (messageId, currentText) => {
    editMessage(messageId, currentText);
};


document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Fetch the messages to display
    const callbackForDisplay = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const MessageList = document.getElementById("MessageList");

        responseData.forEach((message) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"></h5>
                        <p class="card-text">
                            Message_text: ${message.message_text}<br>
                            Created On :${message.created_at}<br>
                        </p>
                        <button onclick="deleteMessage(${message.id})" class="btn btn-danger">Delete</button>
                        <button onclick="editMessage(${message.id}, '${message.message_text}')" class="btn btn-primary">Edit</button>
                    </div>
                </div>
            `;
            MessageList.appendChild(displayItem);
        });
    };

    // Fetch the messages to display
    fetchMethod(currentUrl + `/api/messages/${user_id}`, callbackForDisplay, "GET", null, localStorage.getItem("token"));
});
