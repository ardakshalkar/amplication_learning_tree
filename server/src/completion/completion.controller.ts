import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CompletionService } from "./completion.service";
import { CompletionControllerBase } from "./base/completion.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("completions")
@common.Controller("completions")
export class CompletionController extends CompletionControllerBase {
  constructor(
    protected readonly service: CompletionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
