/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = randomNumber(0, 255);
  return (
    'rgba(' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    o(r() * s) +
    ',' +
    r().toFixed(1) +
    ')'
  );
}

var svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', '400')
  .attr('height', '400');

d3.json('data/buildings.json').then(function (data) {
  console.log(data);

  data.forEach(function (d) {
    d.height = +d.height;
  });

  svg
    .selectAll('rect')
    .data(data)
    // .enter() creates the initial join of data to elements, creating one circle element for every data element in the array.
    .enter()
    .append('rect')
    // all start at the top of the screen
    .attr('y', 0)
    // x to space evenly
    .attr('x', function (d, i) {
      return i * 60;
    })
    .attr('width', 40)
    .attr('height', function (d) {
      return d.height;
    })
    .attr('fill', function (d) {
      return random_rgba();
    });
});
