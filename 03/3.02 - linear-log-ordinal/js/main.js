/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales:
            - fit items relative to canvas
            - "Scales are functions that map from an input domain to an output range"
             - log scale - does a better at showing a wide range of value
    Log Scales
    Domain Inputs    (Log Scale (base 10))  Range Outputs
        300                 (min)                0                   
        500                                      32.9
        5000                                     181.1
        50000                                    329.3   
        150000              (max)                400
      Domain Inputs    (Log Scale (base 2))  Range Outputs
        300                 (min)                0                   
        500                                      32.9
        1000                                     77.5
        2000                                     122.1  
        150000              (max)                400
    
    trying to us a domain value of 0 in a log scale won't work (log(0)=== undfined)

    Ordinal Scales - for assigning color schemes to categorical data
                   - D3 has builtin color schemes
        Domain Inputs                            Range Outputs
    (country names array)  (Ordinal Scale)      (colors array)
        'Africa'                 -->                Red                   
        'Asia                    -->                Blue
        Antarctica               -->                Grey
        Pangea                   -->                Red
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

  var y = d3
    .scaleLinear()
    // in this situation Domain is the building heights
    // from zero to the height of the tallest building
    .domain([0, 828])
    /**
     * can also use dates for domain:
     * .domain([new Date(2000, 0, 1)],
     * [new Date(2001,0,1)])
     * can still invert - x.invert
     */
    // the pixel range
    // the size of our canvas
    .range([0, 400]);
  // .base(2) // can specify base

  /**
   * e.g. if domain input is 414 (half of max domain) than the range out will be 200 (half the max range)
   * WORKS FOR COLORS AS WELL!
   */
  // y (the axis we're trying to modify) is a scale (i.e. function) that takes 1 arg - the input value we want to scal
  console.log(y(100)); //48.3
  console.log(y(414)); //200
  console.log(y.invert(48.3)); //100

  var rects = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', 0)
    .attr('x', function (d, i) {
      return i * 60;
    })
    .attr('width', 40)
    .attr('height', function (d) {
      // returning the height without the scales causes all items to overflow the canvas
      // return d.height;
      // by passing the height we ensure the bar will stay within the canvas
      return y(d.height);
    })
    .attr('fill', function (d) {
      return 'grey';
    });
});
