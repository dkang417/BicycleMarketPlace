const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
      minlength: 3
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8
    },
    confirmpassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      minlength: 8
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(next);
});

userSchema.statics.validatePassword = function(
  candidatePassword,
  hashedPassword
) {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = mongoose.model('User', userSchema);


