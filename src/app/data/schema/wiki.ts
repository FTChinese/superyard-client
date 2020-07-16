export interface Article {
  id: number;
  author: string;
  createdUtc: string;
  updatedUtc: string;
  title: string;
  summary: string;
  keyword?: string;
  body: string;
}

export type ArticleForm = Pick<Article, 'title' | 'summary' | 'keyword' | 'body'>;

export type ArticleTeaser = Omit<Article, 'body'>;
