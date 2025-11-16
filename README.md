<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alan Fernandes - First-Year Computer Engineering Portfolio</title>
    <!-- Load Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            font-family: 'Inter', sans-serif;
        }
        .section-heading {
            position: relative;
            display: inline-block;
            padding-bottom: 0.5rem;
        }
        .section-heading::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50%;
            height: 4px;
            background-color: #4f46e5; /* Red-600 */
            border-radius: 9999px;
        }
        .card-shadow {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1px), 0 1px 4px rgba(0, 0, 0, 0.02);
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 antialiased">

    <!-- Header & Hero Section -->
    <header class="bg-Red-600 text-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Alan Fernandes
            </h1>
            <p class="text-xl sm:text-2xl font-light mt-2">
                First-Year Computer Engineering Student
            </p>
            <p class="text-sm font-light mt-1 opacity-80">
                Fr. Conceicao Rodrigues College of Engineering (FRCRCE), Bandra West
            </p>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8 space-y-16">

        <!-- About Me -->
        <section id="about" class="bg-white p-6 md:p-8 rounded-xl card-shadow">
            <h2 class="text-2xl font-bold text-gray-900 mb-4 section-heading">About Me</h2>
            <p class="text-lg leading-relaxed">
                I am an enthusiastic and results-driven first-year Computer Engineering student at <b>Fr. Conceicao Rodrigues College of Engineering (FCRCE), Bandra West</b>. My academic journey has begun with a strong focus on <b>C programming fundamentals, Data Structures, and the mathematical principles underlying computing.</b> I am passionate about utilizing code to solve practical problems and am actively seeking opportunities to apply theoretical knowledge through early projects and extracurricular engagement in technology.
            </p>
            <div class="mt-4 flex flex-wrap gap-4 text-sm font-medium">
                <span class="px-3 py-1 bg-Red-100 text-Red-800 rounded-full">Problem Solver</span>
                <span class="px-3 py-1 bg-Red-100 text-Red-800 rounded-full">Quick Learner</span>
                <span class="px-3 py-1 bg-Red-100 text-Red-800 rounded-full">Team Player</span>
            </div>
        </section>

        <!-- Education -->
        <section id="education">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 section-heading">Education</h2>
            <div class="bg-white p-6 rounded-xl card-shadow border-l-4 border-Red-500">
                <h3 class="text-xl font-semibold text-gray-800">FE Computer Engineering</h3>
                <p class="text-lg text-gray-600">Fr. Conceicao Rodrigues College of Engineering (FCRCE), Bandra</p>
                <p class="text-sm text-gray-500 mt-1">Expected Graduation: 2029</p>
                <ul class="list-disc list-inside text-sm mt-3 space-y-1 text-gray-600">
                    <li>Current Focus: Structured Programming Approach (C).</li>
                    
                  
                </ul>
            </div>
        </section>

        <!-- Technical Skills -->
        <section id="skills">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 section-heading">Technical Skills & Proficiency</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Core Languages -->
                <div class="bg-white p-6 rounded-xl card-shadow">
                    <h3 class="text-xl font-semibold mb-3 flex items-center">
                        Programming Languages
                    </h3>
                    <div class="space-y-2">
                        <div class="flex justify-between font-medium"><span>C</span><span class="text-Red-600">Foundational</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-Red-600 h-2 rounded-full w-4/5"></div>
                        </div>

                        
                        </div>
                    </div>
                </div>

                <!-- Tools and Concepts -->
                <div class="bg-white p-6 rounded-xl card-shadow">
                    <h3 class="text-xl font-semibold mb-3 flex items-center">
                        Tools & Concepts
                    </h3>
                    <div class="flex flex-wrap gap-2 text-sm">
                        <span class="tag-item">Git & GitHub Basics</span>
                        <span class="tag-item">VS Code</span>
                        <span class="tag-item">Linux Command Line (Intro)</span>
                        <span class="tag-item">Basic Web Development (HTML/CSS)</span>
                        <span class="tag-item">Object-Oriented Programming (Concepts)</span>
                        <span class="tag-item">Debugging</span>
                    </div>
                </div>
            </div>
        </section>

       

    <!-- Footer and Contact Section -->
    <footer class="bg-gray-800 text-white mt-16">
        <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
            <div class="text-center md:text-left mb-4 md:mb-0">
                <h3 class="text-xl font-semibold">Connect with Me</h3>
                <p class="text-sm text-gray-400">Computer Engineering | FRCRCE</p>
            </div>
            <div class="flex space-x-6">
                <a href="mailto:11079@crce.edu.in" class="text-Red-400 hover:text-Red-300 transition duration-300">
                    Email
                </a>
               
                </a>
                <a href="https://github.com/thealanfernz" target="_blank" class="text-Red-400 hover:text-Red-300 transition duration-300">
                    GitHub
                </a>
            </div>
        </div>
        <div class="text-center text-xs text-gray-500 py-2 bg-gray-900">
            &copy; 2024 Alan Fernandes. All Rights Reserved.
        </div>
    </footer>

    <!-- Custom Tailwind utility for skill tags -->
    <script>
        document.querySelectorAll('.tag-item').forEach(el => {
            el.classList.add('px-3', 'py-1', 'bg-gray-200', 'text-gray-700', 'rounded-full', 'font-medium', 'whitespace-nowrap');
        });
    </script>
</body>
</html>
