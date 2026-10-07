import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../config/db/prisma.service';

const userInclude = {
  posts: { include: { comments: true } },
  comments: true,
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput,
      include: userInclude,
    });
  }

  findAll() {
    return this.prisma.user.findMany({ include: userInclude });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: userInclude,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, { username, fullName }: UpdateUserInput) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { username, fullName },
      include: userInclude,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return user;
  }
}
