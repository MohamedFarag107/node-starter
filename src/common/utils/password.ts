import bcrypt from 'bcryptjs';
export class Password {
  static async toHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  static async compare(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }
}
