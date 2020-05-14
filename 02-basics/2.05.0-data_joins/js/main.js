/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.5 - Activity: Adding SVGs to the screen
 */

const data = [25, 20, 10, 12, 15];
var svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400);

var circles = svg.selectAll('circle').data(data);

circles
  .enter()
  .append('circle')
  .attr('cx', (d, i) => {
    // d - item in the array
    // i - index in the array
    return i * 50 + 25;
  })
  .attr('cy', 25)
  .attr('r', (d) => d)
  .attr('fill', 'red');
