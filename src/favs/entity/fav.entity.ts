import { Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'favorites' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Fav {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  protected constructor() {
    this.id = uuidv4();
  }
}
