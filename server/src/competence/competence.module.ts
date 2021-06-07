import { Module } from "@nestjs/common";
import { CompetenceModuleBase } from "./base/competence.module.base";
import { CompetenceService } from "./competence.service";
import { CompetenceController } from "./competence.controller";
import { CompetenceResolver } from "./competence.resolver";

@Module({
  imports: [CompetenceModuleBase],
  controllers: [CompetenceController],
  providers: [CompetenceService, CompetenceResolver],
  exports: [CompetenceService],
})
export class CompetenceModule {}
