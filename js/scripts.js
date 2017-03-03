// Back-End


//global var
var pizza;
var user;


function Customer(name, address, pizzaArray, totalCost) {
  this.name = name;
  this.address = address;
  this.pizzaArray = [];
  this.totalCost = 0;
}

Customer.prototype.addPizza = function(pizza) {
  pizza.pizzaCost = 10;
  $("#pizzaInfo").append("<ul>" + "<li>Pizza toppings: <span id='topping'></span></li>" + "<li>Pizza size: <span id='size'></span></li>" + "<li>Cost: $<span id='cost'></span></li>" + "</ul>");
}


function Pizza(toppingArray, size, pizzaCost) {
  this.toppingArray = [];
  this.size = size;
  this.pizzaCost = 10;
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

//jQuery
$(function() {

  $("button#main").click(function() {
    user = new Customer();
    pizza = new Pizza();
    $("#sec1").hide();
    $("#sec2").fadeIn();
  });

  $("form#topping").submit(function() {
    event.preventDefault();
    var toppingArray = [];
    $('#topping input:checked').each(function() {
      pizza.chooseTopping($(this).val());
    });
    $("#sec2").hide();
    $("#sec3").fadeIn();
  }); //topping form

  $("form#size").submit(function() {
    event.preventDefault();
    pizza.size = $("input:radio[name=optradio]:checked").val();
    (user.pizzaArray).push(pizza);
    user.totalCost += pizza.calculateCost();

    pizza.toppingArray.forEach(function(each) {
      $("span#topping").last().append(each + ", ");
    });
    $("span#size").last().append(pizza.size)
    $("span#cost").last().append(pizza.pizzaCost)
    $("span#total").text(user.totalCost)
    $("#sec3").hide();
    $("#sec4").fadeIn();
  }); //size form

  $("button#cost").click(function() {
    $("#sec4").hide();
    $("#sec5").fadeIn();
  });

  $("button#addPizza").click(function() {
    user.addPizza(pizza);
    pizza = new Pizza();
    $("input:radio[name=optradio]").prop('checked', false);
    $("input:checkbox[name=checkBox]").prop('checked', false);
    $("#sec4").hide();
    $("#sec2").fadeIn();
  });

  $("form#order").submit(function() {
    event.preventDefault();
    user.name = $("#name").val();
    user.address = "";
    for (var i = 0; i < 3; i++) {
      if ($("#" + i).val() === "") {
        alert("Please fill in all the required form");
        return false;
      }
      user.address += ($("#" + i).val() + " ");
    }
    if (user.name === "") {
      alert("Please fill in all the required form");
      return false;
    } else {
      $("span#name").text(user.name);
      $("span#address").text(user.address);
      $("#sec5").hide();
      $("#sec6").show();
    }
  }); //order form

  $("#again").click(function() {
    $("input:radio[name=optradio]").prop('checked', false);
    $("input:checkbox[name=checkBox]").prop('checked', false);
    $("#sec6").hide();
    $("#sec2").show();
  });

}); //jQuery
//jQuery
