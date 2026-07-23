import { hash, verify } from "@node-rs/argon2";

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 2,
  });
};

export const verifyPasswordHash = async (
  passwordHash: string,
  password: string,
) => {
  return await verify(passwordHash, password);
};
