alert("🚀 AUTO FIND & REFRESH TOOL ACTIVE");

(function () {

  document.getElementById("arb_panel")?.remove();

  const panel = document.createElement("div");
  panel.id = "arb_panel";

  panel.style = `
    position:fixed;
    top:100px;
    left:20px;
    width:320px;
    background:#000;
    color:#0f0;
    padding:15px;
    z-index:999999;
    border-radius:10px;
    font-size:16px;
  `;

  panel.innerHTML = `
    <div id="drag" style="cursor:move;font-weight:bold;margin-bottom:10px;">
      Auto Finder + Refresh
    </div>

    <input id="amt" placeholder="Enter amount (e.g. 1000)" 
      style="width:100%;padding:10px;margin-bottom:10px;">

    <input id="interval" placeholder="Refresh interval (sec)" value="10"
      style="width:100%;padding:10px;margin-bottom:10px;">

    <button id="start" style="width:100%;padding:10px;margin-bottom:10px;">
      ▶ START AUTO FIND
    </button>

    <button id="stop" style="width:100%;padding:10px;">
      ⛔ STOP
    </button>

    <div id="out">Idle</div>
  `;

  document.body.appendChild(panel);

  const out = document.getElementById("out");

  let intervalId = null;

  // ===== SEARCH FUNCTION =====
  function scanAndClick(amount) {
    const target = amount.replace(/[^0-9]/g, "");
    const offers = document.querySelectorAll("button, div[role='button']");

    for (let offer of offers) {
      const text = offer.innerText || "";
      const nums = text.match(/\d+/g);

      if (!nums) continue;

      for (let n of nums) {
        if (n.includes(target)) {
          offer.scrollIntoView({behavior:"smooth", block:"center"});
          offer.style.outline = "3px solid red";
          setTimeout(() => offer.style.outline = "", 1500);
          offer.click();
          return true;
        }
      }
    }
    return false;
  }

  // ===== START =====
  document.getElementById("start").onclick = () => {
    const val = document.getElementById("amt").value.trim();
    const sec = parseInt(document.getElementById("interval").value) || 10;

    if (!val) {
      out.innerText = "❌ Enter amount";
      return;
    }

    if (intervalId) return;

    out.innerText = "🔄 Searching & refreshing...";

    intervalId = setInterval(() => {
      const found = scanAndClick(val);

      if (found) {
        out.innerText = "✅ Found & Clicked " + val;
        clearInterval(intervalId);
        intervalId = null;
      } else {
        out.innerText = "🔄 Not found, refreshing...";
        location.reload(); // refresh page
      }

    }, sec * 1000);
  };

  // ===== STOP =====
  document.getElementById("stop").onclick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      out.innerText = "⛔ Stopped";
    }
  };

  // ===== DRAG =====
  let isDown = false, x, y;
  document.getElementById("drag").onmousedown = e => {
    isDown = true;
    x = e.clientX - panel.offsetLeft;
    y = e.clientY - panel.offsetTop;
  };
  document.onmousemove = e => {
    if (!isDown) return;
    panel.style.left = e.clientX - x + "px";
    panel.style.top = e.clientY - y + "px";
  };
  document.onmouseup = () => isDown = false;

})();