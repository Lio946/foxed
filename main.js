alert("🔥 SCRIPT RUNNING");

(async function () {

  // Only run on arbpay
  if (!location.hostname.includes("arbpay.me")) {
    alert("Wrong site");
    return;
  }

  // UID
  let UID = localStorage.getItem("arb_uid");
  if (!UID) {
    UID = prompt("Enter UID");
    localStorage.setItem("arb_uid", UID);
  }

  // Load users
  const res = await fetch("https://raw.githubusercontent.com/darkl78-gif/smart-assistant/main/users.json?" + Date.now());
  const users = await res.json();

  if (!users.includes(UID)) {
    alert("❌ Access Denied");
    return;
  }

  alert("✅ Access Granted");

  // REMOVE OLD PANEL (important)
  document.getElementById("arb_panel")?.remove();

  // PANEL
  const panel = document.createElement("div");
  panel.id = "arb_panel";
  panel.style = `
    position:fixed;
    top:80px;
    right:20px;
    width:260px;
    background:#000;
    color:#0f0;
    padding:15px;
    z-index:999999;
    border-radius:10px;
    font-size:16px;
  `;

  panel.innerHTML = `
    <div style="font-weight:bold;margin-bottom:10px;">Arbpay Tool</div>
    <button id="startBtn" style="width:100%;padding:10px;margin-bottom:8px;">START</button>
    <button id="stopBtn" style="width:100%;padding:10px;">STOP</button>
    <div id="output" style="margin-top:10px;">Idle</div>
  `;

  document.body.appendChild(panel);

  let interval = null;

  function findAmount() {
    const el = document.querySelector("[class*='amount'], [class*='price']");
    return el ? el.innerText : "Not found";
  }

  // DIRECT binding (no timeout)
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const output = document.getElementById("output");

  startBtn.onclick = () => {
    if (interval) return;

    interval = setInterval(() => {
      const amt = findAmount();
      output.innerText = "Amount: " + amt;
      console.log("Amount:", amt);
    }, 2000);
  };

  stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    output.innerText = "Stopped";
  };

})();