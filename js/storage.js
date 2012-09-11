function save(element_to_save) {
    console.log("storing: ", element_to_save);
    localStorage.setItem("budget_items", element_to_save.innerHTML);
}

function load_budget_items() {
    console.log("loading old budget_items from local storage");
    return localStorage.getItem("budget_items");
}
