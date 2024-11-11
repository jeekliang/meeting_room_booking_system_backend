import { Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, Entity } from "typeorm";
import { Permission } from "./permission.entity";

@Entity({
  name: 'roles'
})
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: "角色名",
  })
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "role_permission",
  })
  permission: Permission[];
}