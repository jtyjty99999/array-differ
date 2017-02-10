# Array-differ

simple array differ, return array change

## Get Started

```js

var arr1 = [{
  id:1,
  value:'a'
},{
  id:2,
  value:'b'
}]

var arr2 = [{
  id:1,
  value:'c'
},{
  id:3,
  value:'x'
}]

var diff = require('./');

diff(arr1,arr2,{
  key:'id'
})

/*
{ put: [ { id: 1, value: 'c' } ],
  post: [ { id: 3, value: 'x' } ],
  del: [ { id: 2, value: 'b' } ] }
*/

```
