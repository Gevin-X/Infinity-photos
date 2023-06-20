const imageContainer = document.getElementById('image-container');
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;

let photosArray = []; 

//unsplash api
const count = 5; 
const apikey = 'APIKEY' ;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check if all image were loaded
function imageLoaded(){
    console.log('image loaded');
    imageLoaded++;
    if(imagesLoaded===totalImages){
        ready = true;
        loader.hidden= true;
        count=25 
    }
}

//helper function to set attributes on dom element
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
} 


//creat element for links & photos << add to dom 
function diplayPhotos(){
    imageLoaded = 0; 
    totalImages = photosArray.length;
    // run function in eache photto in array
    photosArray.forEach((photo)=>{
        //create <a> link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href',photo.links.html);
        //item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })

        // create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src',photo.urls.regular);
        //img.setAttribute("alt",photo.alt_description);
        //img.setAttribute('title',photo.alt_description); 
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })

        //event listner , check when each is finished loading 
        img.addEventListener('load',imageLoaded);

        // put <img> insie <q> , then put both inside to image-container
        item.appendChild(img);
        imageContainer.appendChild(item); 
    })


}



// grt photosfrom api

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        diplayPhotos();
    } catch (error) {
        console.log(error);//caught error        
    }
}


// check to see if scrolling near bottom of page load more 4tos
window. addEventListener('scroll',()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
        //console.log("load more");
    }
})

//on load
getPhotos();
