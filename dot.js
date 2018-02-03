var dot = d3.select('#svg2')
            .append('svg')
            .attr('height', 400)
            .attr('width', 400)
            .attr('id','dot')
            .style('background-color','black');

dot.on('mousemove', function(){
              var pos = [0, 0];
              pos = d3.mouse(this);
              var x = Math.random() * 255 | 0;
              var y = Math.random() * 255 | 0;
              var z = Math.random() * 255 | 0;
              var circle1 = d3.select('#dot')
                  .append('circle')
                  .attr('cx',pos[0])
                  .attr('cy',pos[1])
                  .attr('r',10)
                  .style('fill','rgba(255,255,255,1)');

              circle1.transition()
                    .duration(700)
                    .attr('r',10)
                    .style('fill','rgba(255,255,255,0.5)');
              //global.down();

              var cnt=0;
              repeat();

              function repeat(){
                cnt++;

                  circle1.transition()
                          .duration(500)
                          .attr('r',100)
                          .style('fill','rgba('+ y +','+x+','+z+',0)')
                          .remove();
                  return;

              }

            });



dot.on('mouseup', function(){
  var pos = [0, 0];
  pos = d3.mouse(this);
  var x = Math.random() * 255 | 0;
  var y = Math.random() * 255 | 0;
  var z = Math.random() * 255 | 0;
  var circle1 = d3.select('#dot')
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

});
