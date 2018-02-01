var svg = d3.select('#svg')
            .append('svg')
            .attr('height', 400)
            .attr('width', 400)
            .attr('id','play')
            .style('background-color','black');





svg.on('mousedown', function(){
  var pos = [0, 0];
  pos = d3.mouse(this);
  var x = Math.random() * 255 | 0;
  var y = Math.random() * 255 | 0;
  var z = Math.random() * 255 | 0;
  var circle1 = d3.select('#play')
      .append('circle')
      .attr('cx',pos[0])
      .attr('cy',pos[1])
      .attr('r',5)
      .style('fill','rgba('+ y +','+x+','+z+',1)');

  circle1.transition()
        .duration(700)
        .attr('r',100)
        .style('fill','rgba('+ y +','+x+','+z+',0.5)');
        global.down();

  circle1.on('mousemove', function(d){
    d3.select(this)
      .transition()
      .duration(700)
      .attr('r',150)
      .style('fill','rgba('+ y +','+x+','+z+',0)')
      .remove();
  });

});

svg.on('mouseup', function(){
  var pos = [0, 0];
  pos = d3.mouse(this);
  var x = Math.random() * 255 | 0;
  var y = Math.random() * 255 | 0;
  var z = Math.random() * 255 | 0;
  var circle1 = d3.select('#play')
      .append('circle')
      .attr('cx',pos[0])
      .attr('cy',pos[1])
      .attr('r',5)
      .style('fill','rgba('+ y +','+x+','+z+',1)');

  circle1.transition()
        .duration(700)
        .attr('r',100)
        .style('fill','rgba(1,1,1,0)')
        .remove();


    setTimeout(global.up, 100);
    setTimeout(global.check, 500);
});
