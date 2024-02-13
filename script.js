var image = document.getElementById("image");

var images = ["./assets/home-images/image1.jpg", "./assets/home-images/image2.jpg", "./assets/home-images/image3.jpg","./assets/home-images/image4.jpg"];

var index = 0;

function updateImage() {

image.src = images[index];

index = (index + 1) % images.length;

}

setInterval(updateImage, 3000);

const initSlider = () =>{
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideBottons = document.querySelectorAll(".slider-wrapper .slide-button");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const slideScrollbar = document.querySelector(".slider-container .slider-scrollbar");
    const scrollbarThumb = slideScrollbar.querySelector(".scrollbar-thumb");

    scrollbarThumb.addEventListener("mousedown",(e) =>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        //update the thumb position on mouse move
        const handleMouseMove = (e) =>{
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = slideScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0,Math.min(maxThumbPosition,newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        //remove event listner on mouse up
        const handleMouseUp =() => {
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("mouseup",handleMouseUp);

        }



        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseUp);
    });

    //slide images according to the slide button cliks
    slideBottons.forEach(button => {
        button.addEventListener("click",() => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount= imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior:"smooth"});
        });
    });
    const handleSlideButtons = () =>{
        slideBottons[0].style.display = imageList.scrollLeft <=0 ? "none" : "block";
        slideBottons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }
    //update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (slideScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }



    imageList.addEventListener("scroll",() => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load",initSlider);