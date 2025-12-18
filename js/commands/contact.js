// Contact command - Show contact information
export const contact = {
    description: "Show contact information",
    execute: () => {
        return `<div class="command-output">
            <h2 class="text-xl font-bold mb-4">Contact Me</h2>
            <div class="mb-2">
                <i data-feather="mail" class="inline mr-2"></i>
                <a href="mailto:chaitknight@proton.me" class="link">chaitknight@proton.me</a>
            </div>
            <div class="mb-2">
                <i data-feather="phone" class="inline mr-2"></i>
                <span class="text">+1 (437) 435-6030</span>
            </div>
            <div class="mb-2">
                <i data-feather="map-pin" class="inline mr-2"></i>
                <span class="text">Toronto, Canada.</span>
            </div>
            <div class="mb-2">
                <i data-feather="github" class="inline mr-2"></i>
                <a href="https://github.com/chaithaha" target="_blank" class="link">github.com/chaithaha</a>
            </div>
            <div class="mb-2">
                <i data-feather="linkedin" class="inline mr-2"></i>
                <a href="https://linkedin.com/in/chaitG" target="_blank" class="link">linkedin.com/in/chaitG</a>
            </div>
        </div>`;
    }
};
