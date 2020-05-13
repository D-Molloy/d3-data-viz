/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.7 - D3 min, max, and extent
*          - min and max methods iterate over the array and pick and return the min or max 
*          - extent - returns an array of the range of the given data set
            - can also use map to return the necessary domain
*/

var svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', '400')
  .attr('height', '400');

d3.json('data/buildings.json').then(function (data) {
  console.log(data);

  data.forEach((d) => {
    d.height = +d.height;
  });

  var x = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .range([0, 400])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.height;
      }),
    ])
    .range([0, 400]);

  var rects = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', 0)
    .attr('x', function (d) {
      return x(d.name);
    })
    .attr('width', x.bandwidth)
    .attr('height', function (d) {
      return y(d.height);
    })
    .attr('fill', 'grey');
});
