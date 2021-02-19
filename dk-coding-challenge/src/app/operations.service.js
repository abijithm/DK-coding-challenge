"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OperationsService = void 0;
var core_1 = require("@angular/core");
var OperationsService = /** @class */ (function () {
    function OperationsService() {
    }
    ;
    OperationsService.prototype.slidingWindow = function (x, indexBegin, indexEnd, winLength, op4Flag) {
        // x represents functions from respective operations to be passed in as conditions to check
        // op4Flag meant for operation 4 which requires to return beginning and end index where condition met
        var indices = [];
        for (var i = indexBegin; i < indexEnd - winLength; i++) {
            var flag = true;
            for (var j = 0; j < winLength; j++) {
                if (x(i, j)) {
                    continue;
                }
                else {
                    // Advance sliding window if condition false, avoids irrelevant iterations
                    i += j;
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (op4Flag) {
                    indices.push([i + 1, i + winLength]);
                }
                else {
                    // return first index at which conditions met for sliding window
                    return i + 1;
                }
            }
        }
        if (indices.length) {
            return indices;
        }
        else {
            return -1;
        }
    };
    OperationsService.prototype.searchContinuityAboveValue = function (data, indexBegin, indexEnd, threshold, winLength) {
        function x(i, j) {
            return (data[i + j] > threshold);
        }
        return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
    };
    OperationsService.prototype.backSearchContinuityWithinRange = function (data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
        function x(i, j) {
            return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
        }
        return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
    };
    OperationsService.prototype.searchContinuityAboveValueTwoSignals = function (data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength) {
        function x(i, j) {
            return (data1[i + j] > threshold1 && data2[i + j] > threshold2);
        }
        return this.slidingWindow(x, indexBegin, indexEnd, winLength, false);
    };
    OperationsService.prototype.searchMultiContinuityWithinRange = function (data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
        function x(i, j) {
            return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
        }
        return this.slidingWindow(x, indexBegin, indexEnd, winLength, true);
    };
    OperationsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OperationsService);
    return OperationsService;
}());
exports.OperationsService = OperationsService;
