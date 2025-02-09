function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) return program;
    console.log(gl.getProgramInfoLog(program));
}

var canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
window.gl = gl;
const vertexShaderSource = `
    attribute vec4 a_position;
    uniform mat4 u_matrix;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main(){
        gl_Position = a_position * u_matrix;
        v_color = a_color;
    }`
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    void main(){
    gl_FragColor = vec4(v_color,1);}
    `
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');
const matrixUniformLocation = gl.getUniformLocation(program, 'u_matrix');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
        -0.2,0.2,
        0.2,-0.2,
        0.2,0.2,
    ]),
    gl.STATIC_DRAW
);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

gl.enableVertexAttribArray(colorAttributeLocation);
gl.vertexAttribPointer(colorAttributeLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([
    0, 0, 255,
    0, 255, 0,
    255, 0, 0,
]), gl.STATIC_DRAW)

gl.useProgram(program);
gl.uniformMatrix4fv(matrixUniformLocation, false,
    [
    5,0,0,0,
    0,3,0,0,
    0,0,2,0,
    0,0,0,1
])
gl.drawArrays(gl.TRIANGLES, 0, 3)