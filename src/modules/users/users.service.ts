import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignUpDto } from './dto/user-signup.dto';
import {hash, compare} from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto:UserSignUpDto):Promise<UserEntity> {
    const userExit = await this.findByEmail(userSignUpDto.email);
    if (userExit) {
      throw new BadRequestException('User already exists');
    }
    userSignUpDto.password = await hash(userSignUpDto.password, 10);

    let user = this.usersRepository.create(userSignUpDto);
    user=  await this.usersRepository.save(user);

    delete user.password;

    return user;
  }

  async signin(userSignInDto:UserSignInDto){
    const userExit = await this.usersRepository.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', {email: userSignInDto.email}).getOne();
    if (!userExit) {
      throw new NotFoundException('User does not exist');
    }
    const isPasswordValid = await compare(userSignInDto.password, (await userExit).password);
    if (!isPasswordValid) {
      throw new BadRequestException('Password is incorrect');
    }
    delete  userExit.password;
    return userExit;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id});
    if(!user){
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign({id: user.id, enail: user.email}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME});
  }
}
