<template>
  <div class="container">
    <div class="row">
      <h2>Cart</h2>
      
      <div class="col-md-10 col-md-offset-1">
        
        <table class="table">
          <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr class="product">
            <th class="remove-wrap">
              <span class="remove-button">
                <span class="remove-sign">✕</span>
              </span>
            </th>
            <th>
              <div class="cart-wrapper-title">
                <img alt="image" src="/img/cat-eats-from-bowl.414e21a5.jpg" class="cart-image">
                <router-link
                    tag="span"
                    class="cart-title"
                    :to="{ name : 'Product', params: { id: '1001' }}"
                >
                  Cat Food, 25lb bag
<!--                    :to="{ name : 'Product', params: { id: product.id }}"-->
                    <!--                  {{ product.title }}-->
                </router-link>
              </div>
            </th>
            <td>$4.99</td>
            <td>
              <div class="quantity">
                <span class="quantity-arrow">❮</span>
                <span class="quantity-value">5</span>
                <span class="quantity-arrow">❯</span>
              </div>
            </td>
            <td>$50.00</td>
          </tr>

          <tr class="product">
            <th class="remove-wrap">
              <span class="remove-button">
                <span class="remove-sign">✕</span>
              </span>
            </th>
            <th>
              <div class="cart-wrapper-title">
                <img alt="image" src="/img/cavy.b0a874f5.jpg" class="cart-image">
                <router-link
                    tag="span"
                    class="cart-title"
                    :to="{ name : 'Product', params: { id: '1002' }}"
                >
                  Cavy                  <!--                    :to="{ name : 'Product', params: { id: product.id }}"-->
                  <!--                  {{ product.title }}-->
                </router-link>
              </div>
            </th>
            <td>$4.99</td>
            <td>
              <div class="quantity">
                <span class="quantity-arrow">❮</span>
                <span class="quantity-value">5</span>
                <span class="quantity-arrow">❯</span>
              </div>
            </td>
            <td>$50.00</td>
          </tr>
          <tr class="product">
            <td colspan="2">
            </td>
            <td>
              <router-link
                  class="btn btn-info"
                  tag="button"
                  to="/form"
              >
                Checkout
              </router-link>
            </td>
            <td>
              <span class="cart-total-title">Total:</span>
            </td>
            <td>
              <span class="cart-total">$5 556.99</span>
            </td>
          </tr>
          </tbody>
        </table>
      
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart"
  }
</script>

<style scoped>
  .product td {
    vertical-align: inherit;
  }
  .cart-wrapper-title {
  
  }
  .cart-image {
    width: 120px;
    height: auto;
    background-color: gray;
  }
  .cart-title {
    font-size: 18px;
    margin-left: 15px;
    cursor: pointer;
  }
  
  .remove-wrap {
    width: 30px;
    padding-top: 30px;
  }
  .remove-button {
    position: relative;
    padding: 5px;
    border-radius: 50%;
    background-color: #d1d1d1;
    cursor: pointer;
    transition: .25s ease-in;
  }
  .remove-button:hover {
    background-color: #c60000;
  }
  .remove-sign {
    position: relative;
    top: 3px;
    font-size: 20px;
    color: #fff;
  }
  
  .quantity {
    text-align: center;
  }
  .quantity-arrow {
    cursor: pointer;
  }
  .quantity-value {
    margin: 0 10px;
  }
  
  .cart-total-title {
    font-weight: bold;
    font-size: 20px;
  }
  .cart-total {
    font-weight: bold;
    font-size: 18px;
  }
</style>