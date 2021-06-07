import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompetenceWhereUniqueInput } from "../../competence/base/CompetenceWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class CompletionCreateInput {
  @ApiProperty({
    required: false,
    type: () => CompetenceWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompetenceWhereUniqueInput)
  @IsOptional()
  @Field(() => CompetenceWhereUniqueInput, {
    nullable: true,
  })
  itemId?: CompetenceWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
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
