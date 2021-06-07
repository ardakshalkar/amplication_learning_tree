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
import { CreateTrackArgs } from "./CreateTrackArgs";
import { UpdateTrackArgs } from "./UpdateTrackArgs";
import { DeleteTrackArgs } from "./DeleteTrackArgs";
import { TrackFindManyArgs } from "./TrackFindManyArgs";
import { TrackFindUniqueArgs } from "./TrackFindUniqueArgs";
import { Track } from "./Track";
import { Competence } from "../../competence/base/Competence";
import { User } from "../../user/base/User";
import { TrackService } from "../track.service";

@graphql.Resolver(() => Track)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TrackResolverBase {
  constructor(
    protected readonly service: TrackService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "read",
    possession: "any",
  })
  async _tracksMeta(
    @graphql.Args() args: TrackFindManyArgs
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

  @graphql.Query(() => [Track])
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "read",
    possession: "any",
  })
  async tracks(
    @graphql.Args() args: TrackFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Track[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Track",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Track, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "read",
    possession: "own",
  })
  async track(
    @graphql.Args() args: TrackFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Track | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Track",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Track)
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "create",
    possession: "any",
  })
  async createTrack(
    @graphql.Args() args: CreateTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Track> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Track",
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
        `providing the properties: ${properties} on ${"Track"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        item: args.data.item
          ? {
              connect: args.data.item,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Track)
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "update",
    possession: "any",
  })
  async updateTrack(
    @graphql.Args() args: UpdateTrackArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Track | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Track",
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
        `providing the properties: ${properties} on ${"Track"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          item: args.data.item
            ? {
                connect: args.data.item,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
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

  @graphql.Mutation(() => Track)
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "delete",
    possession: "any",
  })
  async deleteTrack(
    @graphql.Args() args: DeleteTrackArgs
  ): Promise<Track | null> {
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
    resource: "Track",
    action: "read",
    possession: "any",
  })
  async item(
    @graphql.Parent() parent: Track,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Competence | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Competence",
    });
    const result = await this.service.getItem(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Track",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Track,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
