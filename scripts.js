"use strict";
function setupSpline() {
    const mount = document.getElementById("spline-mount");
    if (!mount)
        return;
    const splineUrl = mount.dataset.splineUrl?.trim();
    if (!splineUrl)
        return;
    const frame = document.createElement("iframe");
    frame.src = splineUrl;
    frame.title = "Spline 3D Scene";
    frame.loading = "lazy";
    frame.allowFullscreen = true;
    mount.innerHTML = "";
    mount.appendChild(frame);
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
    setupSpline();
    setupReveal();
});
