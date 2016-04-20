/**
 * Created by jeason on 16/4/20.
 */
function isLandscape() {
    if(window.innerHeight > window.innerWidth) {
        return false;
    }
    else {
        return true;
    }
}
function processLanscape(type) {
    if(!type) {
        $("#pageone").hide();
    }
    else {
        $("#pageone").show();
    }
}

$(document).on("pagecreate",function(event){
    processLanscape(isLandscape());

    $(window).on("orientationchange",function(event){
        processLanscape(event.orientation == "landscape");
    });
});