import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { Role } from '@app/common/enums/role.enum';

@Auth(Role.USER)
@Controller('details')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Post()
  create(@Body() createDetailDto: CreateDetailDto) {
    return this.detailService.create(createDetailDto);
  }

  @Get()
  findAll() {
    return this.detailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detailService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetailDto: UpdateDetailDto) {
    return this.detailService.update(id, updateDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detailService.remove(id);
  }
}
