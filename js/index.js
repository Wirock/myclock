// JavaScript Document
window.onload=function(){
	var canvas = document.getElementById("canvas");
	canvas.width = 1024;
	canvas.height = 768;
	
	var context = canvas.getContext("2d");
	context.beginPath();
	context.moveTo(100,100);
	context.lineTo(700,700);
	context.lineTo(100,700);
	context.lineTo(100,100);
	context.closePath();
	context.lineWidth = 5;
	context.strokeStyle = "green";
	context.stroke();

	context.fillStyle="green";
	context.fill();

	context.beginPath();
	context.moveTo(700,700);
	context.lineTo(700,100);
	context.lineTo(100,100);
	context.closePath();
	context.fillStyle="purple";
	context.fill();
	context.strokeStyle = "red";
	context.stroke();
};