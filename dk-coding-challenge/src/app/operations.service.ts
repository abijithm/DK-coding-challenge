import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class OperationsService{

  constructor(){};

  private slidingWindow(x, indexBegin: number, indexEnd: number, winLength: number, op4Flag: boolean){
    // x represents functions from respective operations to be passed in as conditions to check
    // op4Flag meant for operation 4 which requires to return beginning and end index where condition met
    let indices = [];
    for (let i = indexBegin; i < indexEnd - winLength; i++) {
        let flag = true;
        for (let j = 0; j < winLength; j++) {
            if ( x(i,j) ){
                continue;
            }            
            else{
              // Advance sliding window if condition false, avoids irrelevant iterations
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
              // return first index at which conditions met for sliding window
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

  public searchContinuityAboveValue(data, indexBegin: number, indexEnd: number, threshold: number, winLength: number){
    function x(i: number, j: number){
        return (data[i+j] > threshold);
    }
    return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
  }

  public backSearchContinuityWithinRange(data, indexBegin: number, indexEnd: number, thresholdLo: number, thresholdHi: number, winLength: number){
    function x(i: number, j: number){
        return (data[i+j] > thresholdLo && data[i+j] < thresholdHi);
    }
    return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
  }

  public searchContinuityAboveValueTwoSignals(data1, data2, indexBegin: number, indexEnd: number, threshold1: number, threshold2: number, winLength: number){
    function x(i: number, j: number){
        return (data1[i+j] > threshold1 && data2[i+j] > threshold2)
    }
    return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
  }

  public searchMultiContinuityWithinRange(data, indexBegin: number, indexEnd: number, thresholdLo: number, thresholdHi: number, winLength: number){  
    function x(i: number, j: number){
        return (data[i+j] > thresholdLo && data[i+j] < thresholdHi);
    }
    return this.slidingWindow(x, indexBegin, indexEnd, winLength, true);
  }
}