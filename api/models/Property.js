import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true }, // in sqft or sqm
  type: { type: String, default: 'House' }, // e.g. House, Villa, Apartment, Estate
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  imageUrl: { type: String },
  floorPlanUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
