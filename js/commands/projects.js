// Projects command - Show portfolio projects
// Using the same data structure as Simpler-Portfolio/data/projects.js
const projectsData = {
    featured: [
        {
            id: 4,
            title: "WIP Android Marketplace App",
            description: "Android marketplace application built with Jetpack Compose and Kotlin, featuring secure authentication, location-based search, and category filtering for buying and selling pre-owned and new items.",
            image: "./GIFS/android.mp4",
            technologies: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase Authentication", "REST API", "MVVM Architecture"],
            link: "https://streamable.com/df1mxt",
            github: "#",
            hasGifPreview: true,
            gifPreviewTitle: ""
        },
        {
            id: 3,
            title: "ForOranges",
            description: "Full-stack e-commerce solution with React and Node.js and Supabase integration for authentication and database management.",
            image: "./GIFS/fororanges.gif",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "https://e-com-front-chi.vercel.app/",
            github: "https://github.com/chait/ecommerce-platform",
            hasGifPreview: true,
            gifPreviewTitle: ""
        },
        {
            id: 2,
            title: "PC Building Guide",
            description: "A comprehensive PC building guide featuring a modern serverless architecture with YouTube and Reddit API integration. Built with Node.js/Express.js backend and responsive frontend, helping first-time builders find installation guides and community resources for any PC component.",
            image: "./GIFS/pcb.gif",
            technologies: ["Node.js", "Express.js", "JavaScript", "HTML5/CSS3", "Netlify"],
            link: "https://pcbuildchait.netlify.app/",
            github: "https://github.com/chait/pc-building-guide",
            hasGifPreview: true,
            gifPreviewTitle: ""
        },
        {
            id: 1,
            title: "WattsWrong Website",
            description: "A college-funded project website based on a fictional LEGO city, featuring WattsWrong as a corrupt organization. Selected by sponsors for its innovative concept.",
            image: "./GIFS/watts-wrong.gif",
            technologies: ["HTML", "CSS", "JavaScript", "Web Design"],
            link: "https://chaithaha.github.io/WattsWrong-Website/",
            github: "https://github.com/chait/wattswrong-website",
            hasGifPreview: true,
            gifPreviewTitle: ""
        },
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
                                        ${project.gifPreviewTitle ? `<div class="text-xs text-gray-400 ml-2">${project.gifPreviewTitle}</div>` : ''}
                                    </div>
                                </div>
                                <div class="bg-black rounded overflow-hidden relative">
                                    ${project.image.endsWith('.mp4') ?
                                        `<video src="${project.image}"
                                                alt="${project.title} Preview"
                                                class="w-full h-auto rounded cursor-pointer"
                                                style="max-height: 200px; object-fit: cover; background: #000;"
                                                muted
                                                loop
                                                playsinline
                                                preload="metadata"
                                                onloadeddata="this.play().catch(e => { console.log('Autoplay prevented, will play on click'); this.parentElement.querySelector('.play-overlay').style.display='flex'; });"
                                                onclick="if(this.paused) { this.play(); this.parentElement.querySelector('.play-overlay').style.display='none'; } else { this.pause(); this.parentElement.querySelector('.play-overlay').style.display='flex'; }"
                                                onerror="console.error('Video loading error:', e); this.style.display='none'; this.nextElementSibling.style.display='block';">
                                         </video>
                                         <div class="play-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 pointer-events-none" style="display: none;">
                                             <div class="text-white text-center">
                                                 <div class="text-4xl mb-2">▶️</div>
                                                 <div class="text-sm">Click to play</div>
                                             </div>
                                         </div>` :
                                        `<img src="${project.image}"
                                             alt="${project.title} Preview"
                                             class="w-full h-auto rounded"
                                             style="max-height: 200px; object-fit: ${project.title === 'WattsWrong Website' ? 'contain' : 'cover'}; background: #000;"
                                             loading="lazy"
                                             onload="console.log('Image loaded successfully');"
                                             onerror="console.error('Image loading error:', e); this.style.display='none'; this.nextElementSibling.style.display='block';">`
                                    }
                                    <div class="p-4 text-center text-gray-400" style="display: none;">
                                        <div class="text-sm">🎬 Preview</div>
                                        <div class="text-xs mt-1">Click title to view project</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <p class="text-gray-400 mb-2">${project.description}</p>
                    <div class="flex flex-wrap gap-2" style="overflow-wrap: break-word; word-wrap: break-word;">
                        ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
            
        </div>`;
    }
};
