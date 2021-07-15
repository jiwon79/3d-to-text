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

function clearDisplay() {
    for (var i=1; i<WIDTH+1; i++) {
        for (var j=1; j<WIDTH+1; j++) {
            document.querySelector('table tr:nth-child('+String(i)+') td:nth-child('+String(j)+')').innerHTML = " ";
        }
    }
}

function clear2DArray(array) {
    for (var i=0; i<array.length; i++) {
        array[i].fill(-Infinity);
    }
}

function drawDonut() {
    for (var i=0; i<THETA_NUM; i++) {
        for (var j=0; j<PHI_NUM; j++) {
            var theta = 2*M.PI*i/THETA_NUM;
            var phi = 2*M.PI*j/PHI_NUM;
            
            var r = [
                M.cos(phi)*(a*M.cos(theta)+b),
                M.sin(phi)*(a*M.cos(theta)+b),
                a*M.sin(theta)
            ];
            
            var normal = unit([
                M.cos(theta)*M.cos(phi), 
                M.cos(theta)*M.sin(phi), 
                M.sin(theta)
            ]);
            
            r = m.multiply(m.matrix(r), roateMatrixByX(rotateX), rotateMatrixByZ(rotateZ))._data;
            normal = m.multiply(m.matrix(normal), roateMatrixByX(rotateX), rotateMatrixByZ(rotateZ))._data;
            
            luminance = (luminance+12)/12;
            var luminance = M.floor(dotProduct(normal, LIGHT)*12);
    
            r = [
                M.floor(r[0]+WIDTH/2),
                M.floor(r[1]+HEIGHT/2),
                r[2] = M.floor(r[2])
            ];
            // && zArray[r[0]][r[1]]<r[2]
            if (0<r[0] && r[0]<HEIGHT && 0<r[1] && r[1]<WIDTH && luminance>=0 && zArray[r[0]][r[1]]<r[2]) {
                zArray[r[0]][r[1]] = r[2];
                if (CHAR[luminance] == undefined) {
                    console.log(r, luminance);
                }
                document.querySelector('table tr:nth-child('+String(r[0])+') td:nth-child('+String([r[1]])+')').innerHTML = CHAR[luminance];
            }
            
        }
    }
}