/* eslint-disable no-unused-vars */

function getVisitInfo() {
    return {
        patID: document.getElementById('patID-input').value,
        doseInput: document.getElementById('dose-input').value,
        tracerChoice: document.getElementById('tracer-choice').value
    }
}

function clearVisitInfo() {
    document.getElementById('patID-input').value = ""
    document.getElementById('dose-input').value = ""
    document.getElementById('tracer-choice').value = ""

}

function createCell(value) {
    let cell = document.createElement('td')
    cell.textContent = value
    return(cell)
}

function createRow(cells) {
    let row = document.createElement('tr')
    for (cell of cells) {
        row.appendChild(cell)
    }
    return(row)
}

function updateTable(newVisit) {
    let newRow = createRow([
        createCell(newVisit.patID),
        createCell(newVisit.tracerChoice),
        createCell(newVisit.doseInput)
    ])
    table.appendChild(newRow)
}

function registerButton() {
    const button = document.getElementById("add-visit");
    button.addEventListener('click', () => {
        let visitInfo = getVisitInfo()
        clearVisitInfo()
        visits.push(visitInfo)
        updateTable(visitInfo)
    });
}

