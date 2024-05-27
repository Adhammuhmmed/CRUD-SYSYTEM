var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productcategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var productList = [];
var searchInput = document.getElementById("search");
var index = 0;

if (localStorage.getItem("productContinar") !== null) {
  productList = JSON.parse(localStorage.getItem("productContinar"));
  showData();
}

function addProduct() {
  if (validName() == true && validPrice() == true && validCategory() == true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productcategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]?.name
        ? `images/${productImageInput.files[0]?.name}`
        : `images/unknown.png`,
    };
    productList.push(product);
    localStorage.setItem("productContinar", JSON.stringify(productList));
    showData();
    clear();
  }
}

function clear() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productcategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productcategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
}

function showData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `  <tr>
    <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td><img src="${productList[i].image}" width="80px" alt=""></td>
    <td>
      <button onclick="setFormData(${i})" type="button" class="btn btn-outline-warning btn-sm">Update</button>
      <button onclick="deleteItem(${i})" type="button" class="btn btn-outline-danger btn-sm">Delete</button>
    </td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteItem(indexItem) {
  productList.splice(indexItem, 1);
  showData();
  localStorage.setItem("productContinar", JSON.stringify(productList));
}

// Search

function searchItem() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `  <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].description}</td>
      <td><img src="images/team-06.png " width="50px" alt=""></td>
      <td>
      <button  onclick="setFormData(${i})" type="button" class="btn btn-outline-warning btn-sm">Update</button>
        <button onclick="deleteItem(${i})" type="button" class="btn btn-outline-danger btn-sm">Delete</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

// Update

function setFormData(indexItem) {
  productNameInput.value = productList[indexItem].name;
  productPriceInput.value = productList[indexItem].price;
  productcategoryInput.value = productList[indexItem].category;
  productDescriptionInput.value = productList[indexItem].description;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  index = indexItem;
}

function ubdateInfo() {
  if (validName() == true && validPrice() == true && validCategory() == true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productcategoryInput.value,
      description: productDescriptionInput.value,
      image: productImageInput.files[0]?.name
        ? `images/${productImageInput.files[0]?.name}`
        : `images/unknown.png`,
    };
    productList.splice(index, 1, product);
    showData();
    clear();
    localStorage.setItem("productContinar", JSON.stringify(productList));
    btnUpdate.classList.add("d-none");
    btnAdd.classList.remove("d-none");
  }
}

// Validtion Name

function validName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  var text = productNameInput.value;
  var msgName = document.getElementById("msgName");
  if (regex.test(text) == true) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}

// Validtion Price

function validPrice() {
  var regex = /^\d(\d{1,4})?$/;
  var text = productPriceInput.value;
  var msgPrice = document.getElementById("msgPrice");
  if (regex.test(text) == true) {
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
    msgPrice.classList.add("d-none");
    return true;
  } else {
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
    msgPrice.classList.remove("d-none");
    return false;
  }
}

// Valid Category

function validCategory() {
  var regex = /^Mobile|Tv|Electronic|Screens|Labtop$/i;
  var text = productcategoryInput.value;
  var msgCategory = document.getElementById("msgCategory");
  if (regex.test(text) == true) {
    productcategoryInput.classList.add("is-valid");
    productcategoryInput.classList.remove("is-invalid");
    msgCategory.classList.add("d-none");
    return true;
  } else {
    productcategoryInput.classList.add("is-invalid");
    productcategoryInput.classList.remove("is-valid");
    msgCategory.classList.remove("d-none");
    return false;
  }
}
