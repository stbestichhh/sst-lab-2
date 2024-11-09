import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CategoryCreationAttributes {
  id: number;
  name: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
