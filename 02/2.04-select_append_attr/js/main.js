/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.4 - Adding SVGs with D3
 */

// 1- select SVG canvas
// .select(element | csscelector), .selectAll(element | csscelector)
var svg = d3
  .select('#chart-area')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400);

// 2 - append something to it: text, line, circle, rect, path
let rect = svg
  .append('rect')
  // 3 - give it the necessary attributes
  .attr('x', 50)
  .attr('y', 100)
  .attr('width', 400)
  .attr('height', 400)
  .attr('fill', 'pink');
var circle = svg
  .append('circle')
  .attr('cx', 100)
  .attr('cy', 250)
  .attr('r', 70)
  .attr('fill', 'grey');

var svg2 = d3
  .select('#canvas')
  .append('svg')
  .attr('x', 50)
  .attr('y', 100)
  .attr('width', 400)
  .attr('height', 400)
  .append('circle')
  .attr('cx', 200)
  .attr('cy', 100)
  .attr('r', 70)
  .attr('fill', 'red');

const setX = (e) => {
  console.log(e);
  svg
    .append('circle')
    .attr('cx', e.clientX)
    .attr('cy', e.clientY)
    .attr('r', 70)
    .attr('fill', 'grey');
};
window.addEventListener('mousemove', setX);
