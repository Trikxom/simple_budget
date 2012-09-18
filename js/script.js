$(document).ready(function() {
    console.log("Ready for action");

    //Init
    add_budget_item(true);
    //End init

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

    //Add button stuff
    $("#add_budget_item").click(function(){
        console.log("add budget item button clicked");
        add_budget_item();
    });
    //End add button stuff
});

function start_new_budget() {
    console.log("confirm new budget button clicked");
    //code for starting a new budget should go here
    $(".budget_item").each(function(){
        if (!$(this).hasClass("no_delete_button")) {
            remove_budget_item($(this));
        }
    });
    hide_new_budget_box();
}

function remove_budget_item(budget_item) {
    console.log("removing budget item");
    budget_item.remove();
}

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

function add_budget_item(no_delete_button, new_budget_item) {
    //Default value is false, delete button is wanted
    no_delete_button = no_delete_button || false;
    //Default value is a plain budget item
    //This allows for adding budget items that have already been created
    //and possibly populated with data
    new_budget_item = new_budget_item || create_budget_item();

    console.log("adding a budget item");

    if (no_delete_button) {
        console.log("delete button not wanted");
        new_budget_item.addClass("no_delete_button");
    } else {
        console.log("delete button wanted");
        //Add event handler to delete item button in the new budget item
        $(".delete_item_button", new_budget_item).click(function(){
            console.log("delete item button clicked");
            remove_budget_item(new_budget_item);
        });
    }

    $("#budget_items").append(new_budget_item);
}

function create_budget_item() {
    var new_budget_item = $("#base_budget_item").clone();
    new_budget_item.removeAttr("id");
    new_budget_item.addClass("budget_item");
    return new_budget_item;
}
