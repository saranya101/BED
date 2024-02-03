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
    };

    // Fetch messages from the server and pass the callback function
    fetchMethod(currentUrl + "/api/messages", callback);
});
