import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type MonsterDocument = HydratedDocument<Monster>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc: any, ret: any) => {
      delete ret.__v;
      return ret;
    },
  },
})
export class Monster {
  constructor(partial: Partial<Monster>) {
    Object.assign(this, partial);
  }

  @Exclude()
  _id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  attack: number;

  @Prop({ required: true })
  defense: number;

  @Prop({ required: true })
  hp: number;

  @Prop({ required: true })
  speed: number;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  typeCode: string;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
