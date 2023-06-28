import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch {
    console.log("error in hashing password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch {
        console.log("Server error while comparing password");
        return false;
    }
    }

