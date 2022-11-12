import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SchoollevelsModule } from './schoollevels/schoollevels.module';
import { Schoollevel } from './schoollevels/entities/schoollevel.entity';
import { SchoolgradesModule } from './schoolgrades/schoolgrades.module';
import { Schoolgrade } from './schoolgrades/entities/schoolgrade.entity';
import { SchoolclassesModule } from './schoolclasses/schoolclasses.module';
import { Schoolclass } from './schoolclasses/entities/schoolclass.entity';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';
import { FilesModule } from './files/files.module';
import { EnrollstudentsModule } from './enrollstudents/enrollstudents.module';
import { EnrollStudent } from './enrollstudents/entities/enrollstudent.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false,
        // ca: process.env.DATABASE_SSL,
      },
      entities: [Role, User, Schoollevel, Schoolgrade, Schoolclass, Student, EnrollStudent],
      synchronize: false,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SchoollevelsModule,
    SchoolgradesModule,
    SchoolclassesModule,
    StudentsModule,
    FilesModule,
    EnrollstudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
