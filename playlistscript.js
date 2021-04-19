var videoList = [{
  sources: [{
    src: 'video/mortalkombat.mp4',
    type: 'video/mp4'
  }],
  poster: 'images/mortalkombat.jpg'
}, {
  sources: [{
    src: 'video/jovenprometedora.mp4',
    type: 'video/mp4'
  }],
  poster: 'images/jovenprometedora.jpg'
}, {
  sources: [{
    src: 'video/veterinaria.mp4',
    type: 'video/mp4'
  }],
  poster: 'images/veterinaria.jpg'
}, 
]

var player = videojs(document.querySelector('video'), {
  inactivityTimeout: 0
});
try {
  player.volume(1);

} catch (e) {}

player.playlist(videoList);
document.querySelector('.previous').addEventListener('click', function() {
  player.playlist.previous();
});
document.querySelector('.next').addEventListener('click', function() {
  player.playlist.next();
});
document.querySelector('.jump').addEventListener('click', function() {
  player.playlist.currentItem(2); 
});

player.playlist.autoadvance(0); 

Array.prototype.forEach.call(document.querySelectorAll('[name=autoadvance]'), function(el) {
  el.addEventListener('click', function() {
    var value = document.querySelector('[name=autoadvance]:checked').value;
    player.playlist.autoadvance(JSON.parse(value));
  });
});


var Button = videojs.getComponent('Button');

var PrevButton = videojs.extend(Button, {

  constructor: function() {
    Button.apply(this, arguments);

    this.addClass('icon-angle-left');
    this.controlText("Previous");
  },



  handleClick: function() {
    console.log('click');
    player.playlist.previous();
  }
});


var NextButton = videojs.extend(Button, {
 
  constructor: function() {
    Button.apply(this, arguments);
    this.addClass('icon-angle-right');
    this.controlText("Next");
  },

  handleClick: function() {
    console.log('click');
    player.playlist.next();
  }
});


videojs.registerComponent('NextButton', NextButton);
videojs.registerComponent('PrevButton', PrevButton);

player.getChild('controlBar').addChild('PrevButton', {}, 0);
player.getChild('controlBar').addChild('NextButton', {}, 2);
