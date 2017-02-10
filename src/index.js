'use strict'

module.exports =  (src, dst, opts) => {
  if (!opts) opts = {};
  let equal = opts.equal || defaultEqual();
  let key = opts.key || 'id';

  let transforms = {
    put: [],
    post: [],
    del: [],
  };

  let hash = {};
  let pk;

  src.forEach((srcItem) => {
    let pk = srcItem[key];
    if (!hash[pk]) hash[pk] = [];
    hash[pk].push(srcItem);
  });

  dst.forEach((dstItem) => {
    let pk = dstItem[key];
    let srcItems = [];
    // list same and different items
    let sameItems = [];
    let diffItems = (hash[pk] || []).filter(function(srcItem) {
      let same = equal(srcItem, dstItem);
      if (same) sameItems.push(srcItem);
      return !same;
    });
    if (sameItems.length === 0) {
      // nothing
      if (diffItems.length) {
        // set any item and remove the others
        diffItems.shift();
        transforms.put.push(dstItem);
      } else {
        // new item
        transforms.post.push(dstItem);
      }
      srcItems = diffItems;
    } else {
      sameItems.shift();
      srcItems = sameItems.concat(diffItems);
    }
    if (srcItems.length === 0) delete hash[pk];
    else hash[pk] = srcItems;
  });

  for (pk in hash) transforms.del = transforms.del.concat(hash[pk]);

  return transforms;
};

function defaultEqual() {
  const deepEqual = require('deep-equal');
  return function(a, b) {
    return deepEqual(a, b, {
      strict: true,
    });
  };
}
