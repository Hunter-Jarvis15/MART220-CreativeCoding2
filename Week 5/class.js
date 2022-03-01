class cubo {
    constructor(x, y, z, len) {
      this.pos = createVector(x, y, z);
      this.len = len
    }
   //coloring the cube
    show() {
      fill(255);
      stroke(0)
      strokeWeight(2);
      push();
      translate(this.pos.x, this.pos.y, this.pos.z)
      let r = this.len / 2;
  
    //UP
    beginShape();
    fill(255)
    vertex(-r,-r, -r);
    vertex(-r,-r, r);
    vertex(r,-r, r);
    vertex(r,-r, -r);
    endShape();
  
    //DOWN
    beginShape();
    fill(255,255,0)
    vertex(-r,r, -r);
    vertex(-r,r, r);
    vertex(r,r, r);
    vertex(r,r, -r);
    endShape();
  
    //RIGTH
    beginShape();
    fill(255,117,20)
    vertex(r,-r, -r);
    vertex(r,-r, r);
    vertex(r,r, r);
    vertex(r,r, -r);
    endShape();
  
    //LEFT
    beginShape();
    fill(255,0,0)
    vertex(-r,-r, -r);
    vertex(-r,-r, r);
    vertex(-r,r, r);
    vertex(-r,r, -r);
    endShape();
  
    //FRONT
    beginShape();
    fill(0,255,0);
    vertex(-r, -r, r);
    vertex(-r, r, r);
    vertex(r, r, r);
    vertex(r, -r, r);
    endShape();
  
    //BACK
    beginShape();
    fill(0,0,255)
    vertex(-r, -r, -r);
    vertex(-r, r, -r);
    vertex(r, r, -r);
    vertex(r, -r, -r);
    endShape();
  
  
  
  
  
    pop();
  
  
    }
  
  
  
  }
  