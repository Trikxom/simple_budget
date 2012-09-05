window.onload = init;

function init() {
    var add_button = document.getElementById("add_budget_item");
    var calculate_button = document.getElementById("calculate_button");
    var budget_items_div = document.getElementById("budget_items_div");
    var base_budget_item = document.getElementById("base_budget_item");
    var total_text_box = document.getElementById("total_text_box");
    console.log("add_button: ", add_button);
    console.log("calculate_button: ", calculate_button);
    console.log("budget_items_div", budget_items_div);
    console.log("base_budget_item", base_budget_item);

    add_button.onclick = add_budget_item;
    calculate_button.onclick = calculate_total;
}

function add_budget_item() {
    console.log("add_button clicked");
    //base_budget_item is used as a template for new budget_items
    var new_budget_item = base_budget_item.cloneNode(true);
    new_budget_item.removeAttribute("id");
    budget_items_div.appendChild(new_budget_item);
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
        if (!isNaN(value_of_budget_item)) {
            console.log("found value: ", value_of_budget_item);
            new_total += value_of_budget_item;
        }
    }
    //Update value of total on screen
    total_text_box.value = new_total;
}
