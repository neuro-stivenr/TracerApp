/* eslint-disable no-unused-vars */

function initCounter() {
    return {
        FEOVB: 0,
        DTBZ: 0,
        PE2I: 0,
        FMZ: 0,
        ASEM: 0,
	      AV1451: 0
    };
}

function clearTable(table) {
    Object.values(table.children).forEach(child => table.removeChild(child))
}

function createRow(tracer, visits) {
    let tracerRow = document.createElement('tr')
    let tracerLabel = document.createElement('td')
    tracerLabel.textContent = tracer
    let tracerVisits = document.createElement('td')
    tracerVisits.textContent = visits
    tracerRow.appendChild(tracerLabel)
    tracerRow.appendChild(tracerVisits)
    return tracerRow
}

function createHeader(col1, col2) {
    let headerSection = document.createElement('thead')
    let headerRow = document.createElement('tr')
    let headerCol1 = document.createElement('th')
    headerCol1.textContent = col1
    let headerCol2 = document.createElement('th')
    headerCol2.textContent = col2
    headerRow.appendChild(headerCol1)
    headerRow.appendChild(headerCol2)
    headerSection.appendChild(headerRow)
    return headerSection
}

function renderTable() {
    let visitTable = document.getElementById('input-table')
    let headerSection = createHeader("tracer", "visits")
    let bodySection = document.createElement('tbody')
    Object.entries(visitCount).forEach(([tracer,visits]) => {
        let tracerRow = createRow(tracer, visits)
        bodySection.appendChild(tracerRow)
    })
    clearTable(visitTable)
    visitTable.append(headerSection)
    visitTable.append(bodySection)
}

function addVisit() {
    let tracerChoice = document.getElementById('tracer-select')
    visitCount[tracerChoice.value] += 1
    renderTable()
}

function subtractVisit() {
    let tracerChoice = document.getElementById('tracer-select')
    if (visitCount[tracerChoice.value] > 0) {
        visitCount[tracerChoice.value] -= 1
        renderTable()
    }
}

function resetVisits() {
    visitCount = initCounter();
    renderTable()
    document.querySelector('#output-table-div').innerHTML = ""
}

function submitVisits() {
    fetch('/api/tracers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(visitCount)
    }).then(response => {
        response.text().then(html => {
            document.querySelector('#output-table-div').innerHTML = html
            document.querySelector('#output-table-div > table > tbody').childNodes.forEach((row,i) => {
                if (parseFloat(row.childNodes[1].textContent) > parseFloat(row.childNodes[2].textContent)) {
                    row.className = "red-text"
                }
            })
        })
    }).catch(e => console.error(e))
}
