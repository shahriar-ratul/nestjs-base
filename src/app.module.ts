import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { APP_FILTER, APP_INTERCEPTOR, Reflector, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { ErrorFilter } from './common/filter/error.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminsModule } from './modules/admins/admins.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    MulterModule.register({
      dest: './public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: [
        '/api/(.*)',
        '/docs'
      ],
      serveRoot: '/public',
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'redis',
    //   port: 6379,
    // }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: { host: "localhost", port: 6379 },
    }),

    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forRoot(PostgreSqlDataSource),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 1000,
    }]),
    
    AuthModule,
    AdminsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    Reflector,
  ],
  exports: [
    ConfigModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
