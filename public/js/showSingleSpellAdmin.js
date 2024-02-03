// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the spell ID from the URL parameters
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const spell_id = urlParams.get("spell_id");
  
    // Callback function to display spell information
    const callbackForSpellInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        // Get the element to display spell information
        const spellInfo = document.getElementById("spellInfo");
  
        if (responseStatus === 404) {
            // Display message if spell is not found
            spellInfo.innerHTML = `${responseData.message}`;
            return;
        }
  
        // Display spell information
        spellInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        Spell ID: ${responseData[0].spell_id} <br>
                        Spell Name: ${responseData[0].name} <br>
                        Description: ${responseData[0].description} <br>
                        Points Cost: ${responseData[0].points_cost} <br>
                        Magic Group: ${responseData[0].magic_group} <br>
                    </p>
                </div>
            </div>
        `;
    };
  
    // Fetch spell information
    fetchMethod(`/api/spells/spellid/${spell_id}`, callbackForSpellInfo);
});
