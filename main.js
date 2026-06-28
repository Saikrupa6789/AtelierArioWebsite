/* ═══════════════════════════════════════
   ATELIER ARIO — MAIN SCRIPTS
   ═══════════════════════════════════════ */

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-item, input, select, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── Navigation ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Smooth scroll for all [data-nav] links
document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('[data-mobile-nav]').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  });
});

// ── Reveal Animations (Intersection Observer) ──
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Counter Animation ──
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObserver.observe(el));

// ── Process Line Fill ──
const processLine = document.getElementById('process-line-fill');
const processSection = document.querySelector('.process-track');
if (processLine && processSection) {
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { processLine.style.height = '100%'; }, 300);
      }
    });
  }, { threshold: 0.1 });
  processObserver.observe(processSection);
}

// ── Portfolio Hover Card (follows cursor) ──
document.querySelectorAll('.portfolio-item').forEach(item => {
  const card = item.querySelector('.portfolio-hover-card');
  if (!card) return;

  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    let x = e.clientX + 24;
    let y = e.clientY - card.offsetHeight / 2;
    // Keep within viewport
    if (x + card.offsetWidth > window.innerWidth - 20) x = e.clientX - card.offsetWidth - 24;
    if (y < 10) y = 10;
    if (y + card.offsetHeight > window.innerHeight - 10) y = window.innerHeight - card.offsetHeight - 10;
    card.style.left = x + 'px';
    card.style.top  = y + 'px';
  });
});

// ── Project Modal ──
const modal = document.getElementById('project-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

const projectData = {
  'moms-bake': {
    title: "The Cinnamon Bean Cafe",
    eyebrow: "Brand Identity · Logo Design",
    heroClass: "moms-bake-preview",
    desc: `An elegant, cozy visual identity designed for a premium coffee house environment. The brand relies on a comforting, aromatic color story of warm beige, tan, espresso brown, and deep obsidian, utilizing a sophisticated typographic system that blends a timeless serif header (Forum) with an organic, flowing script accent (Brittany).`,
    deliverables: [
      "Primary Logo Design",
      "Secondary Submark",
      "Brand Color Palette",
      "Typography System",
      "Business Card Design",
      "Packaging Mockup",
      "Social Media Kit",
      "SVG + PNG + PDF Files"
    ],
    tags: ["Brand Identity", "Logo Design", "Packaging", "Mockups"]
  },
  'cake-ale': {
    title: "VOIDCRTL",
    eyebrow: "UI Design · Web Design",
    heroClass: "cake-ale-preview",
    desc: `A high-octane, edgy lifestyle brand anchored by the rebellious theme "Control the Chaos." The visual system is defined by a sharp, geometric slash-mark monogram, aggressive heavy-impact typography (Anton, Bebas Neue), and a striking neon cyberpunk color palette dominated by electric lime green, stark white, and charcoal black.`,
    deliverables: [
      "5 Full UI Screens",
      "Mobile Responsive Layouts",
      "Interactive Figma Prototype",
      "User Flow Mapping",
      "Design System Basics",
      "Component Library",
      "Developer-Ready Files",
      "CTA Optimization"
    ],
    tags: ["UI Design", "Web Design", "Figma", "UX Strategy", "E-commerce"]
  },
  'atelier-brand': {
    title: "Naturo Skincare",
    eyebrow: "Brand System · Visual Identity",
    heroClass: "atelier-preview",
    desc: `A clean, organic branding concept centered around natural wellness and minimalist aesthetics. Utilizing a refreshing, earth-toned palette of sage, forest greens, and deep clay brown, the identity pairs a delicate lotus-flower logomark with crisp serif typography to evoke a sense of pure, botanical-infused luxury.`,
    deliverables: [
      "Primary Logomark",
      "Secondary / Submark",
      "Full Color Palette (HEX/RGB/CMYK)",
      "Typography Hierarchy",
      "Brand Voice & Tone Guide",
      "Social Media Direction",
      "Brand Guidelines Document",
      "All Vector Format Files"
    ],
    tags: ["Brand System", "Logo Design", "Color Palette", "Brand Strategy", "Guidelines"]
  }
};

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const projectKey = item.dataset.project;
    const data = projectData[projectKey];
    if (!data) return;

    const deliverablesHTML = data.deliverables.map(d => `<div class="modal-deliverable">${d}</div>`).join('');
    const tagsHTML = data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

    modalBody.innerHTML = `
      <div class="modal-hero ${data.heroClass}"></div>
      <div class="modal-eyebrow">${data.eyebrow}</div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-desc">${data.desc.replace(/\n\n/g, '</p><p class="modal-desc" style="margin-top:16px">')}</p>
      <h4 style="font-size:0.8125rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);margin-bottom:16px">Deliverables</h4>
      <div class="modal-deliverables">${deliverablesHTML}</div>
      <div class="modal-tags">${tagsHTML}</div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Contact Form ──
// ── Contact Form Processing ──
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';

    // Package the form input fields
    const formData = new FormData(form);

    // Send the real data over HTTPS asynchronously
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Success path: clear inputs and show your existing custom success notification
        form.reset();
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 6000);
      } else {
        // Edge case server error handling
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert("Oops! There was a problem submitting your form.");
          }
        });
      }
    })
    .catch(error => {
      alert("Network error. Please try sending the email again.");
    })
    .finally(() => {
      // Re-enable your premium button states
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
    });
  });
}

// ── Parallax on hero orbs ──
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  const orb3 = document.querySelector('.hero-orb-3');
  if (orb1) orb1.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
  if (orb2) orb2.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  if (orb3) orb3.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
});

// ── Add hover sound effect class ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s, border-color 0.35s';
  });
});

// ── Footer wordmark duplicate for seamless loop ──
// Footer wordmark loops via CSS animation (content is pre-duplicated in HTML)
