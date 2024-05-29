import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @Default(DataType.NUMBER)
  @Column({ field: 'id', type: DataType.NUMBER })
  declare id: number;
  
  @Column({ field: 'name', type: DataType.STRING })
  declare name: string;

  @Column({ field: 'price', type: DataType.NUMBER })
  declare price: number;

  @Column({ field: 'brand', type: DataType.STRING })
  declare brand: string;

  @Column({ field: 'image_url', type: DataType.STRING })
  declare imageUrl: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare deletedAt: Date;
}
