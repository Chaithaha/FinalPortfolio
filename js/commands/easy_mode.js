// Easy mode command - Switch to user-friendly interface
export const easy_mode = {
    description: "Switch to easy mode (user-friendly interface)",
    execute: () => {
        // Redirect to the Simpler-Portfolio
        window.location.href = '../Simpler-Portfolio/Simple.html';
        return '';
    }
};
