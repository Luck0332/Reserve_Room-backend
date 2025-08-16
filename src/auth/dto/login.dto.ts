import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInAdminDto {
	@ApiProperty({
		required: true,
		type: String,
		default: 'superAdmin',
	})
	@IsNotEmpty({ message: 'Username is required.' })
	username: string;

	@ApiProperty({ required: true, type: String, default: 'secret' })
	@IsString({ message: 'Password must be a string.' })
	@IsNotEmpty({ message: 'Password is required.' })
	password: string;
}
