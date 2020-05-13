/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    3.10 - Axes and labels
 */

var margin = { left: 100, right: 10, top: 10, bottom: 150 };

var width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var g = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// X Label
g.append('text')
  .attr('class', 'x axis-label')
  //   center label
  .attr('x', width / 2)
  .attr('y', height + 140)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  .text("The word's tallest buildings");

// Y Label
g.append('text')
  .attr('class', 'y axis-label')
  //   center label
  .attr('x', -(height / 2))
  .attr('y', -60)
  .attr('font-size', '20px')
  .attr('text-anchor', 'middle')
  //   rotate so it lines up
  .attr('transform', 'rotate(-90)')
  .text('Height (m)');

d3.json('data/buildings.json').then(function (data) {
  console.log(data);

  data.forEach(function (d) {
    d.height = +d.height;
  });

  var x = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d.name;
      })
    )
    .range([0, width])
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
    .range([0, height]);
  // axisBottom and left are what actually generate the x axis/headers
  var xAxisCall = d3.axisBottom(x);
  g.append('g')
    .attr('class', 'x axis')
    // move the x axis and column headers to the bottom of the char
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxisCall)
    // select all of the test headers and modify
    .selectAll('text')
    // tweak alignment
    .attr('y', '5')
    .attr('x', '-10')
    // where on the column text to anchor the text
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-40)');

  var yAxisCall = d3
    .axisLeft(y)
    // specify how many ticks on the 1 axis
    // this method will figure out the minimum amount of necessary ticks (if 3 was entered, it would still show 5 ticks because the data demands them)
    .ticks(10)
    .tickFormat(function (d) {
      return d + 'm';
    });
  g.append('g').attr('class', 'y-axis').call(yAxisCall);

  var rects = g.selectAll('rect').data(data);

  rects
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
