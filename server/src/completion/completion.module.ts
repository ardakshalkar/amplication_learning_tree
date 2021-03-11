import { Module } from "@nestjs/common";
import { CompletionModuleBase } from "./base/completion.module.base";
import { CompletionService } from "./completion.service";
import { CompletionController } from "./completion.controller";
import { CompletionResolver } from "./completion.resolver";

@Module({
  imports: [CompletionModuleBase],
  controllers: [CompletionController],
  providers: [CompletionService, CompletionResolver],
  exports: [CompletionService],
})
export class CompletionModule {}
