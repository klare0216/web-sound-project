var svg = d3.select('#svg')
            .append('svg')
            .attr('height', 700)
            .attr('width', 700)
            .attr('id','play')
            .style('background-color','black');




var play ={
  dataSet: [],
  created: 0,
  select_circle: null,
  mode: 'created',
  color: null,
}

play.color = d3.scaleLinear().domain([1,10,20,30,40,50])
  .interpolate(d3.interpolateHcl)
  .range([
        d3.rgb("#33ffbd"),
        d3.rgb('#9033ff'),
        d3.rgb('#ff5733'),
        d3.rgb('#dbff33'),
        d3.rgb('#4d1e92'),
        d3.rgb('#16c61c'),
      ]);

var mode = {
    click_cnt: 0,
}




svg.on('mousedown', mousedwonSVG);
function mousedwonSVG(){
console.log('--svg', mode.click_cnt);

  // selected mode
  if (play.mode == 'selected'){

    // 將其他圈圈的選擇拿掉
    var circles = d3.selectAll(".circle")._groups[0];
    circles.forEach(function(e){
      d3.select(e)
        .style("stroke-width", 0);
    });
    play.mode = 'created';
    play.select_circle = null;
    return;
  }

  // created mode
  var pos  = d3.mouse(this);
  console.log(this);
  var x = Math.random() * 50 | 0;

  // add to dataSet
  play.dataSet.push({
    pos: pos,
    selected: false,
  });


  console.log(sound);

  var circle1 = d3.select('#play')
        .append('circle');

  circle1.attr('class','circle')
        .attr('cx',pos[0])
        .attr('cy',pos[1])
        .attr('r',20)
        .style('fill', play.color(x))
        .call(d3.drag().on("start", drag_start)
                  .on("drag", dragging)
                  .on("end", drag_end));

  circle1.transition()
        .duration(700)
        .attr('r',100)
        .style('fill', play.color(x));

  // create sound
  var sound = global.create_sound(global.dat_opts);
  circle1.datum({dur: 300, freq: 440, sound: sound});
  //global.down();
  repeat(circle1);
}

function repeat(my){
  my.transition()
    .duration(my.datum().dur)
    .attr('r',40 + 20000 / my.datum().freq)
    .style('fill', play.color(my.datum().freq / 50 ))
    .style('opacity','0.8')
    .transition()
    .duration(my.datum().dur)
    .attr('r',20 + 20000 / my.datum().freq )
    .style('opacity','0.5')
    .on('end', function(){ return repeat(my); });

    my.datum().sound.play(my.datum().dur );
}


function select(my){

  play.mode = 'selected';
  circles = d3.selectAll(".circle")._groups[0];
  play.select_circle = my;

  // 開啟speed
  console.log(d3.select(my).attr('cx'));
  var cx = d3.select(my).attr('cx');

  // 清除圓圈
  circles.forEach(function(e){
    d3.select(e)
      .style("stroke-width", 0);
  });

    // 放上圈圈
  d3.select(play.select_circle)
    .style('stroke','white')
    .style('stroke-width',5);
}

function drag_start(){
  console.log('start',this);
  select(this);
  if(play.mode == 'created'){
    //play.select_pos = null;
    return
  }else if(play.mode = 'selected'){
    var circle = d3.selectAll(this)._groups[0];
    play.select_pos = d3.mouse(circle);
  }

}
function dragging(){
  var pos = d3.mouse(d3.selectAll(this)._groups[0]);
  var freq = (play.select_pos[1]*1.0 - pos[1]*1.0)*4 ;
  var speed = (play.select_pos[0]*1.0 - pos[0]*1.0)*2 ;
  var circle = d3.select(this);
  var dat = circle.datum();
  circle.attr('cx',pos[0]);
  circle.attr('cy',pos[1]);
  console.log(pos[0], pos[1]);
  if( pos[0] > 700 || pos[0] < 0 || pos[1] > 700 || pos[1] < 0){
    // remove
    circle.transition()
        .attr('r', 0)
        .style('opacity', 0)
        .remove();
  }
  // 調整頻率
  play.select_pos = pos;
  dat.freq += freq;
  if (dat.freq > 1000) dat.freq = 1000;
  if (dat.freq < 180) dat.freq = 180;
  console.log('freq', dat.freq);
  dat.sound.set_frequency(dat.freq | 0);

  // 調整速度
  dat.dur += speed;
  if(dat.dur < 200) dat.dur = 200;
  circle.datum(dat);
}

function drag_end(){
  console.log('end');
}


svg.on('mouseup', function(){
  var pos = [0, 0];
  pos = d3.mouse(this);
  var x = Math.random() * 50 | 0;

  var circle1 = d3.select('#play')
      .append('circle')
      .attr('cx',pos[0])
      .attr('cy',pos[1])
      .attr('r',5)
      .style('fill', play.color(x))
      .style('opacity', 0.8);

  circle1.transition()
        .duration(700)
        .attr('r',100)
        .style('opacity', 0)
        .remove();

});
