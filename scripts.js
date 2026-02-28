"use strict";
function getConfig() {
    return window.PORTFOLIO_CONFIG ?? {};
}
function setText(id, value) {
    if (!value)
        return;
    const node = document.getElementById(id);
    if (!node)
        return;
    node.textContent = value;
}
function setMeta(name, value) {
    if (!value)
        return;
    const meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta)
        return;
    meta.content = value;
}
function setMetaProperty(property, value) {
    if (!value)
        return;
    const meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta)
        return;
    meta.content = value;
}
function renderMetrics(items) {
    if (!items?.length)
        return;
    const list = document.getElementById("metrics-list");
    if (!list)
        return;
    list.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.value}</span> ${item.label}`;
        list.appendChild(li);
    });
}
function renderProjects(items) {
    if (!items?.length)
        return;
    const list = document.getElementById("projects-list");
    if (!list)
        return;
    list.innerHTML = "";
    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "project-card reveal";
        card.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async"${index === 0 ? ' fetchpriority="high"' : ""}>
      <div class="project-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
        list.appendChild(card);
    });
}
function renderServices(items) {
    if (!items?.length)
        return;
    const list = document.getElementById("services-list");
    if (!list)
        return;
    list.innerHTML = "";
    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "service-card reveal";
        card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
        list.appendChild(card);
    });
}
function applyConfig() {
    const config = getConfig();
    if (config.meta?.title)
        document.title = config.meta.title;
    setMeta("description", config.meta?.description);
    setMetaProperty("og:title", config.meta?.ogTitle);
    setMetaProperty("og:description", config.meta?.ogDescription);
    setMetaProperty("og:image", config.meta?.ogImage);
    setText("brand-logo", config.brand);
    setText("nav-projects", config.nav?.projects);
    setText("nav-services", config.nav?.services);
    setText("nav-about", config.nav?.about);
    setText("nav-cta", config.nav?.cta);
    setText("hero-eyebrow", config.hero?.eyebrow);
    setText("hero-title", config.hero?.title);
    setText("hero-copy", config.hero?.copy);
    setText("hero-cta-primary", config.hero?.primaryCta);
    setText("hero-cta-secondary", config.hero?.secondaryCta);
    setText("projects-eyebrow", config.projects?.eyebrow);
    setText("projects-title", config.projects?.title);
    setText("services-eyebrow", config.services?.eyebrow);
    setText("services-title", config.services?.title);
    setText("about-eyebrow", config.about?.eyebrow);
    setText("about-title", config.about?.title);
    setText("about-copy", config.about?.copy);
    setText("contact-eyebrow", config.contact?.eyebrow);
    setText("contact-title", config.contact?.title);
    setText("contact-copy", config.contact?.copy);
    setText("contact-button", config.contact?.buttonLabel);
    const form = document.getElementById("contact-form");
    if (form && config.contact?.email) {
        form.action = `mailto:${config.contact.email}`;
    }
    renderMetrics(config.metrics);
    renderProjects(config.projects?.items);
    renderServices(config.services?.items);
}
function markVisible(elements) {
    elements.forEach((el) => el.classList.add("is-visible"));
}
function setupReveal() {
    const targets = Array.from(document.querySelectorAll(".reveal"));
    if (!targets.length)
        return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anime = window.anime;
    if (reducedMotion) {
        markVisible(targets);
        return;
    }
    if (anime) {
        anime({
            targets: ".hero .reveal",
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 720,
            easing: "easeOutExpo",
            delay: (_el, i) => i * 120
        });
    }
    else {
        markVisible(targets);
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;
            const node = entry.target;
            if (anime) {
                anime({
                    targets: node,
                    translateY: [26, 0],
                    opacity: [0, 1],
                    duration: 620,
                    easing: "easeOutQuad"
                });
            }
            else {
                node.classList.add("is-visible");
            }
            observer.unobserve(node);
        });
    }, { threshold: 0.15 });
    targets.forEach((node) => {
        if (node.closest(".hero"))
            return;
        observer.observe(node);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    setupReveal();
});
