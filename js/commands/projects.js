// Projects command - Show portfolio projects
// Using the same data structure as Simpler-Portfolio/data/projects.js
const projectsData = {
    featured: [
        {
            id: 1,
            title: "WattsWrong Website",
            description: "A college-funded project website based on a fictional LEGO city, featuring WattsWrong as a corrupt organization. Selected by sponsors for its innovative concept.",
            image: "../GIFS/watts-wrong.gif",
            technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
            link: "https://chaithaha.github.io/WattsWrong-Website/",
            github: "https://github.com/chait/wattswrong-website",
            hasGifPreview: true,
            gifPreviewTitle: "WattsWrong Preview"
        },
        {
            id: 2,
            title: "PC Building Guide",
            description: "A comprehensive PC building guide featuring a modern serverless architecture with YouTube and Reddit API integration. Built with Node.js/Express.js backend and responsive frontend, helping first-time builders find installation guides and community resources for any PC component.",
            image: "../GIFS/pcb.gif",
            technologies: ["Node.js", "Express.js", "JavaScript", "HTML5/CSS3", "Netlify"],
            link: "https://pcbuildchait.netlify.app/",
            github: "https://github.com/chait/pc-building-guide",
            hasGifPreview: true,
            gifPreviewTitle: "PC Guide Preview"
        },
        {
            id: 3,
            title: "ForOranges",
            description: "Full-stack e-commerce solution with React and Node.js and Supabase integration for authentication and database management.",
            image: "../giphy.gif",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "#",
            github: "https://github.com/chait/ecommerce-platform",
            hasGifPreview: true,
            gifPreviewTitle: "E-commerce Preview"
        },
        {
            id: 4,
            title: "Task Management App",
            description: "A productivity app for managing daily tasks",
            image: "../giphy.gif",
            technologies: ["Vue.js", "Firebase"],
            link: "#",
            github: "https://github.com/chait/task-management-app",
            hasGifPreview: true,
            gifPreviewTitle: "Task App Preview"
        }
    ]
};

export const projects = {
    description: "Show my projects",
    execute: () => {
        return `<div class="command-output">
            <h2 class="text-xl font-bold mb-4">My Projects</h2>
            
            ${projectsData.featured.map(project => `
                <div class="project-card">
                    <h3 class="font-bold text-lg mb-2">
                        <a href="${project.link}" target="_blank" class="text-white hover:text-blue-400 transition-colors duration-200 underline">
                            ${project.title}
                        </a>
                    </h3>
                    
                    ${project.hasGifPreview ? `
                        <!-- GIF Preview Window -->
                        <div class="mb-3 flex justify-center">
                            <div class="bg-gray-800 border border-gray-600 rounded-lg p-2 shadow-lg" style="max-width: 300px;">
                                <div class="bg-gray-700 rounded p-1 mb-1">
                                    <div class="flex items-center space-x-1">
                                        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div class="text-xs text-gray-400 ml-2">${project.gifPreviewTitle}</div>
                                    </div>
                                </div>
                                <div class="bg-black rounded overflow-hidden">
                                    <img src="${project.image}"
                                         alt="${project.title} Preview"
                                         class="w-full h-auto rounded"
                                         style="max-height: 200px; object-fit: ${project.title === 'WattsWrong Website' ? 'contain' : 'cover'}; background: #000;"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                    <div class="p-4 text-center text-gray-400" style="display: none;">
                                        <div class="text-sm">🎬 Preview</div>
                                        <div class="text-xs mt-1">Click title to view project</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <p class="text-gray-400 mb-2">${project.description}</p>
                    <div class="flex gap-2">
                        ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
            
        </div>`;
    }
};
