import { type SchemaTypeDefinition } from 'sanity'
import product from '../schemas/product'
import company from '../schemas/company'
import teamMember from '../schemas/teamMember'
import location from '../schemas/location'
import homePage from '../schemas/homePage'
import post from '../schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // 콘텐츠 관리
    homePage,
    company,

    // 제품 및 포스트
    product,
    post,

    // 사람과 위치
    teamMember,
    location,
  ],
}
