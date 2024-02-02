document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskList = document.getElementById("taskList");
        responseData.forEach((task) => {
            const taskCard = document.createElement("div");
            taskCard.className = "card mb-3";
            const cardBody = document.createElement("div");
            cardBody.className = "card-body d-flex justify-content-between align-items-center";
            cardBody.backgroundColor = "#8499D5";
            const taskDetails = document.createElement("div");

            const taskTitle = document.createElement("h5");
            taskTitle.className = "card-title";
            taskTitle.textContent = task.title;

            const taskDescription = document.createElement("p");
            taskDescription.className = "card-text";
            taskDescription.textContent = "Description: " + task.description;

            const completeButton = document.createElement("button");
            completeButton.className = "btn btn-primary";
            completeButton.textContent = "Complete Task";

            // Add event listener to completeButton
            completeButton.addEventListener("click", function () {
                completeTask(task.task_id); // Assuming task.id is available
            });

            taskDetails.appendChild(taskTitle);
            taskDetails.appendChild(taskDescription);

            cardBody.appendChild(taskDetails);
            cardBody.appendChild(completeButton);

            taskCard.appendChild(cardBody);
            taskList.appendChild(taskCard);
        });
    };

    const completeTask = (task_id) => {
        const token = localStorage.getItem("token");
        const url = currentUrl + "/api/task_progress/" + task_id + "/complete";

        const callbackForComplete = (responseStatus, responseData) => {
            if (responseStatus === 201) {
                console.log("Task completed successfully.");
                // Show success message
                alert("Task completed. Points claimed successfully");
                // Optionally, you can update the UI or perform any other actions here after completing the task
            } else {
                console.error("Failed to complete task.");
                // Optionally, handle error cases here
            }
        };

        // Make a POST request to mark the task as completed
        fetchMethod(url, callbackForComplete, "POST", null, token);
    };

    fetchMethod(currentUrl + "/api/tasks", callback);
});
