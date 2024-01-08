import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
@ApiTags('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiResponse({status: 200, type: String})
  @ApiBadRequestResponse({description: "Bad Request"})
  getHello(): string {
    return this.appService.getHello();
  }
}
