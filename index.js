import $ from 'jquery';
window.jQuery = $;
//Bootstrap linked in html file
function hello() {
 $('#test').html('Test if jQuery works with bootstrap');  
}
hello();
var Chance = require('chance');
var chance = new Chance();
const lib = require('./lib');