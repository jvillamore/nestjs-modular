import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  //Res,
  // ParseIntPipe,
} from '@nestjs/common';

//import { Response } from 'express';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dtos';

import { ProductsService } from './../services/products.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Método para obtener la lista de productos' })
  getProducts(@Query() params: FilterProductsDto) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll(params);
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Método para obtener la lista de productos con el nombre "Filter"',
  })
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @ApiOperation({
    summary: 'Método para obtener un producto filtrado por el campo IdProducto',
  })
  @ApiParam({
    name: 'productId',
    description: 'Identificador del producto',
    type: 'number',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }
  @Post()
  @ApiOperation({ summary: 'Método POST para crear un producto' })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ type: CreateProductDto })
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Método PUT para editar un producto' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  @ApiOperation({ summary: 'Adicionar una categoria a un producto' })
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Método DELETE para eliminar un producto por su identificador único',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  @ApiOperation({
    summary: 'Método para eliminar una categoría de un producto',
  })
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
