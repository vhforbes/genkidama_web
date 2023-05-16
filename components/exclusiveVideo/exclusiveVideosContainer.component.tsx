/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from 'react';
import { useAccessControl } from '../../hooks/accessControl';
import { useExclusiveVideos } from '../../hooks/exclusiveVideos';
import { ExclusiveVideo } from '../../interfaces/ExclusiveVideo';
import PageButtonsComponent from '../shared/pageButtons';
import PostComponent from './components/video.component';

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

const ExclusiveVideosContainer = ({
  editable = false,
}: {
  editable?: boolean;
}) => {
  const { currentAccess } = useAccessControl();
  const {
    exclusiveVideos,
    pagesInfo,
    currentPage,
    setCurrentPage,
    getPaginatedExclusiveVideos,
  } = useExclusiveVideos();

  useEffect(() => {
    if (currentAccess.hasLimitedAccess) {
      getPaginatedExclusiveVideos();
    }
  }, [currentPage, currentAccess]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:justify-center justify-center">
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
