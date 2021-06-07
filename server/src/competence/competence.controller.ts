import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CompetenceService } from "./competence.service";
import { CompetenceControllerBase } from "./base/competence.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("competences")
@common.Controller("competences")
export class CompetenceController extends CompetenceControllerBase {
  constructor(
    protected readonly service: CompetenceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
