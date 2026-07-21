import { CoreService, BaseEntity } from "./core.service";

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  seo?: any;
  publishedAt?: any;
}

export const blogService = new CoreService<BlogPost>("blogPosts");
