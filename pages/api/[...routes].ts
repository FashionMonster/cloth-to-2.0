import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppModule } from '../../domains/usecases/app.module';

export const config = {
  api: { bodyParser: false },
};

let inMemoryHandler: Express | null = null;

const handler = async (req: NextApiRequest, resp: NextApiResponse) => {
  if (inMemoryHandler !== null) {
    await inMemoryHandler(req, resp);

    return new Promise((resolve) => {
      resp.on('finish', resolve);
    });
  }

  const requestHandler = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(requestHandler), {
    logger: ['error', 'warn'],
  });

  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api');

  // CORSを有効にする
  // https://docs.nestjs.com/security/cors
  app.enableCors();

  // https://www.npmjs.com/package/helmet
  app.use(helmet());

  // https://docs.nestjs.com/techniques/cookies#use-with-express-default
  app.use(cookieParser());

  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  //app.use(Handlers.errorHandler());

  await app.init();

  if (inMemoryHandler === null) {
    inMemoryHandler = requestHandler;
  }

  await requestHandler(req, resp);

  return new Promise((resolve) => {
    resp.on('finish', resolve);
  });
};

export default handler;
