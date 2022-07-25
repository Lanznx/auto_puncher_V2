import { Inject, Injectable } from '@nestjs/common';
import { Cat } from 'src/entity/cat.entity';

@Injectable()
export class CatsRepository {
  constructor(
    @Inject('Cat')
    private cat: typeof Cat,
  ) {}

  async find_all_cats() {
    const result = await this.cat.findAll();
    return result;
  }

  async find_cat_by_id(id) {
    const result = await this.cat.findOne({ where: { id: id } });
    return result;
  }

  async create_cat(CreateCatDto) {
    const result = await this.cat.create({
      name: CreateCatDto.name,
      age: CreateCatDto.age,
      breed: CreateCatDto.breed,
    });
    return result;
  }
  async update_cat(CreateCatDto) {
    const result = await this.cat.update(
      {
        age: CreateCatDto.age,
        breed: CreateCatDto.breed,
      },
      {
        where: {
          name: CreateCatDto.name,
        },
      },
    );
    return result;
  }
  async delete_cat(name) {
    const result = await this.cat.destroy({
      where: { name: name },
    });
    return result;
  }
}
