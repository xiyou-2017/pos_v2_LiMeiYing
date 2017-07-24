'use strict';
let printReceipt = (inputs)=> {
  let counted = countQuantity(inputs);
  let sum = sumPrice(counted);
  sumTotal(sum);
}

let countQuantity = (inputs)=> {
  let allitems = Item.all();
  let cartItems = [];
  for (let input of inputs) {
    let splited = input.split('-');
    let barcoad = splited[0];
    let count = parseFloat(splited[1] || 1);
    let cartItem = cartItems.find((cartitem)=>cartitem.item.barcode == barcoad);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
      let item = allitems.find((item)=>item.barcode == barcoad);
      cartItems.push({item, count: count});
    }
  }
  return cartItems;
}

let sumPrice = (carItems)=> {
  let discount = Promotion.all();
  for (let carItem of carItems) {

    carItem.sum = 0;
    carItem.save = 0;
    carItem.sum = carItem.count * carItem.item.price;
    let promotion = discount.find((promotion)=>promotion.barcodes.includes(carItem.item.barcode));
    if (promotion && carItem.count >= 3) {

      carItem.save = Math.floor(carItem.count / 3) * carItem.item.price;

    }
    carItem.sum = carItem.sum - carItem.save;
  }

  return carItems;
}

let getDate=()=>{
  let dateDigitToString = num => num < 10 ? `0${num}` : num;
  let myDate = new Date(),
    year = dateDigitToString(myDate.getFullYear()),
    month = dateDigitToString(myDate.getMonth() + 1),
    date = dateDigitToString(myDate.getDate()),
    hour = dateDigitToString(myDate.getHours()),
    minute = dateDigitToString(myDate.getMinutes()),
    second = dateDigitToString(myDate.getSeconds());
  let formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
  return formattedDateString;
}

let sumTotal = (arr)=> {
  var totalPrice = 0, totalSave = 0;
  let str =" ***<没钱赚商店>收据***\n" + "打印时间：";

  str += getDate() + "\n"+"----------------------\n";

  for (let carItem of  arr) {
    totalPrice += carItem.sum;
    totalSave += carItem.save;
    str += "名称：" + carItem.item.name + "，数量：" + carItem.count + carItem.item.unit + "，单价：" + carItem.item.price.toFixed(2) + "(元)" + "，小计：" + carItem.sum.toFixed(2) + "(元)\n";

  }
  str += "----------------------\n" + "总计：" + totalPrice.toFixed(2) + "(元)\n" + "节省：" + totalSave.toFixed(2) + "(元)\n" + "**********************";
  console.log(str);
}
