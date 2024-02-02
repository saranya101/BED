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
                    </div>
                </div>
            `;
            MessageList.appendChild(displayItem);
        });

        // Create container for the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "text-center mt-3"; // Center-align the content
        document.body.appendChild(buttonContainer); // Append the container to the body

    };

    fetchMethod(currentUrl + "/api/messages", callback);
});
