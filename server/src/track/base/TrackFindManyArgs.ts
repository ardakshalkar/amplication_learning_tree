import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TrackWhereInput } from "./TrackWhereInput";
import { Type } from "class-transformer";
import { TrackOrderByInput } from "./TrackOrderByInput";

@ArgsType()
class TrackFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TrackWhereInput,
  })
  @Field(() => TrackWhereInput, { nullable: true })
  @Type(() => TrackWhereInput)
  where?: TrackWhereInput;

  @ApiProperty({
    required: false,
    type: TrackOrderByInput,
  })
  @Field(() => TrackOrderByInput, { nullable: true })
  @Type(() => TrackOrderByInput)
  orderBy?: TrackOrderByInput;

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

export { TrackFindManyArgs };
