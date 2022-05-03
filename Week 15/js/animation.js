var img;
var names = [];
var myImage;
var i = 0;
var imagesToDisplay = [];
var imageClassObject;
function preload()
{
	names = loadStrings("./assets/movie.txt");	
}

function setup()
{
	createCanvas(displayWidth, displayHeight);

	for(var k = 0; k < names.length; k++)
	{
		img = loadImage("./assets/movie/" + names[k]);

		imageClassObject = new imageclass(img, 10,10, 800, 600);
		imagesToDisplay[k] = imageClassObject;
	}
	setInterval(changeTheDarnAnimation, 100);
}

function draw(){
	background(240);

		image(imagesToDisplay[i].getImage(),
		imagesToDisplay[i].getX(), 
		imagesToDisplay[i].getY(), 
		imagesToDisplay[i].getW(),
		imagesToDisplay[i].getH());
	
}

function changeTheDarnAnimation()
{
	i+=1;

	if(i >= imagesToDisplay.length)
	{

		i = 0;
	}
	
}