import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';

interface RecordCreationAttributes {
  id: number;
  userId: string;
  categoryId: number;
  spentAmount: number;
}

@Table({ tableName: 'records' })
export class Record extends Model<Record, RecordCreationAttributes> {
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  spentAmount: number;
}
