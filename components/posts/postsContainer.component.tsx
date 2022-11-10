import React, { useEffect, useState } from 'react';
import routes from '../../enums/routes';
import privateApi from '../../services/privateApi';
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
  const [postsList, setPostsList] = useState([] as Post[]);
  const [pagesInfo, setPagesInfo] = useState({} as Omit<PostsData, 'posts'>);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsLimit] = useState(6);

  const getPostsData = async (page: number, limit: number) => {
    try {
      const response = await privateApi.get(routes.posts, {
        params: {
          page,
          limit,
        },
      });
      const { data }: { data: PostsData } = response;

      setPagesInfo({
        next: data.next,
        previous: data.previous,
        totalPages: data.totalPages,
      });
      setPostsList(data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostsData(currentPage, postsLimit);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap md:justify-start justify-center">
        {postsList?.map(post => {
          const { title, content } = post;
          return (
            <PostComponent title={title} content={content} key={post.id} />
          );
        })}
      </div>
      <PageButtonsComponent
        totalPages={pagesInfo.totalPages}
        changePage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostsContainerComponent;
