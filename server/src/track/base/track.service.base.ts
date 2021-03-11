import { PrismaService } from "nestjs-prisma";
import {
  FindOneTrackArgs,
  FindManyTrackArgs,
  TrackCreateArgs,
  TrackUpdateArgs,
  TrackDeleteArgs,
  Subset,
} from "@prisma/client";

export class TrackServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyTrackArgs>(args: Subset<T, FindManyTrackArgs>) {
    return this.prisma.track.findMany(args);
  }
  findOne<T extends FindOneTrackArgs>(args: Subset<T, FindOneTrackArgs>) {
    return this.prisma.track.findOne(args);
  }
  create<T extends TrackCreateArgs>(args: Subset<T, TrackCreateArgs>) {
    return this.prisma.track.create<T>(args);
  }
  update<T extends TrackUpdateArgs>(args: Subset<T, TrackUpdateArgs>) {
    return this.prisma.track.update<T>(args);
  }
  delete<T extends TrackDeleteArgs>(args: Subset<T, TrackDeleteArgs>) {
    return this.prisma.track.delete(args);
  }
}
