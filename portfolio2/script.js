// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});

// ==================== MOBILE MENU ====================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ==================== CIRCUIT BOARD ANIMATION ====================
const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.pulseRadius = 0;
        this.pulsing = false;
    }

    draw() {
        const isLightMode = body.classList.contains('light-mode');
        ctx.fillStyle = isLightMode ? '#4a90e2' : '#4a90e2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.pulsing) {
            ctx.strokeStyle = `rgba(74, 144, 226, ${1 - this.pulseRadius / 20})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
            ctx.stroke();
            this.pulseRadius += 0.5;
            if (this.pulseRadius > 20) {
                this.pulsing = false;
                this.pulseRadius = 0;
            }
        }
    }

    pulse() {
        this.pulsing = true;
        this.pulseRadius = 0;
    }
}

class Signal {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = 0.02;
        this.x = start.x;
        this.y = start.y;
    }

    update() {
        this.progress += this.speed;
        this.x = this.start.x + (this.end.x - this.start.x) * this.progress;
        this.y = this.start.y + (this.end.y - this.start.y) * this.progress;

        if (this.progress >= 1) {
            this.end.pulse();
            return true;
        }
        return false;
    }

    draw() {
        const gradient = ctx.createLinearGradient(
            this.x - 10, this.y,
            this.x + 10, this.y
        );
        gradient.addColorStop(0, 'rgba(74, 144, 226, 0)');
        gradient.addColorStop(0.5, 'rgba(74, 144, 226, 1)');
        gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#4a90e2';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Create nodes in a grid pattern
const nodes = [];
const gridSize = 150;
for (let x = gridSize; x < canvas.width; x += gridSize) {
    for (let y = gridSize; y < canvas.height; y += gridSize) {
        nodes.push(new Node(x + Math.random() * 50 - 25, y + Math.random() * 50 - 25));
    }
}

// Create connections between nearby nodes
const connections = [];
nodes.forEach((node, i) => {
    nodes.forEach((otherNode, j) => {
        if (i !== j) {
            const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
            if (dist < gridSize * 1.5) {
                connections.push([node, otherNode]);
            }
        }
    });
});

// Signals array
const signals = [];

function createSignal() {
    if (connections.length > 0 && Math.random() > 0.95) {
        const connection = connections[Math.floor(Math.random() * connections.length)];
        signals.push(new Signal(connection[0], connection[1]));
    }
}

function animate() {
    const isLightMode = body.classList.contains('light-mode');
    ctx.fillStyle = isLightMode ? 'rgba(245, 245, 245, 0.1)' : 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = isLightMode ? 'rgba(74, 144, 226, 0.15)' : 'rgba(74, 144, 226, 0.1)';
    ctx.lineWidth = 1;
    connections.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => node.draw());

    // Update and draw signals
    for (let i = signals.length - 1; i >= 0; i--) {
        const signal = signals[i];
        signal.draw();
        if (signal.update()) {
            signals.splice(i, 1);
        }
    }

    createSignal();
    requestAnimationFrame(animate);
}

animate();

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== GALLERY FUNCTIONALITY ====================
const imageUpload = document.getElementById('imageUpload');
const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalDelete = document.getElementById('modalDelete');

let galleryImages = [];
let currentImageIndex = 0;
let autoSlideInterval = null;

// Load images from localStorage on page load
function loadGalleryImages() {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
        galleryImages = JSON.parse(savedImages);
        renderGallery();
        startAutoSlide();
    }
}

// Save images to localStorage
function saveGalleryImages() {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
}

// Handle image upload
imageUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                galleryImages.push(event.target.result);
                saveGalleryImages();
                renderGallery();
                if (galleryImages.length === 1) {
                    startAutoSlide();
                }
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Reset input
    imageUpload.value = '';
});

// Render gallery
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    if (galleryImages.length === 0) {
        galleryEmpty.style.display = 'block';
        stopAutoSlide();
    } else {
        galleryEmpty.style.display = 'none';
        
        galleryImages.forEach((imageSrc, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.animationDelay = `${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Gallery Image ${index + 1}`;
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => openModal(index));
            
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Open modal
function openModal(index) {
    currentImageIndex = index;
    modalImage.src = galleryImages[currentImageIndex];
    galleryModal.classList.add('active');
    stopAutoSlide();
}

// Close modal
function closeModal() {
    galleryModal.classList.remove('active');
    startAutoSlide();
}

// Navigate to previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
}

// Delete current image
function deleteCurrentImage() {
    if (confirm('Are you sure you want to delete this image?')) {
        galleryImages.splice(currentImageIndex, 1);
        saveGalleryImages();
        
        if (galleryImages.length === 0) {
            closeModal();
        } else {
            currentImageIndex = currentImageIndex % galleryImages.length;
            modalImage.src = galleryImages[currentImageIndex];
        }
        
        renderGallery();
    }
}

// Auto-slide functionality
function startAutoSlide() {
    if (galleryImages.length > 1) {
        autoSlideInterval = setInterval(() => {
            const galleryItems = document.querySelectorAll('.gallery-item img');
            if (galleryItems.length > 0) {
                // Cycle through images
                galleryItems.forEach((img, index) => {
                    const nextIndex = (index + 1) % galleryImages.length;
                    setTimeout(() => {
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.src = galleryImages[nextIndex];
                            img.style.opacity = '1';
                        }, 300);
                    }, index * 100);
                });
            }
        }, 5000); // Change images every 5 seconds
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Modal event listeners
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);
modalDelete.addEventListener('click', deleteCurrentImage);

// Close modal when clicking outside the image
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Delete') deleteCurrentImage();
    }
});

// Initialize gallery on page load
loadGalleryImages();

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show success message
    successMessage.classList.add('show');

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);

    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.education-item, .hobby-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});