export interface Article {
  id: number;
  author: string;
  createdUtc: string | null;
  updatedUtc: string | null;
  title: string;
  summary: string | null;
  keyword: string | null;
  body: string | null;
}

export type ArticleForm = Pick<Article, 'title' | 'summary' | 'keyword' | 'body'>;

export type ArticleTeaser = Omit<Article, 'body'>;
