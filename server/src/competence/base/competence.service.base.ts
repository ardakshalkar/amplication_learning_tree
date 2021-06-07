import { PrismaService } from "nestjs-prisma";
import { Prisma, Competence, Completion, Track } from "@prisma/client";

export class CompetenceServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompetenceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceFindManyArgs>
  ): Promise<number> {
    return this.prisma.competence.count(args);
  }

  async findMany<T extends Prisma.CompetenceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceFindManyArgs>
  ): Promise<Competence[]> {
    return this.prisma.competence.findMany(args);
  }
  async findOne<T extends Prisma.CompetenceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceFindUniqueArgs>
  ): Promise<Competence | null> {
    return this.prisma.competence.findUnique(args);
  }
  async create<T extends Prisma.CompetenceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceCreateArgs>
  ): Promise<Competence> {
    return this.prisma.competence.create<T>(args);
  }
  async update<T extends Prisma.CompetenceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceUpdateArgs>
  ): Promise<Competence> {
    return this.prisma.competence.update<T>(args);
  }
  async delete<T extends Prisma.CompetenceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompetenceDeleteArgs>
  ): Promise<Competence> {
    return this.prisma.competence.delete(args);
  }

  async findCompletions(
    parentId: string,
    args: Prisma.CompletionFindManyArgs
  ): Promise<Completion[]> {
    return this.prisma.competence
      .findUnique({
        where: { id: parentId },
      })
      .completions(args);
  }

  async findItems(
    parentId: string,
    args: Prisma.CompetenceFindManyArgs
  ): Promise<Competence[]> {
    return this.prisma.competence
      .findUnique({
        where: { id: parentId },
      })
      .items(args);
  }

  async findPrerequisites(
    parentId: string,
    args: Prisma.CompetenceFindManyArgs
  ): Promise<Competence[]> {
    return this.prisma.competence
      .findUnique({
        where: { id: parentId },
      })
      .prerequisites(args);
  }

  async findTracks(
    parentId: string,
    args: Prisma.TrackFindManyArgs
  ): Promise<Track[]> {
    return this.prisma.competence
      .findUnique({
        where: { id: parentId },
      })
      .tracks(args);
  }
}
