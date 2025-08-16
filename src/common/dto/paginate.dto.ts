import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, Max } from 'class-validator';

export class PaginateDto {
  @ApiProperty({
    description: 'The maximum number of items to return',
    type: Number,
    default: 5,
    maximum: 1000000,
    example: 5,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Max(1000000, { message: 'limit cannot exceed 1000000' })
  limit = 5;

  @ApiProperty({
    description: 'The page number to return',
    type: Number,
    default: 1,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page = 1;

  @ApiHideProperty()
  @IsOptional()
  ownerId?: string;
}
