const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema ({
  title: {
      type: String,
      required: [true, "title is required"],
      minlength: 3
  },
  description: {
      type: String,
      required: [true, "description is required"],
      maxlength: 200
  },
  price: {
      type: Number,
      required: [true, "price is required"],
      min: 1
  },
  location: {
      type: String,
      required: [true, "location is required"],
      minlength: 5
  },
  image: {
      type: String
  },
  ownerId: {
    type: String,
    required:[true, 'ownerId is required']
  }
  }, {timestamps: true })

bikeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = mongoose.model('Bike', bikeSchema);

