import { supabase } from "./supabase/config.js";

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
    const totalMonthlyDisplay = document.getElementById("total-amount-monthly")
    const totalYearlyDisplay = document.getElementById("total-amount-yearly")
    const totalDisplay = document.getElementById("total-amount")
    list.innerHTML = "";

    let totalMonthly = 0;
    let totalYearly = 0;
    let total = 0;

    data.forEach((sub) => {

      if (sub.billing_cycle === "Monthly") {
        totalMonthly += parseFloat(sub.price);
      }
      if (sub.billing_cycle === "Yearly") {
        totalYearly += parseFloat(sub.price);
      }

      total += parseFloat(sub.price);


      const item = document.createElement("div");
      item.innerHTML = `<li class="item"> <span class="sub-intro"> ${sub.name} <br> ${sub.billing_cycle}  </span> <span class= "price-date"> € ${sub.price} <br> ${sub.start_date} </span> <button class="delete-btn" data-id="${sub.id}">X</button> </li>`;
      list.appendChild(item);
    });
    totalMonthlyDisplay.innerHTML = ` <span class="total"> Total Monthly </span>  <span> € ${totalMonthly.toFixed(2)} </span>`
    totalYearlyDisplay.innerHTML = ` <span class="total"> Total Yearly </span> <span> € ${totalYearly.toFixed(2)} </span>`
    totalDisplay.innerHTML = ` <span class="total"> Total </span> <span> € ${total.toFixed(2)} </span>`
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
    window.location.reload();
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

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const itemId = event.target.getAttribute("data-id");
    deleteItem(itemId);
  }
});




loadSubscriptions();
