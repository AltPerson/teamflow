import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('Health')
export class HealthModel {
  @Field()
  status!: string;

  @Field(() => GraphQLISODateTime)
  timestamp!: Date;
}
