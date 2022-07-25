import { Injectable } from '@nestjs/common';
import { CatsRepository } from './cat.repository';
@Injectable()
export class CatsService {
  constructor(private repo: CatsRepository) {}
  find_all_cats() {
    return this.repo.find_all_cats();
  }
  async find_cat_by_id(id) {
    return this.repo.find_cat_by_id(id);
  }
  async create_cat(createCatDto) {
    const result = await this.repo.create_cat(createCatDto);
    return `About your new cat ${JSON.stringify(result['dataValues'])}`;
  }
  create_cat_friend(data) {
    return `the cat ${data.name} is ${data.whose_friend}'s friend`;
  }
  async update_cat(cat) {
    const result = await this.repo.update_cat(cat);
    if (result[0] > 0) {
      return 'updated successfully! ';
    } else if (result[0] === 0) {
      return 'not found your cat!';
    } else {
      console.log(result);
      return 'there was an error updating your cat!';
    }
  }
  async delete_cat(name) {
    const result = await this.repo.delete_cat(name);
    if (result > 0) {
      console.log(result);
      return 'deleted successfully! ';
    } else if (result === 0) {
      return 'not found your cat!';
    } else {
      console.log(result);
      return 'there was an error deleting your cat!';
    }
  }
}
