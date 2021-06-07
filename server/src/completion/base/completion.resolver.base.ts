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
import { CreateCompletionArgs } from "./CreateCompletionArgs";
import { UpdateCompletionArgs } from "./UpdateCompletionArgs";
import { DeleteCompletionArgs } from "./DeleteCompletionArgs";
import { CompletionFindManyArgs } from "./CompletionFindManyArgs";
import { CompletionFindUniqueArgs } from "./CompletionFindUniqueArgs";
import { Completion } from "./Completion";
import { Competence } from "../../competence/base/Competence";
import { User } from "../../user/base/User";
import { CompletionService } from "../completion.service";

@graphql.Resolver(() => Completion)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompletionResolverBase {
  constructor(
    protected readonly service: CompletionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "read",
    possession: "any",
  })
  async _completionsMeta(
    @graphql.Args() args: CompletionFindManyArgs
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

  @graphql.Query(() => [Completion])
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "read",
    possession: "any",
  })
  async completions(
    @graphql.Args() args: CompletionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Completion[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Completion",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Completion, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "read",
    possession: "own",
  })
  async completion(
    @graphql.Args() args: CompletionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Completion | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Completion",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Completion)
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "create",
    possession: "any",
  })
  async createCompletion(
    @graphql.Args() args: CreateCompletionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Completion> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Completion",
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
        `providing the properties: ${properties} on ${"Completion"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        itemId: args.data.itemId
          ? {
              connect: args.data.itemId,
            }
          : undefined,

        userId: args.data.userId
          ? {
              connect: args.data.userId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Completion)
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "update",
    possession: "any",
  })
  async updateCompletion(
    @graphql.Args() args: UpdateCompletionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Completion | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Completion",
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
        `providing the properties: ${properties} on ${"Completion"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          itemId: args.data.itemId
            ? {
                connect: args.data.itemId,
              }
            : undefined,

          userId: args.data.userId
            ? {
                connect: args.data.userId,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => Completion)
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "delete",
    possession: "any",
  })
  async deleteCompletion(
    @graphql.Args() args: DeleteCompletionArgs
  ): Promise<Completion | null> {
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

  @graphql.ResolveField(() => Competence, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "read",
    possession: "any",
  })
  async itemId(
    @graphql.Parent() parent: Completion,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Competence",
    });
    const result = await this.service.getItemId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Completion",
    action: "read",
    possession: "any",
  })
  async userId(
    @graphql.Parent() parent: Completion,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUserId(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
