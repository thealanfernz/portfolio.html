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

// ========== FIXED: STATIC GALLERY WITH AUTOMATIC SLIDESHOW (NO UPLOAD) ==========
const slideshowContainer = document.getElementById('slideshowContainer');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalDelete = document.getElementById('modalDelete');
const slideshowPrev = document.getElementById('slideshowPrev');
const slideshowNext = document.getElementById('slideshowNext');

let currentImageIndex = 0;
let slideshowInterval = null;
let currentSlideIndex = 0;

// Static images array (your images from HTML)
const staticImages = [
    'i/building1.jpg',
    'i/building2.jpg',
    'i/car.jpg',
    'i/fort.jpg',
    'i/t.jpeg'
];

// Initialize slideshow on page load
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    // Add click event to each slide
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            img.addEventListener('click', () => openGalleryModal(index));
        }
    });
    
    // Start automatic slideshow
    startSlideshow();
}

// Automatic slideshow functionality
function startSlideshow() {
    if (staticImages.length > 1) {
        slideshowInterval = setInterval(() => {
            nextSlide();
        }, 4500); // 4.5 seconds
    }
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    currentSlideIndex = (index + staticImages.length) % staticImages.length;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlideIndex) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// Manual navigation
slideshowPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
    stopSlideshow();
    startSlideshow(); // Restart timer
});

slideshowNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
    stopSlideshow();
    startSlideshow(); // Restart timer
});

// Open modal for fullscreen preview
function openGalleryModal(index) {
    currentImageIndex = index;
    modalImage.src = staticImages[currentImageIndex];
    galleryModal.classList.add('active');
    stopSlideshow();
}

// Close modal
function closeGalleryModal() {
    galleryModal.classList.remove('active');
    startSlideshow();
}

// Navigate to previous image in modal
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + staticImages.length) % staticImages.length;
    modalImage.src = staticImages[currentImageIndex];
}

// Navigate to next image in modal
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % staticImages.length;
    modalImage.src = staticImages[currentImageIndex];
}

// Modal event listeners
modalClose.addEventListener('click', closeGalleryModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

// Hide delete button for static gallery (no modifications allowed)
if (modalDelete) {
    modalDelete.style.display = 'none';
}

// Close modal when clicking outside the image
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (galleryModal.classList.contains('active')) {
        if (e.key === 'Escape') closeGalleryModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// Initialize gallery on page load
initializeSlideshow();

// ========== NEW: CERTIFICATES & ACHIEVEMENTS SECTION ==========
const newCertificateUpload = document.getElementById('newCertificateUpload');
const certificatesGrid = document.getElementById('certificatesGrid');
const certificatesEmpty = document.getElementById('certificatesEmpty');
const newCertificateModal = document.getElementById('newCertificateModal');
const newCertificateContent = document.getElementById('newCertificateContent');
const newCertificateModalClose = document.getElementById('newCertificateModalClose');
const newCertificatePrev = document.getElementById('newCertificatePrev');
const newCertificateNext = document.getElementById('newCertificateNext');
const newCertificateDelete = document.getElementById('newCertificateDelete');

let newCertificates = [];
let currentNewCertificateIndex = 0;

// Load certificates from localStorage
function loadNewCertificates() {
    const savedCertificates = localStorage.getItem('newCertificates');
    if (savedCertificates) {
        newCertificates = JSON.parse(savedCertificates);
        renderNewCertificates();
    }
}

// Save certificates to localStorage
function saveNewCertificates() {
    localStorage.setItem('newCertificates', JSON.stringify(newCertificates));
}

// Handle certificate upload
newCertificateUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const certificate = {
                src: event.target.result,
                type: file.type.startsWith('image/') ? 'image' : 'pdf',
                name: file.name
            };
            newCertificates.push(certificate);
            saveNewCertificates();
            renderNewCertificates();
        };
        
        reader.readAsDataURL(file);
    });
    
    newCertificateUpload.value = '';
});

// Render certificates grid
function renderNewCertificates() {
    certificatesGrid.innerHTML = '';
    
    if (newCertificates.length === 0) {
        certificatesEmpty.style.display = 'block';
    } else {
        certificatesEmpty.style.display = 'none';
        
        newCertificates.forEach((cert, index) => {
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card';
            certCard.style.animationDelay = `${index * 0.1}s`;
            
            if (cert.type === 'image') {
                const img = document.createElement('img');
                img.src = cert.src;
                img.alt = cert.name;
                certCard.appendChild(img);
            } else {
                const pdfPreview = document.createElement('div');
                pdfPreview.className = 'pdf-preview';
                pdfPreview.innerHTML = '📄<br>' + cert.name;
                certCard.appendChild(pdfPreview);
            }
            
            certCard.addEventListener('click', () => openNewCertificateModal(index));
            certificatesGrid.appendChild(certCard);
        });
    }
}

// Open certificate modal
function openNewCertificateModal(index) {
    currentNewCertificateIndex = index;
    const cert = newCertificates[currentNewCertificateIndex];
    
    newCertificateContent.innerHTML = '';
    
    if (cert.type === 'image') {
        const img = document.createElement('img');
        img.src = cert.src;
        img.className = 'modal-content';
        img.alt = cert.name;
        newCertificateContent.appendChild(img);
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = cert.src;
        iframe.className = 'modal-content pdf-iframe';
        newCertificateContent.appendChild(iframe);
    }
    
    newCertificateModal.classList.add('active');
}

// Close certificate modal
function closeNewCertificateModal() {
    newCertificateModal.classList.remove('active');
}

// Navigate certificates in modal
function showPrevNewCertificate() {
    currentNewCertificateIndex = (currentNewCertificateIndex - 1 + newCertificates.length) % newCertificates.length;
    openNewCertificateModal(currentNewCertificateIndex);
}

function showNextNewCertificate() {
    currentNewCertificateIndex = (currentNewCertificateIndex + 1) % newCertificates.length;
    openNewCertificateModal(currentNewCertificateIndex);
}

// Delete certificate
function deleteNewCertificate() {
    if (confirm('Are you sure you want to delete this certificate?')) {
        newCertificates.splice(currentNewCertificateIndex, 1);
        saveNewCertificates();
        
        if (newCertificates.length === 0) {
            closeNewCertificateModal();
        } else {
            currentNewCertificateIndex = currentNewCertificateIndex % newCertificates.length;
            openNewCertificateModal(currentNewCertificateIndex);
        }
        
        renderNewCertificates();
    }
}

// Certificate modal event listeners
newCertificateModalClose.addEventListener('click', closeNewCertificateModal);
newCertificatePrev.addEventListener('click', showPrevNewCertificate);
newCertificateNext.addEventListener('click', showNextNewCertificate);
newCertificateDelete.addEventListener('click', deleteNewCertificate);

newCertificateModal.addEventListener('click', (e) => {
    if (e.target === newCertificateModal) {
        closeNewCertificateModal();
    }
});

// Initialize certificates
loadNewCertificates();

// ========== NEW: READING MODAL WITH FAVORITE AUTHORS ==========
const readingPopupBtn = document.getElementById('readingPopupBtn');
const readingModal = document.getElementById('readingModal');
const readingModalClose = document.getElementById('readingModalClose');
const authorsGrid = document.getElementById('authorsGrid');

const favoriteAuthors = [
    {
        name: 'Fyodor Dostoevsky',
        description: 'Russian novelist exploring human psychology, morality, and existentialism through profound narratives.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg/440px-Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg',
        books: ['Crime and Punishment', 'The Brothers Karamazov', 'Notes from Underground', 'The Idiot', 'Demons']
    },
    {
        name: 'Albert Camus',
        description: 'French philosopher and author known for absurdist philosophy, examining meaning in an indifferent universe.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg/440px-Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg',
        books: ['The Stranger', 'The Myth of Sisyphus', 'The Plague', 'The Fall', 'The Rebel']
    },
    {
        name: 'George Orwell',
        description: 'English novelist and essayist famous for dystopian fiction critiquing totalitarianism and social injustice.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/440px-George_Orwell_press_photo.jpg',
        books: ['1984', 'Animal Farm', 'Homage to Catalonia', 'Down and Out in Paris and London', 'The Road to Wigan Pier']
    },
    {
        name: 'Franz Kafka',
        description: 'Czech writer exploring themes of alienation, existential anxiety, and absurdity in modern life.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kafka_portrait.jpg/440px-Kafka_portrait.jpg',
        books: ['The Metamorphosis', 'The Trial', 'The Castle', 'Amerika', 'A Hunger Artist']
    }
];

// Populate authors
function PopulateAuthors() {
    authorsGrid.innerHTML = '';
    
    favoriteAuthors.forEach((author, index) => {
        const authorCard = document.createElement('div');
        authorCard.className = 'author-card';
        authorCard.style.animationDelay = `${index * 0.1}s`;
        
        authorCard.innerHTML = `
            <div class="author-image-wrapper">
                <img src="${author.image}" alt="${author.name}">
            </div>
            <h3>${author.name}</h3>
            <p class="author-description">${author.description}</p>
            <div class="author-books">
                <h4>Recommended Books:</h4>
                <ul>
                    ${author.books.map(book => `<li>${book}</li>`).join('')}
                </ul>
            </div>
        `;
        
        authorsGrid.appendChild(authorCard);
    });
}

// Open reading modal - check if button exists first
if (readingPopupBtn) {
    readingPopupBtn.addEventListener('click', () => {
        PopulateAuthors();
        readingModal.classList.add('active');
    });
}

// Close reading modal
if (readingModalClose) {
    readingModalClose.addEventListener('click', () => {
        readingModal.classList.remove('active');
    });
}

if (readingModal) {
    readingModal.addEventListener('click', (e) => {
        if (e.target === readingModal) {
            readingModal.classList.remove('active');
        }
    });
}

// ========== NEW: MUSIC MODAL WITH FAVORITE ARTISTS ==========
const musicPopupBtn = document.getElementById('musicPopupBtn');
const musicModal = document.getElementById('musicModal');
const musicModalClose = document.getElementById('musicModalClose');
const albumsGrid = document.getElementById('albumsGrid');

const musicCollection = [
  
    // Radiohead
    {
        artist: 'Radiohead',
        album: 'OK Computer',
        cover: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png',
        spotify: 'https://open.spotify.com/album/6dVIqQ8qmQ5GBnJ9shOYGE'
    },
    {
        artist: 'Radiohead',
        album: 'In Rainbows',
        cover: 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png',
        spotify: 'https://open.spotify.com/album/5vkqYmiPBYLaalcmjujWxK'
    },
];

// Populate music collection
function populateMusicCollection() {
    albumsGrid.innerHTML = '';
    
    musicCollection.forEach((album, index) => {
        const albumCard = document.createElement('a');
        albumCard.href = album.spotify;
        albumCard.target = '_blank';
        albumCard.className = 'album-card';
        albumCard.style.animationDelay = `${index * 0.1}s`;
        
        albumCard.innerHTML = `
            <img src="${album.cover}" alt="${album.album}">
            <div class="album-info">
                <h3>${album.album}</h3>
                <p>${album.artist}</p>
            </div>
        `;
        
        albumsGrid.appendChild(albumCard);
    });
}

// Open music modal
if (musicPopupBtn) {
    musicPopupBtn.addEventListener('click', () => {
        populateMusicCollection();
        musicModal.classList.add('active');
    });
}

// Close music modal
if (musicModalClose) {
    musicModalClose.addEventListener('click', () => {
        musicModal.classList.remove('active');
    });
}

if (musicModal) {
    musicModal.addEventListener('click', (e) => {
        if (e.target === musicModal) {
            musicModal.classList.remove('active');
        }
    });
}


// In script.js

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.send("service_kk174ow", "template_s09v89h", {
        // CORRECTED IDs to match index.html:
        user_name: document.getElementById('name').value, 
        user_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    })
    .then(() => {
        successMessage.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
            successMessage.classList.remove("show");
        }, 5000);
    })
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
document.querySelectorAll('.education-item, .hobby-card, .project-card, .certificate-card, .author-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});