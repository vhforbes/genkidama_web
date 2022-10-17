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
  // <div className="card w-auto mb-10 lg:card-side bg-primary">
  //   <figure>
  //     <img className="w-60 m-4" src="/thumb1.jpg" alt="Album" />
  //   </figure>
  //   <div className="card-body card-compact">
  //     <h2 className="card-title">{title}</h2>
  //     <p>
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  //       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  //       veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
  //       commodo consequat. {content}
  //     </p>
  //     <div className="card-actions justify-center">
  //       <button type="button" className="btn btn-secondary">
  //         Assista
  //       </button>
  //     </div>
  //   </div>
  // </div>
);

export default PostComponent;
