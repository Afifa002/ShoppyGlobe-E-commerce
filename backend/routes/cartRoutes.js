// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Ensure you have this model

// POST /api/cart - Add a product to the cart
router.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate input data
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: 'User ID, Product ID, and quantity are required' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(p => p.productId.toString() === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/cart/:id - Update the quantity of a product in the cart
router.put('/cart/:id', async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Valid quantity is required' });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { 'products._id': req.params.id },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart item not found' });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/cart/:id - Remove a product from the cart
router.delete('/cart/:id', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.body.userId },
      { $pull: { products: { _id: req.params.id } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
