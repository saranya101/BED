document.addEventListener("DOMContentLoaded", function () {
    // Define acceptQuest function
    const acceptQuest = (quest_id) => {
        const token = localStorage.getItem("token");
        const url = currentUrl + "/api/quests/acceptquest/" + quest_id;
        const callbackForAcceptQuest = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Accepted quest successfully.");
                // Show success message
                alert("Accepted Quest Successfully");
                // Optionally, you can update the UI or perform any other actions here after completing the task
            } else {
                console.error("Failed to accept quest.");

                // Handle specific error cases
                if (responseStatus === 400) {
                    // Handle bad request errors
                    console.error("Bad request: ", responseData.error);
                    setTimeout(() => {
                        alert(responseData.error); // Log after a short delay
                    }, 100);

                } else if (responseStatus === 500) {
                    // Handle internal server errors
                    console.error("Internal server error.");
                    // Show error message
                    alert("Failed to accept quest due to internal server error.");

                } else if (responseStatus === 409) {
                    console.error('User has already accepted this quest')
                    alert("User has already accepted this quest");
                }
                else {
                    // Handle other error cases
                    console.error("Unknown error occurred.");
                    // Show error message
                    alert("Failed to accept quest due to an unknown error.");
                }
            }
        };


        // Make a POST request to mark the task as completed
        fetchMethod(url, callbackForAcceptQuest, "POST", null, token);
    };

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const QuestList = document.getElementById("QuestList");

        // Add a button for available tasks at the top
        const availableTasksButton = document.createElement("div");
        availableTasksButton.className = "col-12 mt-3";
        availableTasksButton.innerHTML = `
            <a href="pendingquests.html" class="btn btn-primary btn-lg btn-block col-12 p3">Pending Quests</a>
        `;
        QuestList.appendChild(availableTasksButton);

        responseData.forEach((quest) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${quest.title}</h5>
                        <p class="card-text">
                            Description: <br>${quest.description}
                        </p>
                        <a href="singleQuestInfo.html?quest_id=${quest.quest_id}" class="btn btn-primary mr-2">View Details</a>
                        <button class="btn btn-success accept-quest-button" data-quest-id="${quest.quest_id}">Accept Quest</button>
                    </div>
                </div>
            `;
            QuestList.appendChild(displayItem);
        });

        // Add event listeners to accept quest buttons
        const acceptQuestButtons = document.querySelectorAll(".accept-quest-button");
        acceptQuestButtons.forEach(button => {
            button.addEventListener("click", function () {
                const questId = this.getAttribute("data-quest-id");
                acceptQuest(questId);
            });
        });
    };

    // Fetch quests data
    fetchMethod(currentUrl + "/api/quests", callback, "GET", null, localStorage.getItem("token"));
});