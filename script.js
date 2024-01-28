var image = document.getElementById("image");

var images = ["./assets/home-images/image1.jpg", "./assets/home-images/image2.jpg", "./assets/home-images/image3.jpg","./assets/home-images/image4.jpg"];

var index = 0;

function updateImage() {

image.src = images[index];

index = (index + 1) % images.length;

}

setInterval(updateImage, 3000);