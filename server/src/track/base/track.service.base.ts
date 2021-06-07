import { PrismaService } from "nestjs-prisma";
import { Prisma, Track, Competence, User } from "@prisma/client";

export class TrackServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TrackFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackFindManyArgs>
  ): Promise<number> {
    return this.prisma.track.count(args);
  }

  async findMany<T extends Prisma.TrackFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackFindManyArgs>
  ): Promise<Track[]> {
    return this.prisma.track.findMany(args);
  }
  async findOne<T extends Prisma.TrackFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackFindUniqueArgs>
  ): Promise<Track | null> {
    return this.prisma.track.findUnique(args);
  }
  async create<T extends Prisma.TrackCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackCreateArgs>
  ): Promise<Track> {
    return this.prisma.track.create<T>(args);
  }
  async update<T extends Prisma.TrackUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackUpdateArgs>
  ): Promise<Track> {
    return this.prisma.track.update<T>(args);
  }
  async delete<T extends Prisma.TrackDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TrackDeleteArgs>
  ): Promise<Track> {
    return this.prisma.track.delete(args);
  }

  async getItem(parentId: string): Promise<Competence | null> {
    return this.prisma.track
      .findUnique({
        where: { id: parentId },
      })
      .item();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.track
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
