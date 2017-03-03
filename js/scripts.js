// Back-End

//global var to be reused
var pizza;
var user;

function Customer(name, address, pizzaArray, totalCost) {
  this.name = name;
  this.address = address;
  this.pizzaArray = [];
  this.totalCost = 0;
}

function Pizza(toppingArray, size, pizzaCost) {
  this.toppingArray = [];
  this.size = size;
  this.pizzaCost = 10;
}

//push pizza object to pizzaArray in User Object
Customer.prototype.addPizza = function(pizza) {
  this.pizzaArray.push(pizza);
}

//push one topping to the toppingArray each call
Pizza.prototype.chooseTopping = function(topping) {
  this.toppingArray.push(topping);
}

//add size to the Pizza object
Pizza.prototype.chooseSize = function(size) {
  this.size = size;
}

Pizza.prototype.calculateCost = function() {
  for (var i = 0; i < this.toppingArray.length; i++) {
    this.pizzaCost += 3;
  }
  if (this.size === "Small") {
    this.pizzaCost += 0;
  } else if (this.size === "Medium") {
    this.pizzaCost += 5;
  } else if (this.size === "Large") {
    this.pizzaCost += 10;
  } else if (this.size === "Extra large") {
    this.pizzaCost += 15;
  } else {
    console.log("do nothing");
  }
  return this.pizzaCost;
}

//give 2 pages, hide the first, and fadeIn second
var togglePage = function(a, b) {
  $("#" + a).hide();
  $("#" + b).fadeIn();
}

//reset all the checkboxes,radioboxes and input form
var resetFields = function() {
  $("input:radio[name=optradio]").prop('checked', false);
  $("input:checkbox[name=checkBox]").prop('checked', false);
}

// jQuery
$(function() {
  $("button#main").click(function() {
    user = new Customer("", "");
    pizza = new Pizza();
    togglePage("sec1", "sec2");
  });

  $("form#topping").submit(function() {
    event.preventDefault();
    $('#topping input:checked').each(function() {
      pizza.chooseTopping($(this).val());
    });
    togglePage("sec2", "sec3");
  }); //topping form

  $("form#size").submit(function() {
    event.preventDefault();
    pizza.size = $("input:radio[name=optradio]:checked").val();
    user.totalCost += pizza.calculateCost();

    pizza.toppingArray.forEach(function(each) {
      $("span#topping").last().append(each + ", ");
    });
    $("span#size").last().append(pizza.size);
    $("span#cost").last().append(pizza.pizzaCost);
    $("span#total").text(user.totalCost);
    user.addPizza(pizza);
    togglePage("sec3", "sec4");
  }); //size form

  $("button#cost").click(function() {
    togglePage("sec4", "sec5");
  }); //next click

  $("button#addPizza").click(function() {
    $("#pizzaInfo").append("<ul>" + "<li>Pizza toppings:<span id = 'topping'></span></li>" + "<li> Pizza size: <span id = 'size' > </span></li>" + "<li> Cost: $ <span id = 'cost' > </span></li > " + " </ul>");
    pizza = new Pizza();
    resetFields();
    togglePage("sec4", "sec2");
  }); //add Pizza click

  $("form#order").submit(function() {
    event.preventDefault();
    if ($("#name").val() === "") {
      alert("We can't deliver to you without all the information!");
      return false;
    }
    for (var i = 0; i < 3; i++) {
      if ($("#" + i).val() === "") {
        alert("We can't deliver to you without all the information!");
        return false;
      }
      user.address += ($("#" + i).val() + " ");
    }
    user.name = $("#name").val();
    $("span#name").text(user.name);
    $("span#address").text(user.address);
    togglePage("sec5", "sec6");
  }); //order form

  $("#again").click(function() {
    resetFields();
    togglePage("sec6", "sec1");
  }); //again click
}); //jQuery
