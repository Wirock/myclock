/**
 * Created by Administrator on 2016/9/23.
 */
window.onload= function () {
    var canvas = document.getElementById("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineWidth=5;
    context.strokeStyle="blue";
    context.arc(300,300,200,0,1.5*Math.PI,true);
    //context.closePath();
    context.stroke();
};