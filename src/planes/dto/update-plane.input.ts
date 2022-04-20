import { CreatePlaneInput } from './create-plane.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlaneInput extends PartialType(CreatePlaneInput) {
  @Field(() => Int)
  id: number;
}
