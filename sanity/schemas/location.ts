import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'location',
  title: '지사/위치',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '지사명',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: '유형',
      type: 'string',
      options: {
        list: [
          { title: '본사', value: 'headquarters' },
          { title: '지사', value: 'branch' },
          { title: '연구소', value: 'lab' },
          { title: '공장', value: 'factory' },
        ],
      },
    }),
    defineField({
      name: 'address',
      title: '주소',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'phone',
      title: '전화번호',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: '이메일',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'coordinates',
      title: '좌표',
      type: 'object',
      fields: [
        { name: 'lat', title: '위도', type: 'number' },
        { name: 'lng', title: '경도', type: 'number' },
      ],
    }),
    defineField({
      name: 'image',
      title: '지사 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'order',
      title: '정렬 순서',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      subtitle: 'address.ko',
      media: 'image',
    },
  },
});
