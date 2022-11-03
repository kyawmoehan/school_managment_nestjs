import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private jwtService: JwtService,
        private config: ConfigService
    ) { }

    async signup(signupDto: SignUpDto) {
        const { roleId, ...userDetail } = signupDto;

        try {
            const role = await this.roleRepository.findOneBy({ id: roleId });
            if (!role) throw new HttpException('Role not found!', HttpStatus.BAD_REQUEST);

            const hash = await argon.hash(signupDto.password);
            userDetail.password = hash;
            const newUser = this.userRepository.create({ ...userDetail, role });

            const getUser = await this.userRepository.save(newUser);
            return this.signToken(getUser.id, getUser.email);
        } catch (error) {
            throw new HttpException('User create error!', HttpStatus.BAD_REQUEST)
        }
    }

    async signin(signinDto: SignInDto): Promise<{ access_token: string }> {
        // find the user by emial 
        const user = await this.userRepository.findOneBy({ email: signinDto.email });
        if (!user) throw new ForbiddenException('Credentials incorrect!');
        // compare password
        const pwMatch = await argon.verify(user.password, signinDto.password);
        if (!pwMatch) throw new ForbiddenException('Credentials incorrect!');
        // send back user
        delete user.password;
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email: email
        }

        const secretKey = this.config.get('JWT_SECRET');
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
            secret: secretKey
        })

        return {
            access_token: token,
        }
    }
}
