const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { goalSchema } = require('./Goal');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password) => {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(password);
        },
        message:
          "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    goals: [goalSchema], // Embed goals array
  },
  {
    timestamps: true, // Enable createdAt and updatedAt timestamps
  }
);

// Hash password before storing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
