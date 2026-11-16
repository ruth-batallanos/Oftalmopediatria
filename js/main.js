/* Dra. Ruth Batallanos — interacciones del sitio */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  const mobileBar = document.querySelector(".mobile-bar");

  /* Año del pie */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Encabezado al hacer scroll + barra móvil */
  const onScroll = () => {
    const sc = window.scrollY;
    header.classList.toggle("scrolled", sc > 20);
    if (mobileBar) mobileBar.classList.toggle("show", sc > window.innerHeight * 0.6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    document.body.classList.remove("menu-open");
  };
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* Fotos faltantes: muestra un fondo suave en vez de un ícono roto */
  document.querySelectorAll(".photo-frame img").forEach((img) => {
    const mark = () => img.closest(".photo-frame").classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener("error", mark);
  });

  /* Animaciones de aparición */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* Resaltar sección activa en el menú */
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => so.observe(s));
  }

  /* Formulario de contacto (FormSubmit vía AJAX, sin recargar) */
  const form = document.getElementById("contact-form");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      let valid = true;
      form.querySelectorAll("[required]").forEach((f) => {
        const ok = f.value.trim() !== "" && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.classList.add("err");
        status.textContent = "Revisá los campos marcados, por favor.";
        return;
      }
      if (form.querySelector(".hp").value) return; // anti-spam

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Enviando…";

      const endpoint = form.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        status.classList.add("ok");
        status.textContent = "¡Gracias! Tu mensaje fue enviado. Te respondo a la brevedad.";
      } catch (err) {
        const mail = form.action.split("/").pop();
        status.classList.add("err");
        status.innerHTML = 'No se pudo enviar. Podés escribir directamente a <a href="mailto:' + mail + '">' + mail + "</a>.";
      } finally {
        btn.disabled = false;
        btn.textContent = "Enviar mensaje";
      }
    });
  }
})();
