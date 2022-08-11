import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
};
player.on('timeupdate', throttle(onPlay, 1000));

function setCurrentTime() {
  if (JSON.parse(localStorage.getItem(TIME_KEY)) === null) {
    return;
  }
  player.setCurrentTime(JSON.parse(localStorage.getItem(TIME_KEY))['seconds']);
}
setCurrentTime();
player.off('play', onPlay);
