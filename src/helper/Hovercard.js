export function windowelement() {
    $(function () {
        $('.__ljt').tooltipster({
            interactive: true,
            content: 'Loading...',
            contentCloning: false,
            contentAsHTML: true,
            animation: 'fade',
            functionBefore: function (origin, continueTooltip) {
                // we'll make this function asynchronous and allow the tooltip to go ahead and show the loading notification while fetching our data.
                continueTooltip();
                origin.tooltipster('content', '<div class="hovercard"> <div> <div class="display-pic"> <div class="cover-photo"> <div class="display-pic-gradient"></div><img src="dp.jpg"> </div><div class="profile-pic"> <div class="pic"> <img src="avatar.jpg" title="Profile Image"> </div><div class="details"> <ul class="details-list"> <li class="details-list-item"> <p> <span class="glyph glyph-home"></span> <span> Also Lives in <a href="#">Chennai</a> <a href="#">TamilNadu</a></span> </p></li><li class="details-list-item"> <p> <span class="glyph glyph-work"></span> <span> Founder at <a href="#">CodeDodle</a></span> </p></li></ul> </div></div></div><div class="display-pic-gradient"></div><div class="title-container"> <a class="title" href="#" title="Visit Page">Tamil Selvan</a> <p class="other-info">2 followers</p></div><div class="info"> <div class="info-inner"> <div class="interactions"> <a href="#" class="btn">Add Friend</a> <a href="#" class="btn">Follow</a> </div></div></div></div></div>');
            }
        });
    });
}