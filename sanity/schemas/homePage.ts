import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: '홈페이지',
  type: 'document',
  // Singleton - 하나만 생성 가능
  __experimental_singleton: true,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero 섹션',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: '제목',
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'zh', title: '中文', type: 'string' },
          ],
        },
        {
          name: 'subtitle',
          title: '부제목',
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'text' },
            { name: 'en', title: 'English', type: 'text' },
            { name: 'zh', title: '中文', type: 'text' },
          ],
        },
        {
          name: 'ctaText',
          title: 'CTA 버튼 텍스트',
          type: 'object',
          fields: [
            { name: 'ko', title: '한국어', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'zh', title: '中文', type: 'string' },
          ],
        },
        {
          name: 'ctaLink',
          title: 'CTA 버튼 링크',
          type: 'string',
        },
        {
          name: 'backgroundImage',
          title: '배경 이미지',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'features',
      title: '주요 기능',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: '제목',
              type: 'object',
              fields: [
                { name: 'ko', title: '한국어', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
            {
              name: 'description',
              title: '설명',
              type: 'object',
              fields: [
                { name: 'ko', title: '한국어', type: 'text' },
                { name: 'en', title: 'English', type: 'text' },
                { name: 'zh', title: '中文', type: 'text' },
              ],
            },
            {
              name: 'icon',
              title: '아이콘 이름 (lucide-react)',
              type: 'string',
              description: '예: Zap, Shield, Users',
            },
            {
              name: 'image',
              title: '이미지',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: '통계',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: '값',
              type: 'string',
              description: '예: 500+, 99%',
            },
            {
              name: 'label',
              title: '레이블',
              type: 'object',
              fields: [
                { name: 'ko', title: '한국어', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: '고객 후기',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: '후기',
              type: 'object',
              fields: [
                { name: 'ko', title: '한국어', type: 'text' },
                { name: 'en', title: 'English', type: 'text' },
                { name: 'zh', title: '中文', type: 'text' },
              ],
            },
            {
              name: 'author',
              title: '작성자',
              type: 'string',
            },
            {
              name: 'position',
              title: '직책',
              type: 'object',
              fields: [
                { name: 'ko', title: '한국어', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
                { name: 'zh', title: '中文', type: 'string' },
              ],
            },
            {
              name: 'company',
              title: '회사',
              type: 'string',
            },
            {
              name: 'photo',
              title: '사진',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title.ko',
    },
    prepare({ title }) {
      return {
        title: '홈페이지 설정',
        subtitle: title,
      };
    },
  },
});
