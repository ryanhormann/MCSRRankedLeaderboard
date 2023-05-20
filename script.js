const h2 = document.querySelector("h2");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");

async function getEloLeaderboard() {
    const response = await fetch("https://mcsrranked.com/api/leaderboard");
    if (response.ok)
    {
        const data = await response.json();
        const userCount = Object.keys(data.data.users).length;


        document.title = "MCSR Ranked Elo Leaderboard";
        h2.textContent = "Elo Leaderboard";
        thead.innerHTML = ` <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Elo</th>
                            </tr>`;
        tbody.innerHTML = "";

        for (let i = 0; i < userCount; i++)
        {
            let rank = data.data.users[i].elo_rank;
            let username = data.data.users[i].nickname;
            let elo = data.data.users[i].elo_rate;

            
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
  
            td1.insertAdjacentHTML("beforeend", rank);
            td2.insertAdjacentHTML("beforeend", username);
            td3.insertAdjacentHTML("beforeend", elo);

            // Diamond rank
            if (elo >= 1800)
            {
                td3.style.color = "#b9f2ff";
            }
            // Gold rank
            else if (elo >= 1200)
            {
                td3.style.color = "	#FFD700";
            }
            // Iron rank
            else if (elo >= 600)
            {
                td3.style.color = "#a19d94";
            }
            // Coal rank or unrated
            else
            {
                td3.style.color  = "#36454F";
            }
            

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        }
    }
    else
    {
        console.log(response.status, response.statusText);
    }
}

async function getRunsLeaderboard() {
    const response = await fetch("https://mcsrranked.com/api/record-leaderboard");
    if (response.ok)
    {
        const data = await response.json();
        const userCount = Object.keys(data.data).length;


        document.title = "MCSR Ranked Runs Leaderboard";
        h2.textContent = "Runs Leaderboard";
        thead.innerHTML = ` <tr>
                                <th>Rank</th>
                                <th>Username</th>
                                <th>Time</th>
                            </tr>`;
        tbody.innerHTML = "";

        for (let i = 0; i < userCount; i++)
        {
            let rank = data.data[i].final_time_rank;
            let username = data.data[i].user.nickname;
            let time = msToMinutesSecondsMS(data.data[i].final_time);

            
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
  
            td1.insertAdjacentHTML("beforeend", rank);
            td2.insertAdjacentHTML("beforeend", username);
            td3.insertAdjacentHTML("beforeend", time);
            

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        }
    }
    else
    {
        console.log(response.status, response.statusText);
    }
}

function msToMinutesSecondsMS(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(3);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}