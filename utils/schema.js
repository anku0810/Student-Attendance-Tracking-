import { boolean, int, mysqlTable } from "drizzle-orm/mysql-core";
import { varchar } from "drizzle-orm/pg-core";

export const CLASS=mysqlTable('class',{
        id:int('id',{length:11}).primaryKey(),
        class:varchar('class',{length:10}).notNull()
    });


export const STUDENTS=mysqlTable('students',{  // mysqlTable(Tablename)
    id:int('id',{length:11}).autoincrement().primaryKey(),
    name:varchar('name',{length:40}).notNull(),
    class:varchar('class',{length:10}).notNull(),
    contact:varchar('contact',{length:20}),
    address:varchar('address',{length:120}),
    blood:varchar('blood',{length:5}),
})

export const ATTENDANCE= mysqlTable('attendance',{
    id:int('id',{length:11}).autoincrement().primaryKey(),
    studentId:int('studentId',{length:11}).notNull(),
    present:boolean('present').default(false),
    day:int('day',{length:11}).notNull(),
    date:varchar('date',{length:20}).notNull()
});

