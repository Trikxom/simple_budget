window.onload = init;

function init() {
    //Load the old budget items
    var budget_items_div = document.getElementById("budget_items_div");
    var old_budget_items = load_budget_items();
    if (old_budget_items != undefined) {
        console.log("found budget_items in local storage");
        budget_items_div.innerHTML = old_budget_items;
        add_delete_buttton_handlers();
    } else {
        console.log("didn't find any budget_items in local storage");
    }

    var add_button = document.getElementById("add_budget_item");
    var calculate_button = document.getElementById("calculate_button");
    var base_budget_item = document.getElementById("base_budget_item");
    var total_text_box = document.getElementById("total_text_box");
    var delete_item_button = document.getElementById("delete_item_button");
    var start_new_budget_button = document.getElementById("start_new_budget");

    console.log("add_button: ", add_button);
    console.log("calculate_button: ", calculate_button);
    console.log("budget_items_div", budget_items_div);
    console.log("base_budget_item", base_budget_item);
    console.log("start_new_budget_button", start_new_budget_button);

    add_button.onclick = add_budget_item;
    calculate_button.onclick = calculate_total;
    start_new_budget_button.onclick = start_new_budget;

    //This needs to be called so a total is shown for loaded budget_items
    calculate_total()
} 

function add_budget_item() {
    console.log("add_button clicked");
    //base_budget_item is used as a template for new budget_items
    var base_budget_item = document.getElementById("base_budget_item");
    var new_budget_item = document.createElement("div");
    new_budget_item.innerHTML = base_budget_item.innerHTML;
    new_budget_item.className = "budget_item";
    budget_items_div.appendChild(new_budget_item);
    //Add event handler to delete_item_button for this budget_item
    var delete_item_button = new_budget_item.getElementsByClassName("delete_item_button")[0];
    delete_item_button.onclick = delete_item;
    save(budget_items_div);
}

function calculate_total() {
    console.log("calculate_button clicked");
    var new_total = 0;
    //Get all the budget item values into an array
    var item_values = document.getElementsByClassName("item_value");
    console.log("Number of item_values found: ", item_values.length);
    //Loop through budget items and add up new total
    for (var i = 0; i < item_values.length; i++) {
        var value_of_budget_item = parseInt(item_values[i].value);
        var description_of_this_item = item_values[i].parentNode.getElementsByClassName("item_text")[0];

        //Skip NaN values
        if (!isNaN(value_of_budget_item)) {
            console.log("found value: ", value_of_budget_item);
            new_total += value_of_budget_item;
            //Explicitely set value attributes so they can be saved in local storage
            item_values[i].setAttribute("value", value_of_budget_item);
            description_of_this_item.setAttribute("value", description_of_this_item.value);
        }
    }
    //Update value of total on screen
    total_text_box.value = new_total;
    save(budget_items_div);
}

function delete_item(e) {
    console.log("delete_item_button clicked");
    //Get the budget_item containing the button that was just clicked
    //and delete it
    var budget_item_to_delete = e.target.parentNode;
    console.log("budget_item_to_delete", budget_item_to_delete);
    budget_items_div.removeChild(budget_item_to_delete);
    //Refresh total to reflect the removal of an item
    calculate_total()
    save(budget_items_div);
}

function add_delete_buttton_handlers() {
    var delete_buttons = document.getElementsByClassName("delete_item_button");
    for (var i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].onclick = delete_item;
    }
}

function start_new_budget() {
    old_base_budget_item_html = document.getElementById("base_budget_item").innerHTML;
    budget_items_div = document.getElementById("budget_items_div");

    //Clear everything from the budget_items_div
    budget_items_div.innerHTML = "";

    //Create a starting budget_item with no delete button
    new_base_budget_item = document.createElement("div");
    new_base_budget_item.innerHTML = old_base_budget_item_html;
    delete_button = new_base_budget_item.getElementsByClassName("delete_item_button")[0];
    new_base_budget_item.removeChild(delete_button);
    budget_items_div.appendChild(new_base_budget_item);

    save(budget_items_div);
}
