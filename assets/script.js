// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const body = document.body;

function setTheme(mode) {
    if (mode === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        if (toggleIcon) toggleIcon.textContent = '🌙';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (toggleIcon) toggleIcon.textContent = '☀️';
    }
}

function getTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// On load, set theme from localStorage or default
setTheme(getTheme());

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const current = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    });
}
