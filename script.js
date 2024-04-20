'use strict';

const express = require('express');
const fs = require('fs');

const app = express();

const countersFilePath = 'counters.json';

function loadCounters() {
    try {
        const countersData = fs.readFileSync(countersFilePath, 'utf8');
        return JSON.parse(countersData);
    } catch (err) {
        return {};
    }
}

function saveCounters(counters) {
    fs.writeFileSync(countersFilePath, JSON.stringify(counters), 'utf8');
}

app.get('/', (req, res) => {
    let counters = loadCounters();

    counters['/'] = (counters['/'] || 0) + 1;

    saveCounters(counters);

    res.send(`This is the main page. Views: ${counters['/']}`);
});

app.get('/about', (req, res) => {
    let counters = loadCounters();

    counters['/about'] = (counters['/about'] || 0) + 1;

    saveCounters(counters);

    res.send(`This is the about page. Views: ${counters['/about']}`);
});

app.listen(3070, () => {
    console.log('Server is running on port 3070');
});
