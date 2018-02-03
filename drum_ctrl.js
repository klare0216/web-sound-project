

  var drum_ctrl = {

    init: function(){

      this.svg = d3.select('#drum')
                    .append('svg')
                    .attr('height', 600)
                    .attr('width', 650)
                    .attr('id','play')
                    .style('background-color','white');
      this.row = this.svg.selectAll('.row')
                    .data(this.grid_data)
                    .enter().append("g").attr('class', 'row');

      this.column = this.row.selectAll(".square")
                	.data(function(d) { return d; })
                	.enter().append("rect")
                	.attr("x", function(d) { return d.x; })
                	.attr("y", function(d) { return d.y; })
                	.attr("width", function(d) { return d.w; })
                	.attr("height", function(d) { return d.w; })
                  .attr("class",function(d){ return "col"+d.col+" row"+d.row ; })
                  .attr("id", function(d){ return "r"+d.row+"c"+d.col })
                	.style("fill", "#0")
                	.style("stroke", "#fff")
                  .on('click', function(d){

                    d3.select(this).transition()
                        .duration(300)
                        .style('fill',"blue");

                        d.choose = true;
                  });



      var  button = this.svg.append("rect")
                           .attr("x", 600 )
                           .attr("height", 50 )
                           .attr("width", 50)
                           .style("fill", "red")
                           .on('click', function(){
                              var w = 600/drum.size.d;
                              var now = w/2;
                              var  detect = drum_ctrl.svg.append("rect")
                                                  .attr("x", w/2 )
                                                  .attr("height", 600 )
                                                  .attr("width", 2 )
                                                  .style("fill", "rgba(0,0,0,0)");
                              repeat();
                              function repeat(){
                                var box = detect.node().getBBox();
                                var col = box.x / 600  * drum.size.d | 0;
                                var id = d3.selectAll(".col"+col)._groups[0];

                                id.forEach(function(e){
                                  var square = d3.select(e);
                                  var dat = square._groups[0][0].__data__;
                                  if(dat.choose){
                                    dat.dat.once();
                                  }
                                  else
                                  {
                                  square.transition()
                                        .duration(100)
                                        .style('fill','green')
                                        .transition()
                                        .duration(100)
                                        .style('fill','black');
                                  }

                                });
                                d3.select()

                                detect.transition()
                                      .duration(200)
                                      .attr("x", function(){ return (now >= 600 - w) ? now=w/2 : now+=w; })
                                      .on("end", repeat);
                              }
                           });
    },

    grid_data: function(){
      var d = drum.size.d;
      var data = [];
      var pos_x = 1;
      var pos_y = 1;
      var width = (600) / d ;

      for (var row=0; row<d; row++){
        data.push(new Array());
        pos_x = 1;
        for(var col=0; col<d; col++){
          data[row].push({
            row: row,
            col: col,
            x: pos_x,
            y: pos_y,
            w: width,
            choose: false,
            dat: drum.create_sound(global.list[row%global.list.length]),
          });
          pos_x += width;
        }
        pos_y += width;
      }

      return data;
    },

  };

  drum_ctrl.init();
