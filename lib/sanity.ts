// Re-export Sanity client and utilities
export { client } from '@/sanity/lib/client';
export { urlFor } from '@/sanity/lib/image';

// GROQ queries
export const queries = {
  // 제품
  allProducts: `*[_type == "product"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    category,
    features,
    featureDetails,
    benefits,
    image,
    order
  }`,

  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    category,
    features,
    featureDetails,
    benefits,
    image,
    order
  }`,

  // 회사 정보
  company: `*[_type == "company"][0] {
    _id,
    about,
    vision,
    mission,
    values,
    history,
    companyImage
  }`,

  // 팀 멤버
  allTeamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    department,
    bio,
    photo,
    email,
    linkedin,
    order
  }`,

  teamMembersByDepartment: `*[_type == "teamMember" && department == $department] | order(order asc) {
    _id,
    name,
    position,
    bio,
    photo,
    email,
    linkedin
  }`,

  // 지사/위치
  allLocations: `*[_type == "location"] | order(order asc) {
    _id,
    name,
    type,
    address,
    phone,
    email,
    coordinates,
    image,
    description,
    order
  }`,

  // 홈페이지
  homePage: `*[_type == "homePage"][0] {
    _id,
    hero,
    features,
    stats,
    testimonials
  }`,

  // 블로그 포스트
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    author->{
      name,
      position,
      photo
    },
    publishedAt,
    featured
  }`,

  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category,
    tags,
    author->{
      name,
      position,
      photo,
      bio
    },
    publishedAt
  }`,

  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    publishedAt
  }`,

  postsByCategory: `*[_type == "post" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    publishedAt
  }`,
};
