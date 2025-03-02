export const Articles =  {
   GetArticles: () => '/articles',
   CreateArticle: () => '/articles',
   GetArticleById: (id: number) => `/articles/${id}`,
   UpdateArticle: (id: number) => `/articles/${id}`,
   DeleteArticle: (id: number) => `/articles/${id}`,
}