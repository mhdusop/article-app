import { create } from "zustand";

interface ArticleState {
   id: number;
   title: string;
   content: string;
   setArticle: (article: Partial<ArticleState>) => void;
   resetArticle: () => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
   id: 0,
   title: "",
   content: "",
   setArticle: (article) => set((state) => ({ ...state, ...article })),
   resetArticle: () => set({ id: 0, title: "", content: "" }),
}));