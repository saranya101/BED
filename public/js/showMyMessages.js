
function deleteMessage(messageId) {
    const token = localStorage.getItem("token");
    const url = currentUrl + `/api/messages/${messageId}`;

    const callbackForDelete = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Message deleted successfully.");
            window.location.href = "messages1.html";
            // Optionally, update the UI or perform any other actions here after deleting the message
        } else {
            console.error("Failed to delete message.");
            // Optionally, handle error cases here
        }
    };
    const updateMessageButton = (messageId) => {
        const textareaId = `editMessageText_${messageId}`;
        const updatedText = document.getElementById(textareaId).value;
        editMessage(messageId, updatedText);
    };

    // Make a DELETE request to delete the message
    fetchMethod(url, callbackForDelete, "DELETE", null, token);
}
// Function to handle update message button click
const updateMessageButton = (messageId) => {
    const textareaId = `editMessageText_${messageId}`;
    const updatedText = document.getElementById(textareaId).value;
    editMessage(messageId, updatedText);
};


    // Function to handle message editing
    const editMessage = (messageId, updatedText) => {
        const token = localStorage.getItem("token");
        const url = currentUrl + `/api/messages/${messageId}`;

        const data = {
            message_text: updatedText
        };

        const callbackForEdit = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Message updated successfully.");
                window.location.href = "messages1.html";
                // Optionally, update the UI or perform any other actions here after updating the message
            } else {
                console.error("Failed to update message.");
                // Optionally, handle error cases here
            }
        };

        // Make a PUT request to update the message
        fetchMethod(url, callbackForEdit, "PUT", data, token);
    };
document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");
    const createMessageForm = document.getElementById("createMessageForm");

    // Function to handle message deletion
 

    // Event listener for message creation form submission
    createMessageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const messageText = document.getElementById("message_text").value;

        // Perform message creation logic
        if (messageText.trim() !== "") {
            // Proceed with message creation
            console.log("Message creation successful");
            console.log("Message text:", messageText);

            const data = {
                message_text: messageText
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseData.token) {
                    localStorage.getItem("token", responseData.token);
                }
                if (responseStatus === 201) {
                    // Check if message creation was successful
                    console.log("Message created successfully");

                    // Redirect or perform further actions
                    window.location.href = "messages1.html";
                }

            };

            // Perform message creation request
            fetchMethod(currentUrl + `/api/messages/${user_id}`, callback, "POST", data, localStorage.getItem("token"));

            // Reset the form field
            createMessageForm.reset();
        }
    });



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
                        <textarea id="editMessageText_${message.id}" rows="3" class="form-control mt-3" placeholder="Enter updated message text"></textarea>
                        <button onclick="updateMessageButton(${message.id})" class="btn btn-primary mt-3">Update Message</button>
                    </div>
                </div>
            `;
            MessageList.appendChild(displayItem);
        });
    };

    // Fetch the messages to display
    fetchMethod(currentUrl + `/api/messages/${user_id}`, callbackForDisplay, "GET", null, localStorage.getItem("token"));
});
