let CurrentPhotoID = 0;
let Dummy = 0;

let ImagesData = [{
    Photo: "images/Ferrari.jpg",
    Title: "Ferrari",
    Description: "A high end sportcar from Italy"
},
{
    Photo: "images/Moon.jpg",
    Title: "The Moon",
    Description: "Our loyal follower"
},
{
    Photo: "images/cat.png",
    Title: "Cat",
    Description: "She has 9 lives!"
},
{
    Photo: "images/Eger.jpg",
    Title: "Eger",
    Description: "My Hometown!"
},
{
    Photo: "images/Palinka.jpg",
    Title: "Pálinka",
    Description: "Vaccine for COVID"
}]

const MaxPhotoID = ImagesData.length - 1;
const PhotoElement = document.querySelector("#Photo");

PhotoElement.addEventListener("animationend", SwapPictures, false);

function ResetAnimations() {
    $("#Photo").css("animation", "none");
    $("#Photo").outerHeight();
    $("#Photo").css("animation", null);

    $("#TransitionPhoto").css("animation", "none");
    $("#TransitionPhoto").outerHeight();
    $("#TransitionPhoto").css("animation", null);
}

function SwapPictures() {
    // When the picture changing animation is complete we will switch the 2 pictures
    var ImageName = $("#TransitionPhoto").attr("src");

    $("#Photo").attr("src", ImageName);
    $("#Photo").css("opacity", "1");
    $("#TransitionPhoto").css("opacity", "0");

    // We need to reset the animation in order to retrigger it later
    ResetAnimations();
}

function InitImage() {
    $("#Photo").attr("src", ImagesData[CurrentPhotoID].Photo);
    $("#PhotoTitle").text(ImagesData[CurrentPhotoID].Title);
    $("#PhotoDescription").text(ImagesData[CurrentPhotoID].Description);
    $("#Photo").css("opacity", "1");
    $("#TransitionPhoto").css("opacity", "0");
}

function RedrawThumbnails() {
    $("#BottomArea img").css("opacity", ".5");
    $(`#ThumbnailPhoto` + CurrentPhotoID .toString()).css("opacity", "1");
}
function ChangePhoto() {
    // Load picture to Transition first and change the texts down immediately

    $("#TransitionPhoto").attr("src", ImagesData[CurrentPhotoID].Photo);
    $("#PhotoTitle").text(ImagesData[CurrentPhotoID].Title);
    $("#PhotoDescription").text(ImagesData[CurrentPhotoID].Description);

    // Animate from #Photo to #TransitionPhoto

    $("#Photo").css("animation-name", "FadeOutPicture");
    $("#Photo").css("animation-duration", "1s");
    $("#Photo").css("animation-fill-mode", "forwards");
    $("#Photo").css("animation-iteration-count", "1");
 
    // Animate #TransitionPhoto to show it

    $("#TransitionPhoto").css("animation-name", "FadeInPicture");
    $("#TransitionPhoto").css("animation-duration", "1s");
    $("#TransitionPhoto").css("animation-fill-mode", "forwards");
    $("#TransitionPhoto").css("animation-iteration-count", "1");

    // After the animation finishes an event handler will swap the pictures

    //Enable the actual picture down and disable the rest

    RedrawThumbnails();

    DisableArrows();
}

function DisableArrows() {
    if (CurrentPhotoID === 0) {
        $("#LeftPanel").css("opacity", ".5");
    } else {
        $("#LeftPanel").css("opacity", "1");
    }

    if (CurrentPhotoID === MaxPhotoID) {
        $("#RightPanel").css("opacity", ".5");
    } else {
        $("#RightPanel").css("opacity", "1");
    }

}

$(window).bind('orientationchange', function (event) {
    var SaveID = CurrentPhotoID;
    location.reload(true);
    CurrentPhotoID = SaveID;
    ChangePhoto(CurrentPhotoID);
});

function InitThumbnails() {
    var Dummy = 0;
    ImagesData.forEach(Item => {
        $("#BottomArea").append(`<div class="Thumbnail" data-number=` + Dummy.toString() + `>
        <img class="ThumbnailPhoto" id="ThumbnailPhoto` + Dummy.toString() + `"data-number="` + Dummy.toString() + `" src="${Item.Photo}">
        <div class="HiddenTitle">${Item.Title}</div></div>`);
        Dummy++;
        $("#BottomArea img").css("opacity", ".5");
    })
}

$( "#LeftPanel" ).click(function() {
    if (CurrentPhotoID > 0) {
        CurrentPhotoID--;
        ChangePhoto();
    }
  });

$("#RightPanel").click(function() {
  if (CurrentPhotoID < MaxPhotoID) {
      CurrentPhotoID++;
      ChangePhoto();
  }
});

$("body").on("click", ".ThumbnailPhoto", function(Event) {
    let IndexClicked = $(Event.target).attr('data-number');
    let numberIndex = parseInt(IndexClicked);
    if (CurrentPhotoID != numberIndex) {
        CurrentPhotoID = numberIndex;
        ChangePhoto();
    }
    
})

InitThumbnails();
InitImage();
DisableArrows();
RedrawThumbnails();