// import * as operationFunctions from "./operation"
// import { ConditionalExpr } from "@angular/compiler";

import { testOperations } from "./operation.test";
import { searchContinuityAboveValue, backSearchContinuityWithinRange, 
    searchContinuityAboveValueTwoSignals, searchMultiContinuityWithinRange  } from "./operations.service";

const csv = require('csv-parser');
const fs = require('fs');
let results = [];

class Analysis {
    // fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
    // .pipe(csv(['Timestamp','ax','ay','az','wx','wy','wz']))
    // .on('data',(data)=> results.push(data))
    // .on('end', () => {
    //     // let analysis = new Analysis(results);
    //     return results;
    //     // return analysis;
    //     //Operations(results);
    // });

    // data: Array<object> = [];
    // ax: Array<number>
    // ay: Array<number>
    // az: Array<number>
    // wx: Array<number>
    // wy: Array<number>
    // wz: Array<number>
    
    // constructor(){
    //     // console.log('constructor');
    //     // console.log(data);
    //     fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
    //     .pipe(csv(['Timestamp','ax','ay','az','wx','wy','wz']))
    //     .on('data',(data)=> results.push(data))
    //     .on('end', () => {
    //         // console.log(results);
    //         return results;
    //         // this.data = results;
    //         // this.data = data;
    //         // this.ax = this.data.map(dt=> dt.ay)
    //     });
        
    // }

    data = getInfo();
}

function getInfo() {
    // const results = [];
    const csv = require('csv-parser');
    const fs = require('fs');
    
    fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
    .pipe(csv(['Timestamp','ax','ay','az','wx','wy','wz']))
    .on('data',(data)=> results.push(data))
    .on('end', () => {
        // analysiss = new Analysis(results);
        // let analysis = new Analysis(results);
        // this.data = results;
        // return analysis;
        Operations(results);
        // testOperations(results);
    });
    // return results;
}


export function Operations(results){
    
    console.log('inside test operations');

    let ax = results.map(x=> x.ax)
    let ay = results.map(x=> x.ay)
    let az = results.map(x=> x.az)
    let wx = results.map(x=> x.wx)
    let wy = results.map(x=> x.wy)
    let wz = results.map(x=> x.wz)
    
    //1
    var res1 = searchContinuityAboveValue(ax, 880, 920, 25.0, 3);
    console.log(res1);

    testOperations(res1);

    //2
    var res2 = backSearchContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res2);
    
    //3
    var res3 = searchContinuityAboveValueTwoSignals(ax, ay, 870, 920, 0.0, -15.0, 3);
    console.log(res3);
    
    //4
    var res4 = searchMultiContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res4);
}

console.log('here');

// let an = new Analysis();
// console.log(an.data);

// var gi = new getInfo;
// console.log(gi.data);



let analysis = new Analysis();
analysis.data;