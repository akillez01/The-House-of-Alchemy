const express = require('express');
const stripe = require('stripe')('SUA_CHAVE_SECRETA_DO_STRIPE');

const app = express();
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: {
          name: 'Doação para o projeto',
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/sucesso.html',
    cancel_url: 'http://localhost:3000/cancelado.html',
  });

  res.json({ id: session.id });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));