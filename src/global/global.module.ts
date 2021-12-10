import { Global, Module } from '@nestjs/common';
import { GenerateTokenProvider } from './providers/generate-token.provider';

@Global()
@Module({
  imports: [],
  providers: [
    GenerateTokenProvider,
  ],
  exports: [
    GenerateTokenProvider,
  ]
})
export class GlobalModule { }
