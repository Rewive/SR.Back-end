import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    // CORS setup
    app.enableCors({
        origin: 'https://user548334196-t2xoaz4h.wormhole.vk-apps.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Swagger setup
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

    // Run application
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Application is running in MODE: ${process.env.NODE_ENV} on Port: ${PORT}`);
    });
}

bootstrap();
