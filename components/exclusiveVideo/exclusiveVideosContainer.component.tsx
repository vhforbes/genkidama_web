/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from 'react';
import { useExclusiveVideos } from '../../hooks/exclusiveVideos';
import { useLoader } from '../../hooks/loader';
import { ExclusiveVideo } from '../../interfaces/ExclusiveVideo';
import PageButtonsComponent from './components/pageButtons';
import PostComponent from './components/post.component';

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

const ExclusiveVideosContainer = ({ editable }: { editable: boolean }) => {
  const { setLoading } = useLoader();
  const {
    exclusiveVideos,
    pagesInfo,
    currentPage,
    setCurrentPage,
    getPaginatedExclusiveVideos,
  } = useExclusiveVideos();

  useEffect(() => {
    getPaginatedExclusiveVideos();
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap md:justify-center justify-center">
        {exclusiveVideos?.map((exclusiveVideo: ExclusiveVideo) => {
          return (
            <PostComponent
              key={exclusiveVideo.id}
              exclusiveVideo={exclusiveVideo}
              editable={editable}
            />
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

export default ExclusiveVideosContainer;
