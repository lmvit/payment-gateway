const app = require('express')()

const path = require('path')

const cors = require('cors')

const shortid = require('shortid')

const Razorpay = require('razorpay')


const razorpay = new Razorpay ({
    key_id:"rzp_test_xID3T9IiM3PKUb",
    key_secret:"Dy4g9sx7Nry469PFPUWwGrDJ",
});

const corsOptions = {
    origin: 'http://localhost:3000s',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

app.use(cors())

app.get('https://tse3.mm.bing.net/th?id=OIP.pXdo5ZkVJP97NYENqKbWcQHaBy&pid=Api&P=0&w=631&h=152', (req, res) => {
    res.sendFile(path.join(__dirname, "https://tse3.mm.bing.net/th?id=OIP.pXdo5ZkVJP97NYENqKbWcQHaBy&pid=Api&P=0&w=631&h=152"))
})

app.post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = 2000;
    const currency = "INR";
  
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  });
  
 app.listen(5000, () => {
     console.log('App is listening on port')
 })