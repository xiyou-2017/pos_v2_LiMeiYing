'use strict';

describe('pos', () => {
  let inputs;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

});


describe('unit test count', ()=> {
    describe('buildItems', ()=> {
      let inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ];
      it('should return correct items', ()=> {
        const countedItems = [

          {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },

          {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },

          {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.5
            },
            count: 3
          }
        ];
        expect(countQuantity(inputs)).toEqual(countedItems);
      });
    });
  }
);

describe("unit test sumPrice", function () {
  let inputs;
  beforeEach(function () {
    inputs = [

      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3
      }
    ];

  });

  it("should return sumPrice", ()=> {
    const sumed = [

      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,
        },

        count: 5,
        sum: 12,
        save: 3
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2,
        sum: 30,
        save: 0
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3,
        sum: 9,
        save: 4.5
      }
    ];
    expect(sumPrice(inputs)).toEqual(sumed);

  });
});


xdescribe("unit test sumTotal", ()=> {
  let inputs;
  beforeEach(function () {
    inputs = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,
        },

        count: 5,
        sum: 12,
        save: 3
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2,
        sum: 30,
        save: 0
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3,
        sum: 9,
        save: 4.5
      }
    ];
  });

  it("should return sumTotal", ()=> {
    const sumtotal = [

      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00,
        },

        count: 5,
        sum: 12,
        save: 3
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2,
        sum: 30,
        save: 0
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.5
        },
        count: 3,
        sum: 9,
        save: 4.5
      },
      51,
      7.5

    ];
    expect(sumTotal(inputs)).toEqual(sumtotal);

  });

});



