import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    bdate?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    bdate_visibility?: number;

    @IsOptional()
    @ApiPropertyOptional()
    country?: {
        id: number;
        title: string;
    };

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    timezone?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    photo_200?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    photo_max_orig?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    sex?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    photo_100?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    photo_base?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    can_access_closed?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    is_closed?: boolean;
}
