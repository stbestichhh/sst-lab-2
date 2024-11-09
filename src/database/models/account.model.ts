import { Column, DataType, ForeignKey, Model } from 'sequelize-typescript';
import { User } from './user.model';

export interface AccountCreationAttributes {
  userId: string;
  money: number;
}

export class Account extends Model<Account, AccountCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  money: number;
}
