/*eslint-disable*/
let array = [[["1", 1666628661566], "default"], [["2", 1666628662685], "default"], [["4", 1666628664198], "default"],
[["5", 1666628669623], "default"], [["6", 1666628670522], "default"], [["7", 1666628671623], "default"],
[["8", 1666628672538], "default"]]

// let a = array.map(e => {
//    if (e === [["4", 1666628664198], "default"]) {
//       return [[e[0][0],e[0][1], "jopa"]]
//    } else {
//       return e
//    }
// })

// console.log(a)

function swap(arr, el) {
   for (let i = 0; i < arr.length; ++i)
      if (arr[i][0][0] === el[0][0] && arr[i][0][1] === el[0][1] && arr[i][1] === el[1]) arr[i][1] = "jopa"
   return arr
}

// console.log(
//    swap(array,[["4", 1666628664198], "default"])
// )

// Array.prototype.isEqual = function(arr){
//    if ( this.length !== arr.length ) return false
//    for (let i = 0; i < this.length; ++i) {
//        if ( Array.isArray(this[i]) && Array.isArray(arr[i]) ) {
//            if ( !this[i].isEqual(arr[i]) ) return false
//        } else if ( Array.isArray(arr[i]) !== Array.isArray(this[i]) ) {
//            return false
//        } else {
//            return this[i] === arr[i]
//        }
//    }
//    return true
// }

// Array.prototype.swap = function(el,cb){
//    for(let i=0;i<this.length;++i)
//        if( this[i].isEqual(el) ) this[i] = "jopa"
//    return this
// }

// console.log(
//    array.swap([["4", 1666628664198], "default"])
// )

array = [
   [1, 2, 3], "abc", ["a", "b", "c"], 14, true, [[5, 6, 7]], "zxc", [[1, [2], [[3]]]]
]

Object.prototype.typeof = function () {
   return /\s(\w+)\]/.exec(Object.prototype.toString.call(this))[1]
}

Object.prototype.isPrimitive = function () {
   const primitives = ["String", "Number", "Boolean"]
   return primitives.includes(this.typeof())
}

Object.prototype.isEqual = function (el) {
   if (Array.isArray(this) && Array.isArray(el)) {
      for (let i = 0; i < this.length; ++i) {
         if (Array.isArray(this[i]) && Array.isArray(el[i])) {
            if (!this[i].isEqual(el[i])) return false
         } else if (Array.isArray(el[i]) !== Array.isArray(this[i])) {
            return false
         } else {
            return this[i] === el[i]
         }
      }
   } else if (this.typeof() === "Object" && el.typeof() === "Object") {
      // кейс для объектов
   } else if (this.isPrimitive() && el.isPrimitive()) {
      return this.typeof() == el.typeof() && el == this
   } else if (el.typeof() !== this.typeof()) {
      return false
   }
   return true
}

Array.prototype.swap = function (el, cb) {
   for (let i = 0; i < this.length; ++i)
      if (this[i].isEqual(el)) this[i] = cb(this[i])
   return this
}

console.log(
   array.swap(["a", "b", "c"], (e) => (e[1] = "swaped",e))
)
