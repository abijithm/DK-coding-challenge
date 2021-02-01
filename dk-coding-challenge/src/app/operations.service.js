"use strict";
exports.__esModule = true;
exports.searchMultiContinuityWithinRange = exports.searchContinuityAboveValueTwoSignals = exports.backSearchContinuityWithinRange = exports.searchContinuityAboveValue = exports.slidingWindow = void 0;
function slidingWindow(x, indexBegin, indexEnd, winLength, op4Flag) {
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
}
exports.slidingWindow = slidingWindow;
function searchContinuityAboveValue(data, indexBegin, indexEnd, threshold, winLength) {
    function x(i, j) {
        return (data[i + j] > threshold);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.searchContinuityAboveValue = searchContinuityAboveValue;
function backSearchContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
    function x(i, j) {
        return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.backSearchContinuityWithinRange = backSearchContinuityWithinRange;
function searchContinuityAboveValueTwoSignals(data1, data2, indexBegin, indexEnd, threshold1, threshold2, winLength) {
    function x(i, j) {
        return (data1[i + j] > threshold1 && data2[i + j] > threshold2);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, false);
}
exports.searchContinuityAboveValueTwoSignals = searchContinuityAboveValueTwoSignals;
function searchMultiContinuityWithinRange(data, indexBegin, indexEnd, thresholdLo, thresholdHi, winLength) {
    function x(i, j) {
        return (data[i + j] > thresholdLo && data[i + j] < thresholdHi);
    }
    return slidingWindow(x, indexBegin, indexEnd, winLength, true);
}
exports.searchMultiContinuityWithinRange = searchMultiContinuityWithinRange;
