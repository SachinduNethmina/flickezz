import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassowrd = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
