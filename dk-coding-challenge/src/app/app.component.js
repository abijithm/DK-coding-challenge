"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(operationsService, http, ngxCsvParser) {
        var _this = this;
        this.operationsService = operationsService;
        this.http = http;
        this.ngxCsvParser = ngxCsvParser;
        this.title = 'dk-coding-challenge';
        this.csvRecords = [];
        this.header = false;
        var file = this.http.get('../dk-coding-challenge/src/assets/latestSwing.csv', { responseType: 'text' });
        this.ngxCsvParser.parse(file[0], { header: this.header, delimiter: ',' })
            .pipe(['Timestamp', 'ax', 'ay', 'az', 'wx', 'wy', 'wz']).subscribe(function (result) {
            console.log('Result', result);
            _this.csvRecords = result;
        }, function (error) {
            console.log('Error', error);
        });
    }
    // class Analysis {
    //   data = getInfo();
    // }
    // let analysis = new Analysis();
    // analysis.data;
    AppComponent.prototype.getInfo = function () {
        var _this = this;
        var results = [];
        var csv = require('csv-parser');
        var fs = require('fs');
        fs.createReadStream('../dk-coding-challenge/src/assets/latestSwing.csv')
            .pipe(csv(['Timestamp', 'ax', 'ay', 'az', 'wx', 'wy', 'wz']))
            .on('data', function (data) { return results.push(data); })
            .on('end', function () {
            _this.Operations(results);
        });
    };
    AppComponent.prototype.Operations = function (results) {
        console.log('Operations');
        var ax = results.map(function (x) { return x.ax; });
        var ay = results.map(function (x) { return x.ay; });
        var az = results.map(function (x) { return x.az; });
        var wx = results.map(function (x) { return x.wx; });
        var wy = results.map(function (x) { return x.wy; });
        var wz = results.map(function (x) { return x.wz; });
        console.log("\n ********** Operation 1 ********** \n");
        var res11 = this.operationsService.searchContinuityAboveValue(ax, 880, 920, 25.0, 3);
        console.log(res11);
        console.log('\n');
        var res12 = this.operationsService.searchContinuityAboveValue(wz, 800, 1000, 10.0, 7);
        console.log(res12);
        console.log("\n ********** Operation 2 ********** \n");
        var res21 = this.operationsService.backSearchContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
        console.log(res21);
        console.log('\n');
        var res22 = this.operationsService.backSearchContinuityWithinRange(ay, 245, 300, 0.00, 0.3, 13);
        console.log(res22);
        console.log("\n ********** Operation 3 ********** \n");
        var res31 = this.operationsService.searchContinuityAboveValueTwoSignals(ax, ay, 870, 920, 0.0, -15.0, 3);
        console.log(res31);
        console.log('\n');
        var res32 = this.operationsService.searchContinuityAboveValueTwoSignals(az, wx, 400, 600, 0.0, 0.2, 4);
        console.log(res32);
        console.log("\n ********** Operation 4 ********** \n");
        var res41 = this.operationsService.searchMultiContinuityWithinRange(ax, 880, 920, 10.0, 17.0, 3);
        console.log(res41);
        console.log('\n');
        var res42 = this.operationsService.searchMultiContinuityWithinRange(ax, 880, 920, 0.0, 17.0, 3);
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
