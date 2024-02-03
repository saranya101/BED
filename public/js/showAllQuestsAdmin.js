const editQuest = (questId) => {
    const modal = document.getElementById("editQuestModal");
    const titleInput = document.getElementById("editQuestTitle");
    const descriptionInput = document.getElementById("editQuestDescription");
    const pointsAwardedInput = document.getElementById("editQuestPointsAwarded");
    const magicGroupRequiredInput = document.getElementById("editQuestMagicGroupRequired");
    const form = document.getElementById("editQuestForm");

    const currentData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        points_awarded: pointsAwardedInput.value.trim(),
        magic_group_required: magicGroupRequiredInput.value.trim()
    };

    const callbackForEdit = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Quest updated successfully.");
            alert("Quest updated successfully."); // Add an alert message
            
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.hide();
            window.location.reload(); // Reload the page to reflect changes
        } else {
            console.error("Failed to update quest.");
            // Optionally, handle error cases here
        }
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedData = {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            points_awarded: pointsAwardedInput.value.trim(),
            magic_group_required: magicGroupRequiredInput.value.trim()
        };

        if (Object.values(updatedData).some(value => value === "")) {
            alert("Please fill out all fields.");
        } else {
            const url = `${currentUrl}/api/admin/updatequest/${questId}`;
            fetchMethod(url, callbackForEdit, "PUT", updatedData, localStorage.getItem("token"));
        }
    });

    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

const deleteQuest = (questId) => {
    if (confirm("Are you sure you want to delete this quest?")) {
        const url = `${currentUrl}/api/admin/deletequest/${questId}`;

        const callbackForDelete = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Quest deleted successfully.");
                alert("Quest deleted successfully."); 
                window.location.reload(); // Reload the page to reflect changes
            } else {
                console.error("Failed to delete quest.");
            }
        };

        fetchMethod(url, callbackForDelete, "DELETE", null, localStorage.getItem("token"));
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const QuestList = document.getElementById("QuestList");
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
                        <p class="card-text">
                            Points Awarded: ${quest.points_awarded}
                        </p>
                        <p class="card-text">
                            Magic Group Required: ${quest.magic_group_required}
                        </p>
                        <button class="btn btn-success mr-2" onclick="editQuest(${quest.quest_id})">Edit Quest</button>
                        <button class="btn btn-danger" onclick="deleteQuest(${quest.quest_id})">Delete Quest</button>
                    </div>
                </div>
            `;
            QuestList.appendChild(displayItem);
        });
    };

    fetchMethod(`${currentUrl}/api/quests`, callback, "GET", null, localStorage.getItem("token"));
});





// Event listener for edit button click
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const QuestList = document.getElementById("QuestList");
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
                        <p class="card-text">
                            Points Awarded: ${quest.points_awarded}
                        </p>
                        <p class="card-text">
                            Magic Group Required: ${quest.magic_group_required}
                        </p>
                        <button class="btn btn-success mr-2" onclick="editQuest(${quest.quest_id})">Edit Quest</button>
                        <button class="btn btn-danger" onclick="deleteQuest(${quest.quest_id})">Delete Quest</button>
                    </div>
                </div>
            `;
            QuestList.appendChild(displayItem);
        });
    };

    fetchMethod(`${currentUrl}/api/quests`, callback, "GET", null, localStorage.getItem("token"));
});
