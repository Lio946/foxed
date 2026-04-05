alert("🔥 SCRIPT RUNNING");

(async function () {

  if (!location.hostname.includes("arbpay.me")) {
    alert("❌ Wrong site");
    return;
  }

  // UID system
  let UID = localStorage.getItem("arb_uid");
  if (!UID) {
    UID = prompt("Enter UID");
    localStorage.setItem("arb_uid", UID);
  }

  // Access control
  const res = await fetch("https://raw.githubusercontent.com/darkl78-gif/smart-assistant/main/users.json?" + Date.now());
  const users = await res.json();

  if (!users.includes(UID)) {
    alert("❌ Access Denied");
    return;
  }

  alert("✅ Access Granted");

  // Remove old panel if exists
  document.getElementById("arb_panel")?.remove();

  // --- UI PANEL ---
  const panel = document.createElement("div");
  panel.id = "arb_panel";
  panel.style = `
    position:fixed;
    top:40px;
    right:20px;
    width:380px;
    max-height:500px;
    background:#111;
    color:#0f0;
    padding:20px;
    z-index:999999;
    border-radius:12px;
    font-size:18px;
    font-family:monospace;
    overflow:auto;
    box-shadow:0 0 20px #000;
    cursor:move;
  `;

  panel.innerHTML = `
    <div id="panel_header" style="font-weight:bold;font-size:22px;margin-bottom:15px;text-align:center;cursor:move;">Arbpay Auto-Click Tool</div>
    <input id="searchAmount" type="text" placeholder="Enter amount to search" style="width:100%;padding:10px;margin-bottom:10px;font-size:16px;">
    <button id="searchBtn" style="width:100%;padding:12px;margin-bottom:10px;font-size:16px;">🔍 SEARCH & CLICK</button>
    <button id="startObserverBtn" style="width:100%;padding:12px;margin-bottom:10px;font-size:16px;">⚡ START AUTO OBSERVER</button>
    <button id="stopObserverBtn" style="width:100%;padding:12px;margin-bottom:10px;font-size:16px;">⏹ STOP AUTO OBSERVER</button>
    <div id="output" style="margin-top:10px;font-size:18px;">Idle</div>
  `;

  document.body.appendChild(panel);

  const searchBtn = document.getElementById("searchBtn");
  const startObserverBtn = document.getElementById("startObserverBtn");
  const stopObserverBtn = document.getElementById("stopObserverBtn");
  const input = document.getElementById("searchAmount");
  const output = document.getElementById("output");

  // --- SEARCH & CLICK ---
  function searchAndClick(amount) {
    let found = false;
    const elements = document.querySelectorAll("body *");

    elements.forEach(el => {
      if (el.innerText && el.innerText.trim() === amount) {
        el.scrollIntoView({behavior:"smooth", block:"center"});
        el.style.border = "2px solid red";
        setTimeout(() => el.style.border = "", 1500);
        el.click();
        found = true;
      }
    });

    return found;
  }

  searchBtn.onclick = () => {
    const val = input.value.trim();
    if (!val) {
      output.innerText = "❌ Enter an amount first";
      return;
    }

    const clicked = searchAndClick(val);
    output.innerText = clicked ? `✅ Found & clicked ${val}` : `❌ ${val} not found`;
  };

  // --- AUTO OBSERVER ---
  let observer = null;

  function startObserver() {
    if (observer) return;
    const val = input.value.trim();
    if (!val) {
      output.innerText = "❌ Enter an amount first";
      return;
    }

    observer = new MutationObserver(() => {
      const clicked = searchAndClick(val);
      if (clicked) output.innerText = `✅ Auto-clicked ${val}`;
    });

    observer.observe(document.body, { childList: true, subtree: true });
    output.innerText = "⚡ Auto observer started";
  }

  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
      output.innerText = "⏹ Auto observer stopped";
    }
  }

  startObserverBtn.onclick = startObserver;
  stopObserverBtn.onclick = stopObserver;

  // --- MAKE PANEL DRAGGABLE ---
  const header = document.getElementById("panel_header");
  let isDragging = false, offsetX = 0, offsetY = 0;

  header.onmousedown = (e) => {
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
    document.body.style.userSelect = 'none';
  };

  document.onmousemove = (e) => {
    if (!isDragging) return;
    panel.style.left = e.clientX - offsetX + "px";
    panel.style.top = e.clientY - offsetY + "px";
  };

  document.onmouseup = () => {
    isDragging = false;
    document.body.style.userSelect = '';
  };

})();