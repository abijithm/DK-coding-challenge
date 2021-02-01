"use strict";
exports.__esModule = true;
var operations_service_1 = require("./operations.service");
var Analysis = /** @class */ (function () {
    function Analysis() {
        this.data = getInfo();
    }
    return Analysis;
}());
var analysis = new Analysis();
analysis.data;
function getInfo() {
    var results = [];
    var csv = require('csv-parser');
    var fs = require('fs');
    fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
        .pipe(csv(['Timestamp', 'ax', 'ay', 'az', 'wx', 'wy', 'wz']))
        .on('data', function (data) { return results.push(data); })
        .on('end', function () {
        Operations(results);
    });
}
function Operations(results) {
    console.log('Operations');
    var ax = results.map(function (x) { return x.ax; });
    var ay = results.map(function (x) { return x.ay; });
    var az = results.map(function (x) { return x.az; });
    var wx = results.map(function (x) { return x.wx; });
    var wy = results.map(function (x) { return x.wy; });
    var wz = results.map(function (x) { return x.wz; });
    console.log("\n ********** Operation 1 ********** \n");
    var res11 = operations_service_1.searchContinuityAboveValue(ax, 880, 920, 25.0, 3);
    console.log(res11);
    console.log('\n');
    var res12 = operations_service_1.searchContinuityAboveValue(wz, 800, 1000, 10.0, 7);
    console.log(res12);
    console.log("\n ********** Operation 2 ********** \n");
    var res21 = operations_service_1.backSearchContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res21);
    console.log('\n');
    var res22 = operations_service_1.backSearchContinuityWithinRange(ay, 245, 300, 0.00, 0.3, 13);
    console.log(res22);
    console.log("\n ********** Operation 3 ********** \n");
    var res31 = operations_service_1.searchContinuityAboveValueTwoSignals(ax, ay, 870, 920, 0.0, -15.0, 3);
    console.log(res31);
    console.log('\n');
    var res32 = operations_service_1.searchContinuityAboveValueTwoSignals(az, wx, 400, 600, 0.0, 0.2, 4);
    console.log(res32);
    console.log("\n ********** Operation 4 ********** \n");
    var res41 = operations_service_1.searchMultiContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
    console.log(res41);
    console.log('\n');
    var res42 = operations_service_1.searchMultiContinuityWithinRange(ax, 880, 920, 0.0, 17.0, 3);
    console.log(res42);
    // Test Cases
    console.log("\n ******** Assertion Test Cases ******** \n");
    console.log(" ******** Operation 1 Tests ******** \n");
    console.assert(res11 === 720, "on -1 === 720");
    console.assert(res11 === -1, "on -1 === -1");
    console.assert(res12 === 816, "on 816 === 816");
    console.assert(res12 === -1, "on 816 === -1");
    console.log("\n ******** Operation 2 Tests ********\n");
    console.assert(res21 === 886, "on 886 === 886");
    console.assert(res21 === -1, "on 886 === -1");
    console.assert(res22 === 263, "on 263 === 263");
    console.assert(res22 === -1, "on 263 === -1");
    console.log("\n ******** Operation 3 Tests ******** \n");
    console.assert(res31 === 883, "on 883 === 883");
    console.assert(res31 === -1, "on 883 === -1");
    console.assert(res32 === 500, "on 500 === 500");
    console.assert(res32 === -1, "on 500 === -1");
    console.log("\n ******** Operation 4 Tests ******** \n");
    console.assert(String(res41) == "886,888", "on [[886, 888]] === [[886, 888]]");
    console.assert(String(res41) === "", "on [[886, 888]] === []");
    console.assert(String(res42) == "883,885,884,886,885,887,886,888,887,889,888,890,889,891,890,892,908,910,909,911,910,912,911,913,912,914,913,915,914,916,915,917,916,918,917,919", "on res42 === [[ 883, 885 ], [ 884, 886 ],[ 885, 887 ], [ 886, [ 887, 889 ], [ 888, 890 ],[ 889, 891 ], [ 890, 892 ],[ 908, 910 ], [ 909, 911 ],[ 910, 912 ], [ 911, 913 ],[ 912, 914 ], [ 913, [ 914, 916 ], [ 915, 917 ],[ 916, 918 ], [ 917, 919 ] ]");
    console.assert(String(res42) == "915,917,916,918,917,919", "on res42 === [ [ 915, 917 ],[ 916, 918 ], [ 917, 919 ] ]");
    console.log("\n ************ Tests Complete ************\n");
}
