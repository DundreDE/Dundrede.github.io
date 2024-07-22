// JavaScript für Scroll-Effekte
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            header.classList.remove('header-show');
            header.classList.add('header-hide');
        } else {
            header.classList.remove('header-hide');
            header.classList.add('header-show');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Animations beim Scrollen starten
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scroll für Menü-Punkte
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// JavaScript für Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Schließen des Modals beim Klick außerhalb des Inhalts
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Additional Projects Button
function toggleAdditionalProjects() {
    const additionalProjects = document.getElementById('additional-projects');
    if (additionalProjects) {
        additionalProjects.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            header.classList.remove('header-show');
            header.classList.add('header-hide');
        } else {
            header.classList.remove('header-hide');
            header.classList.add('header-show');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Animations beim Scrollen starten
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scroll für Menü-Punkte
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// JavaScript für Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Schließen des Modals beim Klick außerhalb des Inhalts
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Additional Projects Button
function toggleAdditionalProjects() {
    const additionalProjects = document.getElementById('additional-projects');
    if (additionalProjects) {
        additionalProjects.classList.toggle('hidden');
    }
}
