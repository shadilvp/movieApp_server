import Cart from "../../models/cartModel.js";
import { Product } from "../../models/productModel.js";

export const addTOCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productTotalPrice = product.price * quantity;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity, totalPrice: productTotalPrice }],
        totalAmount: productTotalPrice,
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * product.price;
      } else {
        cart.items.push({ productId, quantity, totalPrice: productTotalPrice });
      }

      // Recalculate total cart amount
      cart.totalAmount = cart.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    item.totalPrice = quantity * product.price;

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Clear Entire Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
