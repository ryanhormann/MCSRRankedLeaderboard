async function getLeaderboard() {
    const response = await fetch("https://mcsrranked.com/api/leaderboard");
    if (response.ok)
    {
        const data = await response.json();
        const userCount = Object.keys(data.data.users).length;

        for (let i = 0; i < userCount; i++)
        {
            let rank = data.data.users[i].elo_rank;
            let username = data.data.users[i].nickname;
            let elo = data.data.users[i].elo_rate;

            const tbody = document.querySelector("tbody");
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
  
            td1.insertAdjacentHTML("beforeend", rank);
            td2.insertAdjacentHTML("beforeend", username);
            td3.insertAdjacentHTML("beforeend", elo);
            

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