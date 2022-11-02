/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { join } from 'path';

@Controller('email')
export class EmailController {
  constructor(private mailService: MailerService) {}

  @Get('plain-text-email')
  async plainTextEmail() {
    const response = await this.mailService.sendMail({
      to: 'shiva@electems.com',
      from: 'druthvik@electems.com',
      subject: 'Plain Text Email ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
    });
    return response;
  }
}
