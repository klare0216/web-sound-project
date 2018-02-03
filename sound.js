var pitch_d = {
  c:261.63,
  d:293.66,
  e:329.63,
  f:349.23,
  g:392.00,
  a:440.00,
  b:493.88
};
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

  type:[
    'sawtooth',
    'sine',
    'triangle',
    'square',
  ],

  list:[
    {//1
      opts:[
        { type: 'saw', volume: 0.3, frequency: pitch_d.e, attack: 0.1, release: 0.3 },
        { type: 'sine', volume: 0.03, frequency: pitch_d.e/2, attack: 0.1, release: 0.5 }
      ],
      dur: 250, note: 4,
    },{//2
      opts:[
        { type: 'saw', volume: 0.3, frequency: pitch_d.f, attack: 0.2, release: 0.1 },
        { type: 'sine', volume: 0.03, frequency: pitch_d.f/2, attack: 0.2, release: 0.3 }
      ],
      dur: 250, note: 8,
    },{//3
      opts:[
        { type: 'saw', volume: 0.3, frequency: pitch_d.a, attack: 0.2, release: 0.1 },
        { type: 'sine', volume: 0.03, frequency: pitch_d.a/2, attack: 0.2, release: 0.3 }
      ],
      dur: 250, note: 8,
    },{//4
      opts:[
        { type: 'saw', volume: 0.3, frequency: pitch_d.b, attack: 0.2, release: 0.1 },
        { type: 'sine', volume: 0.03, frequency: pitch_d.b/2, attack: 0.2, release: 0.3 }
      ],
      dur: 250, note: 8,
    },
    {//1
      opts:[
        { type: 'sin', volume: 0.3, frequency: pitch_d.e/8, attack: 0.2, release: 0.1 },
        { type: 'square', volume: 0.03, frequency: pitch_d.e/8/2, attack: 0.2, release: 0.3 }
      ],
      dur: 200, note: 8,
    },
    {//2
      opts:[
        { type: 'sin', volume: 0.3, frequency: pitch_d.d/8, attack: 0.2, release: 0.1 },
        { type: 'square', volume: 0.03, frequency: pitch_d.d/8/2, attack: 0.2, release: 0.3 }
      ],
      dur: 200, note: 8,
    },{//3
      opts:[
        { type: 'sin', volume: 0.3, frequency: pitch_d.f/8, attack: 0.2, release: 0.1 },
        { type: 'square', volume: 0.03, frequency: pitch_d.f/8/2, attack: 0.2, release: 0.3 }
      ],
      dur: 200, note: 8,
    },{//4
      opts:[
        { type: 'sin', volume: 0.3, frequency: pitch_d.a/8, attack: 0.2, release: 0.1 },
        { type: 'square', volume: 0.03, frequency: pitch_d.a/8/2, attack: 0.2, release: 0.3 }
      ],
      dur: 500, note: 4,
    },


  ],

  sawtoothWave1: new Pizzicato.Sound({
    source: 'wave',
    options: {
        type: 'sine',
        volume: 0.5,
        frequency: 500,
        release:0.3,
        attack: 0.3,
    }
  }),

  sawtoothWave2: new Pizzicato.Sound({
      source: 'wave',
      options: {
          type: 'sine',
          volume: 0.5,
          frequency: 250,
          release:0.3,
          attack: 0.3,
      }
  }),

  group: new Pizzicato.Group(),

  down: function(){
    global.on = true;
    global.sawtoothWave1.frequency = global.pitch[(Math.random() * 7 | 0)];
    global.sawtoothWave2.frequency = global.sawtoothWave1.frequency * 0.5 +100;

    global.group.play();
  },

  up: function(){
    global.on = false;
  },

  set_frequency: function(f){
    global.sawtoothWave1.frequency = f;
    global.sawtoothWave2.frequency = f * 0.5 + 3;
  },

  get_frequency: function(){
    return global.sawtoothWave1.frequency;
  },

  play: function(dur){
    global.group.play();
    setTimeout(function () {
      global.group.stop();
    }, dur);
  },


  once: function(){
    global.group.play();
    global.sawtoothWave1.frequency = global.pitch[3];
    global.sawtoothWave2.frequency = global.sawtoothWave1.frequency * 0.5 + 3;
    setTimeout(function () {
      global.group.stop();
    }, 300);
  },

  check: function(){
    if(!global.on)
    {
      global.group.stop();
    }
  },

  on: false,

  create_sound: function(array)
  {
    var list = [];
    var note = array.note;
    var dur = array.dur;
    var tmp = array.opts;
    console.log('tmp', tmp)
    tmp.forEach(function(e){
      list.push(new Pizzicato.Sound({source:"wave",options:e}));
    });
    cntt++;
    var group = new Pizzicato.Group(list);
    note = note / 4;
    next = 500 / note - dur;
    var sound = {
      index: cntt,
                  _note: note,
                  _next: next,
                  group: group,
                  sound: list,
                  once: function() {
                    var my = this;
                    var note = this._note;
                    var next = this._next;
                    repeate(note);

                    function repeate(cnt){
                      cnt--;
                      my.group.play();
                      setTimeout(function(){
                        my.group.stop();
                        if (cnt > 0 && next >= 0){
                          setTimeout(function(){repeate(cnt)}, next);
                        }
                      }, dur);

                    }
                  },
                  play: function(dur){
                    var my = this;
                    this.group.play();
                    setTimeout(function () {
                      my.group.stop();
                    }, dur);
                    console.log(this.index)

                  },
                  set_frequency: function(freq) {
                    var my = this;
                    my.sound[0].frequency = freq;
                    my.sound[1].frequency = freq;
                    return this;
                  },
                  set_volume: function(vol){
                    var my = this;
                    my.group.volume = vol;
                    return this;
                  }
                };

    return sound;
  },

  dat_opts: {
    opts:[
      { type: 'sine', volume: 0.3, frequency: 440, attack: 0.2, release: 0.1 },
      { type: 'sine', volume: 0.3, frequency: 440, attack: 0.2, release: 0.3 }
    ],
    dur: 500,
    note: 4,
  },

  data:[],
}
var cntt = 0;
global.group.addSound(global.sawtoothWave1);
global.group.addSound(global.sawtoothWave2);


global.data.push(global.create_sound(2));
global.data.push(global.create_sound(3));
