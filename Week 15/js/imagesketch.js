function setup() {
    let img = createImage(800, 600); 
    img.loadPixels();
    createCanvas(800, 600);
    background(144);
  
    function writeColor(image, x, y, red, green, blue, alpha) 
    {
      let index = (x + y * width) * 4;
      image.pixels[index] = red;
      image.pixels[index + 1] = green;
      image.pixels[index + 2] = blue;
      image.pixels[index + 3] = alpha;
    }

    let x, y;
    // fill with random colors
    for (y = 0; y < img.height; y++) {
      for (x = 0; x < img.width; x++) {
        let red = random(144);
        let green = random(323);    
        let blue = random(66);
        let alpha = 0;
        writeColor(img, x, y, red, green, blue, alpha);
      }
    }
  
    // upper border line
    for(y = 0; y < 5; y++)
    {
      for (x = 0; x < img.width; x++) 
      {
        writeColor(img, x, y, 144, 323, 66, 255);
      }
    }
    // left border line
    for(x = 0; x < 5; x++)
    {
      for (y = 0; y < img.height; y++) 
      {
        writeColor(img, x, y, 144, 323, 66, 255);
      }
    }

    // right border line
    x = img.width+1;
    for(let i = 0; i < 5; i++)
    {
      for (y = 0; y < img.width; y++) 
      {
        writeColor(img, x, y, 144, 323, 66, 255);
      }
      x--;
    }

    // bottom border line
    y = img.height+1;
    for(let i = 0; i < 5; i++)
    {
      for (x = 0; x < img.width; x++) 
      {
        writeColor(img, x, y, 144, 323, 66, 255);
      }
      y--;
    }
  
    img.updatePixels();
    image(img, 0, 0);
  }