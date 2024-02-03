// Function to delete a message by its ID
function deleteMessage(messageId) {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem("token");
    // Construct the URL for the delete message endpoint
    const url = currentUrl + `/api/messages/${messageId}`;

    // Define the callback function for the delete request
    const callbackForDelete = (responseStatus, responseData) => {
        // Check if the deletion was successful (200 OK)
        if (responseStatus === 200) {
            console.log("Message deleted successfully.");
            // Redirect to ViewYourMessages.html after successful deletion
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
    // Get the editMessageModal element
    const modal = document.getElementById("editMessageModal");
    // Get the editMessageTextarea element
    const textarea = document.getElementById("editMessageTextarea");
    // Get the editMessageForm element
    const form = document.getElementById("editMessageForm");

    // Set the current message text in the textarea
    textarea.value = currentText;

    // Define the callback function for the update request
    const callbackForEdit = (responseStatus, responseData) => {
        // Check if the update was successful (200 OK)
        if (responseStatus === 200) {
            console.log("Message updated successfully.");
            // Display success message
            alert("Message updated successfully.");
            // Get the modal instance
            const modalInstance = bootstrap.Modal.getInstance(modal);
            // Hide the modal
            modalInstance.hide();
            // Redirect to ViewYourMessages.html after successful update
            window.location.href = "ViewYourMessages.html";
        } else {
            console.error("Failed to update message.");
            // Optionally, handle error cases here
        }
    };

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the updated text from the textarea
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
    // Call the editMessage function with message ID and current text
    editMessage(messageId, currentText);
};

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the URL parameters
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Callback function to handle the response from the API
    const callbackForDisplay = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the container for the message list
        const MessageList = document.getElementById("MessageList");

        // Loop through each message in the response data
        responseData.forEach((message) => {
            // Create a new card element for each message
            const displayItem = document.createElement("div");
            // Set the class for the card element
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
            // Set the HTML content for the card element
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
            // Append the card element to the message list container
            MessageList.appendChild(displayItem);
        });
    };

    // Fetch the messages to display
    fetchMethod(currentUrl + `/api/messages/${user_id}`, callbackForDisplay, "GET", null, localStorage.getItem("token"));
});
