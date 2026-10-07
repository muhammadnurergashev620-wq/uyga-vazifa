import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../config/db/prisma.service';

const postInclude = { user: true, comments: true };

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: createPostInput,
      include: postInclude,
    });
  }

  findAll() {
    return this.prisma.post.findMany({ include: postInclude });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: postInclude,
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, { title, description }: UpdatePostInput) {
    await this.findOne(id);
    return this.prisma.post.update({
      where: { id },
      data: { title, description },
      include: postInclude,
    });
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.prisma.post.delete({ where: { id } });
    return post;
  }
}
