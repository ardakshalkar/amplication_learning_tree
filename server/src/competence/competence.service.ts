import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CompetenceServiceBase } from "./base/competence.service.base";

@Injectable()
export class CompetenceService extends CompetenceServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
