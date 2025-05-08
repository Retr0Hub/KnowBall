const premierLeagueTeams = [
  { name: "AFC Bournemouth", logo: "football-logos/logos/England - Premier League/AFC Bournemouth.png" },
  { name: "Arsenal FC", logo: "football-logos/logos/England - Premier League/Arsenal FC.png" },
  { name: "Aston Villa", logo: "football-logos/logos/England - Premier League/Aston Villa.png" },
  { name: "Brentford FC", logo: "football-logos/logos/England - Premier League/Brentford FC.png" },
  { name: "Brighton & Hove Albion", logo: "football-logos/logos/England - Premier League/Brighton & Hove Albion.png" },
  { name: "Chelsea FC", logo: "football-logos/logos/England - Premier League/Chelsea FC.png" },
  { name: "Crystal Palace", logo: "football-logos/logos/England - Premier League/Crystal Palace.png" },
  { name: "Everton FC", logo: "football-logos/logos/England - Premier League/Everton FC.png" },
  { name: "Fulham FC", logo: "football-logos/logos/England - Premier League/Fulham FC.png" },
  { name: "Ipswich Town", logo: "football-logos/logos/England - Premier League/Ipswich Town.png" },
  { name: "Leicester City", logo: "football-logos/logos/England - Premier League/Leicester City.png" },
  { name: "Liverpool FC", logo: "football-logos/logos/England - Premier League/Liverpool FC.png" },
  { name: "Manchester City", logo: "football-logos/logos/England - Premier League/Manchester City.png" },
  { name: "Manchester United", logo: "football-logos/logos/England - Premier League/Manchester United.png" },
  { name: "Newcastle United", logo: "football-logos/logos/England - Premier League/Newcastle United.png" },
  { name: "Nottingham Forest", logo: "football-logos/logos/England - Premier League/Nottingham Forest.png" },
  { name: "Southampton FC", logo: "football-logos/logos/England - Premier League/Southampton FC.png" },
  { name: "Tottenham Hotspur", logo: "football-logos/logos/England - Premier League/Tottenham Hotspur.png" },
  { name: "West Ham United", logo: "football-logos/logos/England - Premier League/West Ham United.png" },
  { name: "Wolverhampton Wanderers", logo: "football-logos/logos/England - Premier League/Wolverhampton Wanderers.png" }
];

// Sample match data for each team
const matches = [
  { homeTeam: "Arsenal FC", awayTeam: "Chelsea FC", homeScore: 3, awayScore: 1, status: "FT" },
  { homeTeam: "Manchester City", awayTeam: "Liverpool FC", homeScore: 2, awayScore: 2, status: "FT" },
  { homeTeam: "Tottenham Hotspur", awayTeam: "Aston Villa", homeScore: 1, awayScore: 0, status: "FT" },
  { homeTeam: "Everton FC", awayTeam: "Manchester United", homeScore: 0, awayScore: 1, status: "FT" },
  // Add more matchups as needed
];

// Premier League standings table
let standings = premierLeagueTeams.map((team, index) => ({
  position: index + 1,
  team: team.name,
  logo: team.logo,
  wins: 0,
  draws: 0,
  losses: 0,
  points: 0
}));

// Function to render live scores
function renderLiveScores() {
  const liveScoreSection = document.getElementById('scores');
  liveScoreSection.innerHTML = '';
  
  matches.forEach((match) => {
    const matchElement = document.createElement('div');
    matchElement.classList.add('match');
    matchElement.classList.add(match.status === "FT" ? 'finished' : 'live');
    matchElement.innerHTML = `
      <div class="team home">
        <img src="${getTeamLogo(match.homeTeam)}" alt="${match.homeTeam} logo" />
        ${match.homeTeam}
      </div>
      <div class="score">${match.homeScore} - ${match.awayScore}</div>
      <div class="team away">
        <img src="${getTeamLogo(match.awayTeam)}" alt="${match.awayTeam} logo" />
        ${match.awayTeam}
      </div>
      <div class="status">${match.status}</div>
    `;
    liveScoreSection.appendChild(matchElement);
  });
}

// Function to render standings table
function renderStandings() {
  const standingsSection = document.getElementById('standings');
  standingsSection.innerHTML = '';
  
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  
  thead.innerHTML = `
    <tr>
      <th class="position">#</th>
      <th class="team">Team</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th class="points">Pts</th>
    </tr>
  `;
  
  standings.forEach((standing) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="position">${standing.position}</td>
      <td class="team">
        <img src="${standing.logo}" alt="${standing.team} logo" />
        ${standing.team}
      </td>
      <td>${standing.wins}</td>
      <td>${standing.draws}</td>
      <td>${standing.losses}</td>
      <td class="points">${standing.points}</td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  standingsSection.appendChild(table);
}

// Function to get team logo by name
function getTeamLogo(teamName) {
  const team = premierLeagueTeams.find(t => t.name === teamName);
  return team ? team.logo : '';
}

// Function to simulate match results and update standings
function updateStandings() {
  matches.forEach((match) => {
    const homeTeam = standings.find(s => s.team === match.homeTeam);
    const awayTeam = standings.find(s => s.team === match.awayTeam);

    if (match.homeScore > match.awayScore) {
      homeTeam.wins += 1;
      awayTeam.losses += 1;
      homeTeam.points += 3;
    } else if (match.homeScore < match.awayScore) {
      homeTeam.losses += 1;
      awayTeam.wins += 1;
      awayTeam.points += 3;
    } else {
      homeTeam.draws += 1;
      awayTeam.draws += 1;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
  });
  standings = standings.sort((a, b) => b.points - a.points); // Sort by points
}

// Call functions to render the initial data
updateStandings();
renderLiveScores();
renderStandings();

// Handling tab switching
const panels = {
  scores: document.getElementById('scores'),
  standings: document.getElementById('standings'),
};

const tabs = Array.from(document.querySelectorAll('nav button'));

function switchTab(tabId) {
  tabs.forEach(tab => tab.classList.remove('active'));
  const tabToShow = document.getElementById(`tab-${tabId}`);
  tabToShow.classList.add('active');

  for (const [key, panel] of Object.entries(panels)) {
    if (key === tabId) {
      panel.hidden = false;
    } else {
      panel.hidden = true;
    }
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    switchTab(tab.id.split('-')[1]);
  });
});
