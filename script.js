const h2 = document.querySelector("h2");
const tableContainer = document.getElementById("table-container");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const searchBar = document.querySelector("input[type='text']");

async function getEloLeaderboard() {
    const response = await fetch("https://mcsrranked.com/api/leaderboard");
    if (response.ok)
    {
        removeTempTable();
        clearSearch();

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
        removeTempTable();
        clearSearch();

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

async function getUsernameData() {
    const username = searchBar.value;
    const response = await fetch(`https://mcsrranked.com/api/users/${username}`);
    if (response.ok)
    {
        removeTempTable();
        clearSearch();

        const data = await response.json();

        document.title = `${username}'s Stats - MCSR Ranked Leaderboard`;
        h2.textContent = `${username}'s Stats`;
        
        let rank = data.data.elo_rank;
        let elo = data.data.elo_rate;
        let bestTime = msToMinutesSecondsMS(data.data.best_record_time);

        // table 1
        thead.innerHTML = ` <tr>
                                <th>Rank</th>
                                <th>Elo</th>
                                <th>Best Time</th>
                            </tr>`;

        tbody.innerHTML = ` <tr>
                                <td>${rank}</td>
                                <td>${elo}</td>
                                <td>${bestTime}</td>
                            </tr>`;

        // table 2

        let totalWon = data.data.records[2].win;
        let totalPlayed = totalWon + data.data.records[2].lose + data.data.records[2].draw;
        let bestWinStreak = data.data.highest_winstreak;
        let currentWinStreak = data.data.current_winstreak;
        let winPercent = Math.floor(((totalWon / totalPlayed) * 100));
        

        const table2 = document.createElement("table");
        table2.id = "temp-table";

        table2.innerHTML = `<thead>
                                <tr>
                                    <th>Best Winstreak</th>
                                    <th>Current Winstreak</th>
                                    <th>Win%</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${bestWinStreak}</td>
                                    <td>${currentWinStreak}</td>
                                    <td>${winPercent}</td>
                                </tr>
                            </tbody>`;

        table2.style.borderTop = "none";
        tableContainer.appendChild(table2);
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

function removeTempTable() {
    if(document.getElementById("temp-table"))
    {
        document.getElementById("temp-table").remove();
    }
}

function clearSearch() {
    searchBar.value = "";
}