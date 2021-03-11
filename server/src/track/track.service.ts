import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { TrackServiceBase } from "./base/track.service.base";

@Injectable()
export class TrackService extends TrackServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
