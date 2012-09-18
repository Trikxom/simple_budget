$(document).ready(function() {
    console.log("Ready for action");
    $("#about_button").click(show_about_box);
    $("#hide_about_box_button").click(function(){
        console.log("hide about button clicked");
        hide_about_box();
    });
});

function show_about_box() {
    console.log("about button clicked");
    $("#about_box").show();

    //The next time this button is clicked, hide the about box
    $("#about_button").unbind("click");
    $("#about_button").click(function(){
        console.log("about button clicked again");
        hide_about_box();
    })
}

function hide_about_box() {
    $("#about_box").hide();

    //The next time the user clicks the about button, show the about box
    $("#about_button").unbind("click");
    $("#about_button").click(show_about_box)
}
