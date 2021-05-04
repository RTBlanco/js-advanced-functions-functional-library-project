const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {

      let newCollection = typeof collection === 'object' ? Object.values(collection) : collection

      for(const i of newCollection){
        callback(i);
      }
      return collection
    },

    map: function(collection, callback) {
      let newCollection = typeof collection === 'object' ? Object.values(collection) : collection
      let returningCollection = []
      for (const i of newCollection){
        returningCollection.push(callback(i));
      }
      return returningCollection;
    },

    reduce: function(collection, callback, acc) {
      let total;
      if (acc){
        total = acc;
        for (let i = 0; i < collection.length; i ++ ){
          total = callback(total, collection[i]);
        }
        return total;
      } else {
        total = collection[0];
        for(let i = 1; i < collection.length; i ++){
          total = callback(total, collection[i]);
        }
        return total;
      };
    },

    find: function(collection, predicate){
      for (let i = 0; i < collection.length; i ++){
        if( predicate(collection[i])) {
          return collection[i];
        }
      }
      return undefined;
    },

    filter: function(collection, preidcate){
      let newArr = []
      for (const i of collection){
        if (preidcate(i)){
          newArr.push(i)
        }
      }
      return newArr
    },

    size: function(collection){
      return typeof collection === "object" ? Object.keys(collection).length : collection.length;
    },

    first: function(collection, n = 1){
      return n === 1 ? collection.slice(0,n)[0] : collection.slice(0, n);
    },

    last: function(collection, n = 1){
      return n === 1 ? collection.slice(collection.length - n)[0] : collection.slice(collection.length - n);
    },

    compact: function(collection) {
      let val = [];
      for (const i of collection){
        if (i){
          val.push(i);
        }
      }
      return val;
    },

    sortBy: function(collection, callback){
      return [...collection].sort((a,b) => callback(a) - callback(b))
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },
    
    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },


    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },


  }
})()

fi.libraryMethod()
