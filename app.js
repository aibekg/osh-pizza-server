const express = require('express');
const AddProductRouter = require('./routes/add_product');
const AdditiveRouter = require('./routes/additive');
const RemoveProductRouter  = require('./routes/remove_product');
const UpdateProductRouter = require('./routes/udate_product')
const GetProductsRouter = require('./routes/get_products');
const AuthRouter = require('./routes/auth');
const StockRouter = require('./routes/stock');
const IncomeRouter = require('./routes/income');

const path = require('path')
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json({extended: true}));
app.use(require('cors')());

app.use('/add_product', AddProductRouter);
app.use('/additive', AdditiveRouter);
app.use('/get_products', GetProductsRouter);
app.use('/remove', RemoveProductRouter);
app.use('/update', UpdateProductRouter);
app.use('/auth', AuthRouter);
app.use('/stock', StockRouter);
app.use('/income', IncomeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server worked PORT: ${PORT} !!`));
