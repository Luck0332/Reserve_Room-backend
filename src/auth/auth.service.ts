import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LogInAdminDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
	) { }

	async logInAdmin(logInAdmin: LogInAdminDto, isLoginWithSSo: boolean = false) {
		const admin = await this.prismaService.userT.findFirst({
			where: {
				username: logInAdmin.username,
			},
			include: {
				userRoles: {
					include: {
						role: {
							include: {
								rolePermissions: {
									include: {
										permission: true, // Include the permission details
									},
								},
							},
						},
					},
				},
			},
		});

		if (!admin) {
			throw new UnauthorizedException('ชื่อผู้ใช้งานไม่ถูกต้อง');
		}

		if (!admin.isActive) {
			throw new UnauthorizedException('บัญชีถูกระงับ');
		}

		if (!isLoginWithSSo) {
			const isPasswordValid = await bcrypt.compare(
				logInAdmin.password,
				admin.password,
			);

			if (!isPasswordValid) {
				throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');
			}
		}

		const _permissions = admin.userRoles.flatMap((userRole) =>
			userRole.role.rolePermissions.map((rolePermission) => {
				return {
					resource: rolePermission.permission.resource,
					action: rolePermission.permission.action,
				};
			}),
		);

		const uniquePermissions = [...new Set(_permissions)];
		const roles = admin.userRoles.map((ownRole) => {
			return ownRole.role.name;
		});
		const permissions = uniquePermissions;

		return {
			id: admin.id,
			name: admin.fname + ' ' + admin.lname,
			token: admin
				? await this.jwtService.signAsync({ id: admin.id })
				: undefined,
			roles,
			permissions,
		};
	}
}
