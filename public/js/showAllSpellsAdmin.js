const editSpell = (spellId) => {
    // Get necessary elements from the DOM
    const modal = document.getElementById("editSpellModal");
    const nameInput = document.getElementById("editSpellName");
    const descriptionInput = document.getElementById("editSpellDescription");
    const pointsCostInput = document.getElementById("editSpellPointsCost");
    const magicGroupInput = document.getElementById("editSpellMagicGroup");
    const form = document.getElementById("editSpellForm");

    // Define the current data for the spell
    const currentData = {
        name: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        points_cost: pointsCostInput.value.trim(),
        magic_group: magicGroupInput.value.trim()
    };

    // Define the callback function for the update request
    const callbackForEdit = (responseStatus, responseData) => {
        if (responseStatus === 200) {
            console.log("Spell updated successfully.");
            alert("Spell updated successfully."); // Add an alert message
            
            // Hide the modal and reload the page to reflect changes
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            window.location.reload(); // Reload the page

        } else {
            console.error("Failed to update spell.");
            // Optionally, handle error cases here
        }
    };

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get updated data from the form
        const updatedData = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            points_cost: pointsCostInput.value.trim(),
            magic_group: magicGroupInput.value.trim()
        };

        // Check if any of the input fields are empty
        if (Object.values(updatedData).some(value => value === "")) {
            // Show an alert if any input field is empty
            alert("Please fill out all fields.");
        } else {
            // Construct the URL for the update spell endpoint
            const url = currentUrl + `/api/admin/updatespell/${spellId}`;

            // Make a PUT request to update the spell
            fetchMethod(url, callbackForEdit, "PUT", updatedData, localStorage.getItem("token"));
        }
    });

    // Show the modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

// Function to show the add spell modal
const showAddSpellModal = () => {
    // Get necessary elements from the DOM
    const modal = document.getElementById("addSpellModal");
    const nameInput = document.getElementById("addSpellName");
    const descriptionInput = document.getElementById("addSpellDescription");
    const pointsCostInput = document.getElementById("addSpellPointsCost");
    const magicGroupInput = document.getElementById("addSpellMagicGroup");
    const form = document.getElementById("addSpellForm");

    // Clear input fields
    nameInput.value = "";
    descriptionInput.value = "";
    pointsCostInput.value = "";
    magicGroupInput.value = "";

    // Event listener for form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get data from the form
        const newSpellData = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            points_cost: pointsCostInput.value.trim(),
            magic_group: magicGroupInput.value.trim()
        };

        // Check if any of the input fields are empty
        if (Object.values(newSpellData).some(value => value === "")) {
            // Show an alert if any input field is empty
            alert("Please fill out all fields.");
        } else {
            // Construct the URL for the create spell endpoint
            const url = currentUrl + "/api/admin/createspell";

            // Define the callback function for the create request
            const callbackForCreate = (responseStatus, responseData) => {
                if (responseStatus === 200) {
                    console.log("Spell created successfully.");
                    alert("Spell created successfully."); 
                    window.location.reload(); // Reload the page

                } else {
                    console.error("Failed to create spell.");
                    // Optionally, handle error cases here
                }
            };

            // Make a POST request to create the spell
            fetchMethod(url, callbackForCreate, "POST", newSpellData, localStorage.getItem("token"));
        }
    });

    // Show the modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
};

// Event listener for edit button click
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the container for spells list
        const SpellList = document.getElementById("SpellList");
        
        // Loop through each spell and create a display item
        responseData.forEach((spell) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 p-3"; // Updated column classes
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${spell.name}</h5>
                        <p class="card-text">
                            Description: <br>${spell.description}
                        </p>
                        <a href="singlespellInfoAdmin.html?spell_id=${spell.spell_id}" class="btn btn-primary mr-2">View Details</a>
                        <button class="btn btn-success mr-2" onclick="editSpell(${spell.spell_id})">Edit Spell</button>
                        <button class="btn btn-danger" onclick="deleteSpell(${spell.spell_id})">Delete Spell</button>
                    </div>
                </div>
            `;
            SpellList.appendChild(displayItem);
        });
    };

    // Fetch spells data
    fetchMethod(currentUrl + "/api/spells", callback, "GET", null, localStorage.getItem("token"));
});

// Function to handle spell deletion
const deleteSpell = (spellId) => {
    if (confirm("Are you sure you want to delete this spell?")) {
        // Construct the URL for the delete spell endpoint
        const url = currentUrl + `/api/admin/deletespell/${spellId}`;

        // Define the callback function for the delete request
        const callbackForDelete = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Spell deleted successfully.");
                alert("Spell deleted successfully."); 
                window.location.reload();
            } else {
                console.error("Failed to delete spell.");
            }
        };

        // Make a DELETE request to delete the spell
        fetchMethod(url, callbackForDelete, "DELETE", null, localStorage.getItem("token"));
    }
};
