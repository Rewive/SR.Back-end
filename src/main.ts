import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    // Настройка CORS
    app.enableCors({
        origin: 'https://user548334196-ukoybf2g.wormhole.vk-apps.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Social Rating API')
        .setDescription('The Social Rating API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.use((req, res, next) => {
        res.removeHeader('connection');
        res.removeHeader('date');
        res.removeHeader('keep-alive');
        res.removeHeader('x-powered-by');
        next();
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.APP_PORT);
}
bootstrap();
