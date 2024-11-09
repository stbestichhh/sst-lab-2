import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Category } from './category.model';

interface RecordCreationAttributes {
  userId: string;
  categoryId: string;
  spentAmount: number;
}

@Table({ tableName: 'records' })
export class Record extends Model<Record, RecordCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  categoryId: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  spentAmount: number;
}
