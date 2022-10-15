let arr = ["1", "2", "3", "4", "5"]
//let out = [["1", "color"], ["2", "color"], ["3", "color"], ["4", "color"], ["5", "color"]]

const solution = (arr) => {

   return arr.map(e => [e, "ElementStates.Default"])
}

console.log(solution(arr))
