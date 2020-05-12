/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    3.6 - Band scales
 *          -exclusively made for spacing out bar charts
 *          -width is hardcoded - if they need to change
 */
/*
[Africa, NAmerica, Europe, SAmerica, Asia, Australasia]
      Domain Inputs       (Band Scale)       Range Outputs
      (continents)                               (px)  min 0 
        'Africa'                 -->             209                  
        'Asia                    -->             341
        Antarctica               -->             13.1
        Pangea                   -->             undefined
                                                       max 400  
Padding inner - inbetween columns
Padding outer - padding around chart
*/
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

  var x = d3
    .scaleBand()
    .domain([
      'Burj Khalifa',
      'Shanghai Tower',
      'Abraj Al-Bait Clock Tower',
      'Ping An Finance Centre',
      'Lotte World Tower',
      'One World Trade Center',
      'Guangzhou CTF Finance Center',
    ])
    .range([0, 400])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  var y = d3.scaleLinear().domain([0, 828]).range([0, 400]);

  var rects = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', 0)
    .attr('x', function (d) {
      // console.log(x('Burj Khalifa')); //16.43835616438355
      // console.log(x('Guangzhou CTF Finance Center')); //345.20547945205476
      return x(d.name);
    })
    .attr('width', x.bandwidth)
    .attr('height', function (d) {
      return y(d.height);
    })
    .attr('fill', function (d) {
      return 'grey';
    });
});
