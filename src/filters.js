import Vue from "vue"

// 123456789 => $1,234,567.89
Vue.filter("formatPrice", (price) => {
  if (!parseInt(price)) return "";
  
  if (price > 99999) {
    const priceString = (price / 100).toFixed(2);
    const priceFormat =  priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return "$" + priceFormat;
  }
  
  return "$" + (price / 100).toFixed(2);
});

// 1234567.89 => $1,234,567.89
Vue.filter("currencyPrice", (price) => {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD" }).format(price);
})