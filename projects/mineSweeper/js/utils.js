
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// var newMat = JSON.parse(JSON.stringify(mat))

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = {};
            newMat[i][j] = Object.assign(newMat[i][j], mat[i][j])
        }
    }
    return newMat;
}
