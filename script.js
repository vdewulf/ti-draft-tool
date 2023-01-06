var minoptvis = false;
function moreopt() {
    minoptvis = !minoptvis;
    var minopt = document.getElementsByClassName("minopt");
    for (var i = 0; i < minopt.length; i++) {
        minopt[i].style.display = minoptvis ? "table-row" : "none";
        minopt[i].style.visibility = minoptvis ? "visible" : "hidden";
    }
    document.getElementById("addopt").value = minoptvis ? "Fewer Options" : "More Options";
}

function Alea(seed) {
    if (seed === undefined) { seed = +new Date() + Math.random(); }
    function Mash() {
        var n = 4022871197;
        return function (r) {
            for (var t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
                s = r.charCodeAt(u), f = (e * (n += s) - (n * e | 0)),
                    n = 4294967296 * ((t = f * (e * n | 0)) - (t | 0)) + (t | 0);
            return (n | 0) * 2.3283064365386963e-10;
        }
    }
    return function () {
        var m = Mash(), a = m(" "), b = m(" "), c = m(" "), x = 1, y;
        seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
        a < 0 && a++, b < 0 && b++, c < 0 && c++;
        return function () {
            var y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
            return c = y - (x = y | 0);
        };
    }();
}

function slicegen() {
    switch (document.getElementById("slicesource").value) {
        case "rand":
            document.getElementById("slices").disabled = false;
            document.getElementById("leg").disabled = false;
            document.getElementById("mininf").disabled = false;
            document.getElementById("minres").disabled = false;
            document.getElementById("mintot").disabled = false;
            document.getElementById("maxtot").disabled = false;
            break;
        case "scpt2022":
        case "scpt2022+":
            document.getElementById("slices").disabled = true;
            document.getElementById("leg").disabled = true;
            document.getElementById("mininf").disabled = true;
            document.getElementById("minres").disabled = true;
            document.getElementById("mintot").disabled = true;
            document.getElementById("maxtot").disabled = true;
            document.getElementById("slices").value = "7";
            break;
        case "scpt2021":
            document.getElementById("slices").disabled = true;
            document.getElementById("leg").disabled = true;
            document.getElementById("mininf").disabled = true;
            document.getElementById("minres").disabled = true;
            document.getElementById("mintot").disabled = true;
            document.getElementById("maxtot").disabled = true;
            document.getElementById("slices").value = "8";
            break;
    }
}

function factgen() {
    switch (document.getElementById("factsource").value) {
        case "rand":
            document.getElementById("factions").disabled = false;
            break;
        case "scpt2021a":
        case "scpt2021b":
        case "scpt2021c":
        case "scpt2021d":
        case "scpt2021e":
        case "scpt2021f":
        case "scpt2021*":
        case "scpt2022a":
        case "scpt2022b":
        case "scpt2022c":
        case "scpt2022d":
        case "scpt2022e":
        case "scpt2022f":
        case "scpt2022g":
        case "scpt2022h":
        case "scpt2022i":
        case "scpt2022j":
        case "scpt2022k":
        case "scpt2022l":
        case "scpt2022m":
        case "scpt2022n":
        case "scpt2022o":
        case "scpt2022p":
        case "scpt2022q":
        case "scpt2022r":
        case "scpt2022_":
            document.getElementById("factions").disabled = true;
            document.getElementById("factions").value = "8";
            break;
        case "scpt2021z":
        case "scpt2022aa":
        case "scpt2022bb":
        case "scpt2022cc":
        case "scpt2022dd":
        case "scpt2022ee":
        case "scpt2022ff":
        case "scpt2022gg":
        case "scpt2022hh":
        case "scpt2022ii":
        case "scpt2022jj":
        case "scpt2022kk":
        case "scpt2022ll":
        case "scpt2022__":
            document.getElementById("factions").disabled = true;
            document.getElementById("factions").value = "7";
            break;
    }
}

function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var ordering = [];
var slices = [];
var factions = [];
var players = [];
var preferences = {};

const reference = {
    "Arborec": "The Arborec", "Argent": "The Argent Flight", "Letnev": "The Barony of Letnev",
    "Saar": "The Clan of Saar", "Muaat": "The Embers of Muaat", "Hacan": "The Emirates of Hacan",
    "Empyrean": "The Empyrean", "Sol": "The Federation of Sol", "Creuss": "The Ghosts of Creuss",
    "L1Z1X": "The L1Z1X Mindnet", "Mahact": "The Mahact Gene-Sorcerers", "Mentak": "The Mentak Coalition",
    "Naalu": "The Naalu Collective", "Naaz-Rokha": "The Naaz–Rokha Alliance", "Nekro": "The Nekro Virus",
    "Nomad": "The Nomad", "N'orr": "Sardakk N’orr", "Ul": "The Titans of Ul",
    "Jol-Nar": "The Universities of Jol–Nar", "Vuil'raith": "The Vuil’raith Cabal", "Winnu": "The Winnu",
    "Xxcha": "The Xxcha Kingdom", "Yin": "The Yin Brotherhood", "Yssaril": "The Yssaril Tribes"
};

var realtiles = true;

const resu = {
    19: 0, 20: 1, 21: 0.5, 22: 0.5, 23: 1, 24: 0, 25: 2, 26: 3, 27: 3.5, 28: 2, 29: 0, 30: 3,
    31: 3, 32: 0.5, 33: 2, 34: 0.5, 35: 3, 36: 2, 37: 0, 38: 5, 59: 0, 60: 2, 61: 2, 62: 3, 63: 0,
    64: 3, 65: 2, 66: 3, 67: 2, 68: 3, 69: 0, 70: 2, 71: 3.5, 72: 3, 73: 0, 74: 2, 75: 3, 76: 0.5
};
const infu = {
    19: 2, 20: 1, 21: 0.5, 22: 0.5, 23: 1, 24: 3, 25: 0, 26: 0, 27: 0.5, 28: 3, 29: 5, 30: 2,
    31: 0, 32: 2.5, 33: 2, 34: 3.5, 35: 3, 36: 2, 37: 6, 38: 0, 59: 3, 60: 0, 61: 0, 62: 0, 63: 2,
    64: 0, 65: 0, 66: 0, 67: 0, 68: 0, 69: 6, 70: 2, 71: 0.5, 72: 1, 73: 3, 74: 2, 75: 2, 76: 3.5
};
const rest = {
    19: 1, 20: 2, 21: 1, 22: 1, 23: 2, 24: 1, 25: 2, 26: 3, 27: 4, 28: 2, 29: 1, 30: 3,
    31: 3, 32: 1, 33: 3, 34: 2, 35: 5, 36: 3, 37: 1, 38: 5, 59: 1, 60: 2, 61: 2, 62: 3, 63: 0,
    64: 3, 65: 2, 66: 3, 67: 2, 68: 3, 69: 4, 70: 2, 71: 4, 72: 4, 73: 0, 74: 3, 75: 4, 76: 2
};
const inft = {
    19: 2, 20: 2, 21: 1, 22: 1, 23: 2, 24: 3, 25: 1, 26: 1, 27: 2, 28: 3, 29: 5, 30: 3,
    31: 1, 32: 3, 33: 2, 34: 4, 35: 4, 36: 3, 37: 6, 38: 0, 59: 3, 60: 1, 61: 0, 62: 2, 63: 2,
    64: 1, 65: 1, 66: 0, 67: 0, 68: 1, 69: 6, 70: 3, 71: 3, 72: 3, 73: 3, 74: 3, 75: 2, 76: 4
};

function randslices() {
    const p = players.length;
    const numslice = parseFloat(document.getElementById("slices").value) | 0;
    if (isNaN(numslice) || numslice <= 0) {
        alert("Slices Must Be A Positive Integer");
        return false;
    }
    if (numslice < p) {
        alert("Slices Cannot Be Less Than Number Of Players");
        return false;
    }
    if (numslice > 9) {
        alert("Cannot Have More Than Nine Slices");
        return false;
    }

    const legend = document.getElementById("leg").checked;

    const mininf = parseFloat(document.getElementById("mininf").value);
    if (isNaN(mininf) || mininf < 0) {
        alert("Minimum Optimal Influence Must Be A Positive Number");
        return false;
    }

    const minres = parseFloat(document.getElementById("minres").value);
    if (isNaN(minres) || minres < 0) {
        alert("Minimum Optimal Resources Must Be A Positive Number");
        return false;
    }

    const mintot = parseFloat(document.getElementById("mintot").value);
    if (isNaN(mintot) || mintot < 0) {
        alert("Minimum Optimal Total Must Be A Positive Number");
        return false;
    }

    const maxtot = parseFloat(document.getElementById("maxtot").value);
    if (isNaN(maxtot) || maxtot < 0) {
        alert("Maximum Optimal Total Must Be A Positive Number");
        return false;
    }

    if (maxtot < mintot) {
        alert("Maximum Optimal Total Must Be Greater Than Minimum Optimal Total");
        return false;
    }

    var minalpha = 0;
    var minbeta = 0;
    var minlegend = 0;
    if (legend) {
        minalpha = Math.random() < 0.5 ? 2 : 3;
        minbeta = Math.random() < 0.5 ? 2 : 3;
        minlegend = Math.random() < 0.5 ? 1 : 2;
    }

    var loops = 0;
    while (loops < 1000000) {
        loops += 1;
        slices = [];

        const high = shuffle([28, 29, 30, 32, 33, 35, 36, 38, 69, 70, 71, 75]).slice(-numslice);
        const meds = shuffle([26, 27, 31, 34, 37, 64, 65, 66, 72, 73, 74, 76]).slice(-numslice);
        const lows = shuffle([19, 20, 21, 22, 23, 24, 25, 59, 60, 61, 62, 63]).slice(-numslice);
        const reds = shuffle([39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 67, 68, 77, 78, 79, 80]).slice(-2 * numslice);

        if ((meds.includes(26) + reds.includes(39) + reds.includes(79)) < minalpha) {
            continue;
        }
        if ((lows.includes(25) + reds.includes(40) + meds.includes(64)) < minbeta) {
            continue;
        }
        if ((meds.includes(65) + meds.includes(66)) < minlegend) {
            continue;
        }
        var good = true;
        for (var i = 0; i < numslice; i++) {
            var s = [high[i], meds[i], lows[i], reds[2 * i], reds[2 * i + 1]];
            var sres = 0;
            var sinf = 0;
            for (var j = 0; j < s.length; j++) {
                var n = s[j];
                sres += resu[n] ?? 0;
                sinf += infu[n] ?? 0;
            }
            if ((sres < minres) || (sinf < mininf) || (sres + sinf < mintot) || (sres + sinf > maxtot)) {
                good = false;
                break;
            }
            if ((s.includes(26) + s.includes(39) + s.includes(79)) > 1) {
                good = false;
                break;
            }
            if ((s.includes(25) + s.includes(40) + s.includes(64)) > 1) {
                good = false;
                break;
            }
            if ((s.includes(65) + s.includes(66)) > 1) {
                good = false;
                break;
            }

            for (var k = 0; k < 12; k++) {
                s = shuffle(s);
                good = true;
                var neigh = [[0, 1], [0, 3], [1, 2], [1, 3], [1, 4], [3, 4]];
                var anom = [41, 42, 43, 44, 45, 67, 68, 79, 80];
                for (var j = 0; j < neigh.length; j++) {
                    if (anom.includes(s[neigh[j][0]]) && anom.includes(s[neigh[j][1]])) {
                        good = false;
                        break;
                    }
                }
                if (good) {
                    break;
                }
            }
            if (!good) {
                break;
            }

            slices.push(s);
        }
        if (good) {
            break;
        }
    }

    if (loops == 1000000) {
        alert("Could not generate slices after one million attempts.\nPlease try again or modify options.");
        return false;
    }
    return true;
}

async function start() {
    // Set random number seed for consistent results
    // TODO: Add a field to the page to make this optional/configurable
    Math.random = Alea(67382);

    players = [];
    for (var i = 1; i <= 8; i++) {
        var nom = document.getElementById("p" + i + "name").value;
        if (nom != "") {
            players.push(nom);
            preferences[nom] = {};
        }
    }
    const p = players.length;
    if (p < 3) {
        alert("Please Enter At Least Three Players");
        return false;
    }

    var numfact;
    switch (document.getElementById("factsource").value) {
        case "rand":
            numfact = parseFloat(document.getElementById("factions").value) | 0;
            factions = shuffle(Object.keys(reference)).slice(-numfact);
            break;
        case "simp":
            numfact = parseFloat(document.getElementById("factions").value) | 0;
            if (numfact == 24) {
                factions = shuffle(Object.keys(reference));
            }
            else {
                factions = [];
                var source = Object.keys(reference);
                const complex = {
                    "Arborec": 3, "Argent": 1, "Letnev": 1, "Saar": 2, "Muaat": 3, "Hacan": 1,
                    "Empyrean": 1, "Sol": 1, "Creuss": 2, "L1Z1X": 1, "Mahact": 3, "Mentak": 3,
                    "Naalu": 2, "Naaz-Rokha": 1, "Nekro": 3, "Nomad": 1, "N'orr": 2, "Ul": 2,
                    "Jol-Nar": 1, "Vuil'raith": 3, "Winnu": 2, "Xxcha": 1, "Yin": 1, "Yssaril": 1
                };
                while (factions.length < numfact) {
                    var a = (source.length * Math.random()) | 0;
                    var b = (source.length * Math.random()) | 0;
                    if (complex[source[a]] <= complex[source[b]]) {
                        factions.push(source[a]);
                        source.splice(a, 1);
                    }
                    else {
                        factions.push(source[b]);
                        source.splice(b, 1);
                    }
                }
                factions = shuffle(factions);
            }
            break;
        case "scpt2021a":
            numfact = 8;
            factions = ["Saar", "Nomad", "Winnu", "L1Z1X", "Creuss", "Mahact", "Xxcha", "Vuil'raith"];
            break;
        case "scpt2021b":
            numfact = 8;
            factions = ["Muaat", "Arborec", "Yin", "Naalu", "Mentak", "Yssaril", "N'orr", "Nekro"];
            break;
        case "scpt2021c":
            numfact = 8;
            factions = ["Argent", "Letnev", "Empyrean", "Ul", "Jol-Nar", "Hacan", "Sol", "Naaz-Rokha"];
            break;
        case "scpt2021d":
            numfact = 8;
            factions = ["Mahact", "Creuss", "Nomad", "Naaz-Rokha", "Ul", "Argent", "Vuil'raith", "Empyrean"];
            break;
        case "scpt2021e":
            numfact = 8;
            factions = ["Winnu", "Yssaril", "Arborec", "Nekro", "Muaat", "Yin", "Naalu", "Saar"];
            break;
        case "scpt2021f":
            numfact = 8;
            factions = ["Letnev", "L1Z1X", "Mentak", "Sol", "Hacan", "Jol-Nar", "Xxcha", "N'orr"];
            break;
        case "scpt2021*":
            numfact = 8;
            factions = [["Saar", "Nomad", "Winnu", "L1Z1X", "Creuss", "Mahact", "Xxcha", "Vuil'raith"],
            ["Muaat", "Arborec", "Yin", "Naalu", "Mentak", "Yssaril", "N'orr", "Nekro"],
            ["Argent", "Letnev", "Empyrean", "Ul", "Jol-Nar", "Hacan", "Sol", "Naaz-Rokha"],
            ["Mahact", "Creuss", "Nomad", "Naaz-Rokha", "Ul", "Argent", "Vuil'raith", "Empyrean"],
            ["Winnu", "Yssaril", "Arborec", "Nekro", "Muaat", "Yin", "Naalu", "Saar"],
            ["Letnev", "L1Z1X", "Mentak", "Sol", "Hacan", "Jol-Nar", "Xxcha", "N'orr"]][Math.random() * 6 | 0];
            break;
        case "scpt2021z":
            numfact = 7;
            factions = ["Sol", "Mentak", "Arborec", "Mahact", "Vuil'raith", "Letnev", "Ul"];
            break;
        case "scpt2022a":
            numfact = 8;
            factions = ["Argent", "Creuss", "Empyrean", "Mahact", "Naaz-Rokha", "Nomad", "Ul", "Vuil'raith"];
            break;
        case "scpt2022b":
            numfact = 8;
            factions = ["Arborec", "Muaat", "Naalu", "Nekro", "Saar", "Winnu", "Yin", "Yssaril"];
            break;
        case "scpt2022c":
            numfact = 8;
            factions = ["Hacan", "Jol-Nar", "L1Z1X", "Letnev", "Mentak", "N'orr", "Sol", "Xxcha"];
            break;
        case "scpt2022d":
            numfact = 8;
            factions = ["Creuss", "L1Z1X", "Mahact", "Nomad", "Saar", "Vuil'raith", "Winnu", "Xxcha"];
            break;
        case "scpt2022e":
            numfact = 8;
            factions = ["Arborec", "Mentak", "Muaat", "Naalu", "Nekro", "N'orr", "Yin", "Yssaril"];
            break;
        case "scpt2022f":
            numfact = 8;
            factions = ["Argent", "Empyrean", "Hacan", "Jol-Nar", "Letnev", "Naaz-Rokha", "Sol", "Ul"];
            break;
        case "scpt2022g":
            numfact = 8;
            factions = ["Creuss", "L1Z1X", "Mahact", "Muaat", "Nomad", "Sol", "Winnu", "Xxcha"];
            break;
        case "scpt2022h":
            numfact = 8;
            factions = ["Arborec", "Empyrean", "Hacan", "Mentak", "Naaz-Rokha", "Nekro", "Saar", "Yssaril"];
            break;
        case "scpt2022i":
            numfact = 8;
            factions = ["Argent", "Jol-Nar", "Letnev", "Naalu", "N'orr", "Ul", "Vuil'raith", "Yin"];
            break;
        case "scpt2022j":
            numfact = 8;
            factions = ["Creuss", "Empyrean", "Jol-Nar", "Muaat", "N'orr", "Nomad", "Sol", "Xxcha"];
            break;
        case "scpt2022k":
            numfact = 8;
            factions = ["Argent", "Mahact", "Naalu", "Nekro", "Saar", "Naaz-Rokha", "Winnu", "Yssaril"];
            break;
        case "scpt2022l":
            numfact = 8;
            factions = ["Arborec", "Hacan", "L1Z1X", "Letnev", "Mentak", "Ul", "Vuil'raith", "Yin"];
            break;
        case "scpt2022m":
            numfact = 8;
            factions = ["Arborec", "Creuss", "Mahact", "Mentak", "N'orr", "Winnu", "Xxcha", "Yin"];
            break;
        case "scpt2022n":
            numfact = 8;
            factions = ["Argent", "Empyrean", "Muaat", "Naaz-Rokha", "Saar", "Sol", "Vuil'raith", "Yssaril"];
            break;
        case "scpt2022o":
            numfact = 8;
            factions = ["Hacan", "Jol-Nar", "L1Z1X", "Letnev", "Naalu", "Nekro", "Nomad", "Ul"];
            break;
        case "scpt2022p":
            numfact = 8;
            factions = ["Arborec", "Argent", "Jol-Nar", "Letnev", "Nomad", "N'orr", "Vuil'raith", "Xxcha"];
            break;
        case "scpt2022q":
            numfact = 8;
            factions = ["Creuss", "Empyrean", "L1Z1X", "Nekro", "Saar", "Sol", "Ul", "Yin"];
            break;
        case "scpt2022r":
            numfact = 8;
            factions = ["Hacan", "Mahact", "Mentak", "Muaat", "Naalu", "Naaz-Rokha", "Winnu", "Yssaril"];
            break;
        case "scpt2022_":
            numfact = 8;
            factions = [["Argent", "Creuss", "Empyrean", "Mahact", "Naaz-Rokha", "Nomad", "Ul", "Vuil'raith"],
            ["Arborec", "Muaat", "Naalu", "Nekro", "Saar", "Winnu", "Yin", "Yssaril"],
            ["Hacan", "Jol-Nar", "L1Z1X", "Letnev", "Mentak", "N'orr", "Sol", "Xxcha"],
            ["Creuss", "L1Z1X", "Mahact", "Nomad", "Saar", "Vuil'raith", "Winnu", "Xxcha"],
            ["Arborec", "Mentak", "Muaat", "Naalu", "Nekro", "N'orr", "Yin", "Yssaril"],
            ["Argent", "Empyrean", "Hacan", "Jol-Nar", "Letnev", "Naaz-Rokha", "Sol", "Ul"],
            ["Creuss", "L1Z1X", "Mahact", "Muaat", "Nomad", "Sol", "Winnu", "Xxcha"],
            ["Arborec", "Empyrean", "Hacan", "Mentak", "Naaz-Rokha", "Nekro", "Saar", "Yssaril"],
            ["Argent", "Jol-Nar", "Letnev", "Naalu", "N'orr", "Ul", "Vuil'raith", "Yin"],
            ["Creuss", "Empyrean", "Jol-Nar", "Muaat", "N'orr", "Nomad", "Sol", "Xxcha"],
            ["Argent", "Mahact", "Naalu", "Nekro", "Saar", "Naaz-Rokha", "Winnu", "Yssaril"],
            ["Arborec", "Hacan", "L1Z1X", "Letnev", "Mentak", "Ul", "Vuil'raith", "Yin"],
            ["Arborec", "Creuss", "Mahact", "Mentak", "N'orr", "Winnu", "Xxcha", "Yin"],
            ["Argent", "Empyrean", "Muaat", "Naaz-Rokha", "Saar", "Sol", "Vuil'raith", "Yssaril"],
            ["Hacan", "Jol-Nar", "L1Z1X", "Letnev", "Naalu", "Nekro", "Nomad", "Ul"],
            ["Arborec", "Argent", "Jol-Nar", "Letnev", "Nomad", "N'orr", "Vuil'raith", "Xxcha"],
            ["Creuss", "Empyrean", "L1Z1X", "Nekro", "Saar", "Sol", "Ul", "Yin"],
            ["Hacan", "Mahact", "Mentak", "Muaat", "Naalu", "Naaz-Rokha", "Winnu", "Yssaril"]][Math.random() * 18 | 0];
            break;
        case "scpt2022aa":
            numfact = 7;
            factions = ["Argent", "Mahact", "Naaz-Rokha", "Nomad", "Saar", "Ul", "Vuil'raith"];
            break;
        case "scpt2022bb":
            numfact = 7;
            factions = ["Creuss", "Hacan", "L1Z1X", "Letnev", "Mentak", "Xxcha", "Yin"];
            break;
        case "scpt2022cc":
            numfact = 7;
            factions = ["Arborec", "L1Z1X", "Mentak", "Naalu", "Nekro", "N'orr", "Yin"];
            break;
        case "scpt2022dd":
            numfact = 7;
            factions = ["Argent", "Empyrean", "Jol-Nar", "Letnev", "Naaz-Rokha", "Sol", "Ul"];
            break;
        case "scpt2022ee":
            numfact = 7;
            factions = ["Creuss", "L1Z1X", "Mahact", "Muaat", "Naalu", "Nomad", "Winnu"];
            break;
        case "scpt2022ff":
            numfact = 7;
            factions = ["Arborec", "Hacan", "Mentak", "Naaz-Rokha", "Nekro", "Saar", "Yssaril"];
            break;
        case "scpt2022gg":
            numfact = 7;
            factions = ["Creuss", "Empyrean", "Muaat", "N'orr", "Sol", "Xxcha", "Yin"];
            break;
        case "scpt2022hh":
            numfact = 7;
            factions = ["Arborec", "Creuss", "Mahact", "N'orr", "Winnu", "Xxcha", "Yin"];
            break;
        case "scpt2022ii":
            numfact = 7;
            factions = ["Argent", "Empyrean", "Muaat", "Saar", "Sol", "Vuil'raith", "Yssaril"];
            break;
        case "scpt2022jj":
            numfact = 7;
            factions = ["Jol-Nar", "L1Z1X", "Letnev", "Naalu", "Nekro", "Ul", "Winnu"];
            break;
        case "scpt2022kk":
            numfact = 7;
            factions = ["Arborec", "Argent", "Jol-Nar", "Letnev", "Nekro", "Nomad", "Vuil'raith"];
            break;
        case "scpt2022ll":
            numfact = 7;
            factions = ["Hacan", "Mentak", "Muaat", "Naalu", "Winnu", "Xxcha", "Yssaril"];
            break;
        case "scpt2022__":
            numfact = 7;
            factions = [["Argent", "Mahact", "Naaz-Rokha", "Nomad", "Saar", "Ul", "Vuil'raith"],
            ["Creuss", "Hacan", "L1Z1X", "Letnev", "Mentak", "Xxcha", "Yin"],
            ["Arborec", "L1Z1X", "Mentak", "Naalu", "Nekro", "N'orr", "Yin"],
            ["Argent", "Empyrean", "Jol-Nar", "Letnev", "Naaz-Rokha", "Sol", "Ul"],
            ["Creuss", "L1Z1X", "Mahact", "Muaat", "Naalu", "Nomad", "Winnu"],
            ["Arborec", "Hacan", "Mentak", "Naaz-Rokha", "Nekro", "Saar", "Yssaril"],
            ["Creuss", "Empyrean", "Muaat", "N'orr", "Sol", "Xxcha", "Yin"],
            ["Arborec", "Creuss", "Mahact", "N'orr", "Winnu", "Xxcha", "Yin"],
            ["Argent", "Empyrean", "Muaat", "Saar", "Sol", "Vuil'raith", "Yssaril"],
            ["Jol-Nar", "L1Z1X", "Letnev", "Naalu", "Nekro", "Ul", "Winnu"],
            ["Arborec", "Argent", "Jol-Nar", "Letnev", "Nekro", "Nomad", "Vuil'raith"],
            ["Hacan", "Mentak", "Muaat", "Naalu", "Winnu", "Xxcha", "Yssaril"]][Math.random() * 12 | 0];
            break;
    }

    if (isNaN(numfact) || numfact <= 0) {
        alert("Factions Must Be A Positive Integer");
        return false;
    }
    if (numfact < p) {
        alert("Factions Cannot Be Less Than Number Of Players");
        return false;
    }
    if (numfact > 24) {
        alert("Cannot Have More Than 24 Factions");
        return false;
    }

    realtiles = document.getElementById("real").checked;
    var numslice;

    switch (document.getElementById("slicesource").value) {
        case "rand":
            if (!randslices()) {
                return false;
            }
            numslice = parseFloat(document.getElementById("slices").value) | 0;
            break;
        case "scpt2021":
            numslice = 8;
            slices = [[66, 34, 47, 62, 41],
            [29, 67, 48, 22, 61],
            [65, 69, 39, 20, 80],
            [35, 45, 26, 19, 78],
            [73, 40, 21, 60, 68],
            [23, 63, 79, 49, 37],
            [72, 42, 59, 77, 25],
            [64, 76, 24, 46, 44]];
            break;
        case "scpt2022":
            numslice = 7;
            slices = [[39, 35, 41, 66, 74],
            [26, 30, 59, 67, 49],
            [27, 69, 78, 64, 44],
            [43, 61, 36, 40, 73],
            [50, 37, 76, 20, 68],
            [65, 24, 46, 79, 28],
            [42, 25, 29, 47, 62]];
            break;
        case "scpt2022+":
            numslice = 7;
            slices = [[28, 19, 25, 43, 47],
            [34, 77, 36, 41, 64],
            [37, 60, 39, 50, 67],
            [42, 75, 78, 59, 24],
            [76, 66, 40, 62, 44],
            [68, 73, 79, 20, 65],
            [46, 71, 63, 31, 26]];
            break;
    }

    var content = '<div class="header" id="header"><span class="currentplayer" id="currplaybox"><p id="currentplayer" style="width: max-content;"></p></span>\
                           <span id="maplink"></span>\
                           <span><a onclick="section(\'players\')">Selections</a></span>\
                           <span><a onclick="section(\'slices\')">Slices</a></span>\
                           <span><a onclick="section(\'factions\')">Factions</a></span>\
                           <span><a onclick="section(\'positions\')">Positions</a></span></div><div class="results">';

    const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

    players = shuffle(players);
    for (var i = 0; i < p; i++) {
        content += "<table><col style='width:6em;'/><col style='width:6em;'/>\
                        <tr><td id='pname"+ i + "' class='pname'>" + roman[i] + ") " + players[i] + "</td>\
                        <td rowspan=3 id='pslice"+ i + "' class='pslice'><canvas id='playcanv" + i + "' width=360 height=360></canvas><p id='playcapt" + i + "'></p></td>\
                        <tr><td id='pfact"+ i + "' class='pfact'>&#10068;</td></tr><tr><td id='pspeak" + i + "' class='pspeak'><img src='order/speak_null.png'/></td></tr></table>";
    }

    content += "</div><div class='slices'>";
    for (var i = 0; i < numslice; i++) {
        content += '<div class="slicebox" id="slicebox' + i + '" ><canvas id="slicecanv' + i + '" width=360 height=360 onclick="fullscreen([' + slices[i] + '])"></canvas><p id="slicecapt' + i + '" class="slicecapt"></p></div>';
    }

    content += "</div><br/><div class='factions'>";
    for (var i = 0; i < numfact; i++) {
        var f = factions[i].replace("-", "").replace("'", "").toLowerCase();
        content += '<div class="facticon"><img src="factions/ti_' + f + '.png" title="' + reference[factions[i]] + '" id="factimg' + i + '" onclick="showref(\'' + f + '\')"/>\
                        <p>'+ factions[i].replace("-", "&ndash;").replace("'", "&rsquo;") + '</p>\
                        <p><input type="button" value="Draft" id="buttonfaction'+ i + '" onclick="draft(\'faction\', ' + i + ')"/></p></div>';
        var img = new Image();
        img.src = "factref/r_" + f + ".png";
    }

    content += "</div><br/><div class='speaker'>";
    for (var i = 0; i < p; i++) {
        content += '<div class="spkicon"><p><img src="order/speaker_' + (i + 1) + '_' + p + '.png" id="spkimg' + i + '"/>\
                    </p><p><input type="button" value="Draft" id="buttonposition'+ i + '" onclick="draft(\'position\', ' + i + ')"/></p></div>';
    }

    content += "</div><div><canvas id='finalcanvas' width=1800 height=2100 style='display: none; width: 90vw; height: 105vw;'/></div>\
                    <div id='tabletop' class='tabletop'></div>\
                    <div id='soverlay' class='soverlay' onclick='clearoverlay()'><canvas id='bigcanvas' width=1080 height=1080/></div>\
                    <div id='foverlay' class='foverlay' onclick='clearoverlay()'><img id='factref'/></div>";

    document.body.innerHTML = content;
    await new Promise(r => setTimeout(r, 400));

    for (var i = 0; i < p; i++) {
        ordering.push(i);
    }
    for (var i = p - 1; i >= 0; i--) {
        ordering.push(i);
    }
    for (var i = 0; i < p; i++) {
        ordering.push(i);
    }

    document.getElementById("pname0").style.backgroundColor = "#FFFFFF44";
    document.getElementById("pslice0").style.backgroundColor = "#FFFFFF44";
    document.getElementById("pfact0").style.backgroundColor = "#FFFFFF44";
    document.getElementById("pspeak0").style.backgroundColor = "#FFFFFF44";
    document.getElementById("pname0").style.fontWeight = "bold";

    const currentplayer = document.getElementById("currentplayer");
    var turnwidth = 0;
    for (var i = 0; i < p; i++) {
        currentplayer.innerHTML = "Current Player: " + players[i] + " &#9196;";
        turnwidth = Math.max(turnwidth, currentplayer.offsetWidth);
    }
    currentplayer.style.width = "" + (2 + turnwidth) + "px";
    currentplayer.innerHTML = "Current Player: " + players[0] + " &#9196;";
    document.getElementById("maplink").style.flex = 0;

    const origins = [[0.25, 1.75], [1.0, 1.25], [1.75, 1.75], [0.25, 0.75], [1.0, 0.25], [1.0, 2.25]];
    const h = 360 / 3.5;
    const w = 360 / 3;
    for (var i = 0; i < p; i++) {
        var c = document.getElementById("playcanv" + i).getContext("2d");
        c.strokeStyle = '#ffffff';
        for (var j = 0; j < origins.length; j++) {
            var x = origins[j][0];
            var y = origins[j][1];
            c.beginPath();
            c.moveTo(w * (x + 0.25), h * (y + 0.0));
            c.lineTo(w * (x + 0.75), h * (y + 0.0));
            c.lineTo(w * (x + 1.00), h * (y + 0.5));
            c.lineTo(w * (x + 0.75), h * (y + 1.0));
            c.lineTo(w * (x + 0.25), h * (y + 1.0));
            c.lineTo(w * (x + 0.00), h * (y + 0.5));
            c.lineTo(w * (x + 0.25), h * (y + 0.0));
            c.stroke();
        }
    }

    for (var i = 0; i < numslice; i++) {
        var c = document.getElementById("slicecanv" + i).getContext("2d");
        var restot = 0;
        var inftot = 0;
        var resopt = 0;
        var infopt = 0;

        const maskhex = [[1.5, 0.75], [2.25, 2.25], [2.0, 2.75], [1.0, 2.75], [0.5, 1.75], [1.0, 0.75], [1.5, 0.75]];
        c.beginPath();
        c.moveTo(maskhex[0][0] * w, maskhex[0][1] * h);
        for (var k = 1; k < maskhex.length; k++) {
            c.lineTo(maskhex[k][0] * w, maskhex[k][1] * h);
        }
        c.fillStyle = "navy";
        c.fill();

        for (var j = 0; j < slices[i].length; j++) {
            var n = slices[i][j];
            restot += (n in rest) ? rest[n] : 0;
            inftot += (n in inft) ? inft[n] : 0;
            resopt += (n in resu) ? resu[n] : 0;
            infopt += (n in infu) ? infu[n] : 0;
            var tile = new Image();
            tile.param = {
                x: origins[j][0] * w,
                y: origins[j][1] * h,
                c: c
            };
            tile.onload = function () {
                this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
            };
            tile.src = (realtiles ? "tiles" : "joe") + "/sys_" + n + ".png";
        }
        var tile = new Image();
        tile.param = {
            x: 1.0 * w,
            y: 2.25 * h,
            c: c
        };
        tile.onload = function () {
            this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
        };
        tile.src = (realtiles ? "tiles" : "joe") + "/sys_0.png";

        var special = "";
        special += "B".repeat(slices[i].includes(21) + slices[i].includes(34) + slices[i].includes(59) + slices[i].includes(74));
        special += "G".repeat(slices[i].includes(22) + slices[i].includes(27) + slices[i].includes(63) + slices[i].includes(76));
        special += "R".repeat(slices[i].includes(24) + slices[i].includes(37) + slices[i].includes(61) + slices[i].includes(72));
        special += "Y".repeat(slices[i].includes(19) + slices[i].includes(31) + slices[i].includes(62) + slices[i].includes(73));
        special += special == "" ? "" : " ";
        special += "L".repeat(slices[i].includes(65) + slices[i].includes(66));
        special += special.slice(-1) == "L" ? " " : "";
        special += "&alpha;".repeat(slices[i].includes(26) + slices[i].includes(39) + slices[i].includes(79));
        special += "&beta;".repeat(slices[i].includes(25) + slices[i].includes(40) + slices[i].includes(64));
        if (special.slice(-1) == " ") {
            special = special.slice(0, -1);
        }
        document.getElementById("slicecapt" + i).outerHTML = "<p>" + restot + "/" + inftot + "</p>\
                    <p>("+ (resopt | 0) + "" + (resopt - (resopt | 0) > 0.4 ? "&half;" : "") + "/" + (infopt | 0) + "" + (infopt - (infopt | 0) > 0.4 ? "&half;" : "") + ")</p>\
                    <p>"+ special + "</p>\
                    <p><input type='button' value='Draft' id='buttonslice"+ i + "' onclick='draft(\"slice\", " + i + ")'/></p>";
        await new Promise(r => setTimeout(r, 400));
    }

    return;
}

function fullscreen(s) {
    const c = document.getElementById("bigcanvas").getContext("2d");
    const h = 1080 / (3 + 0.1);
    const w = 1080 / (2.5 + 0.1);
    c.clearRect(0, 0, 1080, 1080);

    const maskhex = [[1.3, 0.55], [2.05, 2.05], [1.8, 2.55], [0.8, 2.55], [0.3, 1.55], [0.8, 0.55], [1.3, 0.55]];
    c.beginPath();
    c.moveTo(maskhex[0][0] * w, maskhex[0][1] * h);
    for (var k = 1; k < maskhex.length; k++) {
        c.lineTo(maskhex[k][0] * w, maskhex[k][1] * h);
    }
    c.fillStyle = "navy";
    c.fill();

    const origins = [[0.05, 1.55], [0.8, 1.05], [1.55, 1.55], [0.05, 0.55], [0.8, 0.05]];
    for (var j = 0; j < s.length; j++) {
        var n = s[j];
        var tile = new Image();
        tile.param = {
            x: origins[j][0] * w,
            y: origins[j][1] * h,
            c: c
        };
        tile.onload = function () {
            this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
        };
        tile.src = (realtiles ? "tiles" : "joe") + "/sys_" + n + ".png";
    }
    var tile = new Image();
    tile.param = {
        x: 0.8 * w,
        y: 2.05 * h,
        c: c
    };
    tile.onload = function () {
        this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
    };
    tile.src = (realtiles ? "tiles" : "joe") + "/sys_0.png";
    document.getElementById("soverlay").style.display = "block";
}

function showref(f) {
    document.getElementById("factref").src = "factref/r_" + f + ".png";
    document.getElementById("foverlay").style.display = "block";
}

function clearoverlay() {
    document.getElementById("soverlay").style.display = "none";
    document.getElementById("foverlay").style.display = "none";
}

const used = { "slice": [], "faction": [], "position": [] };

function draft(obj, choice) {
    const active = ordering.shift();
    if (used[obj].includes(active)) {
        alert(players[active] + " has already drafted a " + obj);
        ordering.unshift(active);
        return;
    }

    used[obj].push(active);
    preferences[players[active]][obj] = choice;

    switch (obj) {
        case "slice":
            document.getElementById("buttonslice" + choice).outerHTML = "<p><i>" + players[active] + "</i></p>";
            const s = slices[choice];
            const c = document.getElementById("playcanv" + active).getContext("2d");
            c.clearRect(0, 0, 360, 360);
            const origins = [[0.25, 1.75], [1.0, 1.25], [1.75, 1.75], [0.25, 0.75], [1.0, 0.25]];
            const h = 360 / 3.5;
            const w = 360 / 3;
            var restot = 0;
            var inftot = 0;
            var resopt = 0;
            var infopt = 0;
            for (var j = 0; j < s.length; j++) {
                var n = s[j];
                restot += (n in rest) ? rest[n] : 0;
                inftot += (n in inft) ? inft[n] : 0;
                resopt += (n in resu) ? resu[n] : 0;
                infopt += (n in infu) ? infu[n] : 0;
                var tile = new Image();
                tile.param = {
                    x: origins[j][0] * w,
                    y: origins[j][1] * h,
                    c: c
                };
                tile.onload = function () {
                    this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
                };
                tile.src = (realtiles ? "tiles" : "joe") + "/sys_" + n + ".png";
            }
            var tile = new Image();
            tile.param = {
                x: 1.0 * w,
                y: 2.25 * h,
                c: c
            };
            tile.onload = function () {
                this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
            };
            tile.src = (realtiles ? "tiles" : "joe") + "/sys_0.png";

            var special = "";
            special += "B".repeat(s.includes(21) + s.includes(34) + s.includes(59) + s.includes(74));
            special += "G".repeat(s.includes(22) + s.includes(27) + s.includes(63) + s.includes(76));
            special += "R".repeat(s.includes(24) + s.includes(37) + s.includes(61) + s.includes(72));
            special += "Y".repeat(s.includes(19) + s.includes(31) + s.includes(62) + s.includes(73));
            special += special == "" ? "" : " ";
            special += "L".repeat(s.includes(65) + s.includes(66));
            special += special.slice(-1) == "L" ? " " : "";
            special += "&alpha;".repeat(s.includes(26) + s.includes(39) + s.includes(79));
            special += "&beta;".repeat(s.includes(25) + s.includes(40) + s.includes(64));
            if (special.slice(-1) == " ") {
                special = special.slice(0, -1);
            }
            document.getElementById("playcapt" + active).outerHTML = "<p>" + restot + "/" + inftot + "</p>\
                        <p>("+ (resopt | 0) + "" + (resopt - (resopt | 0) > 0.4 ? "&half;" : "") + "/" + (infopt | 0) + "" + (infopt - (infopt | 0) > 0.4 ? "&half;" : "") + ")</p>\
                        <p>"+ special + "</p>";
            document.getElementById("playcanv" + active).onclick = function () { fullscreen(s); };
            document.getElementById("slicecanv" + choice).style.filter = "grayscale(100%)";
            break;

        case "faction":
            document.getElementById("buttonfaction" + choice).outerHTML = "<i>" + players[active] + "</i>";
            const f = factions[choice].replace("-", "").replace("'", "").toLowerCase();
            const t = reference[factions[choice]];
            const r = factions[choice].replace("-", "&ndash;").replace("'", "&rsquo;");
            document.getElementById("pfact" + active).innerHTML = '<img src="factions/ti_' + f + '.png" title="' + t + '" onclick="showref(\'' + f + '\')"/><p>' + r + '</p>';
            document.getElementById("factimg" + choice).style.filter = "grayscale(100%)";
            break;

        case "position":
            document.getElementById("buttonposition" + choice).outerHTML = "<p><i>" + players[active] + "</i></p>";
            document.getElementById("pspeak" + active).innerHTML = '<img src="order/speaker_' + (choice + 1) + '_' + (players.length) + '.png"/>';
            document.getElementById("spkimg" + choice).style.filter = "grayscale(100%)";
            break;
    }

    document.getElementById("pname" + active).style.backgroundColor = "#FFFFFF00";
    document.getElementById("pslice" + active).style.backgroundColor = "#FFFFFF00";
    document.getElementById("pfact" + active).style.backgroundColor = "#FFFFFF00";
    document.getElementById("pspeak" + active).style.backgroundColor = "#FFFFFF00";
    document.getElementById("pname" + active).style.fontWeight = "normal";

    if (ordering.length > 0) {
        document.getElementById("pname" + ordering[0]).style.backgroundColor = "#FFFFFF44";
        document.getElementById("pslice" + ordering[0]).style.backgroundColor = "#FFFFFF44";
        document.getElementById("pfact" + ordering[0]).style.backgroundColor = "#FFFFFF44";
        document.getElementById("pspeak" + ordering[0]).style.backgroundColor = "#FFFFFF44";
        document.getElementById("pname" + ordering[0]).style.fontWeight = "bold";

        document.getElementById("currentplayer").innerHTML = "Current Player: " + players[ordering[0]] + " ";
        if (ordering.length == 1) {
            document.getElementById("currentplayer").innerHTML += "&#9209;&#65039;";
        }
        else if (ordering.length == players.length + 1 || ordering.length == 2 * players.length + 1) {
            document.getElementById("currentplayer").innerHTML += "&#128260;";
        }
        else if (ordering.length > players.length + 1 && ordering.length < 2 * players.length + 1) {
            document.getElementById("currentplayer").innerHTML += "&#9195;";
        }
        else {
            document.getElementById("currentplayer").innerHTML += "&#9196;";
        }

        for (var i = 0; i < slices.length; i++) {
            var elem = document.getElementById("buttonslice" + i);
            if (elem) {
                elem.style.display = used.slice.includes(ordering[0]) ? "none" : "inline-block";
            }
        }
        for (var i = 0; i < factions.length; i++) {
            var elem = document.getElementById("buttonfaction" + i);
            if (elem) {
                elem.style.display = used.faction.includes(ordering[0]) ? "none" : "inline-block";
            }
        }
        for (var i = 0; i < players.length; i++) {
            var elem = document.getElementById("buttonposition" + i);
            if (elem) {
                elem.style.display = used.position.includes(ordering[0]) ? "none" : "inline-block";
            }
        }
    }
    else {
        for (var i = 0; i < slices.length; i++) {
            var elem = document.getElementById("buttonslice" + i);
            if (elem) {
                elem.style.display = "none";
            }
        }
        for (var i = 0; i < factions.length; i++) {
            var elem = document.getElementById("buttonfaction" + i);
            if (elem) {
                elem.style.display = "none";
            }
        }
        for (var i = 0; i < players.length; i++) {
            var elem = document.getElementById("buttonposition" + i);
            if (elem) {
                elem.style.display = "none";
            }
        }
        finalmap();
    }
}

var mapstate;
var shownumbers = false;
var listtts;
var loadings = 0;

var hypertile = [];
var hyperpos = [];
var locations = [];
var homeloc = [];
var factselect = [];

async function finalmap() {
    document.getElementById("maplink").innerHTML = '<a onclick="section(\'map\')">Map</a>';
    document.getElementById("maplink").style.flex = 1;
    document.getElementById("currplaybox").innerHTML = "&nbsp;";
    document.getElementById("currplaybox").style.flex = 2;

    const p = players.length;
    const clockwise = new Array(p);
    for (var i = 0; i < p; i++) {
        clockwise[preferences[players[i]].position] = players[i];
        factselect.push(factions[preferences[players[i]].faction]);
    }
    const colours = colourise();

    const fel = document.getElementById("finalcanvas");
    fel.style.display = "block";
    const c = fel.getContext("2d");
    var w, h, u, v, maskhex;

    switch (p) {
        case 3:
        case 4:
        case 5:
        case 6:
            w = 289.675;
            h = 250;
            u = (1800 - 5.5 * w) / 2;
            v = (2100 - 7 * h) * 2 / 3;
            maskhex = [[2.25, 0.5], [3.25, 0.5], [4.75, 1.5], [5.25, 2.5], [5.25, 4.5], [4.75, 5.5],
            [3.25, 6.5], [2.25, 6.5], [0.75, 5.5], [0.25, 4.5], [0.25, 2.5], [0.75, 1.5], [2.25, 0.5]];
            break;
        case 7:
            w = 230.940;
            h = 200;
            u = (1600 - 6.25 * w) / 2;
            v = (2100 - 9 * h) * 2 / 3;
            maskhex = [[3, 0.5], [4, 0.5], [4.75, 2], [5.5, 2.5], [6, 3.5], [6, 5.5], [5.5, 6.5], [4.75, 7],
            [4, 8.5], [3, 8.5], [1.5, 7.5], [1, 6.5], [1, 5.5], [0.25, 4], [1.5, 1.5], [3, 0.5]];
            fel.width = 1600;
            fel.style.height = "118.125vw";
            break;
        case 8:
            w = 230.940;
            h = 200;
            u = (1800 - 7 * w) / 2;
            v = (2100 - 9 * h) * 2 / 3;
            maskhex = [[3, 0.5], [4, 0.5], [5.5, 1.5], [6, 2.5], [6, 3.5], [6.75, 5], [5.5, 7.5],
            [4, 8.5], [3, 8.5], [1.5, 7.5], [1, 6.5], [1, 5.5], [0.25, 4], [1.5, 1.5], [3, 0.5]];
            break;
    }

    if (realtiles) {
        w *= 2;
        h *= 2;
        u *= 2;
        v *= 2;
        fel.width = p == 7 ? 3200 : 3600;
        fel.height = 4200;
    }

    listtts = false;
    tilelist();
    document.getElementById("tabletop").onclick = tilelist;

    c.beginPath();
    c.moveTo(maskhex[0][0] * w + u, maskhex[0][1] * h + v);
    for (var k = 1; k < maskhex.length; k++) {
        c.lineTo(maskhex[k][0] * w + u, maskhex[k][1] * h + v);
    }
    c.fillStyle = "navy";
    c.fill();
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "white";
    c.lineWidth = realtiles ? 8 : 4;
    c.strokeStyle = "black";
    c.font = realtiles ? (p <= 6 ? "120pt slider" : "96pt slider") : (p <= 6 ? "60pt slider" : "48pt slider");
    c.strokeText("18", p <= 6 ? 2.75 * w + u : 3.5 * w + u, p <= 6 ? 3.5 * h + v : 4.5 * h + v);
    c.fillText("18", p <= 6 ? 2.75 * w + u : 3.5 * w + u, p <= 6 ? 3.5 * h + v : 4.5 * h + v);

    var tile = new Image();
    tile.param = {
        x: p <= 6 ? 2.25 * w + u : 3 * w + u,
        y: p <= 6 ? 3 * h + v : 4 * h + v,
        c: c
    };
    tile.onload = function () {
        loadings += 1;
        this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
    };
    loadings -= 1;
    tile.src = (realtiles ? "tiles" : "joe") + "/sys_18.png";

    var tile = new Image();
    tile.param = {
        x: (p <= 6 ? 2.5 : 3.25) * w + u,
        v: v,
        c: c
    };
    tile.onload = function () {
        loadings += 1;
        this.param.c.drawImage(this, this.param.x, (this.param.v - 721 / 2200 * w) / 3, w / 2, 721 / 2200 * w);
    };
    loadings -= 1;
    tile.src = "order/speaker_m.png";

    const hometile = {
        "Arborec": 5, "Argent": 58, "Letnev": 10,
        "Saar": 11, "Muaat": 4, "Hacan": 16,
        "Empyrean": 56, "Sol": 1, "Creuss": 17,
        "L1Z1X": 6, "Mahact": 52, "Mentak": 2,
        "Naalu": 9, "Naaz-Rokha": 57, "Nekro": 8,
        "Nomad": 53, "N'orr": 13, "Ul": 55,
        "Jol-Nar": 12, "Vuil'raith": 54, "Winnu": 7,
        "Xxcha": 14, "Yin": 3, "Yssaril": 15
    };
    const tinthex = [[0.25, 0], [0.75, 0], [1, 0.5], [0.75, 1], [0.25, 1], [0, 0.5], [0.25, 0]];

    var labels = [];
    var labang = [];
    var darken = [];
    var lighten = [];
    var homelight = [];
    var homedark = [];
    var hyperang = [];
    var hyperlight = [];
    var hyperdark = [];
    var creuss;

    switch (p) {
        case 3:
            locations = [[[3, 0.5], [2.25, 1], [1.5, 0.5], [3.75, 2], [2.25, 2]],
            [[3.75, 5], [3.75, 4], [4.5, 3.5], [2.25, 5], [3, 3.5]],
            [[0, 3.5], [0.75, 4], [0.75, 5], [0.75, 2], [1.5, 3.5]]];
            homeloc = [[2.25, 0], [4.5, 4.5], [0, 4.5]];
            labels = [[2.75, -0.17], [5.50, 5.34], [0.00, 5.34]];
            labang = [0.0, 2.0943951023931953, 4.1887902047863905];
            lighten = [1, 2, 4, 9, 18, 27, 36, 54, 81, 108, 162, 324];
            darken = [3, 6, 12];
            hypertile = ["84A", "83A", "87A", "85A", "88A", "86A",
                "84A", "83A", "87A", "85A", "88A", "86A",
                "84A", "83A", "87A", "85A", "88A", "86A"];
            hyperpos = [[4.5, 2.5], [3.75, 1], [3.75, 3], [3, 2.5], [3, 1.5], [4.5, 1.5],
            [1.5, 5.5], [3, 5.5], [1.5, 4.5], [2.25, 4], [3, 4.5], [2.25, 6],
            [0.75, 1], [0, 2.5], [1.5, 1.5], [1.5, 2.5], [0.75, 3], [0, 1.5]];
            hyperang = [4.1887902047863905, 4.1887902047863905, 4.1887902047863905, 4.1887902047863905, 4.1887902047863905, 4.1887902047863905,
                0, 0, 0, 0, 0, 0,
                2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953];
            hyperlight = [];
            hyperdark = [0, 1, 3, 6, 7, 9, 12, 13, 15];
            c.font = realtiles ? "96pt Garamond" : "48pt Garamond";
            break;
        case 4:
            locations = [[[3, 0.5], [2.25, 1], [1.5, 0.5], [3, 1.5], [2.25, 2]],
            [[4.5, 2.5], [3.75, 2], [3.75, 1], [3.75, 4], [3, 2.5]],
            [[1.5, 5.5], [2.25, 5], [3, 5.5], [1.5, 4.5], [2.25, 4]],
            [[0, 3.5], [0.75, 4], [0.75, 5], [0.75, 2], [1.5, 3.5]]];
            homeloc = [[2.25, 0], [4.5, 1.5], [2.25, 6], [0, 4.5]];
            labels = [[2.75, -0.17], [5.50, 1.67], [2.75, 7.17], [0.00, 5.34]];
            labang = [0.0, 1.0471975511965976, 3.141592653589793, 4.1887902047863905];
            lighten = [1, 6, 8, 9, 12, 72, 81, 648];
            darken = [2, 3, 4, 18, 24, 36, 54, 162, 216, 324];
            hypertile = ["84A", "83A", "87A", "85A", "88A", "86A",
                "84A", "83A", "87A", "85A", "88A", "86A"];
            hyperpos = [[3.75, 5], [4.5, 3.5], [3, 4.5], [3, 3.5], [3.75, 3], [4.5, 4.5],
            [0.75, 1], [0, 2.5], [1.5, 1.5], [1.5, 2.5], [0.75, 3], [0, 1.5]];
            hyperang = [5.235987755982989, 5.235987755982989, 5.235987755982989, 5.235987755982989, 5.235987755982989, 5.235987755982989,
                2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953, 2.0943951023931953];
            hyperlight = [0, 1, 3, 6, 7, 9];
            hyperdark = [];
            c.font = realtiles ? "96pt Garamond" : "48pt Garamond";
            break;
        case 5:
            locations = [[[3, 0.5], [2.25, 1], [1.5, 0.5], [3, 1.5], [2.25, 2]],
            [[4.5, 2.5], [3.75, 2], [3.75, 1], [3.75, 3], [3, 2.5]],
            [[3.75, 5], [3.75, 4], [4.5, 3.5], [2.25, 5], [3, 3.5]],
            [[0, 3.5], [0.75, 4], [0.75, 5], [0.75, 3], [1.5, 3.5]],
            [[0.75, 1], [0.75, 2], [0, 2.5], [1.5, 1.5], [1.5, 2.5]]];
            homeloc = [[2.25, 0], [4.5, 1.5], [4.5, 4.5], [0, 4.5], [0, 1.5]];
            labels = [[2.75, -0.17], [5.50, 1.67], [5.50, 5.34], [0.00, 5.34], [0.00, 1.67]];
            labang = [0.0, 1.0471975511965976, 2.0943951023931953, 4.1887902047863905, 5.235987755982989];
            lighten = [1, 4, 6, 8, 9, 36, 48, 72, 81, 108, 324, 648];
            darken = [2, 3, 12, 16, 18, 24, 144, 162, 1296];
            hypertile = ["84A", "83A", "87A", "85A", "88A", "86A"];
            hyperpos = [[1.5, 5.5], [3, 5.5], [1.5, 4.5], [2.25, 4], [3, 4.5], [2.25, 6]];
            hyperang = [0, 0, 0, 0, 0, 0];
            hyperlight = [];
            hyperdark = [0, 1, 3];
            c.font = realtiles ? "96pt Garamond" : "48pt Garamond";
            break;
        case 6:
            locations = [[[3, 0.5], [2.25, 1], [1.5, 0.5], [3, 1.5], [2.25, 2]],
            [[4.5, 2.5], [3.75, 2], [3.75, 1], [3.75, 3], [3, 2.5]],
            [[3.75, 5], [3.75, 4], [4.5, 3.5], [3, 4.5], [3, 3.5]],
            [[1.5, 5.5], [2.25, 5], [3, 5.5], [1.5, 4.5], [2.25, 4]],
            [[0, 3.5], [0.75, 4], [0.75, 5], [0.75, 3], [1.5, 3.5]],
            [[0.75, 1], [0.75, 2], [0, 2.5], [1.5, 1.5], [1.5, 2.5]]];
            homeloc = [[2.25, 0], [4.5, 1.5], [4.5, 4.5], [2.25, 6], [0, 4.5], [0, 1.5]];
            labels = [[2.75, -0.17], [5.50, 1.67], [5.50, 5.34], [2.75, 7.17], [0.00, 5.34], [0.00, 1.67]];
            labang = [0.0, 1.0471975511965976, 2.0943951023931953, 3.141592653589793, 4.1887902047863905, 5.235987755982989];
            lighten = [1, 4, 6, 9, 16, 24, 36, 81, 96, 144, 324, 1296];
            darken = [2, 3, 8, 12, 18, 32, 48, 72, 162, 288, 648, 2592];
            c.font = realtiles ? "96pt Garamond" : "48pt Garamond";
            break;
        case 7:
            locations = [[[3.75, 0.5], [3, 1], [2.25, 0.5], [3.75, 2.5], [3, 2]],
            [[5.25, 3.5], [4.5, 3], [4.5, 2], [4.5, 4], [3.75, 3.5]],
            [[4.5, 6], [4.5, 5], [5.25, 4.5], [3.75, 5.5], [3.75, 4.5]],
            [[2.25, 7.5], [3, 7], [3.75, 7.5], [2.25, 6.5], [3, 6]],
            [[0.75, 5.5], [1.5, 6], [1.5, 7], [1.5, 5], [2.25, 5.5]],
            [[0, 3], [1.5, 4], [0.75, 4.5], [1.5, 3], [2.25, 3.5]],
            [[1.5, 1], [1.5, 2], [0.75, 2.5], [2.25, 1.5], [2.25, 2.5]]];
            homeloc = [[3, 0], [5.25, 2.5], [5.25, 5.5], [3, 8], [0.75, 6.5], [0, 4], [0.75, 1.5]];
            labels = [[3.5, -0.17], [6.25, 2.67], [6.25, 6.34], [3.5, 9.17], [0.75, 7.34], [0.00, 4.84], [0.75, 1.67]];
            labang = [0.0, 1.0471975511965976, 2.0943951023931953, 3.141592653589793, 4.1887902047863905, 4.1887902047863905, 5.235987755982989];
            lighten = [1728, 32, 864, 6, 288, 324, 36, 48, 648, 4, 8, 72];
            darken = [9, 1, 192, 81, 18, 2592, 162, 2, 432, 12, 216];
            homelight = [0, 6];
            homedark = [3, 4, 5];
            hypertile = ["85B", "88B", "86B", "84B", "90B", "83B",];
            hyperpos = [[3, 3], [3.75, 1.5], [3.75, 6.5], [3, 5], [2.25, 4.5], [0.75, 3.5]];
            hyperang = [0, 3.141592653589793, 3.141592653589793, 3.141592653589793, 0, 2.0943951023931953];
            hyperlight = [0, 1, 4];
            hyperdark = [2, 3, 5];
            c.font = realtiles ? "72pt Garamond" : "36pt Garamond";
            break;
        case 8:
            locations = [[[3.75, 0.5], [3, 1], [2.25, 0.5], [3.75, 1.5], [3, 2]],
            [[5.25, 2.5], [4.5, 2], [4.5, 1], [4.5, 3], [3.75, 2.5]],
            [[6, 5], [4.5, 4], [5.25, 3.5], [4.5, 5], [3.75, 4.5]],
            [[4.5, 7], [4.5, 6], [5.25, 5.5], [3.75, 6.5], [3.75, 5.5]],
            [[2.25, 7.5], [3, 7], [3.75, 7.5], [2.25, 6.5], [3, 6]],
            [[0.75, 5.5], [1.5, 6], [1.5, 7], [1.5, 5], [2.25, 5.5]],
            [[0, 3], [1.5, 4], [0.75, 4.5], [1.5, 3], [2.25, 3.5]],
            [[1.5, 1], [1.5, 2], [0.75, 2.5], [2.25, 1.5], [2.25, 2.5]]];
            homeloc = [[3, 0], [5.25, 1.5], [6, 4], [5.25, 6.5], [3, 8], [0.75, 6.5], [0, 4], [0.75, 1.5]];
            labels = [[3.5, -0.17], [6.25, 1.67], [7.00, 4.17], [6.25, 7.34], [3.50, 9.17], [0.75, 7.34], [0.00, 4.84], [0.75, 1.67]];
            labang = [0.0, 1.0471975511965976, 1.0471975511965976, 2.0943951023931953, 3.141592653589793, 4.1887902047863905, 4.1887902047863905, 5.235987755982989];
            lighten = [16, 24, 27, 54, 64, 96, 144, 324, 576, 1296, 1728, 3456];
            darken = [1, 4, 6, 9, 36, 81, 108, 216, 384, 432, 864, 5184];
            homelight = [0, 1, 7];
            homedark = [3, 4, 5];
            hypertile = ["87A", "90B", "85B", "88A", "89B", "83B",];
            hyperpos = [[3, 3], [3.75, 3.5], [5.25, 4.5], [3, 5], [2.25, 4.5], [0.75, 3.5]];
            hyperang = [1.0471975511965976, 3.141592653589793, 2.0943951023931953, 2.0943951023931953, 0, 2.0943951023931953];
            hyperlight = [0, 2, 4];
            hyperdark = [1, 3, 5];
            creuss = [[4.08, 0.17], [6.33, 2.33], [7.08, 4.83], [5.75, 7.67], [2.92, 8.83], [0.67, 6.67], [-0.08, 4.17], [1.25, 1.33]];
            c.font = realtiles ? "72pt Garamond" : "36pt Garamond";
            break;
    }

    for (var i = 0; i < p; i++) {
        c.beginPath();
        c.strokeStyle = "white";
        c.lineWidth = realtiles ? 6 : 3;
        c.fillStyle = colours[players.indexOf(clockwise[i])];
        c.arc(homeloc[i][0] * w + w / 2 + u, homeloc[i][1] * h + h / 2 + v, w / 2, 0, 2 * Math.PI);
        c.stroke();
        c.fill();
        for (var j = 0; j < slices[i].length; j++) {
            var tile = new Image();
            tile.param = {
                x: locations[i][j][0] * w + u,
                y: locations[i][j][1] * h + v,
                c: c,
                tint: lighten.includes(Math.pow(2, i) * Math.pow(3, j)) ? "#FFFFFF20" : (darken.includes(Math.pow(2, i) * Math.pow(3, j)) ? "#00000020" : "")
            };
            tile.onload = function () {
                loadings += 1;
                this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
                if (!realtiles && this.param.tint) {
                    this.param.c.beginPath();
                    this.param.c.moveTo(tinthex[0][0] * w + this.param.x, tinthex[0][1] * h + this.param.y);
                    for (var k = 1; k < tinthex.length; k++) {
                        this.param.c.lineTo(tinthex[k][0] * w + this.param.x, tinthex[k][1] * h + this.param.y);
                    }
                    this.param.c.fillStyle = this.param.tint;
                    this.param.c.fill();
                }
            };
            loadings -= 1;
            tile.src = (realtiles ? "tiles" : "joe") + "/sys_" + (slices[preferences[clockwise[i]].slice][j]) + ".png";
            await new Promise(r => setTimeout(r, 8 * 2 ** -loadings));
        }
        if (factions[preferences[clockwise[i]].faction] == "Creuss" && p == 8 && false) {
            var tile = new Image();
            tile.param = {
                x: creuss[i][0] * w + u,
                y: creuss[i][1] * h + v,
                c: c,
                i: i,
                tint: homelight.includes(i) ? "#FFFFFF20" : (homedark.includes(i) ? "#00000020" : "")
            };
            tile.onload = function () {
                loadings += 1;
                this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
                if (!realtiles && this.param.tint) {
                    this.param.c.beginPath();
                    this.param.c.moveTo(tinthex[0][0] * w + this.param.x, tinthex[0][1] * h + this.param.y);
                    for (var k = 1; k < tinthex.length; k++) {
                        this.param.c.lineTo(tinthex[k][0] * w / 2 + this.param.x, tinthex[k][1] * h / 2 + this.param.y);
                    }
                    this.param.c.fillStyle = this.param.tint;
                    this.param.c.fill();
                }
            };
            loadings -= 1;
            setTimeout(function () { tile.src = (realtiles ? "tiles" : "joe") + "/sys_51.png"; }, 5000);
        }
        var tile = new Image();
        tile.param = {
            x: homeloc[i][0] * w + u,
            y: homeloc[i][1] * h + v,
            c: c,
            i: i,
            tint: homelight.includes(i) ? "#FFFFFF20" : (homedark.includes(i) ? "#00000020" : "")
        };
        tile.onload = function () {
            loadings += 1;
            this.param.c.drawImage(this, this.param.x, this.param.y, w, h);
            if (!realtiles && this.param.tint) {
                this.param.c.beginPath();
                this.param.c.moveTo(tinthex[0][0] * w + this.param.x, tinthex[0][1] * h + this.param.y);
                for (var k = 1; k < tinthex.length; k++) {
                    this.param.c.lineTo(tinthex[k][0] * w + this.param.x, tinthex[k][1] * h + this.param.y);
                }
                this.param.c.fillStyle = this.param.tint;
                this.param.c.fill();
            }
        };
        loadings -= 1;
        tile.src = (realtiles ? "tiles" : "joe") + "/sys_" + (hometile[factions[preferences[clockwise[i]].faction]]) + ".png";
        await new Promise(r => setTimeout(r, 8 * 2 ** -loadings));

        c.save();
        c.translate(w * labels[i][0] + u, h * labels[i][1] + v);
        c.rotate(labang[i]);
        c.fillStyle = "white";
        c.strokeStyle = "black";
        c.lineWidth = realtiles ? 8 : 4;
        c.strokeText(clockwise[i], 0, 0);
        c.fillText(clockwise[i], 0, 0);
        c.restore();
    }

    for (var i = 0; i < hypertile.length; i++) {
        var tile = new Image();
        tile.param = {
            x: hyperpos[i][0] * w + u,
            y: hyperpos[i][1] * h + v,
            ang: hyperang[i],
            c: c,
            tint: hyperlight.includes(i) ? "#FFFFFF20" : (hyperdark.includes(i) ? "#00000020" : "")
        };
        tile.onload = function () {
            this.param.c.save();
            loadings += 1;
            this.param.c.translate(this.param.x + w / 2, this.param.y + h / 2);
            this.param.c.rotate(this.param.ang);
            this.param.c.drawImage(this, -w / 2, -h / 2, w, h);
            this.param.c.restore();
            if (!realtiles && this.param.tint) {
                this.param.c.beginPath();
                this.param.c.moveTo(tinthex[0][0] * w + this.param.x, tinthex[0][1] * h + this.param.y);
                for (var k = 1; k < tinthex.length; k++) {
                    this.param.c.lineTo(tinthex[k][0] * w + this.param.x, tinthex[k][1] * h + this.param.y);
                }
                this.param.c.fillStyle = this.param.tint;
                this.param.c.fill();
            }
        };
        loadings -= 1;
        tile.src = (realtiles ? "tiles" : "joe") + "/hype_" + hypertile[i] + ".png";
        await new Promise(r => setTimeout(r, 8 * 2 ** -loadings));
    }

    while (loadings != 0) {
        await new Promise(r => setTimeout(r, 20 * 2 ** -loadings));
    }
    mapstate = c.getImageData(0, 0, realtiles ? 3600 : 1800, realtiles ? 4200 : 2100);
    fel.onclick = sysnumbers;
}

function sysnumbers() {
    shownumbers = !shownumbers;
    const c = document.getElementById("finalcanvas").getContext("2d");

    if (shownumbers) {
        const p = players.length;
        var clockwise = new Array(p);
        for (var i = 0; i < p; i++) {
            clockwise[preferences[players[i]].position] = players[i];
        }

        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "white";
        c.lineWidth = realtiles ? 8 : 4;
        c.strokeStyle = "black";
        var w, h, u, v;

        switch (p) {
            case 3:
            case 4:
            case 5:
            case 6:
                w = 289.675;
                h = 250;
                u = (1800 - 5.5 * w) / 2;
                v = (2100 - 7 * h) * 2 / 3;
                c.font = realtiles ? "120pt slider" : "60pt slider";
                break;
            case 7:
                w = 230.940;
                h = 200;
                u = (1600 - 6.25 * w) / 2;
                v = (2100 - 9 * h) * 2 / 3;
                c.font = realtiles ? "96pt slider" : "48pt slider";
                break;
            case 8:
                w = 230.940;
                h = 200;
                u = (1800 - 7 * w) / 2;
                v = (2100 - 9 * h) * 2 / 3;
                c.font = realtiles ? "96pt slider" : "48pt slider";
                break;
        }

        if (realtiles) {
            w *= 2;
            h *= 2;
            u *= 2;
            v *= 2;
        }

        c.strokeText("18", p <= 6 ? 2.75 * w + u : 3.5 * w + u, p <= 6 ? 3.5 * h + v : 4.5 * h + v);
        c.fillText("18", p <= 6 ? 2.75 * w + u : 3.5 * w + u, p <= 6 ? 3.5 * h + v : 4.5 * h + v);

        const hometile = {
            "Arborec": 5, "Argent": 58, "Letnev": 10,
            "Saar": 11, "Muaat": 4, "Hacan": 16,
            "Empyrean": 56, "Sol": 1, "Creuss": 17,
            "L1Z1X": 6, "Mahact": 52, "Mentak": 2,
            "Naalu": 9, "Naaz-Rokha": 57, "Nekro": 8,
            "Nomad": 53, "N'orr": 13, "Ul": 55,
            "Jol-Nar": 12, "Vuil'raith": 54, "Winnu": 7,
            "Xxcha": 14, "Yin": 3, "Yssaril": 15
        };

        for (var i = 0; i < p; i++) {
            for (var j = 0; j < slices[i].length; j++) {
                c.strokeText(slices[preferences[clockwise[i]].slice][j], locations[i][j][0] * w + w / 2 + u, locations[i][j][1] * h + h / 2 + v);
                c.fillText(slices[preferences[clockwise[i]].slice][j], locations[i][j][0] * w + w / 2 + u, locations[i][j][1] * h + h / 2 + v);
            }
            c.strokeText(hometile[factions[preferences[clockwise[i]].faction]], homeloc[i][0] * w + w / 2 + u, homeloc[i][1] * h + h / 2 + v);
            c.fillText(hometile[factions[preferences[clockwise[i]].faction]], homeloc[i][0] * w + w / 2 + u, homeloc[i][1] * h + h / 2 + v);
        }

        for (var i = 0; i < hypertile.length; i++) {
            c.strokeText(hypertile[i], hyperpos[i][0] * w + w / 2 + u, hyperpos[i][1] * h + h / 2 + v);
            c.fillText(hypertile[i], hyperpos[i][0] * w + w / 2 + u, hyperpos[i][1] * h + h / 2 + v);
        }
    }
    else {
        c.putImageData(mapstate, 0, 0);
    }
}

function tilelist() {
    listtts = !listtts;
    const tableelem = document.getElementById("tabletop");
    tableelem.style.width = "";
    tableelem.style.height = "";

    if (listtts) {
        tableelem.innerHTML = ttsstring();
    }
    else {
        const p = players.length;
        var tiles = [18, 82];
        const hometile = {
            "Arborec": 5, "Argent": 58, "Letnev": 10,
            "Saar": 11, "Muaat": 4, "Hacan": 16,
            "Empyrean": 56, "Sol": 1, "Creuss": 17,
            "L1Z1X": 6, "Mahact": 52, "Mentak": 2,
            "Naalu": 9, "Naaz-Rokha": 57, "Nekro": 8,
            "Nomad": 53, "N'orr": 13, "Ul": 55,
            "Jol-Nar": 12, "Vuil'raith": 54, "Winnu": 7,
            "Xxcha": 14, "Yin": 3, "Yssaril": 15
        };

        for (var i = 0; i < p; i++) {
            tiles = tiles.concat(slices[preferences[players[i]].slice]);
            tiles.push(hometile[factions[preferences[players[i]].faction]]);
            switch (factions[preferences[players[i]].faction]) {
                case "Creuss":
                    tiles.push(51);
                    break;
                case "Muaat":
                    tiles.push(81);
                    break;
            }
        }
        tiles.sort((a, b) => a - b);
        for (var j = 0; j < tiles.length; j++) {
            switch (true) {
                case tiles[j] == 18 || tiles[j] == 51:
                    tiles[j] = "<span style='color:#80FF80;font-style:italic;'>" + tiles[j] + "</span>";
                    break;
                case tiles[j] == 82:
                    tiles[j] = "<span style='font-style:italic;'>" + tiles[j] + "</span>";
                    break;
                case tiles[j] <= 17 || 52 <= tiles[j] && tiles[j] <= 58 || tiles[j] == 81:
                    tiles[j] = "<span style='color:#80FF80'>" + tiles[j] + "</span>";
                    break;
                case 39 <= tiles[j] && tiles[j] <= 50 || tiles[j] == 67 || tiles[j] == 68 || 77 <= tiles[j] && tiles[j] <= 80:
                    tiles[j] = "<span style='color:#FF8080'>" + tiles[j] + "</span>";
                    break;
                case 19 <= tiles[j] && tiles[j] <= 38 || 59 <= tiles[j] && tiles[j] <= 66 || 69 <= tiles[j] && tiles[j] <= 76:
                    tiles[j] = "<span style='color:#8080FF'>" + tiles[j] + "</span>";
                    break;
            }
        }
        switch (p) {
            case 3:
                tiles = tiles.concat(["83A", "83A", "83A", "84A", "84A", "84A", "85A", "85A", "85A", "86A", "86A", "86A", "87A", "87A", "87A", "88A", "88A", "88A"]);
                break;
            case 4:
                tiles = tiles.concat(["83A", "83A", "84A", "84A", "85A", "85A", "86A", "86A", "87A", "87A", "88A", "88A"]);
                break;
            case 5:
                tiles = tiles.concat(["83A", "84A", "85A", "86A", "87A", "88A"]);
                break;
            case 7:
                tiles = tiles.concat(["83B", "84B", "85B", "86B", "88B", "90B"]);
                break;
            case 8:
                tiles = tiles.concat(["83B", "85B", "87A", "88A", "89B", "90B"]);
                break;
        }
        tableelem.innerHTML = tiles.join(" ");
    }

    const tall = tableelem.offsetHeight;
    var wide = tableelem.offsetWidth ?? 0;
    const dewide = wide;
    while (tableelem.offsetHeight == tall && wide > 0) {
        wide -= 12;
        tableelem.style.width = wide + "px";
    }
    while (tableelem.offsetHeight != tall && wide <= dewide) {
        wide += 4;
        tableelem.style.width = wide + "px";
    }
    if (wide > dewide) {
        tableelem.style.width = "";
    }
}

function ttsstring() {
    const p = players.length;
    var clockwise = new Array(p);
    for (var i = 0; i < p; i++) {
        clockwise[preferences[players[i]].position] = players[i];
    }
    var s = [];

    switch (p) {
        case 3:
            const rot = [1, 3, 5];
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][4]);
                s.push("85A" + rot[i]);
            }
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][1]);
                s.push("88A" + rot[i]);
                s.push(slices[preferences[clockwise[i]].slice][3]);
                s.push("87A" + rot[i]);
            }
            for (var i = 0; i < p; i++) {
                s.push(0);
                s.push(slices[preferences[clockwise[i]].slice][0]);
                s.push("83A" + rot[i]);
                s.push("86A" + rot[i]);
                s.push("84A" + rot[i]);
                s.push(slices[preferences[clockwise[(i + 1) % p]].slice][2]);
            }
            s = [...s.slice(3, 6), ...s.slice(0, 3), ...s.slice(12, 18), ...s.slice(6, 12), ...s.slice(27, 36), ...s.slice(18, 27)];
            break;

        case 4:
            s.push("85A3");
            for (var i = 0; i < p; i++) {
                if (i == 2) {
                    s.push("85A3");
                }
                s.push(slices[preferences[clockwise[i]].slice][4]);
            }

            s.push(slices[preferences[clockwise[3]].slice][3]);
            s.push("87A3");
            for (var i = 0; i < p - 1; i++) {
                s.push(slices[preferences[clockwise[i]].slice][1]);
                if (i == 1) {
                    s.push("88A0");
                }
                s.push(slices[preferences[clockwise[i]].slice][3]);
                if (i == 1) {
                    s.push("87A0");
                }
            }
            s.push(slices[preferences[clockwise[3]].slice][1]);
            s.push("88A3");

            s.push("86A3");
            s.push("84A3");
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][2]);
                s.push(0);
                s.push(slices[preferences[clockwise[i]].slice][0]);
                if (i == 1) {
                    s.push("83A0");
                    s.push("86A0");
                    s.push("84A0");
                }
            }
            s.push("83A3");
            break;

        case 5:
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][4]);
                if (i == 2) {
                    s.push("85A0");
                }
            }
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][1]);
                if (i == 2) {
                    s.push("88A0");
                    s.push(slices[preferences[clockwise[i]].slice][3]);
                    s.push("87A0");
                }
                else {
                    s.push(slices[preferences[clockwise[i]].slice][3]);
                }
            }
            for (var i = 0; i < p; i++) {
                s.push(0);
                s.push(slices[preferences[clockwise[i]].slice][0]);
                if (i == 2) {
                    s.push("83A0");
                    s.push("86A0");
                    s.push("84A0");
                }
                s.push(slices[preferences[clockwise[(i + 1) % p]].slice][2]);
            }
            break;

        case 6:
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][4]);
            }
            for (var i = 0; i < p; i++) {
                s.push(slices[preferences[clockwise[i]].slice][1]);
                s.push(slices[preferences[clockwise[i]].slice][3]);
            }
            for (var i = 0; i < p; i++) {
                s.push(0);
                s.push(slices[preferences[clockwise[i]].slice][0]);
                s.push(slices[preferences[clockwise[(i + 1) % p]].slice][2]);
            }
            break;

        case 7:
            s.push("85B0");
            s.push(slices[preferences[clockwise[1]].slice][4]);
            s.push(slices[preferences[clockwise[2]].slice][4]);
            s.push("84B3");
            s.push("90B0");
            s.push(slices[preferences[clockwise[5]].slice][4]);

            s.push(slices[preferences[clockwise[0]].slice][4]);
            s.push(slices[preferences[clockwise[0]].slice][3]);
            s.push(slices[preferences[clockwise[1]].slice][1]);
            s.push(slices[preferences[clockwise[1]].slice][3]);
            s.push(slices[preferences[clockwise[2]].slice][1]);
            s.push(slices[preferences[clockwise[2]].slice][3]);
            s.push(slices[preferences[clockwise[3]].slice][4]);
            s.push(slices[preferences[clockwise[4]].slice][4]);
            s.push(slices[preferences[clockwise[4]].slice][3]);
            s.push(slices[preferences[clockwise[5]].slice][1]);
            s.push(slices[preferences[clockwise[5]].slice][3]);
            s.push(slices[preferences[clockwise[6]].slice][4]);

            s.push(slices[preferences[clockwise[0]].slice][1]);
            s.push("88B3");
            s.push(slices[preferences[clockwise[1]].slice][2]);
            s.push(0);
            s.push(slices[preferences[clockwise[1]].slice][0]);
            s.push(slices[preferences[clockwise[2]].slice][2]);
            s.push(0);
            s.push(slices[preferences[clockwise[2]].slice][0]);
            s.push("86B3");
            s.push(slices[preferences[clockwise[3]].slice][1]);
            s.push(slices[preferences[clockwise[3]].slice][3]);
            s.push(slices[preferences[clockwise[4]].slice][1]);
            s.push(slices[preferences[clockwise[4]].slice][0]);
            s.push(slices[preferences[clockwise[5]].slice][2]);
            s.push("83B2");
            s.push(slices[preferences[clockwise[6]].slice][2]);
            s.push(slices[preferences[clockwise[6]].slice][1]);
            s.push(slices[preferences[clockwise[6]].slice][3]);

            s.push(0);
            s.push(slices[preferences[clockwise[0]].slice][0]);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(-1);
            s.push(slices[preferences[clockwise[3]].slice][2]);
            s.push(0);
            s.push(slices[preferences[clockwise[3]].slice][0]);
            s.push(slices[preferences[clockwise[4]].slice][2]);
            s.push(0);
            s.push(-1);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[5]].slice][0]);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[6]].slice][0]);
            s.push(slices[preferences[clockwise[0]].slice][2]);
            break;

        case 8:
            s.push("87A1");
            s.push("90B3");
            s.push(slices[preferences[clockwise[2]].slice][4]);
            s.push("88A2");
            s.push("89B0");
            s.push(slices[preferences[clockwise[6]].slice][4]);

            s.push(slices[preferences[clockwise[0]].slice][4]);
            s.push(slices[preferences[clockwise[1]].slice][4]);
            s.push(slices[preferences[clockwise[1]].slice][3]);
            s.push(slices[preferences[clockwise[2]].slice][1]);
            s.push(slices[preferences[clockwise[2]].slice][3]);
            s.push(slices[preferences[clockwise[3]].slice][4]);
            s.push(slices[preferences[clockwise[4]].slice][4]);
            s.push(slices[preferences[clockwise[5]].slice][4]);
            s.push(slices[preferences[clockwise[5]].slice][3]);
            s.push(slices[preferences[clockwise[6]].slice][1]);
            s.push(slices[preferences[clockwise[6]].slice][3]);
            s.push(slices[preferences[clockwise[7]].slice][4]);

            s.push(slices[preferences[clockwise[0]].slice][1]);
            s.push(slices[preferences[clockwise[0]].slice][3]);
            s.push(slices[preferences[clockwise[1]].slice][1]);
            s.push(slices[preferences[clockwise[1]].slice][0]);
            s.push(slices[preferences[clockwise[2]].slice][2]);
            s.push("85B2");
            s.push(slices[preferences[clockwise[3]].slice][2]);
            s.push(slices[preferences[clockwise[3]].slice][1]);
            s.push(slices[preferences[clockwise[3]].slice][3]);
            s.push(slices[preferences[clockwise[4]].slice][1]);
            s.push(slices[preferences[clockwise[4]].slice][3]);
            s.push(slices[preferences[clockwise[5]].slice][1]);
            s.push(slices[preferences[clockwise[5]].slice][0]);
            s.push(slices[preferences[clockwise[6]].slice][2]);
            s.push("83B2");
            s.push(slices[preferences[clockwise[7]].slice][2]);
            s.push(slices[preferences[clockwise[7]].slice][1]);
            s.push(slices[preferences[clockwise[7]].slice][3]);

            s.push(0);
            s.push(slices[preferences[clockwise[0]].slice][0]);
            s.push(slices[preferences[clockwise[1]].slice][2]);
            s.push(0);
            s.push(-1);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[2]].slice][0]);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[3]].slice][0]);
            s.push(slices[preferences[clockwise[4]].slice][2]);
            s.push(0);
            s.push(slices[preferences[clockwise[4]].slice][0]);
            s.push(slices[preferences[clockwise[5]].slice][2]);
            s.push(0);
            s.push(-1);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[6]].slice][0]);
            s.push(-1);
            s.push(0);
            s.push(slices[preferences[clockwise[7]].slice][0]);
            s.push(slices[preferences[clockwise[0]].slice][2]);
            break;
    }

    return s.join(" ");
}

function section(loc) {
    clearoverlay();
    var destination = 0;
    const offset = document.getElementById("header").getBoundingClientRect().bottom;
    switch (loc) {
        case "players":
            destination = document.getElementById("pname0").getBoundingClientRect().top;
            break;
        case "slices":
            destination = document.getElementById("slicebox0").getBoundingClientRect().top;
            break;
        case "factions":
            destination = document.getElementById("factimg0").getBoundingClientRect().top;
            break;
        case "positions":
            destination = document.getElementById("spkimg0").getBoundingClientRect().top;
            break;
        case "map":
            destination = document.getElementById("finalcanvas").getBoundingClientRect().top;
            break;
    }
    window.scrollTo({ top: destination + window.pageYOffset - offset, behavior: 'smooth' });
}

function helpwhat(n) {
    if (n) {
        document.getElementById("helpwhat").innerHTML = "\
                <p><a onClick=\"helpwhat(0)\"><u>What is a Milty Draft?</u></a></p>\
                <p>Milty Draft is a method for setting up a game of <i>Twilight Imperium: Fourth Edition<sup>&reg;</sup></i> with the <i>Prophecy of Kings<sup>&reg;</sup></i> expansion, by Fantasy Flight Games<sup>&trade;</sup> (not affiliated with miltydraft.com). It allows players to build a map, choose their faction, and organise a seating order in a balanced manner.</p>\
                <p>The draft takes place over three rounds. Every round, all players get to pick their a) faction or b) map slice or c) table position (including the speaker position) until they have one of each. The order that players make these choices is random in the first round. The second round picks are done in the reverse order, and the third round reverts to the same order as the first round, making a boustrophedon draft. One all players have made their choice, the map is assembled from the slices, and players can start the game proper.</p>\
                <p>Each slices consists of five systems, excluding a player&rsquo;s home system. These comprise of the four systems closer to that player&rsquo;s home system than any other player&rsquo;s (two in the outer ring, one in the middle ring, and one in the inner ring), as well as the system in ring two that is equidistant to that player&rsquo;s home system and the home system of the player on their left. The slices are roughly balanced using a tiered system of tiles. Each blue&ndash;backed tile is assigned one of three tiers. Then, each slice is randomly assigned one tile from each tier, along with two red&ndash;back tiles. Each slice must meet a minimum influence and resource threshold, as well as a minimum and maximum total threshold. In addition, slices cannot contain two of the same type of wormhole, or anomalies next to one another. There is an option to force the draft to include a minimum number of legendary planets, and wormholes of each type. Should these conditions not be met, then another set of slices is generated. Because of the way slices are assembled, anomalies may be placed next to one another if they were on the borders of two slices.</p>\
            ";
    }
    else {
        document.getElementById("helpwhat").innerHTML = "<p><a onClick=\"helpwhat(1)\"><u>What is a Milty Draft?</u></a></p>";
    }
}

function helphow(n) {
    if (n) {
        document.getElementById("helphow").innerHTML = "\
                <p><a onClick=\"helphow(0)\"><u>How does this tool work?</u></a></p>\
                <p>Enter player names (leaving the extra boxes blank), adjust any required settings (though the default settings should be fine for most games), then click &ldquo;Start&rdquo;.</p>\
                <p>The screen will switch to the actual draft, divided into sections: player choices, slices, factions, and seating order. The player first in pick order will be highlighted in the first section, as well as on the heading bar. They can select a slice, a faction, or a speaker position by clicking the &ldquo;Draft&rdquo; button underneath each choice. Once they make a choice, the draft moves on to the next person in the pick order. The icon by the current player in the heading bar shows the direction of the draft.</p>\
                <p>Continue picking until all three selections have been made for all players.</p>\
                <p>Once the draft is done, based on slices and speaker position, the tool will build the map at the bottom of the screen.</p>\
                <p>During the draft, clicking on a map slice will display that slice full&ndash;screen, while clicking on a faction icon will bring up a reference card for that faction. Click again to close. After the draft, clicking on the map will display the tile number for each system. Clicking the map again will remove them.</p>\
            ";
    }
    else {
        document.getElementById("helphow").innerHTML = "<p><a onClick=\"helphow(1)\"><u>How does this tool work?</u></a></p>";
    }
}

const colourpref = {
    "Arborec": {
        "black": 25,
        "blue": 3,
        "green": 97,
        "orange": 20,
        "pink": 6,
        "purple": 0,
        "red": 20,
        "yellow": 28
    },
    "Argent": {
        "black": 14,
        "blue": 6,
        "green": 23,
        "orange": 98,
        "pink": 4,
        "purple": 4,
        "red": 42,
        "yellow": 46
    },
    "Creuss": {
        "black": 44,
        "blue": 99,
        "green": 6,
        "orange": 2,
        "pink": 18,
        "purple": 38,
        "red": 22,
        "yellow": 2
    },
    "Empyrean": {
        "black": 48,
        "blue": 40,
        "green": 5,
        "orange": 2,
        "pink": 41,
        "purple": 98,
        "red": 37,
        "yellow": 1
    },
    "Hacan": {
        "black": 3,
        "blue": 16,
        "green": 11,
        "orange": 56,
        "pink": 12,
        "purple": 14,
        "red": 27,
        "yellow": 91
    },
    "Jol-Nar": {
        "black": 20,
        "blue": 78,
        "green": 29,
        "orange": 8,
        "pink": 32,
        "purple": 75,
        "red": 15,
        "yellow": 16
    },
    "L1Z1X": {
        "black": 71,
        "blue": 72,
        "green": 10,
        "orange": 13,
        "pink": 7,
        "purple": 25,
        "red": 75,
        "yellow": 22
    },
    "Letnev": {
        "black": 73,
        "blue": 29,
        "green": 1,
        "orange": 15,
        "pink": 3,
        "purple": 13,
        "red": 81,
        "yellow": 16
    },
    "Mahact": {
        "black": 49,
        "blue": 32,
        "green": 17,
        "orange": 27,
        "pink": 18,
        "purple": 53,
        "red": 30,
        "yellow": 95
    },
    "Mentak": {
        "black": 45,
        "blue": 5,
        "green": 4,
        "orange": 75,
        "pink": 27,
        "purple": 27,
        "red": 25,
        "yellow": 76
    },
    "Muaat": {
        "black": 31,
        "blue": 0,
        "green": 0,
        "orange": 80,
        "pink": 11,
        "purple": 6,
        "red": 86,
        "yellow": 51
    },
    "Naalu": {
        "black": 31,
        "blue": 23,
        "green": 87,
        "orange": 31,
        "pink": 8,
        "purple": 9,
        "red": 8,
        "yellow": 51
    },
    "Naaz-Rokha": {
        "black": 20,
        "blue": 2,
        "green": 97,
        "orange": 13,
        "pink": 3,
        "purple": 16,
        "red": 16,
        "yellow": 28
    },
    "Nekro": {
        "black": 70,
        "blue": 1,
        "green": 0,
        "orange": 10,
        "pink": 9,
        "purple": 10,
        "red": 99,
        "yellow": 5
    },
    "Nomad": {
        "black": 23,
        "blue": 85,
        "green": 26,
        "orange": 3,
        "pink": 38,
        "purple": 67,
        "red": 19,
        "yellow": 11
    },
    "N'orr": {
        "black": 77,
        "blue": 2,
        "green": 33,
        "orange": 23,
        "pink": 12,
        "purple": 3,
        "red": 88,
        "yellow": 23
    },
    "Saar": {
        "black": 34,
        "blue": 29,
        "green": 38,
        "orange": 65,
        "pink": 1,
        "purple": 9,
        "red": 15,
        "yellow": 61
    },
    "Sol": {
        "black": 6,
        "blue": 87,
        "green": 38,
        "orange": 3,
        "pink": 6,
        "purple": 8,
        "red": 8,
        "yellow": 61
    },
    "Ul": {
        "black": 12,
        "blue": 12,
        "green": 19,
        "orange": 16,
        "pink": 100,
        "purple": 33,
        "red": 27,
        "yellow": 22
    },
    "Vuil'raith": {
        "black": 54,
        "blue": 16,
        "green": 0,
        "orange": 20,
        "pink": 24,
        "purple": 29,
        "red": 99,
        "yellow": 4
    },
    "Winnu": {
        "black": 12,
        "blue": 21,
        "green": 5,
        "orange": 35,
        "pink": 50,
        "purple": 81,
        "red": 20,
        "yellow": 72
    },
    "Xxcha": {
        "black": 5,
        "blue": 56,
        "green": 80,
        "orange": 5,
        "pink": 6,
        "purple": 7,
        "red": 3,
        "yellow": 31
    },
    "Yin": {
        "black": 57,
        "blue": 6,
        "green": 21,
        "orange": 6,
        "pink": 48,
        "purple": 76,
        "red": 13,
        "yellow": 43
    },
    "Yssaril": {
        "black": 34,
        "blue": 7,
        "green": 84,
        "orange": 12,
        "pink": 8,
        "purple": 13,
        "red": 26,
        "yellow": 38
    },
};

function permutations(a, k, p = []) {
    var y = [];
    for (var i = 0; i < a.length; i++) {
        if (k == 1) {
            y.push(p.concat([a[i]]));
        }
        else {
            y.push(...permutations(a.slice(0, i).concat(a.slice(i + 1)), k - 1, p.concat([a[i]])));
        }
    }
    return y;
}

function colourise() {
    const colours = ["black", "blue", "green", "purple", "red", "yellow", "orange", "pink"];
    const n = factselect.length;
    for (var i = colours.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [colours[i], colours[j]] = [colours[j], colours[i]];
    }
    var best = new Array(n).fill(0);
    const possibilities = permutations(colours, n);
    var assignment = colours.slice();
    for (var i = 0; i < possibilities.length; i++) {
        var result = [];
        for (var j = 0; j < n; j++) {
            result.push(colourpref[factselect[j]][possibilities[i][j]]);
        }
        result.sort(function (x, y) { return x - y; });
        var better = true;
        for (var j = 0; j < n; j++) {
            if (result[j] > best[j]) {
                break;
            }
            if (result[j] < best[j]) {
                better = false;
                break;
            }
        }
        if (better) {
            best = result;
            assignment = possibilities[i].slice();
        }
    }
    const tinting = {
        "black": "#000000",
        "blue": "#07B2FF",
        "green": "#007206",
        "orange": "#F2621B",
        "pink": "#F46ECD",
        "purple": "#7300B7",
        "red": "#CB0000",
        "yellow": "#D6B700"
    };
    var y = [];
    for (var i = 0; i < n; i++) {
        y.push(tinting[assignment[i]]);
    }
    return y;
}