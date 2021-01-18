"use strict";
// import * as operationFunctions from "./operation"
// import { ConditionalExpr } from "@angular/compiler";
exports.__esModule = true;
exports.Operations = void 0;
var operation_test_1 = require("./operation.test");
var operations_service_1 = require("./operations.service");
var csv = require('csv-parser');
var fs = require('fs');
var results = [];
var Analysis = /** @class */ (function () {
    function Analysis() {
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
        this.data = getInfo();
    }
    return Analysis;
}());
function getInfo() {
    // const results = [];
    var csv = require('csv-parser');
    var fs = require('fs');
    fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
        .pipe(csv(['Timestamp', 'ax', 'ay', 'az', 'wx', 'wy', 'wz']))
        .on('data', function (data) { return results.push(data); })
        .on('end', function () {
        // analysiss = new Analysis(results);
        // let analysis = new Analysis(results);
        // this.data = results;
        // return analysis;
        Operations(results);
        // testOperations(results);
    });
    // return results;
}
function Operations(results) {
    console.log('inside test operations');
    var ax = results.map(function (x) { return x.ax; });
    var ay = results.map(function (x) { return x.ay; });
    var az = results.map(function (x) { return x.az; });
    var wx = results.map(function (x) { return x.wx; });
    var wy = results.map(function (x) { return x.wy; });
    var wz = results.map(function (x) { return x.wz; });
    //1
    var res1 = operations_service_1.searchContinuityAboveValue(ax, 880, 920, 25.0, 3);
    console.log(res1);
    operation_test_1.testOperations(res1);
    //2
    var res2 = operations_service_1.backSearchContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res2);
    //3
    var res3 = operations_service_1.searchContinuityAboveValueTwoSignals(ax, ay, 870, 920, 0.0, -15.0, 3);
    console.log(res3);
    //4
    var res4 = operations_service_1.searchMultiContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res4);
}
exports.Operations = Operations;
console.log('here');
// let an = new Analysis();
// console.log(an.data);
// var gi = new getInfo;
// console.log(gi.data);
var analysis = new Analysis();
analysis.data;
