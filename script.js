document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Modal Logic (For Home Page: index.html)
    // ==========================================
    const aboutBtn = document.getElementById('about-btn');
    const skillsBtn = document.getElementById('skills-btn');
    const aboutDisplay = document.getElementById('about-display');
    const skillsDisplay = document.getElementById('skills-display');
    
    // --- About Me Logic ---
    if (aboutBtn && aboutDisplay) {
        const closeBtn = aboutDisplay.querySelector('.close-btn');

        // Modal Open
        aboutBtn.addEventListener('click', () => {
            if(skillsDisplay) skillsDisplay.classList.add('hidden'); // Skills band karo
            aboutDisplay.classList.remove('hidden'); // About kholo
        });

        // Modal Close
        closeBtn.addEventListener('click', () => {
            aboutDisplay.classList.add('hidden');
        });

        // Close on clicking outside
        aboutDisplay.addEventListener('click', (e) => {
            if (e.target === aboutDisplay) {
                aboutDisplay.classList.add('hidden');
            }
        });
    }

    // --- My Skills Logic ---
    if (skillsBtn && skillsDisplay) {
        const closeBtn = skillsDisplay.querySelector('.close-btn');

        // Modal Open
        skillsBtn.addEventListener('click', () => {
            if(aboutDisplay) aboutDisplay.classList.add('hidden'); // About band karo
            skillsDisplay.classList.remove('hidden'); // Skills kholo
        });

        // Modal Close
        closeBtn.addEventListener('click', () => {
            skillsDisplay.classList.add('hidden');
        });

        // Close on clicking outside
        skillsDisplay.addEventListener('click', (e) => {
            if (e.target === skillsDisplay) {
                skillsDisplay.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // 2. JSON Fetch Logic (For Projects & Downloads Pages)
    // ==========================================
    const projectsContainer = document.getElementById('projects-container');
    const downloadsContainer = document.getElementById('downloads-container');

    // Agar inme se koi bhi container page pe hai, toh JSON fetch karo
    if (projectsContainer || downloadsContainer) {
        fetchData();
    }

    async function fetchData() {
        try {
            // Ensure data.json is in the same directory
            const response = await fetch('data.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const projects = await response.json();

            // Populate My Projects Page (Dikhaao saare projects)
            if (projectsContainer) {
                renderCards(projects, projectsContainer);
            }

            // Populate Downloads Page (Dikhaao sirf wo jisme hasDownload = true ho)
            if (downloadsContainer) {
                const downloadableProjects = projects.filter(p => p.hasDownload === true);
                renderCards(downloadableProjects, downloadsContainer);
            }

        } catch (error) {
            console.error("Error fetching projects JSON:", error);
            const errorMsg = `<p style="color:var(--crayon-red); font-size:1.5rem; text-align:center;">Failed to load project data. Make sure you are running this via a local server (like Live Server) because browsers block local file fetching.</p>`;
            
            if (projectsContainer) projectsContainer.innerHTML = errorMsg;
            if (downloadsContainer) downloadsContainer.innerHTML = errorMsg;
        }
    }

    // --- Helper Function: Generates HTML structure for the project cards ---
    function renderCards(dataArray, containerElement) {
        // Agar list empty hai (e.g., no downloads available)
        if (dataArray.length === 0) {
            containerElement.innerHTML = `<p style="font-size:1.5rem; text-align:center; width:100%;">No projects found here yet.</p>`;
            return;
        }

        // Loop through data and create HTML
        containerElement.innerHTML = dataArray.map(project => `
            <div class="project-card scribble-border">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                
                <div class="tech-stack">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag" style="background: var(--crayon-yellow);">${tech}</span>`
                    ).join('')}
                </div>

                ${project.hasDownload ? 
                    `<a href="${project.downloadLink}" class="download-link scribble-border" target="_blank">⬇ Download Here</a>` 
                    : ''
                }
            </div>
        `).join('');
    }

});