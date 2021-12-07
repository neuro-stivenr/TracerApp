const tableify = require('tableify');

const organs = Object.keys(require('./doselimit.json'))

const example_input = { FEOVB: 5, DTBZ: 0, PE2I: 1, FMZ: 2, ASEM: 0 };
const do_debug = false;

const tableify_options = {
    headers: [
        'organ',
        'exposure',
        'limit'
    ]
}

function calc_exposure(input, doseinfo) {
    let exposures = Array(organs.length).fill(0)
    Object.entries(input).map(([tracer, visits]) => {
        do_debug && console.debug(`\n--- Calculating exposure for ${tracer} ---`)
        Object.values(doseinfo[tracer]).map((exposure,i) => {
            let net_exposure = exposure * visits
            do_debug && console.debug(`${organs[i]}: ${exposure} rads/dose * ${visits} doses = ${net_exposure} rems`)
            exposures[i] += net_exposure
        })
    })
    return Object.fromEntries(
        exposures.map((exposure,i) => [organs[i], exposure])
    )
}

function tabulate_exposure(pt_exposure, doselimit) {
    items = Object.keys(pt_exposure).map(organ => {
        return {
            organ: organ,
            exposure: pt_exposure[organ].toFixed(3),
            limit: doselimit[organ]
        }
    })
    return tableify(items, tableify_options)
}

exports.calc_exposure = calc_exposure;
exports.tabulate_exposure = tabulate_exposure;