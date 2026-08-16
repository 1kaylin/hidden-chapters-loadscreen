
let player=null, ready=false, lastVolume=45;
const playPause=document.getElementById('playPause');
const playIcon=document.getElementById('playIcon');
const muteButton=document.getElementById('muteButton');
const muteIcon=document.getElementById('muteIcon');
const volume=document.getElementById('volume');
const progressBar=document.getElementById('progressBar');
const loadingPercent=document.getElementById('loadingPercent');
const loadingText=document.getElementById('loadingText');
const tip=document.getElementById('tip');

const tips=[
  'Every story has a hidden chapter.',
  'Create a character with a story worth remembering.',
  'Respect the roleplay. Build the story.',
  'Luxury is a lifestyle. Reputation is earned.',
  'Your next chapter begins here.'
];
let tipIndex=0;
setInterval(()=>{tipIndex=(tipIndex+1)%tips.length;tip.textContent=tips[tipIndex]},6500);

function onYouTubeIframeAPIReady(){
const player = document.getElementById('player');
ready = true;

player.volume = Number(volume.value) / 100;
player.muted = true;
player.play();

muteIcon.textContent = '🔇';
playIcon.textContent = '❚❚';
            },

            onStateChange: function(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    playIcon.textContent = '❚❚';
                } else if (event.data === YT.PlayerState.PAUSED) {
                    playIcon.textContent = '▶';
                }
            },

            onError: function(event) {
                console.log('YouTube Player Error:', event.data);
            }
        }
    });
}
playPause.addEventListener('click', () => {
    if (player.paused) {
        player.play();
        playIcon.textContent = '❚❚';
    } else {
        player.pause();
        playIcon.textContent = '▶';
    }
});
muteButton.addEventListener('click', () => {
    player.muted = !player.muted;

    if (player.muted) {
        muteIcon.textContent = '🔇';
    } else {
        muteIcon.textContent = '🔊';
    }
});
volume.addEventListener('input', (e) => {
    const value = Number(e.target.value);

    player.volume = value / 100;

    if (value > 0) {
        player.muted = false;
        muteIcon.textContent = '🔊';
    } else {
        player.muted = true;
        muteIcon.textContent = '🔇';
    }
});
window.addEventListener('message',event=>{
  if(!event.data||event.data.eventName!=='loadProgress')return;
  const f=Math.max(0,Math.min(1,Number(event.data.loadFraction)||0));
  const p=Math.round(f*100);
  progressBar.style.width=p+'%'; loadingPercent.textContent=p+'%';
  loadingText.textContent=p<20?'Opening Hidden Chapters...':p<55?'Loading the city...':p<85?'Preparing your chapter...':p<100?'Almost ready...':'Welcome to Hidden Chapters RP';
});
