import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: '팀 멤버',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: '직책',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: '부서',
      type: 'string',
      options: {
        list: [
          { title: '경영진', value: 'executive' },
          { title: '개발', value: 'development' },
          { title: '영업', value: 'sales' },
          { title: '마케팅', value: 'marketing' },
          { title: '디자인', value: 'design' },
          { title: '인사', value: 'hr' },
          { title: '재무', value: 'finance' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: '소개',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'photo',
      title: '사진',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: '이메일',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
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
      subtitle: 'position.ko',
      media: 'photo',
    },
  },
});
