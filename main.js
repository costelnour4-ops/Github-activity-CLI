const fs = require('fs');
const path = require('path');
const File_Name = path.join(__dirname, "main.JSON");

// 1. Obținem username-ul din argumente
const arg = process.argv.slice(2);
const username = arg[0];

if (!username) {
    console.log("Eroare: Te rog să introduci un username GitHub.");
    process.exit(1);
}

// 2. Funcția care DESCARCĂ datele de la GitHub
async function fetchFromGitHub(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/events`, {
            headers: {
                'User-Agent': 'node.js-cli-app'
            }
        });

        if (response.status === 404) {
            console.log("Eroare: Utilizatorul nu a fost găsit.");
            return;
        }

        if (!response.ok) {
            throw new Error(`Eroare HTTP: ${response.status}`);
        }

        const events = await response.json();
        
        // După ce avem datele, apelăm funcția de afișare
        displayActivity(events);

    } catch (error) {
        console.error("A apărut o eroare la descărcare:", error.message);
    }
}

// 3. Funcția care AFIȘEAZĂ datele frumos în consolă
function displayActivity(events) {
    if (!events || events.length === 0) {
        console.log("Nu am găsit activitate recentă pentru acest utilizator.");
        return;
    }

    console.log(`Output:`);
    
    events.slice(0, 10).forEach(event => {
        let action = "";

        switch (event.type) {
            case "PushEvent":
                const commits = event.payload.commits ? event.payload.commits.length : 0;
                action = `Pushed ${commits} commit(s) to ${event.repo.name}`;
                break;
            case "IssuesEvent":
                action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
                break;
            case "WatchEvent":
                action = `Starred ${event.repo.name}`;
                break;
            case "CreateEvent":
                action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                break;
            default:
                action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
                break;
        }

        console.log(`- ${action}`);
    });
}

// 4. Pornim programul apelând funcția de descărcare
fetchFromGitHub(username);