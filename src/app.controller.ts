import { Controller, Headers, Get, Body, Req, Res, Redirect } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Request, Response } from 'express';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  async getIfcExport( @Body() req: any ) { 
    
    return ''
  } 
}

