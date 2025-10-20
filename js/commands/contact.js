// Contact command - Show contact information
export const contact = {
    description: "Show contact information",
    execute: () => {
        return `<div class="command-output">
            <h2 class="text-xl font-bold mb-4">Contact Me</h2>
            <div class="mb-2">
                <i data-feather="mail" class="inline mr-2"></i>
                <a href="mailto:chait@example.com" class="link">chait@example.com</a>
            </div>
            <div class="mb-2">
                <i data-feather="phone" class="inline mr-2"></i>
                <span class="text">+1 (555) 123-4567</span>
            </div>
            <div class="mb-2">
                <i data-feather="map-pin" class="inline mr-2"></i>
                <span class="text">San Francisco, CA</span>
            </div>
            <div class="mb-2">
                <i data-feather="github" class="inline mr-2"></i>
                <a href="https://github.com/chait" target="_blank" class="link">github.com/chait</a>
            </div>
            <div class="mb-2">
                <i data-feather="linkedin" class="inline mr-2"></i>
                <a href="https://linkedin.com/in/chait" target="_blank" class="link">linkedin.com/in/chait</a>
            </div>
            <div class="mb-2">
                <i data-feather="twitter" class="inline mr-2"></i>
                <a href="https://twitter.com/chait" target="_blank" class="link">twitter.com/chait</a>
            </div>
            <div class="mb-2">
                <i data-feather="facebook" class="inline mr-2"></i>
                <a href="https://facebook.com/chait" target="_blank" class="link">facebook.com/chait</a>
            </div>
        </div>`;
    }
};
