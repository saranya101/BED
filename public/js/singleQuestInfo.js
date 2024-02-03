document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const quest_id = urlParams.get("quest_id");
  
    const callbackForQuestInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const QuestInfo = document.getElementById("QuestInfo");
  
      if (responseStatus == 404) {
        QuestInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      QuestInfo.innerHTML = `
          <div class="row">
              <div class="col">
                  <div class="cardquest">
                      <div class="card-body">
                          <p class="card-text">
                              Quest ID: ${responseData[0].quest_id} <br>
                              Title: ${responseData[0].title} <br>
                              Description: ${responseData[0].description} <br>
                              Points Awarded: ${responseData[0].points_awarded} <br>
                              Magic Group Needed: ${responseData[0].magic_group_required} <br>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/quests/id/${quest_id}`, callbackForQuestInfo);
  });
  