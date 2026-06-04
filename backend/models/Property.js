import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true }, // in sqft or sqm
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
