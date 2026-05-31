/**
 * Aray Soluções — Landing Page
 * Navegação, partículas, reveal e formulário (mailto)
 */

(function () {
  "use strict";

  var CONFIG = {
    whatsapp: "5551994841638",
    whatsappMsg:
      "Olá! Vim pelo site da Aray Soluções e gostaria de conversar sobre um projeto.",
    contactEmail: "aray.solucoes@gmail.com",
    particleCount: 35,
    scrollThreshold: 40,
  };

  var header = document.getElementById("header");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var heroCanvas = document.getElementById("heroParticles");
  var contactForm = document.getElementById("contactForm");
  var formFeedback = document.getElementById("formFeedback");
  var formSubmitBtn = document.getElementById("formSubmit");

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Header scroll ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle(
      "header--scrolled",
      window.scrollY > CONFIG.scrollThreshold
    );
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  function closeNav() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
    navMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openNav() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
    navMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Partículas no hero ---------- */
  var particlesAnimId = null;

  function initParticles() {
    if (!heroCanvas || prefersReducedMotion) return;

    var ctx = heroCanvas.getContext("2d");
    var particles = [];
    var w = 0;
    var h = 0;

    function resize() {
      var parent = heroCanvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      heroCanvas.width = w;
      heroCanvas.height = h;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < CONFIG.particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
    }

    function draw() {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w, h);

      particles.forEach(function (p) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, " + p.opacity + ")";
        ctx.fill();
      });

      particlesAnimId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        createParticles();
      }, 150);
    });

    if (prefersReducedMotion && particlesAnimId) {
      cancelAnimationFrame(particlesAnimId);
    }
  }

  initParticles();

  /* ---------- Formulário mailto ---------- */
  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = "form__feedback";
    if (type) formFeedback.classList.add("is-" + type);
  }

  function clearInvalid() {
    if (!contactForm) return;
    contactForm.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });
  }

  function validateForm() {
    if (!contactForm) return false;
    clearInvalid();
    var valid = true;

    var nome = contactForm.querySelector("#nome");
    var email = contactForm.querySelector("#email");
    var mensagem = contactForm.querySelector("#mensagem");

    if (!nome || !nome.value.trim()) {
      if (nome) nome.classList.add("is-invalid");
      valid = false;
    }

    if (
      !email ||
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      if (email) email.classList.add("is-invalid");
      valid = false;
    }

    if (!mensagem || !mensagem.value.trim()) {
      if (mensagem) mensagem.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      showFeedback("Preencha os campos obrigatórios corretamente.", "error");
    }

    return valid;
  }

  function buildMailtoUrl() {
    var nome = contactForm.querySelector("#nome");
    var email = contactForm.querySelector("#email");
    var empresa = contactForm.querySelector("#empresa");
    var mensagem = contactForm.querySelector("#mensagem");

    var corpo =
      "Nome: " +
      (nome && nome.value ? nome.value.trim() : "") +
      "\r\nE-mail: " +
      (email && email.value ? email.value.trim() : "") +
      "\r\nEmpresa: " +
      (empresa && empresa.value ? empresa.value.trim() : "-") +
      "\r\n\r\nMensagem:\r\n" +
      (mensagem && mensagem.value ? mensagem.value.trim() : "");

    return (
      "mailto:" +
      CONFIG.contactEmail +
      "?subject=" +
      encodeURIComponent("Novo contato — Site Aray Soluções") +
      "&body=" +
      encodeURIComponent(corpo)
    );
  }

  if (contactForm) {
    if (formFeedback) {
      formFeedback.textContent = "";
      formFeedback.className = "form__feedback";
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.info("[Aray] Envio do formulário iniciado");

      if (!validateForm()) {
        console.warn("[Aray] Validação falhou");
        return;
      }

      var mailtoUrl = buildMailtoUrl();
      console.info("[Aray] Abrindo mailto:", mailtoUrl);

      if (formSubmitBtn) {
        formSubmitBtn.classList.add("is-loading");
        formSubmitBtn.textContent = "Abrindo e-mail...";
      }

      try {
        window.location.href = mailtoUrl;
        showFeedback(
          "Se o e-mail não abrir, verifique se há Gmail/Outlook configurado no dispositivo, ou use o WhatsApp acima.",
          "success"
        );
        console.info("[Aray] mailto disparado com sucesso");
      } catch (err) {
        console.error("[Aray] Erro ao abrir mailto:", err);
        showFeedback(
          "Não foi possível abrir o e-mail neste dispositivo. Use o WhatsApp ou envie para aray.solucoes@gmail.com.",
          "error"
        );
      }

      setTimeout(function () {
        if (formSubmitBtn) {
          formSubmitBtn.classList.remove("is-loading");
          formSubmitBtn.textContent = "Enviar mensagem";
        }
      }, 2000);
    });
  }

  /* ---------- Links WhatsApp dinâmicos (fallback) ---------- */
  document.querySelectorAll(".btn--whatsapp").forEach(function (btn) {
    if (!btn.getAttribute("href") || btn.getAttribute("href") === "#") {
      var text = encodeURIComponent(CONFIG.whatsappMsg);
      btn.setAttribute(
        "href",
        "https://wa.me/" + CONFIG.whatsapp + "?text=" + text
      );
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener noreferrer");
    }
  });
})();
