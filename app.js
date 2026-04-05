alert("🚀 SMART TOOL ACTIVE");

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
      Arbpay Smart Tool
    </div>

    <input id="amt" placeholder="Enter amount (e.g. 1000)" 
      style="width:100%;padding:10px;margin-bottom:10px;">

    <button id="search" style="width:100%;padding:10px;margin-bottom:10px;">
      🔍 Find & Click
    </button>

    <button id="click1" style="width:100%;padding:10px;margin-bottom:10px;">
      Click First Offer
    </button>

    <div id="out">Ready</div>
  `;

  document.body.appendChild(panel);

  const out = document.getElementById("out");

  // ===== SMART FIND FUNCTION =====
  function findByAmount(amount) {

    const target = amount.replace(/[^0-9]/g, "");
    const offers = document.querySelectorAll("button, div[role='button']");

    for (let offer of offers) {

      // 🔥 deep scan inside element
      const text = offer.innerText || "";
      const numbers = text.match(/\d+/g);

      if (!numbers) continue;

      for (let num of numbers) {
        if (num.includes(target)) {

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

  // ===== SEARCH BUTTON =====
  document.getElementById("search").onclick = () => {
    const val = document.getElementById("amt").value.trim();

    if (!val) {
      out.innerText = "❌ Enter amount";
      return;
    }

    const ok = findByAmount(val);

    out.innerText = ok ? "✅ Clicked " + val : "❌ Not found";
  };

  // fallback button
  document.getElementById("click1").onclick = () => {
    const offers = document.querySelectorAll("button, div[role='button']");
    if (offers[0]) {
      offers[0].click();
      out.innerText = "✅ Clicked first offer";
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