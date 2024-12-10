document.querySelectorAll('.audio-item').forEach(item => {
    const playButton = item.querySelector('.play-button');
    const audio = item.querySelector('audio');
    const progressBar = item.querySelector('.progress-bar .progress'); // Optional, only if you use a progress bar

    playButton.addEventListener('click', () => {
        const isPlaying = !audio.paused; // Check if the current audio is playing

        // Pause all other audio elements
        document.querySelectorAll('audio').forEach(a => a !== audio && a.pause());

        // Reset play buttons on other items
        document.querySelectorAll('.audio-item').forEach(otherItem => {
            if (otherItem !== item) {
                const otherPlayButton = otherItem.querySelector('.play-button');
                otherPlayButton.textContent = '▷'; // Reset to the play symbol
                otherItem.classList.remove('playing');
            }
        });

        if (isPlaying) {
            // Pause the audio
            audio.pause();
            playButton.textContent = '▷'; // Reset to the play symbol
            if (progressBar) progressBar.style.width = '0%';
            item.classList.remove('playing');
        } else {
            // Play the audio
            audio.play();
            playButton.textContent = '⏸'; // Change to a pause symbol
            item.classList.add('playing');

            // Simulate a progress bar (optional)
            if (progressBar) {
                let progress = 0;
                const interval = setInterval(() => {
                    if (audio.paused || progress >= 100) {
                        clearInterval(interval);
                    } else {
                        progress = (audio.currentTime / audio.duration) * 100;
                        progressBar.style.width = `${progress}%`;
                    }
                }, 100);
            }
        }
    });

    // Reset the play button and progress bar when the audio ends
    audio.addEventListener('ended', () => {
        playButton.textContent = '▷'; // Reset to the play symbol
        if (progressBar) progressBar.style.width = '0%';
        item.classList.remove('playing');
    });
});
