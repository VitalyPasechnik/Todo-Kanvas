import React from 'react'
import './RepoDescription';

type Props = {
  title: string,
  stars: number,
};

  export const RepoDescription: React.FC<Props> = ({ title, stars }) => {
   const arr = title.split('/');
  
    return (
    <div className="repoDescr">
      {/* <h1>Hello</h1> */}
      <p className="repoDescr__title">{arr[4]} &gt; {arr[5]} <span className="stars">&#9733;</span> {stars} K stars</p>
      <p></p>
    </div>
  )
}
