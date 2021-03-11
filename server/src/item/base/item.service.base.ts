import { PrismaService } from "nestjs-prisma";
import {
  FindOneItemArgs,
  FindManyItemArgs,
  ItemCreateArgs,
  ItemUpdateArgs,
  ItemDeleteArgs,
  Subset,
} from "@prisma/client";

export class ItemServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyItemArgs>(args: Subset<T, FindManyItemArgs>) {
    return this.prisma.item.findMany(args);
  }
  findOne<T extends FindOneItemArgs>(args: Subset<T, FindOneItemArgs>) {
    return this.prisma.item.findOne(args);
  }
  create<T extends ItemCreateArgs>(args: Subset<T, ItemCreateArgs>) {
    return this.prisma.item.create<T>(args);
  }
  update<T extends ItemUpdateArgs>(args: Subset<T, ItemUpdateArgs>) {
    return this.prisma.item.update<T>(args);
  }
  delete<T extends ItemDeleteArgs>(args: Subset<T, ItemDeleteArgs>) {
    return this.prisma.item.delete(args);
  }
}
