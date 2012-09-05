function init() {
    console.log("It's still working anyway.");
    var add_button = document.getElementById("add_budget_item");
    var calculate_button = document.getElementById("calculate_button");
    var budget_items = document.getElementById("budget_items");
    var base_budget_item = document.getElementById("base_budget_item");
    console.log("add_button: ", add_button);
    console.log("calculate_button: ", calculate_button);
    console.log("budget_items", budget_items);
    console.log("base_budget_item", base_budget_item);

    add_button.onclick = function () { //Make this a named function below
        console.log("add_button clicked");
    };
}

init();
