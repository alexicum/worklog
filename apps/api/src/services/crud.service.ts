interface PrismaModelDelegate<T, CreateInput, UpdateInput> {
  findMany(): Promise<T[]>;
  findUnique(args: { where: { id: string } }): Promise<T | null>;
  create(args: { data: CreateInput }): Promise<T>;
  update(args: { where: { id: string }; data: UpdateInput }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
}

export abstract class CrudService<T, CreateInput, UpdateInput> {
  protected abstract model: PrismaModelDelegate<T, CreateInput, UpdateInput>;

  async getAll(): Promise<T[]> {
    return await this.model.findMany();
  }
  async getById(id: string): Promise<T | null> {
    return await this.model.findUnique({ where: { id } as any });
  }
  async create(data: CreateInput): Promise<T> {
    return await this.model.create({ data });
  }
  async update(id: string, data: UpdateInput): Promise<T> {
    return await this.model.update({ where: { id } as any, data });
  }
  async delete(id: string): Promise<T> {
    return await this.model.delete({ where: { id } as any });
  }
}
