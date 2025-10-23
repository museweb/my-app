import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: '제품',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '제품명',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'zh', title: '中文', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: {
        source: 'name.ko',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '클라우드 솔루션', value: 'cloud-solutions' },
          { title: 'AI 및 분석', value: 'ai-analytics' },
          { title: '보안', value: 'security' },
        ],
      },
    }),
    defineField({
      name: 'features',
      title: '주요 기능',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'zh', title: '中文', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featureDetails',
      title: '기능 상세 설명',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'text' },
            { name: 'en', title: 'English', type: 'text' },
            { name: 'zh', title: '中文', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: '이점',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'text' },
            { name: 'en', title: 'English', type: 'text' },
            { name: 'zh', title: '中文', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: '제품 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      subtitle: 'category',
      media: 'image',
    },
  },
});
