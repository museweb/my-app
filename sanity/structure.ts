import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('콘텐츠')
    .id('root')
    .items([
      // Singleton 문서들 - 바로 편집
      S.listItem()
        .id('homePage')
        .title('홈페이지')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),
      S.listItem()
        .id('company')
        .title('회사 정보')
        .child(
          S.document()
            .schemaType('company')
            .documentId('company')
        ),

      S.divider(),

      // 나머지 문서 타입들
      ...S.documentTypeListItems().filter(
        (item) => !['homePage', 'company'].includes(item.getId() || '')
      ),
    ])
