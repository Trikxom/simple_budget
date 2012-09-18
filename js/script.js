$(document).ready(function() {
    console.log("Ready for action");
    //New button stuff
    $("#new_budget_button").click(show_new_budget_box);
    $("#cancel_new_budget_button").click(hide_new_budget_box);
    $("#confirm_new_budget_button").click(start_new_budget);
    //End new button stuff

    //About button stuff
    $("#about_button").click(show_about_box);
    $("#hide_about_box_button").click(function(){
        console.log("hide about button clicked");
        hide_about_box();
    });
    //End about button stuff
});

function start_new_budget() {}

function show_new_budget_box() {
    console.log("new budget button clicked");
    $("#new_budget_box").show();

    //Next time this button is clicked, hide the new budget box
    $("#new_budget_button").unbind("click");
    $("#new_budget_button").click(function(){
        console.log("new budget button clicked again");
        hide_new_budget_box();
    });
}

function hide_new_budget_box() {
    $("#new_budget_box").hide();

    //Next time the new budget button is clicked, show the new budget box
    $("#new_budget_button").unbind("click");
    $("#new_budget_button").click(show_new_budget_box);
}

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
