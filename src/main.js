import { supabase } from "./supabase/config";

// function to show all subscriptions
async function loadSubscriptions() {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error loading subscription", error);
  } else {
    const list = document.getElementById("subscription-list");
    list.innerHTML = "";

    data.forEach((sub) => {
      const item = document.createElement("div");
      item.innerHTML = `<li class="item"> <span class="subscription-name">${sub.name} </span>  ${sub.price} ${sub.billing_cycle} ${sub.start_date} ${sub.notes} <button class="delete-btn" data-id="${sub.id}">X</button> </li>`;
      list.appendChild(item);
    });
  }
}

// function to add subscriptions
const form = document.querySelector("#subscription-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formInputs = form.querySelectorAll("input, select, textarea");

  let newSub = {};
  formInputs.forEach((element) => {
    const { value, name } = element;

    if (value) {
      newSub[name] = value;
    }
  });

  const { error, data } = await supabase.from("subscriptions").insert([newSub]);

  if (error) {
    alert("There was an error please try again");
  } else {
    alert("Your subscription is added");
  }
});

async function deleteItem(id) {
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);

  if (error) {
    console.log("Error deleting item", error.message);
  } else {
    console.log("Item deleted succesfully");
    document.querySelector(`.item[data-id="${id}"]`).remove();
  }
}

// function to delete subscriptions
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const itemId = event.target.getAttribute("data-id");
    deleteItem(itemId);
  }
});

loadSubscriptions();
