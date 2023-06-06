const initialOptions = {
  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: 'BRL',
  components: 'buttons',
  intent: 'subscription',
  vault: true,
};

export default initialOptions;
