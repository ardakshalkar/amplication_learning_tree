import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TrackService } from "./track.service";
import { TrackControllerBase } from "./base/track.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("tracks")
@common.Controller("tracks")
export class TrackController extends TrackControllerBase {
  constructor(
    protected readonly service: TrackService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
