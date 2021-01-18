"use strict";
exports.__esModule = true;
exports.testOperations = exports.Operations = exports.getInfo = void 0;
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
    // return results;
}
exports.getInfo = getInfo;
function Operations(results) {
    console.log('inside test operations');
    var ax = results.map(function (x) { return x.ax; });
    var ay = results.map(function (x) { return x.ay; });
    var az = results.map(function (x) { return x.az; });
    var wx = results.map(function (x) { return x.wx; });
    var wy = results.map(function (x) { return x.wy; });
    var wz = results.map(function (x) { return x.wz; });
    return [ax, ay, az, wx, wy, wz];
}
exports.Operations = Operations;
var TestObject = /** @class */ (function () {
    function TestObject() {
        this.testData = getInfo();
    }
    return TestObject;
}());
var testObject = new TestObject();
console.log('test operation: ');
console.log(testObject.testData);
// test('seach column ax b/w 880-920 exceeding threshold of 25.0 with window length of 3', () => {
//     expect(searchContinuityAboveValue(ax, 880, 920, 25.0, 3)).toBe(-1);
// })
function testOperations(test) {
    test('seach column ax b/w 880-920 exceeding threshold of 25.0 with window length of 3', function () {
        expect(test).toBe(-1);
    });
}
exports.testOperations = testOperations;
