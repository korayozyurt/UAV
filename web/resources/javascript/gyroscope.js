var gl;

var identityMatrix = new Float32Array(16);
var angle = 0;
var worldMatrix = new Float32Array(16);

var matWorldUniformLocation;
var matViewUniformLocation;
var matProjUniformLocation;

var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

var ambientUniformLocation;
var sunlightDirUniformLocation;
var sunlightIntUniformLocation;

var droneTexture;

var droneVertices;
var droneIndices ;
var droneTexCoords;
var droneNormals;

var initDemo = function () {
    loadTextResource('/../../resources/javascript/webGlUtils/shader.vs.glsl', function (vsErr, vsText) {
        if (vsErr) {
            alert('Fatal error getting vertex shader (see console)');
            console.error(vsErr);
        } else {
            loadTextResource('/../../resources/javascript/webGlUtils/shader.fs.glsl', function (fsErr, fsText) {
                if (fsErr) {
                    alert('Fatal error getting fragment shader (see console)');
                    console.error(fsErr);
                } else {
                    loadJSONResource('/../../resources/assets/drone.json', function (modelErr, modelObj) {
                        if (modelErr) {
                            alert('Fatal error getting Drone model (see console)');
                            console.error(fsErr);
                        } else {
                            loadImage('/../../resources/assets/droneTexture.png', function (imgErr, img) {
                                if (imgErr) {
                                    alert('Fatal error getting Drone texture (see console)');
                                    console.error(imgErr);
                                } else {
                                    RunDemo(vsText, fsText, img, modelObj);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

var RunDemo = function (vertexShaderText, fragmentShaderText, droneImage, droneModel) {
    console.log('Drone Gyroscope is started');
    model = droneModel;

    var canvas = document.getElementById('gyro-uav');
    gl = canvas.getContext('webgl');

    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    //
    // Create shaders
    //
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
        return;
    }

    //
    // Create buffer
    //
    droneVertices = droneModel.meshes[0].vertices;
    droneIndices = [].concat.apply([], droneModel.meshes[0].faces);
    droneTexCoords = droneModel.meshes[0].texturecoords[0];
    droneNormals = droneModel.meshes[0].normals;

    var dronePosVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dronePosVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(droneVertices), gl.STATIC_DRAW);

    var droneTexCoordVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, droneTexCoordVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(droneTexCoords), gl.STATIC_DRAW);

    var droneIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, droneIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(droneIndices), gl.STATIC_DRAW);

    var droneNormalBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, droneNormalBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(droneNormals), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, dronePosVertexBufferObject);
    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, droneTexCoordVertexBufferObject);
    var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
    gl.vertexAttribPointer(
        texCoordAttribLocation, // Attribute location
        2, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0
    );
    gl.enableVertexAttribArray(texCoordAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, droneNormalBufferObject);
    var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
    gl.vertexAttribPointer(
        normalAttribLocation,
        3, gl.FLOAT,
        gl.TRUE,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(normalAttribLocation);

    //
    // Create texture
    //
    droneTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, droneTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE,
        droneImage
    );
    gl.bindTexture(gl.TEXTURE_2D, null);

    // Tell OpenGL state machine which program should be active.
    gl.useProgram(program);

    matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);


    //
    // Lighting information
    //
    gl.useProgram(program);

    ambientUniformLocation = gl.getUniformLocation(program, 'ambientLightIntensity');
    sunlightDirUniformLocation = gl.getUniformLocation(program, 'sun.direction');
    sunlightIntUniformLocation = gl.getUniformLocation(program, 'sun.color');

    gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);
    gl.uniform3f(sunlightDirUniformLocation, 3.0, 4.0, -2.0);
    gl.uniform3f(sunlightIntUniformLocation, 0.9, 0.9, 0.9);

    //
    // Main render loop
    //
    mat4.identity(identityMatrix);

    requestAnimationFrame(loop);
};

var x = 0;
var y = 0;

var rotateX = 0;
var rotateY = 0;

function loop(){

    angle = performance.now() / 1000 / 6 * 2 * Math.PI;

    rotateX = x - rotateX;
    rotateY = y - rotateY;


    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    mat4.rotate(xRotationMatrix, identityMatrix,degToRad(x) , [0, 0, 1]);
    mat4.rotate(yRotationMatrix, identityMatrix, degToRad(y), [1, 0, 0]);
    mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.bindTexture(gl.TEXTURE_2D, droneTexture);
    gl.activeTexture(gl.TEXTURE0);


    gl.drawElements(gl.TRIANGLES, droneIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
}

function degToRad (degrees) {
    return degrees * Math.PI / 180;
}

/*

    the x and y values would be set by setX and setY functions

 */
function setX(xValue){
    x = xValue;

}

function setY(yValue){
    y = yValue;
}


function xRotateDrone(){
    x++;
}

function xRotateDrone2(){
    x--;
}

function yRotateDrone(){
    y++;
}

function yRotateDrone2(){
    y--;
}

initDemo();
