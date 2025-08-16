import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorator/auth.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LogInAdminDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/decorator/current-user.decorators';
import type { CurrentUserPayload } from 'src/common/decorator/current-user.decorators';
import { Permission } from 'src/common/decorator/permission.decorator';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Login admin' })
	@Post('/login')
	async logInAdmin(@Body() logInAdminDto: LogInAdminDto) {
		const result = await this.authService.logInAdmin(logInAdminDto);
		return result;
	}

	@ApiOperation({ summary: 'My profile' })
	@Get('/profile')
	async myProfile(@CurrentUser() user: CurrentUserPayload,) {
		const result = user;
		return result;
	}

	@Permission(['supervisor:READ'])
	@ApiOperation({ summary: 'Test permission' })
	@Get('/test-permission')
	async testPermission(@CurrentUser() user: CurrentUserPayload,) {
		const result = user;
		return result;
	}
}
