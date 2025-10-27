import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';
import { AuthMiddleware } from './app/auth/auth.midleware';
import { AiModule } from './app/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // konfigurasi is global untuk semua module
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { typeOrmConfig } = await import('./config/typeorm.config');
        return typeOrmConfig;
      },
    }),
    TodoModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // terapkan untuk semua route api/* (atau ganti sesuai kebutuhan)
  }
}
