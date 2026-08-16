
let player = null;
let ready = false;
let lastVolume = 45;

const playPause = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const muteButton = document.getElementById('muteButton');
const muteIcon = document.getElementById('muteIcon');
const volume = document.getElementById('volume');
const progressBar = document.getElementById('progressBar');
const loadingPercent = document.getElementById('loadingPercent');
const loadingText = document.getElementById('loadingText');
const tip = document.getElementById('tip');

const tips = [
    'Every story has a hidden chapter.',
    'Create a character with a story worth remembering.',
    'Respect the roleplay. Build the story.',
    'Luxury is a lifestyle. Reputation is earned.',
    'Your next chapter begins here.'
];

let tipIndex = 0;

setInterval(() => {
    tipIndex = (tipIndex + 1) % tips.length;
    tip.textContent = tips[tipIndex];
}, 6500);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: window.HCRP_VIDEO_ID,

        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            playsinline: 1,
            loop: 1,
            playlist: window.HCRP_VIDEO_ID
        },

        events: {
            onReady: function(event) {
                ready = true;

                event.target.setVolume(Number(volume.value));
                event.target.unMute();
                event.target.playVideo();

                muteIcon.textContent = '🔊';
                playIcon.textContent = '❚❚';
            },

            onStateChange: function(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    playIcon.textContent = '❚❚';
                }

                if (event.data === YT.PlayerState.PAUSED) {
                    playIcon.textContent = '▶';
                }
            },

            onError: function(event) {
                console.log('YouTube Player Error:', event.data);
            }
        }
    });
}

playPause.addEventListener('click', function() {
    if (!ready) return;

    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playIcon.textContent = '▶';
    } else {
        player.playVideo();
        playIcon.textContent = '❚❚';
    }
});

muteButton.addEventListener('click', function() {
    if (!ready) return;

    if (player.isMuted()) {
        player.unMute();

        if (Number(volume.value) === 0) {
            volume.value = lastVolume;
            player.setVolume(lastVolume);
        }

        muteIcon.textContent = '🔊';
    } else {
        player.mute();
        muteIcon.textContent = '🔇';
    }
});

volume.addEventListener('input', function(event) {
    if (!ready) return;

    const value = Number(event.target.value);

    player.setVolume(value);

    if (value > 0) {
        lastVolume = value;
        player.unMute();
        muteIcon.textContent = '🔊';
    } else {
        player.mute();
        muteIcon.textContent = '🔇';
    }
});

window.addEventListener('message', function(event) {
    if (!event.data || event.data.eventName !== 'loadProgress') return;

    const fraction = Math.max(
        0,
        Math.min(1, Number(event.data.loadFraction) || 0)
    );

    const percent = Math.round(fraction * 100);

    progressBar.style.width = percent + '%';
    loadingPercent.textContent = percent + '%';

    if (percent < 20) {
        loadingText.textContent = 'Opening Hidden Chapters...';
    } else if (percent < 55) {
        loadingText.textContent = 'Loading the city...';
    } else if (percent < 85) {
        loadingText.textContent = 'Preparing your chapter...';
    } else if (percent < 100) {
        loadingText.textContent = 'Almost ready...';
    } else {
        loadingText.textContent = 'Welcome to Hidden Chapters RP';
    }
});
