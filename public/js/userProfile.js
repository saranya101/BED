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
        const TaskProgress = document.getElementById("TaskProgress");

        if (responseStatus === 404) {
            UserInfo.innerHTML = `${responseData.message}`;
            return;
        }
    
        const user = responseData.user;
        const wizard = responseData.wizard;
        const spells = responseData.spells;
        const quests = responseData.quests;
        const taskProgress = responseData.taskProgress;

        // Process task progress data into HTML format
        const taskProgressHTML = Array.isArray(taskProgress) && taskProgress.length > 0 ? taskProgress.map(progress => {
            return `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Task Progress</h5>
                        <p class="card-text">
                            Progress ID: ${progress.progress_id} <br>
                            Task ID: ${progress.task_id} <br>
                            Completion Date: ${progress.completion_date} <br>
                            Notes: ${progress.notes} <br>
                        </p>
                    </div>
                </div>
            `;
        }).join('') : 'No task progress found';

        // Process spells data into HTML format
        const spellListHTML = Array.isArray(spells) && spells.length > 0 ? spells.map(spell => {
            return `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Spell</h5>
                        <p class="card-text">
                            Spell ID: ${spell.spell_id} <br>
                            Name: ${spell.name} <br>
                            Description: ${spell.description} <br>
                        </p>
                    </div>
                </div>
            `;
        }).join('') : 'No spells found';

        // Process quests data into HTML format
        const questListHTML = Array.isArray(quests) && quests.length > 0 ? quests.map(quest => {
            return `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Quest</h5>
                        <p class="card-text">
                            Quest ID: ${quest.quest_id} <br>
                            Title: ${quest.title} <br>
                            Description: ${quest.description} <br>
                            Points Awarded: ${quest.points_awarded} <br>
                            Magic Group Required: ${quest.magic_group_required} <br>
                        </p>
                    </div>
                </div>
            `;
        }).join('') : 'No quests found';

        // Insert task progress HTML
        TaskProgress.innerHTML = taskProgressHTML;

        // Insert user information HTML
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
    
        // Insert spells HTML
        SpellsList.innerHTML = spellListHTML;

        // Insert quests HTML
        QuestsList.innerHTML = questListHTML;
    };

    fetchMethod(currentUrl + `/api/users/${user_id}`, callback, "GET", null, localStorage.getItem("token"));
});

