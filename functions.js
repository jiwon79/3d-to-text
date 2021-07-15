// Calculate vector magnitude
function magnitude(vec) {
    result = 0;
    for (var i=0; i<vec.length; i++) {
        result += vec[i]*vec[i]
    }

    return M.sqrt(result)
}

// Calculate unit vector
function unit(vec) {
    var mag = magnitude(vec);
    var result = [];
    for (var i=0; i<vec.length; i++) {
        result.push(vec[i]/mag);
    }

    return result;
}

// Calculate dot product
function dotProduct(vec1, vec2) {
    if (vec1.length != vec2.length) {
        return false;
    }

    var result = 0;
    for (var k=0; k<vec1.length; k++) {
        result += vec1[k]*vec2[k]
    }
    return result
}

// Create 2 dimention array
function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
        arr[i].fill(-Infinity);
    }
    return arr;
}

// Create rotate matrix by theta
function roateMatrixByX(theta) {
    return math.matrix([
        [1, 0, 0],
        [0, Math.cos(theta), -1*Math.sin(theta)],
        [0, Math.sin(theta), Math.cos(theta)]
    ]);
}

function rotateMatrixByZ(theta) {
    return math.matrix([
        [Math.cos(theta), -1*Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]);
}