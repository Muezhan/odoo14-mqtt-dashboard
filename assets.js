exports.feather = function() {
    var feather = require('feather-icons');
    feather.icons.server;
    // {
    //    name: 'x',
    //    contents: '<line ... /><line ... />`,
    //    tags: ['cancel', 'close', 'delete', 'remove'],
    //    attrs: {
    //      class: 'feather feather-x',
    //      xmlns: 'http://www.w3.org/2000/svg',
    //      width: 24,
    //      height: 24,
    //      viewBox: '0 0 24 24',
    //      fill: 'none',
    //      stroke: 'currentColor',
    //      'stroke-width': 2,
    //      'stroke-linecap': 'round',
    //      'stroke-linejoin': 'round',
    //    },
    //    toSvg: [Function],
    // }
    
    feather.icons['check-circle'].toSvg();
    // <svg class="feather feather-x" ...><line ... /><line ... /></svg>
    
    // feather.icons.x.toSvg({ class: 'foo bar', 'stroke-width': 1, color: 'red' });
    // <svg class="feather feather-x foo bar" stroke-width="1" color="red" ...><line ... /><line ... /></svg>
    return feather;
};

