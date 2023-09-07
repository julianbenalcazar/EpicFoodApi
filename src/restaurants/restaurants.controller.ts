import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Auth } from '@app/auth/decorators/auth.decorator';
import { Role } from '@app/common/enums/role.enum';
import { ActiveUser } from '@app/common/decorators/active-user.decorator';
import { IUserActive } from '@app/common/interface/user-active.interface';

@Auth(Role.USER)
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Auth(Role.USER)
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto, @ActiveUser() user: IUserActive) {
    // Obtencion del usuario logueado.
    return this.restaurantsService.create(createRestaurantDto, user);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.restaurantsService.remove(+id);
  }
}
