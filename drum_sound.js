var drum = {
  size: {
    d: 16,
  },

  data: [],

  create_sound: function(array)
  {
    var list = [];
    var note = array.note;
    var dur = array.dur;

    array.opts.forEach(function(e){
      list.push(new Pizzicato.Sound({source:"wave",options:e}));
    });

    var group = new Pizzicato.Group(list);

    note = note / 4;
    next = 500 / note - dur;
    var sound = {
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
                  set_frequency: function(freq) {
                    var my = this;
                    my.sound[0].frequency = freq[0];
                    my.sound[1].frequency = freq[1];
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

};
