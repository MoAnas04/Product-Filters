const searchInput = document.querySelector("#search-input");
const productList = document.querySelector("#product-list");
const ratingFilter = document.querySelector("#rating-filter");
const categoryFilter = document.querySelector("#category-filter");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    let filteredProducts = products;

    showProducts(filteredProducts);

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value;
      filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      showProducts(filteredProducts);
    });

    ratingFilter.addEventListener("input", (event) => {
      const ratingInput = event.target.value;
      filteredProducts = products.filter(
        (product) => product.rating.rate <= ratingInput
      );
      showProducts(filteredProducts);
    });

    categoryFilter.addEventListener("input", (event) => {
      const categoryInput = event.target.value;
      filteredProducts = products.filter(
        (product) => product.category === categoryInput.toLowerCase()
      );
      showProducts(filteredProducts);
    });
  });

const showProducts = (products) => {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.image;

    const productTitle = document.createElement("h3");
    productTitle.textContent = product.title;

    const productDescription = document.createElement("p");
    productDescription.innerHTML = `<span>Price:</span> $${product.price}<br><span>Rating:</span> ${product.rating.rate}/5`;

    productCard.appendChild(productImage);
    productCard.appendChild(productTitle);
    productCard.appendChild(productDescription);

    productList.appendChild(productCard);
  });
};
