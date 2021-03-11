import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { UserRegistrationInput } from '../types/inputs/registration.input';
import { LoginResponse } from '../types/responses/login.response';
import { LoginInput } from '../types/inputs/login.input';
import { UserRegistrationResponse } from '../responses/registration.response';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserRegistrationResponse)
  async signup(
    @Args({
      name: 'userRegistrationInput',
      type: () => UserRegistrationInput,
      nullable: false,
    })
    input: UserRegistrationInput,
  ): Promise<UserRegistrationResponse> {
    return this.authService.createUser(input);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args({
      name: 'loginInput',
      type: () => LoginInput,
      nullable: false,
    })
    loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }
}
