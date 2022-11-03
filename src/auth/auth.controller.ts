import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    signup(@Body() signupDto: SignUpDto) {
        return this.authService.signup(signupDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() signinDto: SignInDto) {
        return this.authService.signin(signinDto);
    }
}
