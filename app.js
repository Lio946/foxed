alert("🚀 TOOL ACTIVE");

(function () {

  // remove old UI
  document.getElementById("arb_panel")?.remove();

  // ===== UI =====
  const panel = document.createElement("div");
  panel.id = "arb_panel";

  panel.style = `
    position:fixed;
    top:100px;
    left:20px;
    width:300px;
    background:#000;
    color:#0f0;
    padding:15px;
    z-index:999999;
    border-radius:10px;
    font-size:16px;
  `;

  panel.innerHTML = `
    <div id="drag" style="cursor:move;font-weight:bold;margin-bottom:10px;">
      Arbpay Tool
    </div>

    <button id="click1" style="width:100%;padding:10px;margin-bottom:10px;">
      Click First Offer
    </button>

    <button id="click2" style="width:100%;padding:10px;">
      Click Second Offer
    </button>

    <div id="out" style="margin-top:10px;">Ready</div>
  `;

  document.body.appendChild(panel);

  const out = document.getElementById("out");

  // ===== CORE CLICK LOGIC =====
  function getOffers() {
    return document.querySelectorAll("button, div[role='button']");
  }

  function clickOffer(index) {
    const offers = getOffers();

    if (offers[index]) {
      offers[index].scrollIntoView({behavior:"smooth", block:"center"});
      offers[index].style.outline = "3px solid red";

      setTimeout(() => offers[index].style.outline = "", 1500);

      offers[index].click();
      return true;
    }
    return false;
  }

  // ===== BUTTONS =====
  document.getElementById("click1").onclick = () => {
    const ok = clickOffer(0);
    out.innerText = ok ? "✅ Clicked first offer" : "❌ Not found";
  };

  document.getElementById("click2").onclick = () => {
    const ok = clickOffer(1);
    out.innerText = ok ? "✅ Clicked second offer" : "❌ Not found";
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