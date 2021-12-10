import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'email should be email',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({})
  password: string;

}
