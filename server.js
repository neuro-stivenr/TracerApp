const express = require('express');
const app = express();
const PORT = 5656;
const doselib = require('./doselib');
const doselimit = require('./doselimit.json')
const doseinfo = require('./doseinfo.json')
const tableify = require('tableify')

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(`\nGET on / by ${req.ip} -> redirecting to /app.html`)
    res.redirect('/app.html')
});

app.post('/api/tracers', (req, res) => {
    console.log(`\nPOST on /api/tracers by ${req.ip} -> returning report`)
    pt_exposure = doselib.calc_exposure(req.body, doseinfo)
    htmltable = doselib.tabulate_exposure(pt_exposure, doselimit)
    res.setHeader('Content-Type', 'text/html')
    res.send(htmltable)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));