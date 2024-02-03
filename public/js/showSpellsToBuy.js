document.addEventListener("DOMContentLoaded", function () {
    // Callback function to display spell information
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Get the SpellList element to display spells
        const SpellList = document.getElementById("SpellList");

        // Iterate through each spell and create display elements
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
                        <a href="singlespellInfo.html?spell_id=${spell.spell_id}" class="btn btn-primary">View Details</a>
                        <button class="btn btn-primary buy-spell" data-spell-id="${spell.spell_id}">Buy Spell</button>
                    </div>
                </div>
            `;
            SpellList.appendChild(displayItem);
        });

        // Add event listeners to Buy Spell buttons
        const buySpellButtons = document.querySelectorAll('.buy-spell');
        buySpellButtons.forEach(button => {
            button.addEventListener('click', function () {
                const spellId = this.getAttribute('data-spell-id');
                buySpell(spellId);
            });
        });
    };

    // Function to handle buying a spell
    const buySpell = (spellId) => {
        const token = localStorage.getItem("token");
        const url = currentUrl + "/api/spells/purchase/" + spellId;

        const callbackForBuy = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                console.log("Spell purchased successfully.");
                // Show success message
                alert("Spell purchased successfully");
                // Optionally, you can update the UI or perform any other actions here after purchasing the spell
            } else if (responseStatus === 409 && responseData && responseData.message === "Conflict: Spell already owned by user") {
                console.error("Conflict: Spell already owned by user.");
                // Show alert for spell already owned
                alert("Conflict: Spell already owned by user");
            } else if (responseStatus === 400) {
                console.error("Insufficient points to purchase spell.");
                // Show alert for insufficient points
                alert("Insufficient points to purchase spell");
            } else {
                console.error("Failed to purchase spell.");
                // Optionally, handle other error cases here
            }
        };

        // Make a POST request to buy the spell
        fetchMethod(url, callbackForBuy, "POST", null, token);
    };

    // Fetch spells and display them
    fetchMethod(currentUrl + "/api/spells", callback, "GET", null, localStorage.getItem("token"));
});
