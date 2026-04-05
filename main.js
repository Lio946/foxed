alert("🔥 NEW VERSION RUNNING");
(async function () {

  if (!location.hostname.includes("arbpay.me")) {
    alert("❌ This works only on arbpay.me");
    return;
  }

  const UID = localStorage.getItem("arb_uid") || prompt("Enter UID");
  localStorage.setItem("arb_uid", UID);

  const res = await fetch("https://raw.githubusercontent.com/darkl78-gif/smart-assistant/main/users.json");
  const users = await res.json();

  if (!users.includes(UID)) {
    alert("❌ Access Denied");
    return;
  }

  // 🟢 CREATE PANEL
  const panel = document.createElement("div");
  panel.style.position = "fixed";
  panel.style.top = "50px";
  panel.style.right = "20px";
  panel.style.width = "220px";
  panel.style.background = "#111";
  panel.style.color = "#0f0";
  panel.style.padding = "15px";
  panel.style.borderRadius = "10px";
  panel.style.zIndex = "999999";
  panel.style.fontSize = "16px";
  panel.style.boxShadow = "0 0 10px #000";

  panel.innerHTML = `
    <div id="drag" style="cursor:move; font-weight:bold; margin-bottom:10px;">
      Arbpay Tool
    </div>
    <button id="startBtn" style="width:100%; padding:8px; margin-bottom:5px;">▶ Start</button>
    <button id="stopBtn" style="width:100%; padding:8px;">⏹ Stop</button>
    <div id="output" style="margin-top:10px;">Idle</div>
  `;

  document.body.appendChild(panel);

  // 🟢 DRAG FUNCTION
  let isDragging = false, offsetX, offsetY;

  document.getElementById("drag").onmousedown = (e) => {
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
  };

  document.onmousemove = (e) => {
    if (isDragging) {
      panel.style.left = (e.clientX - offsetX) + "px";
      panel.style.top = (e.clientY - offsetY) + "px";
    }
  };

  document.onmouseup = () => isDragging = false;

  // 🟢 LOGIC
  let interval = null;

  function findAmount() {
    const el =
      document.querySelector(".amount") ||
      document.querySelector(".price") ||
      document.querySelector("[class*='amount']");

    return el ? el.innerText : "Not found";
  }

  // 🟢 BUTTON FIX (IMPORTANT)
  setTimeout(() => {
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

  }, 500);

})();