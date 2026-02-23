import bcrypt from "bcrypt";

export const hashedPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, 8);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
