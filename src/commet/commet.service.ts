import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommetInput } from './dto/create-commet.input';
import { UpdateCommetInput } from './dto/update-commet.input';
import { PrismaService } from '../config/db/prisma.service';

const commetInclude = { user: true, post: true };

@Injectable()
export class CommetService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommetInput: CreateCommetInput) {
    return this.prisma.comment.create({
      data: createCommetInput,
      include: commetInclude,
    });
  }

  findAll() {
    return this.prisma.comment.findMany({ include: commetInclude });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: commetInclude,
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: number, { text }: UpdateCommetInput) {
    await this.findOne(id);
    return this.prisma.comment.update({
      where: { id },
      data: { text },
      include: commetInclude,
    });
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.prisma.comment.delete({ where: { id } });
    return comment;
  }
}
