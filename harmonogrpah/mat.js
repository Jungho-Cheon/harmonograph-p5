const rotateMat = theta => [
    [cos(theta), -sin(theta)],
    [sin(theta), cos(theta)]
  ]

const sumMat = (a, b) => {
  return Array.from({length: a.length}, (_, i) => Array.from({length:a[0].length}, (_,j) => a[i][j] + b[i][j])) 
}

const mulMat = (a, b) => {
  const ret = Array.from({length: a.length}, () => Array.from({length: b[0].length}, ()=> 0));
  
  for(let i = 0; i < ret.length; i++) {
    for(let j = 0; j < ret[0].length; j++) {
      for(let k = 0; k < a[0].length; k++) {
        ret[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  
  return ret
}
const sin2D = (origin, theta) => {
  const sinMat = [
    [1],
    [sin(theta) * 100]
  ]
  
  return mulMat(origin, sinMat)
}