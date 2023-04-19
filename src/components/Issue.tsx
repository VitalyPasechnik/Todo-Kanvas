import * as React from 'react';
import { ITodo } from '../helpers/types/ITodo';
import './Issue.scss';

type Props = {
  item: ITodo
};

export const Issue: React.FC<Props> = ({ item }) => {
  const x: Date = new Date();
  const y: Date = new Date(item.created_at);
  const diffInDays = Math.ceil(Math.abs(x.getTime() - y.getTime()) / (1000 * 3600 * 24));

  return (
    <div className="item" >
      <h4>{item.title}</h4>
      <p>#{item.id} opened {diffInDays} days ago</p>
      <p>{item.author_association} | Comments: {item.comments}</p>
    </div>
  );
};