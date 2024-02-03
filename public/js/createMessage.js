// Show the modal when "Create Message" button is clicked
const createMessageButton = document.getElementById("createMessageButton");
createMessageButton.addEventListener("click", function () {
    const createMessageModal = new bootstrap.Modal(document.getElementById("createMessageModal"));
    createMessageModal.show();
});
const url = new URL(document.URL);
const urlParams = url.searchParams;
const user_id = urlParams.get("user_id");
// Define the callback function for the POST request
const handleMessageSubmit = (responseStatus, responseData) => {
    if (responseStatus === 201) {
        // Optionally, you can reload the messages board or perform any other actions
        // based on the success of the form submission
        console.log("Message submitted successfully");
        window.location.href = "messages1.html"; 
    } else {
        console.error("Failed to submit message");
    }
};

// Handle form submission
const messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the message text from the form
    const messageText = document.getElementById("messageText").value;

    // Prepare the message data for the POST request
    const postData = {
        message_text: messageText
        // Add any other fields you want to include in the message data
    };

    // Send a POST request to the server with the message data using fetchMethod
    const token = localStorage.getItem("token");
    fetchMethod(currentUrl + `/api/messages/${user_id}`, handleMessageSubmit, "POST", postData, token);

    // Close the modal after form submission
    const createMessageModal = bootstrap.Modal.getInstance(document.getElementById("createMessageModal"));
    createMessageModal.hide();
});
