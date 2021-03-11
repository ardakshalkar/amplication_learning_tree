import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ItemWhereUniqueInput } from "../../item/base/ItemWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class CompletionCreateInput {
  @ApiProperty({
    required: false,
    type: ItemWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ItemWhereUniqueInput)
  @IsOptional()
  @Field(() => ItemWhereUniqueInput, {
    nullable: true,
  })
  itemId?: ItemWhereUniqueInput | null;
  @ApiProperty({
    required: false,
    type: UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  userId?: UserWhereUniqueInput | null;
}
export { CompletionCreateInput };
