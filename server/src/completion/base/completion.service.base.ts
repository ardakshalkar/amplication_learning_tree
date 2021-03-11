import { PrismaService } from "nestjs-prisma";
import {
  FindOneCompletionArgs,
  FindManyCompletionArgs,
  CompletionCreateArgs,
  CompletionUpdateArgs,
  CompletionDeleteArgs,
  Subset,
} from "@prisma/client";

export class CompletionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyCompletionArgs>(
    args: Subset<T, FindManyCompletionArgs>
  ) {
    return this.prisma.completion.findMany(args);
  }
  findOne<T extends FindOneCompletionArgs>(
    args: Subset<T, FindOneCompletionArgs>
  ) {
    return this.prisma.completion.findOne(args);
  }
  create<T extends CompletionCreateArgs>(
    args: Subset<T, CompletionCreateArgs>
  ) {
    return this.prisma.completion.create<T>(args);
  }
  update<T extends CompletionUpdateArgs>(
    args: Subset<T, CompletionUpdateArgs>
  ) {
    return this.prisma.completion.update<T>(args);
  }
  delete<T extends CompletionDeleteArgs>(
    args: Subset<T, CompletionDeleteArgs>
  ) {
    return this.prisma.completion.delete(args);
  }
}
