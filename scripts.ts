type AnimeFn = (params: Record<string, unknown>) => void;

type MetricItem = { value: string; label: string };
type ProjectItem = { image: string; alt: string; title: string; description: string };
type ServiceItem = { title: string; description: string };

type PortfolioConfig = {
  meta?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  brand?: string;
  nav?: {
    projects?: string;
    services?: string;
    about?: string;
    cta?: string;
  };
  hero?: {
    eyebrow?: string;
    title?: string;
    copy?: string;
    primaryCta?: string;
    secondaryCta?: string;
    splineUrl?: string;
  };
  metrics?: MetricItem[];
  projects?: {
    eyebrow?: string;
    title?: string;
    items?: ProjectItem[];
  };
  services?: {
    eyebrow?: string;
    title?: string;
    items?: ServiceItem[];
  };
  about?: {
    eyebrow?: string;
    title?: string;
    copy?: string;
  };
  contact?: {
    eyebrow?: string;
    title?: string;
    copy?: string;
    email?: string;
    buttonLabel?: string;
  };
};

function getConfig(): PortfolioConfig {
  return (window as Window & { PORTFOLIO_CONFIG?: PortfolioConfig }).PORTFOLIO_CONFIG ?? {};
}

function setText(id: string, value?: string): void {
  if (!value) return;
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = value;
}

function setMeta(name: string, value?: string): void {
  if (!value) return;
  const meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) return;
  meta.content = value;
}

function setMetaProperty(property: string, value?: string): void {
  if (!value) return;
  const meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) return;
  meta.content = value;
}

function renderMetrics(items?: MetricItem[]): void {
  if (!items?.length) return;
  const list = document.getElementById("metrics-list");
  if (!list) return;

  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.value}</span> ${item.label}`;
    list.appendChild(li);
  });
}

function renderProjects(items?: ProjectItem[]): void {
  if (!items?.length) return;
  const list = document.getElementById("projects-list");
  if (!list) return;

  list.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.alt}">
      <div class="project-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderServices(items?: ServiceItem[]): void {
  if (!items?.length) return;
  const list = document.getElementById("services-list");
  if (!list) return;

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

function applyConfig(): void {
  const config = getConfig();

  if (config.meta?.title) document.title = config.meta.title;
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

  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (form && config.contact?.email) {
    form.action = `mailto:${config.contact.email}`;
  }

  const splineMount = document.getElementById("spline-mount") as HTMLDivElement | null;
  if (splineMount && config.hero?.splineUrl !== undefined) {
    splineMount.dataset.splineUrl = config.hero.splineUrl;
  }

  renderMetrics(config.metrics);
  renderProjects(config.projects?.items);
  renderServices(config.services?.items);
}

function setupSpline(): void {
  const mount = document.getElementById("spline-mount") as HTMLDivElement | null;
  if (!mount) return;

  const splineUrl = mount.dataset.splineUrl?.trim();
  if (!splineUrl) return;

  const frame = document.createElement("iframe");
  frame.src = splineUrl;
  frame.title = "Spline 3D Scene";
  frame.loading = "lazy";
  frame.allowFullscreen = true;
  mount.innerHTML = "";
  mount.appendChild(frame);
}

function markVisible(elements: Element[]): void {
  elements.forEach((el) => el.classList.add("is-visible"));
}

function setupReveal(): void {
  const targets = Array.from(document.querySelectorAll(".reveal"));
  if (!targets.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anime = (window as Window & { anime?: AnimeFn }).anime;

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
      delay: (_el: unknown, i: number) => i * 120
    });
  } else {
    markVisible(targets);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target as HTMLElement;
        if (anime) {
          anime({
            targets: node,
            translateY: [26, 0],
            opacity: [0, 1],
            duration: 620,
            easing: "easeOutQuad"
          });
        } else {
          node.classList.add("is-visible");
        }

        observer.unobserve(node);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((node) => {
    if (node.closest(".hero")) return;
    observer.observe(node);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setupSpline();
  setupReveal();
});
