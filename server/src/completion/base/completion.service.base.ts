import { PrismaService } from "nestjs-prisma";
import { Prisma, Completion, Competence, User } from "@prisma/client";

export class CompletionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompletionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionFindManyArgs>
  ): Promise<number> {
    return this.prisma.completion.count(args);
  }

  async findMany<T extends Prisma.CompletionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionFindManyArgs>
  ): Promise<Completion[]> {
    return this.prisma.completion.findMany(args);
  }
  async findOne<T extends Prisma.CompletionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionFindUniqueArgs>
  ): Promise<Completion | null> {
    return this.prisma.completion.findUnique(args);
  }
  async create<T extends Prisma.CompletionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionCreateArgs>
  ): Promise<Completion> {
    return this.prisma.completion.create<T>(args);
  }
  async update<T extends Prisma.CompletionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionUpdateArgs>
  ): Promise<Completion> {
    return this.prisma.completion.update<T>(args);
  }
  async delete<T extends Prisma.CompletionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompletionDeleteArgs>
  ): Promise<Completion> {
    return this.prisma.completion.delete(args);
  }

  async getItemId(parentId: string): Promise<Competence | null> {
    return this.prisma.completion
      .findUnique({
        where: { id: parentId },
      })
      .itemId();
  }

  async getUserId(parentId: string): Promise<User | null> {
    return this.prisma.completion
      .findUnique({
        where: { id: parentId },
      })
      .userId();
  }
}
