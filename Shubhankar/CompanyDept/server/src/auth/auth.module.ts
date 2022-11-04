/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/user.module';
import { UsersService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService,AuthService, JwtStrategy,LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
