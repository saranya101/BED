document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const spell_id = urlParams.get("spell_id");
  
    const callbackForSpellInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        const spellInfo = document.getElementById("spellInfo");
  
        if (responseStatus === 404) {
            spellInfo.innerHTML = `${responseData.message}`;
            return;
        }
  
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
    fetchMethod(`/api/spells/spellid/${spell_id}`, callbackForSpellInfo);
  });
  