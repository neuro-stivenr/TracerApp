const doseinfo = require('./doseinfo.json');
const doselimit = require('./doselimit.json');
const organs = Object.keys(doselimit)

const example_input = { FEOVB: 5, DTBZ: 0, PE2I: 1, FMZ: 2, ASEM: 0 };
const do_debug = true;

function calc_exposure(input) {
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

exports.calc_exposure = calc_exposure;