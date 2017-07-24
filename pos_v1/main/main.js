'use strict'
let printReceipt = (inputs)=> {
  let count = countQuantity(inputs);
  let sum = sumPrice(count);
  sumTotal(sum);
}
let countQuantity = (inputs)=> {
  let arrItems = loadAllItems();
  let carItems = new Array();

  for (let input of inputs) {
    let splited = input.split("-");
    let barcode = splited[0];
    let count = parseFloat(splited[1] || 1);
    let carItem = carItems.find((carItem)=>carItem.item.barcode == barcode);
    if (carItem) {
      carItem.count += count;
    }
    else {
      let item = arrItems.find((item)=>item.barcode === barcode);
      carItems.push({item: item, count: count});
    }
  }
  return carItems;
}


let sumPrice = (carItems)=> {
  let discount = loadPromotions();
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

let sumTotal = (arr)=> {
  var totalPrice = 0, totalSave = 0;
  let str = "***<没钱赚商店>收据***\n";
  for (let carItem of  arr) {
    totalPrice += carItem.sum;
    totalSave += carItem.save;
    str += "名称：" + carItem.item.name + "，数量：" + carItem.count + carItem.item.unit + "，单价：" + carItem.item.price.toFixed(2) + "(元)" + "，小计：" + carItem.sum.toFixed(2) + "(元)\n";

  }
  str += "----------------------\n" + "总计：" + totalPrice.toFixed(2) + "(元)\n" + "节省：" + totalSave.toFixed(2) + "(元)\n" + "**********************";
  console.log(str);
}
