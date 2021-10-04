class Ficha extends Circle {

    constructor(posX,posY,fill,radius,context,dir){
        super(posX,posY,fill,radius,context);
        this.dir=dir;
        this.img = new Image();
        this.img.src=dir;
        this.primerDib = true;
    }

        draw() {
            let scale = Math.min(this.radius * 2 / this.img.width, this.radius * 2 / this.img.height);
            if (this.primerDib){
                let cargarImg = function() {
                    this.context.drawImage(this.img,this.posX-this.radius,
                    this.posY-this.radius,this.img.width * scale, this.img.height * scale);
                } 
                this.img.onload=cargarImg.bind(this);
                this.primerDib = false;
            }
            else{this.context.drawImage(this.img,this.posX-this.radius,
                this.posY-this.radius,this.img.width * scale, this.img.height * scale);}
        }

        getDir(){
            return this.dir;
        }

        setDir(dir){
            this.dir=dir;
            this.img.src =dir;
            this.primerDib = true;
        }
}
