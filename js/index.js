const FORM_ENDPOINT = "https://formspree.io/f/mljjbzka";

const form = document.getElementById("tipsForm");
const statusBox = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");


console.log("Script loaded!");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amnen = [...form.querySelectorAll('input[name="amne"]:checked')]
    .map(x => x.value);

    if (amnen.length === 0) {
    show("err", "Välj minst ett ämne.");
    return;
    }

    const data = {
    amnen: amnen.join(", "),
    paverkan: form.querySelector('input[name="paverkan"]:checked')?.value || "",
    beskrivning: form.beskrivning.value.trim(),
    anonym: form.anonym.checked ? "Ja" : "Nej",
    namn: form.namn.value.trim(),
    kontakt: form.kontakt.value.trim()
    };

    sendBtn.disabled = true;
    sendBtn.textContent = "Skickar...";
    statusBox.className = "status";

    try {
    const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Kunde inte skicka");

    show("ok", "Tack! Ditt tips har skickats.");
    form.reset();
    } catch (err) {
    show("err", "Något gick fel. Försök igen eller kontakta studentrepresentanterna direkt.");
    } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Skicka tips";
    }
});

function show(type, text) {
    statusBox.className = "status " + type;
    statusBox.textContent = text;
}
