const c = require('./customers');
const p = require('./products');
const o = require('./orders');

c.addCustomer();
c.customersList();

p.addProduct();
p.productsList();

o.addOrder();
o.ordersList();