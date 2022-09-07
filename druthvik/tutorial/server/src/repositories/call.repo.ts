// import { getConnection } from 'typeorm'
// import { Tag } from '../models/tags'
// import { getTag } from './tags.repository'

// const post = await getConnection().manager.findOne(Tag, 1)

// Tag.getTags = await getConnection()
//   .createQueryBuilder()
//   .relation(Post, 'categories')
//   .of(post) // you can use just post id as well
//   .loadMany()

// post.author = await getConnection()
//   .createQueryBuilder()
//   .relation(Post, 'user')
//   .of(post) // you can use just post id as well
//   .loadOne()

// this.groupRepository
//   .createQueryBuilder('group')
//   .leftJoinAndSelect('group.persons', 'persons')
//   .leftJoinAndSelect('persons.items', 'items')
//   .where('items.active =:active', { active: true }) //have to try this
//   .andWhere('group.id IN (:...groupIds)', { groupIds })
//   .getMany()
