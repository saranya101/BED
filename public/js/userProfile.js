document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const UserInfo = document.getElementById("UserInfo");
        const SpellsList = document.getElementById("SpellsList");
        const QuestsList = document.getElementById("QuestsList");
    
        if (responseStatus === 404) {
            UserInfo.innerHTML = `${responseData.message}`;
            return;
        }
    
        const user = responseData.user;
        const wizard = responseData.wizard;
        const spells = responseData.spells;
        const quests = responseData.quests;
    
        const spellListHTML = Array.isArray(spells) && spells.length > 0 ? spells.map(spell => {
            return `
                <li>
                    Spell Id: ${spell.spell_id} <br>
                    Spell Name: ${spell.name} <br>
                    Spell Description: ${spell.description} <br>
                </li>
            `;
        }).join('') : 'No spells found';
    
        const questListHTML = Array.isArray(quests) && quests.length > 0 ? quests.map(quest => {
            return `
                <li>
                    Quest Id: ${quest.quest_id} <br>
                    Title: ${quest.title} <br>
                    Description: ${quest.description} <br>
                    Points Awarded: ${quest.points_awarded} <br>
                    Magic Group Required: ${quest.magic_group_required} <br>
                </li>
            `;
        }).join('') : 'No quests found';
    
        UserInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Information</h5>
                    <p class="card-text">
                        User ID: ${user.user_id} <br>
                        Username: ${user.username} <br>
                        Email: ${user.email} <br>
                        Total Points: ${user.total_points} <br>
                        Wizard ID: ${user.wizard_id} <br>
                        Wizard Name: ${wizard.wizard_name} <br>
                        Special Ability: ${wizard.special_ability} <br>
                        Magic Group: ${wizard.magic_group} <br>
                    </p>
                </div>
            </div>
        `;
    
        SpellsList.innerHTML = spellListHTML;
        QuestsList.innerHTML = questListHTML;
    };

    fetchMethod(currentUrl + `/api/users/${user_id}`, callback, "GET", null, localStorage.getItem("token"));
});
