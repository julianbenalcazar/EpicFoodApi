import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Req } from '@nestjs/common';
import { RequestWithUser } from '@app/auth/interface/request-with-user.interface';
import { Role } from '@app/common/enums/role.enum';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@app/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), // 4mb
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    // Primero, carga la imagen a Cloudinary y obtén la URL
    const uploadedImage = await this.cloudinaryService.uploadFile(file);

    // Asigna la URL de la imagen al DTO
    createUserDto.image = uploadedImage.secure_url;

    // Luego, crea el usuario con la URL de la imagen en la base de datos
    const createdUser = await this.usersService.create(createUserDto);

    return createdUser;
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll(@Req() req: RequestWithUser) {
    return this.usersService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Auth(Role.USER)
  @Get()
  findOneByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Auth(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
