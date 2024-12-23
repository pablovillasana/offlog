import * as bcrypt from "bcryptjs";

/**
 * Salts and hashes a password
 * @param password - The password to hash
 * @returns {string} The hashed password
 */
export function saltAndHashPassword(password: string): string {
  // Use AUTH_SECRET from env as pepper (additional server-side protection)
  const pepper = process.env.AUTH_SECRET ?? "default-pepper";

  // Add pepper to password and hash with bcrypt (cost factor 12)
  return bcrypt.hashSync(password + pepper, 12);
}

/**
 * Compares a password with a hashed password
 * @param password - The password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns {boolean} True if the passwords match, false otherwise
 */
export function comparePasswords(
  password: string,
  hashedPassword: string,
): boolean {
  try {
    // Use AUTH_SECRET from env as pepper (same as in saltAndHashPassword)
    const pepper = process.env.AUTH_SECRET ?? "default-pepper";

    // Compare the password+pepper with the stored hash
    return bcrypt.compareSync(password + pepper, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords", { cause: error });
  }
}
