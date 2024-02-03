document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");
    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        const UserInfo = document.getElementById("UserInfo");
  
        if (responseStatus == 404) {
            UserInfo.innerHTML = `${responseData.message}`;
            return;
        }
  
        UserInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        User ID: ${responseData.user.user_id} <br>
                        Username: ${responseData.user.username} <br>
                        Email: ${responseData.user.email} <br>
                        Total Points: ${responseData.user.total_points} <br>
                    </p>
                </div>
            </div>
        `;
    };
  
    fetchMethod(currentUrl + `/api/admin/oneuser/${user_id}`, callbackForUserInfo);
  });
  