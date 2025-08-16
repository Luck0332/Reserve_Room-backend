import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const publicSwaggerPath = 'api-doc';

export const setupSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Sbpolice Document')
		.setDescription('API for intergration with Sbpolice manage permission website')
		.setVersion('1.0')
		.addTag('DOCUMENTS')
		.addBearerAuth()
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(publicSwaggerPath, app, documentFactory, {
		swaggerOptions: {
			persistAuthorization: true,
			docExpansion: 'none',
		},
	});
};
