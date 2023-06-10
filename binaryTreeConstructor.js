/* 

 function which takes an array of strings, which will contain pair of 
 integers in the following format (i1, i2) where i1 represents a chilld node in the tree
 and second integer i2 signifies that it is the parent of i1.
The function should return true if a valid binary tree can be formed and
false if a proper binary tree can not be formed and all of the integers withing the tree will be unique,
which means there can only be one node in the tree witth the given integer value

*/
function TreeConstructor(strArr) {
  const parentMap = {};
  const childSet = new Set();
  const parentSet = new Set();

  for (const pair of strArr) {
    const match = pair.match(/\((\d+)\s*,\s*(\d+)\)/);
    if (match === null) {
      return false;
    }

    const child = parseInt(match[1]);
    const parent = parseInt(match[2]);

    if (child === parent) {
      return false;
    }

    if (childSet.has(child)) {
      return false;
    }

    childSet.add(child);
    parentSet.add(parent);

    if (parentMap[parent]) {
      if (parentMap[parent].length >= 2) {
        return false;
      }

      parentMap[parent].push(child);
    } else {
      parentMap[parent] = [child];
    }
  }

  let rootCount = 0;
  for (const parent of parentSet) {
    if (!childSet.has(parent)) {
      rootCount++;
      if (rootCount > 1) {
        return false;
      }
    }
  }

  if (rootCount === 0 && childSet.size > 0) {
    return true;
  }
  // code goes here
  return rootCount === 1;
}

// keep this function call here
console.log(TreeConstructor(["(1,2)", "(2,4)", "(7,2)"]));
