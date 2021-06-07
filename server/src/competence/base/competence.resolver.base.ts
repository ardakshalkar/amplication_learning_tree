import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateCompetenceArgs } from "./CreateCompetenceArgs";
import { UpdateCompetenceArgs } from "./UpdateCompetenceArgs";
import { DeleteCompetenceArgs } from "./DeleteCompetenceArgs";
import { CompetenceFindManyArgs } from "./CompetenceFindManyArgs";
import { CompetenceFindUniqueArgs } from "./CompetenceFindUniqueArgs";
import { Competence } from "./Competence";
import { CompletionFindManyArgs } from "../../completion/base/CompletionFindManyArgs";
import { Completion } from "../../completion/base/Completion";
import { TrackFindManyArgs } from "../../track/base/TrackFindManyArgs";
import { Track } from "../../track/base/Track";
import { CompetenceService } from "../competence.service";

@graphql.Resolver(() => Competence)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompetenceResolverBase {
  constructor(
    protected readonly service: CompetenceService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async _competencesMeta(
    @graphql.Args() args: CompetenceFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Competence])
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async competences(
    @graphql.Args() args: CompetenceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Competence",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Competence, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "own",
  })
  async competence(
    @graphql.Args() args: CompetenceFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Competence",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Competence)
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "create",
    possession: "any",
  })
  async createCompetence(
    @graphql.Args() args: CreateCompetenceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Competence",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Competence"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Competence)
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "update",
    possession: "any",
  })
  async updateCompetence(
    @graphql.Args() args: UpdateCompetenceArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Competence",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Competence"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Competence)
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "delete",
    possession: "any",
  })
  async deleteCompetence(
    @graphql.Args() args: DeleteCompetenceArgs
  ): Promise<Competence | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Completion])
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async completions(
    @graphql.Parent() parent: Competence,
    @graphql.Args() args: CompletionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Completion[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Completion",
    });
    const results = await this.service.findCompletions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Competence])
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async items(
    @graphql.Parent() parent: Competence,
    @graphql.Args() args: CompetenceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Competence",
    });
    const results = await this.service.findItems(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Competence])
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async prerequisites(
    @graphql.Parent() parent: Competence,
    @graphql.Args() args: CompetenceFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Competence",
    });
    const results = await this.service.findPrerequisites(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Track])
  @nestAccessControl.UseRoles({
    resource: "Competence",
    action: "read",
    possession: "any",
  })
  async tracks(
    @graphql.Parent() parent: Competence,
    @graphql.Args() args: TrackFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Track[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Track",
    });
    const results = await this.service.findTracks(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
