var global = {
  pitch: [
    261.63,
    293.66,
    329.63,
   	349.23,
    392.00,
    440.00,
    493.88
  ],

  sawtoothWave1: new Pizzicato.Sound({
      source: 'wave',
      options: {
          type: 'sine',
          volume: 0.28,
          frequency: 330,
          release:0.1,
          attack: 0.1,
      }
  }),

  sawtoothWave2: new Pizzicato.Sound({
      source: 'wave',
      options: {
          type: 'sine',
          volume: 0.27,
          frequency: 220,
          release:0.5,
          attack: 0.1,
      }
  }),

  group: new Pizzicato.Group(),

  down: function(){
    global.on = true;
    global.sawtoothWave1.frequency = global.pitch[(Math.random() * 7 | 0)];
    global.sawtoothWave2.frequency = global.sawtoothWave1.frequency * 0.5;

    global.group.play();
  },

  up: function(){
    global.on = false;
  },

  check: function(){
    if(!global.on)
    {
      global.group.stop();
    }
  },
  on: false,
}

global.group.addSound(global.sawtoothWave1);
global.group.addSound(global.sawtoothWave2);
