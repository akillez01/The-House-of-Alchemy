const stripe = Stripe('SUA_CHAVE_PUBLICA_DO_STRIPE'); // Substitua pela sua chave pública

document.querySelectorAll('.amount-buttons button').forEach(button => {
  button.addEventListener('click', (e) => {
    if(e.target.id === 'custom-amount') {
      document.getElementById('custom-amount-container').style.display = 'block';
      return;
    }
    document.getElementById('custom-amount-container').style.display = 'none';
    selectedAmount = parseInt(e.target.dataset.amount);
  });
});

document.getElementById('submit-donation').addEventListener('click', async () => {
  const customAmount = document.getElementById('custom-amount-input').value;
  const amount = customAmount ? parseInt(customAmount) * 100 : selectedAmount;

  if(!amount || amount < 100) {
    alert('Valor mínimo de R$ 1,00');
    return;
  }

  try {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar o pagamento');
  }
});