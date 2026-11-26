const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });
}

// Año automático en el pie de página.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Mensaje general para los botones de WhatsApp.
// Abre el selector/conversación de WhatsApp con el texto listo para enviar.
const generalMessage = encodeURIComponent(
  "Hola, Transportes José Luis. Quisiera consultar disponibilidad y cotizar un servicio de transporte de carga."
);
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = `https://wa.me/573117338274?text=${generalMessage}`;
});

// Formulario: valida datos básicos y arma la solicitud.
const quoteForm = document.querySelector("#quote-form");
const feedback = document.querySelector("#form-feedback");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const origin = String(formData.get("origin") || "").trim();
    const destination = String(formData.get("destination") || "").trim();
    const cargo = String(formData.get("cargo") || "").trim();
    const weight = String(formData.get("weight") || "").trim();
    const serviceDate = String(formData.get("serviceDate") || "").trim();
    const details = String(formData.get("details") || "").trim();

    // Convertir la fecha al formato DD/MM/AAAA
let formattedDate = "Por confirmar";

if (serviceDate) {
  const [year, month, day] = serviceDate.split("-");
  formattedDate = `${day}/${month}/${year}`;
}

    if (!name || !origin || !destination || !cargo) {
      feedback.textContent = "Completa tu nombre, origen, destino y tipo de carga.";
      return;
    }

    const message = [
      "Hola, Transportes José Luis. Quisiera solicitar una cotización:",
      "",
      `Nombre: ${name}`,
      `Recogida: ${origin}`,
      `Destino: ${destination}`,
      `Tipo de carga: ${cargo}`,
      `Peso aproximado: ${weight || "Por confirmar"}`,
      `Fecha del servicio: ${serviceDate || "Por confirmar"}`,
      `Detalles: ${details || "Sin detalles adicionales"}`,
      "",
      "Quedo atento(a) a la disponibilidad y condiciones del servicio."
    ].join("\n");

    feedback.textContent = "Abriendo WhatsApp para que revises y envíes tu solicitud...";
    window.open(`https://wa.me/573117338274?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}
