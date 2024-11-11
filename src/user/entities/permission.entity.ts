import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity({
  name: 'permissions'
})
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: "用户名",
  })
  code: string;

  @Column({
    length: 50,
    comment: "密码",
  })
  description: string;
}