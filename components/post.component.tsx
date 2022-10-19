import React from 'react';

interface PostProps {
  title: string;
  content: string;
}

const PostComponent = ({ title, content }: PostProps) => (
  <div className="card card-compact mb-10 w-auto bg-primary shadow-xl">
    <figure>
      <img src="/thumb1.jpg" alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{content}</p>
      <div className="card-actions justify-center mt-4">
        <button type="button" className="btn btn-secondary">
          Call to action
        </button>
      </div>
    </div>
  </div>
);

export default PostComponent;
