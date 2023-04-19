import * as React from 'react';
import './section.scss';
import { ITodo } from '../helpers/types/ITodo';
import { Issue } from '../components/Issue';

type Props = {
  title: string,
  todos: ITodo[]
};

export const Section: React.FC<Props> = ({ title, todos }) => {
  // const [title, todos] = props;

  return (
    <div className="section">
      <h4 className="section__title">{title}</h4>
      <div className="section__container">
        {todos.map(item => (
          <li key={item.id} className="section__item">
            <Issue item={item} />
          </li>
        ))}
      </div>
    </div>
  );
};