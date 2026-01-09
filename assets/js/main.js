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