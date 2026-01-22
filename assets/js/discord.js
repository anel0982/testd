document.addEventListener('DOMContentLoaded', () => {
    const userId = "1359472071121309897";
    const apiUrl = `https://discord-lookup-api-alpha.vercel.app/v1/user/${userId}`;

    // Elements
    const profilePicture = document.getElementById('profile-picture');
    const avatarFrame = document.getElementById('avatar-frame');
    const discordName = document.getElementById('discord-name');
    const discordTag = document.getElementById('discord-tag');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);

            // Avatar
            const avatarUrl = data.avatar?.link || './assets/pfp/default.jpg';
            profilePicture.src = avatarUrl;

            // Username
            discordName.textContent = data.username || "Unknown User";

            // Tag / Global name / ID
            if (data.discriminator && data.discriminator !== "0") {
                discordTag.textContent = `#${data.discriminator}`;
            } else if (data.global_name) {
                discordTag.textContent = data.global_name;
            } else {
                discordTag.textContent = `ID: ${data.id}`;
            }

            // Avatar Frame
            if (data.avatar_decoration?.asset) {
                const frameUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${data.avatar_decoration.asset}.png`;
                avatarFrame.src = frameUrl;
                avatarFrame.style.display = 'block';
            } else {
                avatarFrame.style.display = 'none';
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
});
