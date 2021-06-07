import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompetenceWhereInput } from "./CompetenceWhereInput";
import { Type } from "class-transformer";
import { CompetenceOrderByInput } from "./CompetenceOrderByInput";

@ArgsType()
class CompetenceFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CompetenceWhereInput,
  })
  @Field(() => CompetenceWhereInput, { nullable: true })
  @Type(() => CompetenceWhereInput)
  where?: CompetenceWhereInput;

  @ApiProperty({
    required: false,
    type: CompetenceOrderByInput,
  })
  @Field(() => CompetenceOrderByInput, { nullable: true })
  @Type(() => CompetenceOrderByInput)
  orderBy?: CompetenceOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { CompetenceFindManyArgs };
