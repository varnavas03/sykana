(function(){
  const form = document.querySelector("[data-formspree]");
  if(!form) return;

  const msg = form.querySelector("[data-msg]");
  const btn = form.querySelector("button[type=submit]");
  const endpoint = form.getAttribute("action");

  function setMessage(t){ if(msg) msg.textContent = t; }

  form.addEventListener("submit", async (e) => {
    // Allow normal submit if no endpoint set
    if(!endpoint || endpoint.includes("REPLACE_ME")) return;

    e.preventDefault();
    if(btn) btn.disabled = true;
    setMessage("Sending...");

    try{
      const fd = new FormData(form);
      const res = await fetch(endpoint, {
        method: "POST",
        body: fd,
        headers: { "Accept": "application/json" }
      });
      if(res.ok){
        form.reset();
        setMessage("Thanks for submitting!");
      } else {
        setMessage("Failed to send. Try again later.");
      }
    } catch(err){
      setMessage("Failed to send. Check your connection.");
    } finally {
      if(btn) btn.disabled = false;
    }
  });
})();

// Scroll reveal (fade-in from left/right)
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || !els.length){
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();
(function () {
  const dict = {
    en: { home: "Home", events: "Past Events", about: "About", board: "Board", contact: "Contact" },
    el: { home: "ΑΡΧΙΚΗ", events: "ΔΙΟΡΓΑΝΩΣΕΙΣ", about: "ΛΕΠΤΟΜΕΡΕΙΕΣ", board: "ΣΥΜΒΟΥΛΙΟ", contact: "ΕΠΙΚΟΙΝΩΝΙΑ" }
  };

  function applyLang(lang) {
    const d = dict[lang] || dict.en;
    const h = (id) => document.getElementById(id);

    if (h("navHome")) h("navHome").textContent = d.home;
    if (h("navEvents")) h("navEvents").textContent = d.events;
    if (h("navAbout")) h("navAbout").textContent = d.about;
    if (h("navBoard")) h("navBoard").textContent = d.board;
    if (h("navContact")) h("navContact").textContent = d.contact;

    localStorage.setItem("lang", lang);
  }

  function toggleLang() {
    const current = localStorage.getItem("lang") || "en";
    applyLang(current === "en" ? "el" : "en");
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(localStorage.getItem("lang") || "en");
    const btn = document.getElementById("langToggle");
    if (btn) btn.addEventListener("click", (e) => { e.preventDefault(); toggleLang(); });
  });
})();

// ===== Mobile Drawer Menu =====
(function () {
  const burger = document.querySelector('.burger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.querySelector('.drawerOverlay');
  const closeBtn = drawer ? drawer.querySelector('.drawerClose') : null;

  if (!burger || !drawer || !overlay || !closeBtn) return;

  function openDrawer(){
    overlay.hidden = false;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('open'));
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer(){
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // wait for transition then hide
    setTimeout(() => {
      drawer.hidden = true;
      overlay.hidden = true;
    }, 280);
  }

  burger.addEventListener('click', () => {
    if (drawer.hidden) openDrawer();
    else closeDrawer();
  });

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.hidden) closeDrawer();
  });

  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeDrawer());
  });
})();

