// About command - Show information about the developer
export const about = {
    description: "Show information about me",
    execute: () => {
        // Personal information data structure matching Simpler-Portfolio/data/personal.js
        const personalInfo = {
            name: "Chait",
            title: "Full Stack Developer",
            subtitle: "Building exceptional digital experiences with clean, efficient code and thoughtful design.",
            bio: {
                paragraph1: "I specialize in creating responsive, user-friendly websites and applications that aim to drive business results.",
                paragraph2: "I hold a degree in Computer Science and have worked with clients ranging from startups to established companies, helping them bring their digital visions to life.",
                paragraph3: "When I'm not coding, you can find me exploring new technologies, sharing knowledge with the developer community or probably gaming lol."
            },
            stats: [
            ],
            contact: {
                email: "chaitknight@proton.me",
                phone: "+1 (437) 435-6030",
                location: "Toronto, Canada.",
                social: {
                    github: "https://github.com/chaithaha",
                    linkedin: "https://linkedin.com/in/chaitG",
                }
            },
            skills: {
                categories: [
                    {
                        title: "Frontend Development",
                        icon: "code",
                        description: "Building responsive, accessible, and performant user interfaces.",
                        skills: [
                            "React", "Vue.js", "JavaScript", "TypeScript",
                            "HTML5", "CSS3", "Tailwind", "Sass", "HTML/CSS"
                        ]
                    },
                    {
                        title: "Backend Development",
                        icon: "server",
                        description: "Creating robust, scalable server-side applications and APIs.",
                        skills: [
                            "Node.js", "Express", "Python", "Django",
                            "PostgreSQL", "MongoDB", "Firebase", "REST APIs",
                            "Express.js", "SQL"
                        ]
                    },
                    {
                        title: "Tools & Practices",
                        icon: "tool",
                        description: "Following industry best practices and using modern tools.",
                        skills: [
                            "Git", "Docker", "CI/CD", "Testing",
                            "Agile", "Figma", "Jira", "AWS"
                        ]
                    }
                ]
            }
        };

        return `<div class="command-output">
            <div class="mb-4">
                <h2 class="text-xl font-bold mb-2">About Me</h2>
                <p><strong>${personalInfo.name}</strong> - ${personalInfo.title}</p>
                <p class="mt-2">${personalInfo.subtitle}</p>
                
                <div class="mt-4">
                    <h3 class="font-bold mb-2">Bio:</h3>
                    <p class="mb-2">${personalInfo.bio.paragraph1}</p>
                    <p class="mb-2">${personalInfo.bio.paragraph2}</p>
                    <p>${personalInfo.bio.paragraph3}</p>
                </div>
                
                <div class="mt-4">
                    <h3 class="font-bold mb-2">Experience & Achievements:</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        ${personalInfo.stats.map(stat => `
                            <div class="bg-gray-800 p-2 rounded">
                                <span class="text-blue-400">[${stat.icon}]</span> ${stat.text}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-4">
                    <h3 class="font-bold mb-2">Skills:</h3>
                    <div class="space-y-3">
                        ${personalInfo.skills.categories.map(category => `
                            <div class="bg-gray-800 p-3 rounded">
                                <div class="flex items-center mb-2">
                                    <span class="text-blue-400 mr-2">[${category.icon}]</span>
                                    <h4 class="font-bold text-lg">${category.title}</h4>
                                </div>
                                <p class="text-sm text-gray-300 mb-2">${category.description}</p>
                                <div class="flex flex-wrap gap-2">
                                    ${category.skills.map(skill => `
                                        <span class="skill-tag">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-4">
                    <h3 class="font-bold mb-2">Contact Information:</h3>
                    <div class="space-y-1">
                        <p><span class="text-green-400">Email:</span> ${personalInfo.contact.email}</p>
                        <p><span class="text-green-400">Phone:</span> ${personalInfo.contact.phone}</p>
                        <p><span class="text-green-400">Location:</span> ${personalInfo.contact.location}</p>
                        <div class="mt-2">
                            <p class="text-green-400">Social:</p>
                            <div class="ml-4 space-y-1">
                                <p><span class="text-blue-400">GitHub:</span> ${personalInfo.contact.social.github}</p>
                                <p><span class="text-blue-400">LinkedIn:</span> ${personalInfo.contact.social.linkedin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
};
