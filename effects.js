document.querySelectorAll('.audio-item').forEach(item => {
    const playButton = item.querySelector('.play-button');
    const audio = item.querySelector('audio');
    const progressBar = item.querySelector('.progress-bar .progress');

    playButton.addEventListener('click', () => {
        const isPlaying = !audio.paused; // Check if audio is playing

        // Pause all other audios
        document.querySelectorAll('audio').forEach(a => a !== audio && a.pause());

        // Reset play buttons on other items
        document.querySelectorAll('.audio-item').forEach(otherItem => {
            if (otherItem !== item) {
                const otherPlayButton = otherItem.querySelector('.play-button');
                otherPlayButton.textContent = '▶';
                otherItem.classList.remove('playing');
            }
        });

        if (isPlaying) {
            // Pause the audio
            audio.pause();
            playButton.textContent = '▶';
            progressBar.style.width = '0%';
            item.classList.remove('playing');
        } else {
            // Play the audio
            audio.play();
            playButton.textContent = 'II';
            item.classList.add('playing');

            // Simulate progress bar (optional)
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
    });

    // Reset play button and progress bar when audio ends
    audio.addEventListener('ended', () => {
        playButton.textContent = '▶';
        progressBar.style.width = '0%';
        item.classList.remove('playing');
    });
});

