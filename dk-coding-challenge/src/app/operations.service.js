"use strict";
exports.__esModule = true;
exports.searchMultiContinuityWithinRange = exports.searchContinuityAboveValueTwoSignals = exports.backSearchContinuityWithinRange = exports.searchContinuityAboveValue = exports.slidingWindow = void 0;
function slidingWindow(x, indexBegin, indexEnd, winLength, op4Flag) {
    var indices = [];
    for (var i = indexBegin; i < indexEnd - winLength; i++) {
        var flag = true;
        for (var j = 0; j < winLength; j++) {
            if (x(i, j)) {
                continue;
            }
            else {
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
}
exports.slidingWindow = slidingWindow;
function searchContinuityAboveValue(data, indexBegin, indexEnd, threshold, winLength) {
    console.log('inside operation 1');
    function x(i, j) {
        return (data[i + j] > threshold);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.searchContinuityAboveValue = searchContinuityAboveValue;
function backSearchContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
    console.log('inside operation 2');
    function x(i, j) {
        return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.backSearchContinuityWithinRange = backSearchContinuityWithinRange;
function searchContinuityAboveValueTwoSignals(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength) {
    console.log('inside operation 3');
    function x(i, j) {
        return (data1[i + j] > threshold1 && data2[i + j] > threshold2);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.searchContinuityAboveValueTwoSignals = searchContinuityAboveValueTwoSignals;
function searchMultiContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
    console.log('inside operation 4');
    function x(i, j) {
        return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, true);
}
exports.searchMultiContinuityWithinRange = searchMultiContinuityWithinRange;
