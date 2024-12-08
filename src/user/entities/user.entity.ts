import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'nickName',
    length: 50,
    comment: '昵称',
  })
  nickName: string;

  @Column({
    length: 50,
    comment: '邮箱',
  })
  email: string;

  @Column({
    length: 50,
    comment: '头像',
    nullable: true,
  })
  headPic: string;

  @Column({
    nullable: true,
    length: 20,
    comment: '手机号',
  })
  phoneNumber: string;

  @Column({
    default: false,
    comment: '是否冻结',
  })
  isFrozen: boolean;

  @Column({
    default: false,
    comment: '是否是管理员',
  })
  isAdmin: boolean;

  @CreateDateColumn()
  createTime: Date;

  @CreateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];
}
