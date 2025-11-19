<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Engineering Student Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0a0a0a;
            color: #fff;
            overflow-x: hidden;
        }

        /* Circuit Board Animation */
        .circuit-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            overflow: hidden;
        }

        canvas {
            display: block;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            padding: 30px 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(74, 144, 226, 0.1);
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(45deg, #4a90e2, #50e3c2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: scale(1.1);
        }

        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
        }

        .nav-links a {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            transition: color 0.3s ease;
            position: relative;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: #4a90e2;
            transition: width 0.3s ease;
        }

        .nav-links a:hover {
            color: #4a90e2;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .social-icons {
            display: flex;
            gap: 20px;
        }

        .social-icons a {
            color: #fff;
            font-size: 20px;
            transition: all 0.3s ease;
        }

        .social-icons a:hover {
            color: #4a90e2;
            transform: translateY(-3px);
        }

        /* Hero Section */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10%;
            z-index: 10;
        }

        .hero-content {
            flex: 1;
            max-width: 600px;
            opacity: 0;
            animation: fadeInUp 1s ease forwards;
            animation-delay: 0.5s;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero-content h1 {
            font-size: 56px;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .college-name {
            font-size: 18px;
            color: #4a90e2;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .hero-content .intro-text {
            font-size: 18px;
            color: #ccc;
            line-height: 1.8;
            margin-bottom: 40px;
        }

        .cta-button {
            display: inline-block;
            padding: 18px 45px;
            background: linear-gradient(45deg, #4a90e2, #50e3c2);
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }

        .cta-button:hover::before {
            width: 300px;
            height: 300px;
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(74, 144, 226, 0.5);
        }

        .hero-image {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            animation: fadeInRight 1s ease forwards;
            animation-delay: 0.8s;
        }

        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .profile-circle {
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4a90e2, #50e3c2);
            padding: 8px;
            box-shadow: 0 20px 60px rgba(74, 144, 226, 0.4);
            animation: float 3s ease-in-out infinite;
            position: relative;
        }

        .profile-circle::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 50%;
            background: linear-gradient(45deg, #4a90e2, #50e3c2, #4a90e2);
            background-size: 200% 200%;
            animation: borderGlow 3s ease infinite;
            z-index: -1;
            filter: blur(10px);
        }

        @keyframes borderGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }

        .profile-circle img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        /* Skills Section */
        .skills {
            padding: 80px 10%;
            text-align: center;
            position: relative;
            z-index: 10;
        }

        .skills h3 {
            font-size: 20px;
            color: #888;
            margin-bottom: 50px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .skills-grid {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            gap: 40px;
        }

        .skill-item {
            font-size: 28px;
            color: #555;
            transition: all 0.3s ease;
            cursor: pointer;
            padding: 20px 30px;
            border: 2px solid transparent;
            border-radius: 10px;
        }

        .skill-item:hover {
            color: #4a90e2;
            transform: scale(1.2);
            border-color: #4a90e2;
            box-shadow: 0 5px 20px rgba(74, 144, 226, 0.3);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            nav {
                padding: 20px 5%;
                flex-wrap: wrap;
            }

            .nav-links {
                gap: 15px;
                font-size: 13px;
            }

            .hero {
                flex-direction: column;
                padding: 120px 5% 50px;
                text-align: center;
            }

            .hero-content h1 {
                font-size: 36px;
            }

            .hero-content .intro-text {
                font-size: 16px;
            }

            .profile-circle {
                width: 280px;
                height: 280px;
                margin-top: 40px;
            }

            .skills {
                padding: 50px 5%;
            }

            .social-icons {
                gap: 15px;
            }
        }

        /* About Me Section */
        .about-me {
            padding: 100px 10%;
            position: relative;
            z-index: 10;
            background: rgba(15, 15, 25, 0.6);
            backdrop-filter: blur(10px);
        }

        .about-me h2 {
            font-size: 42px;
            margin-bottom: 30px;
            background: linear-gradient(45deg, #fff, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
        }

        .about-content {
            max-width: 900px;
            margin: 0 auto;
            font-size: 18px;
            line-height: 1.8;
            color: #ccc;
            text-align: center;
        }

        .about-content p {
            margin-bottom: 20px;
        }

        /* Education Section */
        .education {
            padding: 100px 10%;
            position: relative;
            z-index: 10;
        }

        .education h2 {
            font-size: 42px;
            margin-bottom: 50px;
            background: linear-gradient(45deg, #fff, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
        }

        .education-timeline {
            max-width: 800px;
            margin: 0 auto;
        }

        .education-item {
            background: rgba(74, 144, 226, 0.1);
            border-left: 4px solid #4a90e2;
            padding: 30px;
            margin-bottom: 30px;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .education-item:hover {
            background: rgba(74, 144, 226, 0.2);
            transform: translateX(10px);
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
        }

        .education-item h3 {
            font-size: 24px;
            color: #4a90e2;
            margin-bottom: 10px;
        }

        .education-item .institution {
            font-size: 18px;
            color: #fff;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .education-item .year {
            font-size: 16px;
            color: #888;
            margin-bottom: 15px;
        }

        .education-item p {
            font-size: 16px;
            color: #ccc;
            line-height: 1.6;
        }

        /* Hobbies Section */
        .hobbies {
            padding: 100px 10%;
            position: relative;
            z-index: 10;
            background: rgba(15, 15, 25, 0.6);
            backdrop-filter: blur(10px);
        }

        .hobbies h2 {
            font-size: 42px;
            margin-bottom: 50px;
            background: linear-gradient(45deg, #fff, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
        }

        .hobbies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .hobby-card {
            background: rgba(74, 144, 226, 0.1);
            padding: 40px 30px;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .hobby-card:hover {
            transform: translateY(-10px);
            border-color: #4a90e2;
            box-shadow: 0 15px 40px rgba(74, 144, 226, 0.4);
            background: rgba(74, 144, 226, 0.2);
        }

        .hobby-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .hobby-card h3 {
            font-size: 22px;
            color: #4a90e2;
            margin-bottom: 15px;
        }

        .hobby-card p {
            font-size: 16px;
            color: #ccc;
            line-height: 1.6;
        }

        @media (max-width: 768px) {
            .about-me, .education, .hobbies {
                padding: 60px 5%;
            }

            .about-me h2, .education h2, .hobbies h2 {
                font-size: 32px;
            }

            .hobbies-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Contact Section */
        .contact {
            padding: 100px 10%;
            position: relative;
            z-index: 10;
        }

        .contact h2 {
            font-size: 42px;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #4a90e2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
        }

        .contact-subtitle {
            text-align: center;
            font-size: 18px;
            color: #888;
            margin-bottom: 50px;
        }

        .contact-container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(74, 144, 226, 0.1);
            padding: 50px;
            border-radius: 20px;
            border: 2px solid rgba(74, 144, 226, 0.2);
            backdrop-filter: blur(10px);
        }

        .form-group {
            margin-bottom: 30px;
        }

        .form-group label {
            display: block;
            font-size: 16px;
            color: #4a90e2;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 15px 20px;
            background: rgba(10, 10, 10, 0.5);
            border: 2px solid rgba(74, 144, 226, 0.3);
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
        }

        .form-group textarea {
            min-height: 150px;
            resize: vertical;
        }

        .submit-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(45deg, #4a90e2, #50e3c2);
            color: #fff;
            border: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
        }

        .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(74, 144, 226, 0.5);
        }

        .submit-btn:active {
            transform: translateY(-1px);
        }

        .success-message {
            display: none;
            background: rgba(80, 227, 194, 0.2);
            border: 2px solid #50e3c2;
            padding: 20px;
            border-radius: 10px;
            color: #50e3c2;
            text-align: center;
            margin-top: 20px;
            animation: fadeInUp 0.5s ease;
        }

        .success-message.show {
            display: block;
        }

        /* Footer */
        .footer {
            padding: 30px 10%;
            text-align: center;
            background: rgba(10, 10, 10, 0.8);
            border-top: 1px solid rgba(74, 144, 226, 0.1);
            position: relative;
            z-index: 10;
        }

        .footer p {
            color: #888;
            font-size: 14px;
        }

        @media (max-width: 768px) {
            .contact {
                padding: 60px 5%;
            }

            .contact h2 {
                font-size: 32px;
            }

            .contact-container {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Circuit Board Background -->
    <div class="circuit-bg">
        <canvas id="circuitCanvas"></canvas>
    </div>

    <!-- Navigation -->
    <nav>
        <div class="logo">⚡ Portfolio</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#hobbies">Hobbies</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="social-icons">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="GitHub">⚙</a>
            <a href="#" aria-label="Twitter">🐦</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content">
            <h1>Alan Fernandes</h1>
            <p class="college-name">Fr. Conceicao Rodrigues College of Engineering, Bandra West</p>
            <p class="intro-text">First Year Engineering Student passionate about technology, and innovation. <b>Moulding Engineers who can build the future</b></p>
            <a href="#contact" class="cta-button">Let's Connect →</a>
        </div>
        <div class="hero-image">
            <div class="profile-circle">
                <img src="website.jpg" alt="Profile Picture">
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section class="skills" id="skills">
        <h3>Technical Skills</h3>
        <div class="skills-grid">
            <div class="skill-item">C Language</div>
            <div class="skill-item">Basic Web Development</div>
        </div>
    </section>

    <!-- About Me Section -->
    <section class="about-me" id="about">
        <h2>About Me</h2>
        <div class="about-content">
            <p>
                Hello! I'm a passionate first-year engineering student at Fr. Conceicao Rodrigues College of Engineering, 
                exploring the fascinating world of technology and innovation. My journey in engineering has just begun, 
                but I'm already captivated by the endless possibilities that lie ahead.
            </p>
            <p>
                I believe in learning by doing, and I'm constantly working on projects that challenge me to think 
                creatively and solve real-world problems. Whether it's coding, or design, I approach 
                every challenge with curiosity and determination.
            </p>
            <p>
                Beyond academics, I'm eager to collaborate, innovate, and make a positive impact through technology.
            </p>
        </div>
    </section>

    <!-- Education Section -->
    <section class="education" id="education">
        <h2>Education</h2>
        <div class="education-timeline">
            <div class="education-item">
                <h3>Bachelor of Engineering</h3>
                <p class="institution">Fr. Conceicao Rodrigues College of Engineering, Bandra West</p>
                <p class="year">2025 - 2029 (Expected)</p>
                <p>Currently pursuing my engineering degree with a focus on building strong fundamentals in 
                mathematics, programming, and core engineering concepts.</p>
            </div>
            <div class="education-item">
                <h3>Higher Secondary Education (12th Grade)</h3>
                <p class="institution">Shri GPM College, Andheri East</p>
                <p class="year">2024 - 2025</p>
                <p>Completed with a focus on Science stream, developing analytical and problem-solving skills.</p>
            </div>
            <div class="education-item">
                <h3>Secondary Education (10th Grade)</h3>
                <p class="institution">Holy Family High School, Andheri East</p>
                <p class="year">2022 - 2023</p>
                <p>Built foundational knowledge in mathematics, science, and technology.</p>
            </div>
        </div>
    </section>

    <!-- Hobbies Section -->
    <section class="hobbies" id="hobbies">
        <h2>Hobbies & Interests</h2>
        <div class="hobbies-grid">
            <div class="hobby-card">
                <div class="hobby-icon">💻</div>
                <h3>Coding</h3>
                <p>Love solving programming challenges and building projects that bring ideas to life.</p>
            </div>
            <div class="hobby-card">
                <div class="hobby-icon">📚</div>
                <h3>Reading</h3>
                <p>Enthusiastic reader of Philosophy and Literature</p>
            </div>
            <div class="hobby-card">
                <div class="hobby-icon">🎵</div>
                <h3>Music</h3>
                <p>Finding inspiration and relaxation through British Rock</p>
                <a href="https://open.spotify.com/playlist/6998fTw1ge0X7f3KAzY6Vm?si=0wmr9YHyS2SWtKL5z1ufJQ&pi=Ft7nZWc0RC6IV">View Playlist</a>

            </div>
            <div class="hobby-card">
                <div class="hobby-icon">🚴</div>
                <h3>Fitness</h3>
                <p>Spinning Miles, chasing sunrises, and fueled by excitement. Enthusiastic cyclist always ready for adventure!</p>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <h2>Get In Touch</h2>
        <p class="contact-subtitle">Have a question or want to work together? Drop me a message!</p>
        <div class="contact-container">
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Your Name *</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="your.email@example.com" required>
                </div>
                <div class="form-group">
                    <label for="message">Message (Optional)</label>
                    <textarea id="message" name="message" placeholder="Tell me about your project or idea..."></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
                <div class="success-message" id="successMessage">
                    ✓ Thank you! Your message has been sent successfully.
                </div>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2024 Your Name. Built with passion and coffee ☕</p>
    </footer>

    <script>
        // Circuit Board Animation
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
                ctx.fillStyle = '#4a90e2';
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
                // Draw the signal beam
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
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            ctx.strokeStyle = 'rgba(74, 144, 226, 0.1)';
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

        // Smooth scrolling
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

        // Contact Form Handler
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
    </script>
</body>
</html>
