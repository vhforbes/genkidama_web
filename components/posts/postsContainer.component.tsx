import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import PageButtonsComponent from './pageButtons';
import PostComponent from './post.component';

export interface PostsData {
  posts: Post[];
  next: object;
  previous: object;
  totalPages: number;
}

interface Post {
  author_id: string;
  content: string;
  created_at: string;
  id: string;
  image: string;
  title: string;
  updated_at: string;
  video_link: string;
}

const PostsContainerComponent = () => {
  const { token } = useAuth();
  const [postsList, setPostsList] = useState([] as Post[]);
  const [pagesInfo, setPagesInfo] = useState({} as Omit<PostsData, 'posts'>);

  if (!token) {
    return null;
  }

  const getPostsData = async () => {
    const response = await api({ token }).get('/posts?page=1&limit=2');
    const { data }: { data: PostsData } = response;

    setPagesInfo({
      next: data.next,
      previous: data.previous,
      totalPages: data.totalPages,
    });
    setPostsList(data.posts);

    console.log(pagesInfo);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap justify-start">
        {postsList?.map(post => {
          const { title, content } = post;
          return (
            <PostComponent title={title} content={content} key={post.id} />
          );
        })}
      </div>
      <PageButtonsComponent
        previous={pagesInfo.previous}
        next={pagesInfo.next}
        totalPages={pagesInfo.totalPages}
      />
    </div>
  );
};

export default PostsContainerComponent;
