let profileName;
const input = document.querySelector("input");

document.querySelector("#elo-button").addEventListener("click", eloClick);

function eloClick() {
    removeOldElements();

    const result = async function() {
        try {
            const response = await fetch("https://mcsrranked.com/api/leaderboard");
            const data = await response.json();

            if (response.ok)
            {
                document.title = "MCSR Ranked Leaderboard - Elo Leaderboard";
                document.querySelector("h2").textContent = "Elo Leaderboard";

                createTable();

                function createTable() {
                    const table = document.createElement("table");
                    const tableHead = document.createElement("thead");
                    const tableBody = document.createElement("tbody");
                    const headRow = document.createElement("tr");

                    for (let k = 0; k < 3; k++)
                    {
                        const headCell = document.createElement("th");
                        let headCellText;

                        if (k == 0) {
                            headCellText = document.createTextNode("Rank");
                        }
                        else if (k == 1) {
                            headCellText = document.createTextNode("Name");
                        }
                        else {
                            headCellText = document.createTextNode("Elo");
                        }

                        headCell.appendChild(headCellText);
                        headRow.appendChild(headCell);
                    }

                    tableHead.appendChild(headRow);

                    for (let i = 0; i < data.data.users.length ; i++) {
                        const row = document.createElement("tr");

                        row.addEventListener("click", function () {
                            rowClick(data.data.users[i].nickname);
                        });
  
                        for (let j = 0; j < 3; j++) {
                            const cell = document.createElement("td");
                            let cellText;

                            if (j == 0) {
                                cellText = document.createTextNode(data.data.users[i].eloRank);
                            }
                            else if (j == 1) {
                                cellText = document.createTextNode(data.data.users[i].nickname);
                            }
                            else {
                                cellText = document.createTextNode(data.data.users[i].eloRate);
                            }
                    
                            cell.appendChild(cellText);
                            row.appendChild(cell);
                        }

                        tableBody.appendChild(row);
                    }

                    table.appendChild(tableHead);
                    table.appendChild(tableBody);
                    document.body.appendChild(table);
                }
            }
        }
        catch {
            const p = document.createElement("p");
            p.textContent = "Error loading leaderboard. Please refresh page.";
            document.body.appendChild(p);
        }
    }

    result();
};

document.getElementById("time-button").addEventListener("click", function() {
    document.title = "MCSR Ranked Leaderboard - Time Leaderboard";
    document.querySelector("h2").textContent = "Time Leaderboard";

    removeOldElements();

    const result = async function() {
        try {
            const response = await fetch("https://mcsrranked.com/api/record-leaderboard");
            const data = await response.json();

            createTable();

            function createTable() {
                const table = document.createElement("table");
                const tableHead = document.createElement("thead");
                const tableBody = document.createElement("tbody");
                const headRow = document.createElement("tr");

                for (let k = 0; k < 3; k++)
                {
                    const headCell = document.createElement("th");
                    let headCellText;

                    if (k == 0) {
                        headCellText = document.createTextNode("Rank");
                    }
                    else if (k == 1) {
                        headCellText = document.createTextNode("Name");
                    }
                    else {
                        headCellText = document.createTextNode("Time");
                    }

                    headCell.appendChild(headCellText);
                    headRow.appendChild(headCell);
                }

                tableHead.appendChild(headRow);

                for (let i = 0; i < data.data.length ; i++) {
                    const row = document.createElement("tr");

                    row.addEventListener("click", function () {
                        rowClick(data.data[i].user.nickname);
                    });
  
                    for (let j = 0; j < 3; j++) {
                        const cell = document.createElement("td");
                        let cellText;

                        if (j == 0) {
                            cellText = document.createTextNode(data.data[i].rank);
                        }
                        else if (j == 1) {
                            cellText = document.createTextNode(data.data[i].user.nickname);
                        }
                        else {
                            cellText = document.createTextNode(formatTime(data.data[i].time));
                        }
                    
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }

                    tableBody.appendChild(row);
                }

                table.appendChild(tableHead);
                table.appendChild(tableBody);
                document.body.appendChild(table);
            }
        }
        catch (error) {
            const p = document.createElement("p");
            p.textContent = "Error loading leaderboard. Please refresh page.";
            document.body.appendChild(p);
        }
    }

    result();
});

document.getElementById("phase-button").addEventListener("click", function() {
    document.title = "MCSR Ranked Leaderboard - Phase Points Leaderboard";
    document.querySelector("h2").textContent = "Phase Points Leaderboard";

    removeOldElements();

    const result = async function() {
        try {
            const response = await fetch("https://mcsrranked.com/api/phase-leaderboard");
            const data = await response.json();

            const p = document.createElement("p");
            p.innerHTML = "The top 12 players will be invited to the bracket stage of the Ranked Playoffs.<br> All players with 15 or more points will be invited to a last chance<br> qualifier to compete for the remaining 4 bracket positions.";
            document.body.appendChild(p);

            createTable();

            function createTable() {
                const table = document.createElement("table");
                const tableHead = document.createElement("thead");
                const tableBody = document.createElement("tbody");
                const headRow = document.createElement("tr");

                for (let k = 0; k < 2; k++)
                {
                    const headCell = document.createElement("th");
                    let headCellText;

                    if (k == 0) {
                        headCellText = document.createTextNode("Name");
                    }
                    else {
                        headCellText = document.createTextNode("Phase Points");
                    }

                    headCell.appendChild(headCellText);
                    headRow.appendChild(headCell);
                }

                tableHead.appendChild(headRow);

                for (let i = 0; i < data.data.users.length ; i++) {
                    const row = document.createElement("tr");

                    row.addEventListener("click", function () {
                        rowClick(data.data.users[i].nickname);
                    });
  
                    for (let j = 0; j < 2; j++) {
                        const cell = document.createElement("td");
                        let cellText;

                        if (j == 0) {
                            cellText = document.createTextNode(data.data.users[i].nickname);
                        }
                        else {
                            cellText = document.createTextNode(data.data.users[i].seasonResult.phasePoint);
                        }
                    
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }

                    tableBody.appendChild(row);
                }

                table.appendChild(tableHead);
                table.appendChild(tableBody);
                document.body.appendChild(table);
            }
        }
        catch {
            const p = document.createElement("p");
            p.textContent = "Error loading leaderboard. Please refresh page.";
            document.body.appendChild(p);
        }
    }

    result();
});

document.getElementById("search-button").addEventListener("click", function() {
    profileName = input.value;
    searchClick(profileName);
});

function searchClick(name) {
    removeOldElements();

    const result = async function() {
        try {
            const response = await fetch(`https://mcsrranked.com/api/users/${name}`);
            const data = await response.json();

            if (response.ok) {
                document.title = `MCSR Ranked Leaderboard - ${name}'s Profile`;
                document.querySelector("h2").textContent = `${name}'s Profile`;

                const statContainer = document.createElement("div");
                statContainer.id = "stats-container";

                for (let i = 0; i < 10; i++) {
                    const stat = document.createElement("div");
                    stat.classList.add("stat");

                    const statHeader = document.createElement("div");
                    statHeader.classList.add("stat-header");

                    const statText  = document.createElement("div");
                    statText.classList.add("stat-text");

                    let headerText;
                    let text;

                    if (i == 0) {
                        headerText = document.createTextNode("Wins (Season)");
                        text = document.createTextNode(data.data.statistics.season.wins.ranked);
                    }
                    else if (i == 1) {
                        headerText = document.createTextNode("Loses (Season)");
                        text = document.createTextNode(data.data.statistics.season.loses.ranked);
                    }
                    else if (i == 2) {
                        headerText = document.createTextNode("Win Rate (Season)");
                        text = document.createTextNode(`${((Math.trunc((data.data.statistics.season.wins.ranked / (data.data.statistics.season.wins.ranked + data.data.statistics.season.loses.ranked)) * 10000)) / 100)}%`);
                    }
                    else if (i == 3) {
                        headerText = document.createTextNode("Total Games");
                        text = document.createTextNode(data.data.statistics.total.playedMatches.ranked);
                    }
                    else if (i == 4) {
                        headerText = document.createTextNode("Best Win Streak");
                        text = document.createTextNode(data.data.statistics.total.highestWinStreak.ranked);
                    }
                    else if (i == 5) {
                        headerText = document.createTextNode("Current Win Streak");
                        text = document.createTextNode(data.data.statistics.season.currentWinStreak.ranked);
                    }
                    else if (i == 6) {
                        headerText = document.createTextNode("Elo Rank");
                        text = document.createTextNode(`#${data.data.eloRank}`);
                    }
                    else if (i == 7) {
                        headerText = document.createTextNode("Elo");
                        text = document.createTextNode(data.data.eloRate);
                        statHeader.appendChild(headerText);
                        statText.appendChild(text);
                        eloStyle(data.data.eloRate, statText);
                    }
                    else if (i == 8) {
                        headerText = document.createTextNode("Best Elo");
                        text = document.createTextNode(data.data.seasonResult.highest);
                        statHeader.appendChild(headerText);
                        statText.appendChild(text);
                        eloStyle(data.data.seasonResult.highest, statText);
                    }
                    else {
                        headerText = document.createTextNode("Fastest Time");
                        text = document.createTextNode(formatTime(data.data.statistics.total.bestTime.ranked));
                    }

                    if (!(i == 7 || i == 8)) {
                        statHeader.appendChild(headerText);
                        statText.appendChild(text);
    
                    }

                    stat.appendChild(statHeader);
                    stat.appendChild(statText);

                    statContainer.appendChild(stat);
                }

                document.body.appendChild(statContainer);
            }
            else {
                const p = document.createElement("p");
                p.textContent = "User does not exist.";
                document.body.appendChild(p);

                input.value = profileName;
                input.focus();
                input.select();
            }
        }
        catch (error) {
            const p = document.createElement("p");
            p.textContent = "User does not exist.";
            document.body.appendChild(p);
        }
    }

    result();
};

function formatTime(t) {
    let min;
    let sec;
    let ms;

    min = Math.trunc(t / 60000);

    sec = Math.trunc(((t / 60000) - min) * 60);

    if (sec < 10) {
        sec = `0${sec}`;
    }

    ms = Math.trunc((((((t / 60000) - min) * 60) - sec) * 1000));

    return `${min}:${sec}.${ms}`;
}

function removeOldElements() {
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
    }

    if (document.querySelector("p")) {
        document.querySelector("p").remove();
    }

    if (document.querySelector("#stats-container")) {
        document.querySelector("#stats-container").remove();
    }

    input.value = "";
}

function eloStyle(elo, element) {
    if (elo >= 2000)
    {
        element.textContent = elo + " - Netherite";
        element.classList.add("netherite");
    }
    else if (elo >= 1800) {
        element.textContent = elo + " - Diamond III";
        element.classList.add("diamond");
    }
    else if (elo >= 1650) {
        element.textContent = elo + " - Diamond II";
        element.classList.add("diamond");
    }
    else if (elo >= 1500) {
        element.textContent = elo + " - Diamond I";
        element.classList.add("diamond");
    }
    else if (elo >= 1400) {
        element.textContent = elo + " - Emerald III";
        element.classList.add("emerald");
    }
    else if (elo >= 1300) {
        element.textContent = elo + " - Emerald II";
        element.classList.add("emerald");
    }
    else if (elo >= 1200) {
        element.textContent = elo + " - Emerald I";
        element.classList.add("emerald");
    }
    else if (elo >= 1100) {
        element.textContent = elo + " - Gold III";
        element.classList.add("gold");
    }
    else if (elo >= 1000) {
        element.textContent = elo + " - Gold II";
        element.classList.add("gold");
    }
    else if (elo >= 900) {
        element.textContent = elo + " - Gold I";
        element.classList.add("gold");
    }
    else if (elo >= 800) {
        element.textContent = elo + " - Iron III";
        element.classList.add("iron");
    }
    else if (elo >= 700) {
        element.textContent = elo + " - Iron II";
        element.classList.add("iron");
    }
    else if (elo >= 600) {
        element.textContent = elo + " - Iron I";
        element.classList.add("iron");
    }
    else if (elo >= 500) {
        element.textContent = elo + " - Coal III";
        element.classList.add("coal");
    }
    else if (elo >= 400) {
        element.textContent = elo + " - Coal II";
        element.classList.add("coal");
    }
    else if (elo >= 0) {
        element.textContent = elo + " - Coal I";
        element.classList.add("coal");
    }
    else {
        // unrated or hidden
    }
}

function rowClick(name) {
    searchClick(name);
}