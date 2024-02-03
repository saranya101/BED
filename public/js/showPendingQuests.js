document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    // Fetch the quests to display
    const callbackForDisplay = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const QuestList = document.getElementById("QuestList");

        if (responseData.message && responseData.message === "No quests are pending for this user.") {
            // If there are no pending quests, display an alert
            alert("No pending quests for this user.");
        } else {
            responseData.forEach((quest) => {
                const displayItem = document.createElement("div");
                displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${quest.title}</h5>
                            <p class="card-text">
                                Description: ${quest.description}<br>
                                Magic Group Needed: ${quest.magic_group_required}<br>
                                Points Awarded: ${quest.points_awarded}<br>
                            </p>
                            <button onclick="completeQuest('${quest.quest_id}')" class="btn btn-primary">Complete Quest</button>
                            <button onclick="deleteQuest('${quest.quest_id}')" class="btn btn-danger">Delete Quest</button>
                        </div>
                    </div>
                `;
                QuestList.appendChild(displayItem);
            });
        }

        // Add "Add More Quests" button after displaying quests
        const addMoreButton = document.createElement("button");
        addMoreButton.textContent = "Add More Quests";
        addMoreButton.className = "btn btn-primary";
        addMoreButton.addEventListener("click", function() {
            window.location.href = "quests.html"; // Redirect to quests.html page
        });
        QuestList.appendChild(addMoreButton);
    };

    // Function to handle deleting a quest
    window.deleteQuest = (questId) => {
        console.log("Deleting quest with ID:", questId); // Log the questId to check if it's defined
        const url = currentUrl + `/api/quests/deletequest/${questId}`;
        const callbackForDelete = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Quest deleted successfully.");
                alert("Quest deleted successfully."); 
                window.location.href = "pendingquests.html";// Add an alert message

            } else {
                console.error("Failed to delete quest.");
                // Optionally, handle error cases here
            }
        };

        // Make a DELETE request to delete the quest
        fetchMethod(url, callbackForDelete, "DELETE", null, localStorage.getItem("token"));
    };

    // Function to handle updating quest progress
    window.completeQuest = (questId) => {
        console.log("Updating quest progress for ID:", questId); // Log the questId to check if it's defined

        // Construct the URL for the update quest progress endpoint
        const url = currentUrl + `/api/quests/questcompleted/${questId}`;

        // Define the callback function for the update request
        const callbackForUpdate = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Quest progress updated successfully.");
                alert("Quest completed successfully."); // Add an alert message
                window.location.href = "pendingquests.html";
            } else {
                console.error("Failed to update quest progress.");
                // Optionally, handle error cases here
            }
        };

        // Make a PUT request to update the quest progress
        fetchMethod(url, callbackForUpdate, "PUT", null, localStorage.getItem("token"));
    };

    // Fetch the quests to display
    fetchMethod(currentUrl + `/api/quests/pendingquests/${user_id}`, callbackForDisplay, "GET", null, localStorage.getItem("token"));
});
