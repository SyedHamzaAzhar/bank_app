import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";


@Injectable()
export class UtilsService {

    async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

    async generateRandomString(): Promise<any> {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charLength = chars.length;
    var hash = "";
    for (var i = 0; i < 30; i++) {
      hash += chars.charAt(Math.floor(Math.random() * charLength));
    }
    const encryptedHash = await this.generateHash(hash);

    return { hash, encryptedHash };
  }

}
