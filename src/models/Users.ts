import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export default class Users{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;
}