$(document).ready(function() {
    console.log("Ready for action");

    //Init
    var budget_items_loaded = load_budget_items();
    if (!budget_items_loaded) {
        //Put in a default budget item instead
        add_budget_item(true);
    } else {
        //refresh total
        calculate_total();
    }
    //End init

    //New button stuff
    $("#new_budget_button").click(show_new_budget_box);
    $("#cancel_new_budget_button").click(function(){
        console.log("cancel button clicked");
        //This button acts as an alias for the #new_budget_button
        $("#new_budget_button").trigger("click");
    });
    $("#confirm_new_budget_button").click(start_new_budget);
    //End new button stuff

    //About button stuff
    $("#about_button").click(show_about_box);
    $("#hide_about_box_button").click(function(){
        console.log("hide about button clicked");
        //This button acts as an alias for the #about_button
        $("#about_button").trigger("click");
    });
    //End about button stuff

    //Add button stuff
    $("#add_budget_item").click(function(){
        console.log("add budget item button clicked");
        add_budget_item(false, false, true);
    });
    //End add button stuff

    //Calculate button stuff
    $("#calculate_button").click(function(){
        console.log("calculate button clicked");
        calculate_total();
        save_budget_items();
    });
    //End calulate button stuff
});

function start_new_budget() {
    console.log("confirm new budget button clicked");
    //code for starting a new budget should go here
    $(".budget_item").each(function(){
        remove_budget_item($(this));
    });
    add_budget_item(true);
    hide_new_budget_box();
    //reset the budget total
    update_total(0);
    //clear the localStorage
    $.totalStorage.deleteItem("budget_items");
}

function show_new_budget_box() {
    console.log("new budget button clicked");
    $("#new_budget_box").show();
    //Save previous scrollTop value so we can scroll back to it after
    var old_scrollTop = $("html, body").scrollTop();
    console.log("old scrollTop: ", old_scrollTop);
    //Scroll to top so the about box can be seen
    scroll_to_top();

    //Next time this button is clicked, hide the new budget box
    $("#new_budget_button").unbind("click");
    $("#new_budget_button").click(function(){
        console.log("new budget button clicked again");
        hide_new_budget_box(old_scrollTop);
    });
}

function hide_new_budget_box(resume_scroll) {
    $("#new_budget_box").hide();
    scroll_to(resume_scroll);

    //Next time the new budget button is clicked, show the new budget box
    $("#new_budget_button").unbind("click");
    $("#new_budget_button").click(show_new_budget_box);
}

function show_about_box() {
    console.log("about button clicked");
    $("#about_box").show();
    //Save previous scrollTop value so we can scroll back to it after
    var old_scrollTop = $("html, body").scrollTop() || $(window).scrollTop();
    console.log("old scrollTop: ", old_scrollTop);
    //Scroll to top so the about box can be seen
    scroll_to_top();

    //The next time this button is clicked, hide the about box
    $("#about_button").unbind("click");
    $("#about_button").click(function(){
        console.log("about button clicked again");
        hide_about_box(old_scrollTop);
    })
}

function hide_about_box(resume_scroll) {
    $("#about_box").hide();
    scroll_to(resume_scroll);

    //The next time the user clicks the about button, show the about box
    $("#about_button").unbind("click");
    $("#about_button").click(show_about_box)
}

function add_budget_item(no_delete_button, new_budget_item, focus_wanted) {
    //Default value is false, delete button is wanted
    no_delete_button = no_delete_button || false;
    //Default value is a plain budget item
    //This allows for adding budget items that have already been created
    //and possibly populated with data
    new_budget_item = new_budget_item || create_budget_item();
    //Default value is false, no focus wanted
    focus_wanted = focus_wanted || false;

    console.log("adding a budget item");

    if (no_delete_button) {
        console.log("clear button wanted");
        $(".delete_item_button", new_budget_item).click(function(){
            console.log("clear item button clicked");
            clear_budget_item(new_budget_item);
        });
    } else {
        console.log("delete button wanted");
        //Add event handler to delete item button in the new budget item
        $(".delete_item_button", new_budget_item).click(function(){
            console.log("delete item button clicked");
            remove_budget_item(new_budget_item);
        });
    }

    $("#budget_items").append(new_budget_item);
    if (focus_wanted) {
        console.log("focus wanted");
        //This causes the page to scroll down to the new budget item
        //and allows you to start typing right after adding a new item
        focus_on(new_budget_item.find(".item_text"));
    }
}

function create_budget_item() {
    var new_budget_item = $("#base_budget_item").clone();
    new_budget_item.removeAttr("id");
    new_budget_item.addClass("budget_item");
    return new_budget_item;
}

function clear_budget_item(budget_item) {
    $(".item_text", budget_item).val("");
    $(".item_value", budget_item).val("");
}

function remove_budget_item(budget_item) {
    console.log("removing budget item");
    budget_item.remove();
}

function calculate_total() {
    console.log("calculating total");
    var total = 0;

    $(".budget_item .item_value").each(function(){
        var next_value = parseInt($(this).val());
        if (!isNaN(next_value)) {
            console.log("adding item to total");
            total += next_value;
        }
    });

    update_total(total);
}

function update_total(new_total) {
    $("#total_text_box").val(new_total);
}

function save_budget_items() {
    var budget_items = [];

    $(".budget_item").each(function(){
        budget_items.push({
            "text": $(".item_text", $(this)).val(),
            "value": $(".item_value", $(this)).val()
        });
    });

    console.log("number of items to save: ", budget_items.length);
    $.totalStorage('budget_items', budget_items);
}

function load_budget_items() {
    var budget_items = $.totalStorage("budget_items");

    if (budget_items != null) {
        console.log("number of items to load: ", budget_items.length);
        for (var i = 0; i < budget_items.length; i++) {
            var new_budget_item = create_budget_item();
            $(".item_text", new_budget_item).val(budget_items[i].text);
            $(".item_value", new_budget_item).val(budget_items[i].value);
            //if i is 0, it's the first budget item, that means it should
            //have no delete button
            add_budget_item(i == 0, new_budget_item);
        }
        return true;
    } else {
        console.log("no items to load");
        return false;
    }
}

function scroll_to_top() {
    scroll_to(0);
}

function scroll_to(place_to_scroll_to) {
    console.log("window scrollTop " + $(window).scrollTop());
    console.log("html, body scrollTop " + $("html, body").scrollTop());
    console.log("html scrollTop " + $("html").scrollTop());
    console.log("body scrollTop " + $("body").scrollTop());
    console.log("scrolling to: " + place_to_scroll_to);
    $("html, body").animate({scrollTop:place_to_scroll_to});
}

function focus_on(item_to_focus_on) {
    item_to_focus_on.focus();
}
