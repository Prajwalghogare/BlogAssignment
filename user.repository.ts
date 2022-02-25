import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO, SigninCredentialsDTO } from './dto/auth.credentials.dto';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    // create a row for User table
    const  user = await new UserEntity();
    user.FirstName = authCredentialsDTO.FirstName;
    user.LastName = authCredentialsDTO.LastName;
    user.email = authCredentialsDTO.email;

    // encrypt the password
    user.password = `${crypto.MD5(authCredentialsDTO.password)}`;

    // commit the row
    await user.save();
  }

  async signin(signinCredentialsDto:SigninCredentialsDTO) {
    const { email, password } = signinCredentialsDto;

    // find the email by email name
    const user = await this.findOne({email});
    console.log(user);

    if (!user) {
      return null;
    }

    // check if user passwoed exist
    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
