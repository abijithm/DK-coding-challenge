export function slidingWindow(x, indexBegin: number, indexEnd: number, winLength: number, op4Flag: boolean){
  let indices = [];
  for (let i = indexBegin; i < indexEnd - winLength; i++) {
      let flag = true;
      for (let j = 0; j < winLength; j++) {
          if ( x(i,j) ){
              continue;
          }            
          else{
              i += j
              flag=false;
              break;
          }
      }
      if (flag){
          if (op4Flag){
              indices.push([i+1, i+winLength]);
          }
          else{
              return i+1;
          }
      }
  }
  if(indices.length){
      return indices;
  }
  else{
      return -1;
  }
}

export function searchContinuityAboveValue(data, indexBegin: number, indexEnd: number, threshold: number, winLength: number){
  console.log('inside operation 1')
  function x(i: number, j: number){
      return (data[i+j] > threshold);
  }
  return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}

export function backSearchContinuityWithinRange(data, indexBegin: number, indexEnd: number, thresholdLo: number, thresholdHi: number, winLength: number){
  console.log('inside operation 2')

  function x(i: number, j: number){
      return (data[i+j] > thresholdLo && data[i+j] < thresholdHi);
  }
  return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}

export function searchContinuityAboveValueTwoSignals(data1, data2, indexBegin: number, indexEnd: number, threshold1: number, threshold2: number, winLength: number){
  console.log('inside operation 3')

  function x(i: number, j: number){
      return (data1[i+j] > threshold1 && data2[i+j] > threshold2)
  }
  return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}

export function searchMultiContinuityWithinRange(data, indexBegin: number, indexEnd: number, thresholdLo: number, thresholdHi: number, winLength: number){
  console.log('inside operation 4')
  
  function x(i: number, j: number){
      return (data[i+j] > thresholdLo && data[i+j] < thresholdHi);
  }
  return slidingWindow(x, indexBegin, indexEnd, winLength, true);
}