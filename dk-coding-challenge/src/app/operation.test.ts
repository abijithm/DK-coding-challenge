// import 'jest-preset-angular';
import {searchContinuityAboveValue, backSearchContinuityWithinRange, 
    searchContinuityAboveValueTwoSignals, searchMultiContinuityWithinRange  } from "./operations.service";

export function getInfo() {
    const results = [];
    const csv = require('csv-parser');
    const fs = require('fs');
    
    fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
    .pipe(csv(['Timestamp','ax','ay','az','wx','wy','wz']))
    .on('data',(data)=> results.push(data))
    .on('end', () => {
        Operations(results);
    });
    // return results;
}

export function Operations(results){
    
    console.log('inside test operations')

    let ax = results.map(x=> x.ax)
    let ay = results.map(x=> x.ay)
    let az = results.map(x=> x.az)
    let wx = results.map(x=> x.wx)
    let wy = results.map(x=> x.wy)
    let wz = results.map(x=> x.wz)
    
    return [ax, ay, az, wx, wy, wz];
}

class TestObject {
    testData = getInfo();
}

let testObject = new TestObject();

console.log('test operation: ')
console.log(testObject.testData)

// test('seach column ax b/w 880-920 exceeding threshold of 25.0 with window length of 3', () => {
//     expect(searchContinuityAboveValue(ax, 880, 920, 25.0, 3)).toBe(-1);
// })


export function testOperations(test){
    test('seach column ax b/w 880-920 exceeding threshold of 25.0 with window length of 3', () => {
        expect(test).toBe(-1);
    });
}
