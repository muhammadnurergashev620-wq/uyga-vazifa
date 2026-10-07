import { Module } from '@nestjs/common';
import { CommetService } from './commet.service';
import { CommetResolver } from './commet.resolver';

@Module({
  providers: [CommetResolver, CommetService],
})
export class CommetModule {}
