let panel = document.createElement("div");

panel.innerHTML = `
<div style="position:fixed;bottom:80px;right:20px;background:white;padding:15px;border-radius:10px;z-index:9999;">
<b>Assistant</b><br><br>
<input id="amt" type="number" value="110"><br><br>
<button id="start">Start</button>
<button id="stop">Stop</button>
<p id="status">Stopped</p>
</div>
`;

document.body.appendChild(panel);

let run = false, intv;

function scan() {
    let val = parseInt(document.getElementById("amt").value);
    document.querySelectorAll("*").forEach(e => {
        if (!e.innerText) return;
        let m = e.innerText.match(/^₹\s?\d+/);
        if (!m) return;
        let p = parseInt(m[0].replace("₹",""));
        if (p === val) {
            let c = e.closest("div");
            if (c) c.style.border = "2px solid blue";
        }
    });
}

document.getElementById("start").onclick = () => {
    if (run) return;
    run = true;
    document.getElementById("status").innerText = "Running";
    intv = setInterval(scan, 3000);
};

document.getElementById("stop").onclick = () => {
    run = false;
    clearInterval(intv);
    document.getElementById("status").innerText = "Stopped";
};
