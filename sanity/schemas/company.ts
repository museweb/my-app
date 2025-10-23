import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'company',
  title: '회사 정보',
  type: 'document',
  // Singleton - 하나만 생성 가능
  __experimental_singleton: true,
  fields: [
    defineField({
      name: 'about',
      title: '회사 소개',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'vision',
      title: '비전',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'mission',
      title: '미션',
      type: 'object',
      fields: [
        { name: 'ko', title: '한국어', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'zh', title: '中文', type: 'text' },
      ],
    }),
    defineField({
      name: 'values',
      title: '핵심 가치',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: '제목', type: 'object', fields: [
              { name: 'ko', title: '한국어', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
              { name: 'zh', title: '中文', type: 'string' },
            ]},
            { name: 'description', title: '설명', type: 'object', fields: [
              { name: 'ko', title: '한국어', type: 'text' },
              { name: 'en', title: 'English', type: 'text' },
              { name: 'zh', title: '中文', type: 'text' },
            ]},
          ],
        },
      ],
    }),
    defineField({
      name: 'history',
      title: '연혁',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: '연도', type: 'string' },
            { name: 'title', title: '제목', type: 'object', fields: [
              { name: 'ko', title: '한국어', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
              { name: 'zh', title: '中文', type: 'string' },
            ]},
            { name: 'description', title: '설명', type: 'object', fields: [
              { name: 'ko', title: '한국어', type: 'text' },
              { name: 'en', title: 'English', type: 'text' },
              { name: 'zh', title: '中文', type: 'text' },
            ]},
          ],
        },
      ],
    }),
    defineField({
      name: 'companyImage',
      title: '회사 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'about.ko',
    },
    prepare({ title }) {
      return {
        title: '회사 정보',
        subtitle: title?.substring(0, 100),
      };
    },
  },
});
