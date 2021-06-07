import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompletionWhereInput } from "./CompletionWhereInput";
import { Type } from "class-transformer";
import { CompletionOrderByInput } from "./CompletionOrderByInput";

@ArgsType()
class CompletionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CompletionWhereInput,
  })
  @Field(() => CompletionWhereInput, { nullable: true })
  @Type(() => CompletionWhereInput)
  where?: CompletionWhereInput;

  @ApiProperty({
    required: false,
    type: CompletionOrderByInput,
  })
  @Field(() => CompletionOrderByInput, { nullable: true })
  @Type(() => CompletionOrderByInput)
  orderBy?: CompletionOrderByInput;

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

export { CompletionFindManyArgs };
