import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CompetenceResolverBase } from "./base/competence.resolver.base";
import { Competence } from "./base/Competence";
import { CompetenceService } from "./competence.service";

@graphql.Resolver(() => Competence)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompetenceResolver extends CompetenceResolverBase {
  constructor(
    protected readonly service: CompetenceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
