'use strict';

var arr1 = [{
  id: 1,
  value: 'a'
}, {
  id: 2,
  value: 'b'
}]

var arr2 = [{
  id: 1,
  value: 'c'
}, {
  id: 3,
  value: 'x'
}]

var diff = require('../src/index');

console.log(diff(arr1, arr2, {
  key: 'id'
}))

