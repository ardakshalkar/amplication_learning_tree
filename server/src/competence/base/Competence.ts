import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Completion } from "../../completion/base/Completion";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Track } from "../../track/base/Track";
@ObjectType()
class Competence {
  @ApiProperty({
    required: false,
    type: () => [Completion],
  })
  @ValidateNested()
  @Type(() => Completion)
  @IsOptional()
  completions?: Array<Completion>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [Competence],
  })
  @ValidateNested()
  @Type(() => Competence)
  @IsOptional()
  items?: Array<Competence>;

  @ApiProperty({
    required: false,
    type: () => [Competence],
  })
  @ValidateNested()
  @Type(() => Competence)
  @IsOptional()
  prerequisites?: Array<Competence>;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;

  @ApiProperty({
    required: false,
    type: () => [Track],
  })
  @ValidateNested()
  @Type(() => Track)
  @IsOptional()
  tracks?: Array<Track>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Competence };
