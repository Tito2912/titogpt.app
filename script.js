document.addEventListener('DOMContentLoaded', function () {
  // Loader
  window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => loader.style.display = 'none'
    });
  });

  // Typed.js animation
  if (document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ['Révolutionnez', 'Transformez', 'Automatisez', 'Créez'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      showCursor: false
    });
  }

  // Particles.js turquoise
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#21e6c1" },
        shape: { type: "circle" },
        opacity: { value: 0.45, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#21e6c1", opacity: 0.17, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }

  // Animation 3D turquoise avec Three.js
  function init3DAnimation() {
    const canvas = document.getElementById('hero-3d');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x21e6c1,
      roughness: 0.18,
      metalness: 0.92,
      emissive: 0x21e6c1,
      emissiveIntensity: 0.39
    });

    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Redimensionnement responsive
    window.addEventListener('resize', () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  }

  // Initialiser l'animation 3D quand le canvas est prêt
  const canvasObserver = new MutationObserver((mutations, observer) => {
    if (document.getElementById('hero-3d')) {
      init3DAnimation();
      observer.disconnect();
    }
  });
  canvasObserver.observe(document.body, { childList: true, subtree: true });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Animation des cartes de fonctionnalités
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: "back.out(1.7)"
    });
  });

  // Animation de la navigation au scroll
  ScrollTrigger.create({
    start: "50px top",
    end: "max",
    onUpdate: (self) => {
      const nav = document.querySelector('.floating-nav');
      if (self.direction === -1 || window.scrollY > 100) {
        gsap.to(nav, {
          backgroundColor: 'rgba(15, 15, 26, 0.96)',
          borderBottomColor: 'rgba(33,230,193,0.18)',
          duration: 0.3
        });
      } else {
        gsap.to(nav, {
          backgroundColor: 'rgba(15, 15, 26, 0.82)',
          borderBottomColor: 'rgba(255, 255, 255, 0.09)',
          duration: 0.3
        });
      }
    }
  });

  // Effet magnétique pour les boutons
  const magneticButtons = document.querySelectorAll('.magnetic');
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angle = Math.atan2(y - centerY, x - centerX);
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      gsap.to(button, {
        x: Math.cos(angle) * distance * 0.1,
        y: Math.sin(angle) * distance * 0.1,
        duration: 0.5
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });

  // Smooth scrolling pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1,
          ease: "power2.inOut"
        });
        if (window.innerWidth <= 992) {
          document.querySelector('.mobile-menu').style.display = "none";
          document.querySelector('.menu-toggle').classList.remove('open');
        }
      }
    });
  });

  // Menu mobile toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      if (mobileMenu.style.display === "flex") {
        mobileMenu.style.display = "none";
        menuToggle.classList.remove('open');
      } else {
        mobileMenu.style.display = "flex";
        menuToggle.classList.add('open');
      }
    });
    // Clique dehors = ferme menu mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 992 && mobileMenu.style.display === "flex" &&
        !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.style.display = "none";
        menuToggle.classList.remove('open');
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992) {
        mobileMenu.style.display = "none";
        menuToggle.classList.remove('open');
      }
    });
  }

  // Empêche le scroll horizontal mobile
  window.addEventListener('resize', function () {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  });
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  // --- ACCORDION fonctionnalités complètes ---
  document.querySelectorAll('.feature-category').forEach(function (cat) {
    const header = cat.querySelector('.category-header');
    const chevron = header.querySelector('.chevron i');
    const panel = cat.querySelector('.feature-list');
    header.addEventListener('click', function () {
      // Toggle
      panel.classList.toggle('active');
      chevron.classList.toggle('fa-chevron-down');
      chevron.classList.toggle('fa-chevron-up');
      // Fermer les autres
      document.querySelectorAll('.feature-category').forEach(function (otherCat) {
        if (otherCat !== cat) {
          otherCat.querySelector('.feature-list').classList.remove('active');
          otherCat.querySelector('.chevron i').classList.add('fa-chevron-down');
          otherCat.querySelector('.chevron i').classList.remove('fa-chevron-up');
        }
      });
    });
  });

  // --- Newsletter campagne (simple alerte, à remplacer par une intégration backend) ---
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value.trim();
      if (!validateEmail(email)) {
        alert('Merci de renseigner un email valide.');
        return;
      }
      // Remplace cette partie par une vraie intégration (Make, Mailerlite, etc)
      alert("Merci ! Vous serez informé dès le lancement 🚀");
      newsletterForm.reset();
    });
  }
  function validateEmail(email) {
    // Basique mais efficace
    return /\S+@\S+\.\S+/.test(email);
  }
});
