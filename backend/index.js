import express, { json } from 'express';
import cors from 'cors';
import { PORT } from './config.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/api/items', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    if (response.status !== 200) throw new Error('Error getting search results');

    const responseData = await response.json();

    const items = responseData.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        currency_id: item.currency_id,
        city: item.seller_address.city.name,
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
      }
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error getting search results' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    if (response.status !== 200) throw new Error('Error getting item details');
    const descrResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    if (descrResponse.status !== 200) throw new Error('Error getting item description');

    const responseData = await response.json();
    const descrResponseData = await descrResponse.json();

    const item = {
      id: responseData.id,
      title: responseData.title,
      price: responseData.price,
      currency_id: responseData.currency_id,
      picture: responseData.pictures[0].url || responseData.thumbnail,
      condition: responseData.condition,
      free_shipping: responseData.shipping.free_shipping,
      sold_quantity: responseData.initial_quantity,
      description: descrResponseData.plain_text
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error getting item details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})