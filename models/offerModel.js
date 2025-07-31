// models/offerModel.js
import mongoose from 'mongoose';


const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bodyText: {
      type: String,
    },
    discountType: {
      type: String,
      enum: ['percent', 'flat', 'buyOneGetOne'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discountWorth: {
      type: Number,
    },
    minPurchase: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String, // Cloudinary or direct URL
      required: true,
    },
    startsAt: {
      type: Date,
      default: Date.now,
    },
    endsAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index to auto-delete
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
