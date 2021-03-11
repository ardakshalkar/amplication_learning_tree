import { Module } from "@nestjs/common";
import { TrackModuleBase } from "./base/track.module.base";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { TrackResolver } from "./track.resolver";

@Module({
  imports: [TrackModuleBase],
  controllers: [TrackController],
  providers: [TrackService, TrackResolver],
  exports: [TrackService],
})
export class TrackModule {}
