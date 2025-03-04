import { HttpResponse } from 'src/domain/http/http-response';
import { makeUserControllerFactory } from 'src/main/factories/user-controller-factory';
import { HttpRequestHandler } from 'src/utils/handlers/http/http-request-handler';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NestUserDto } from '../dtos/user.dto';
import { ResponseInterceptor } from '../interceptors/response-interceptor';
const user = makeUserControllerFactory();

@ApiTags('user')
@Controller('user')
export class UserController {
  @ApiOperation({
    summary: 'Create a user.',
  })
  @Post('create-user')
  @UseInterceptors(ResponseInterceptor)
  async create(@Body() body: NestUserDto) {
    const http = new HttpRequestHandler({ body });
    return await user.create(http.request());
  }

  @ApiOperation({
    summary: 'Get all users.',
  })
  @Get('get-all-users')
  @UseInterceptors(ResponseInterceptor)
  async getAll(): Promise<HttpResponse> {
    return await user.getAll();
  }

  @ApiOperation({
    summary: 'Get a user by ID.',
  })
  @Get('get-user-by-id/:id')
  @UseInterceptors(ResponseInterceptor)
  async getOneById(@Param('id') id: string): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id } });
    return await user.getOneById(http.request());
  }

  @ApiOperation({
    summary: 'Get a user by email.',
  })
  @Get('get-user-by-email')
  @UseInterceptors(ResponseInterceptor)
  async getOneByEmail(@Body() body: any): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ body });
    return await user.getOneByEmail(http.request());
  }

  @ApiOperation({
    summary: 'Delete a user.',
  })
  @Delete('delete-user/:id')
  @UseInterceptors(ResponseInterceptor)
  async delete(@Param('id') id: string): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id } });
    return await user.delete(http.request());
  }

  @ApiOperation({
    summary: 'Update a user.',
  })
  @Patch('update-user/:id')
  @UseInterceptors(ResponseInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: NestUserDto,
  ): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ params: { id }, body });
    return await user.update(http.request());
  }
}
