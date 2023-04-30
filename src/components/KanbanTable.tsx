import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IData } from '../helpers/types/ITodo'
import './section.scss';



const KanbanTable = () => {
  const [data, setData] = useState<any>({
    backlog: ["Item 1", "Item 2", "Item 3"],
    todo: ["Item 4", "Item 5"],
    done: ["Item 6"],
  });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log(source, destination);

    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const items = [...data[source.droppableId]];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setData((prevState: any) => ({
        ...prevState,
        [source.droppableId]: items,
      }));
    } else {
      const sourceItems = [...data[source.droppableId]];
      const destinationItems = [...data[destination.droppableId]];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      setData((prevState: any) => ({
        ...prevState,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="table">
        <div className="board">
          <h2>Backlog</h2>
          <Droppable droppableId="backlog">
            {(provided) => (
              <ul
                className="item-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.backlog.map((item: any, index: number) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <li
                        className="item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="board">
          <h2>To Do</h2>
          <Droppable droppableId="todo">
            {(provided) => (
              <ul
                className="item-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.todo.map((item: any, index: any) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <li
                        className="item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="board">
          <h2>Done</h2>
          <Droppable droppableId="done">
          {(provided) => (
            <ul
              className="item-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
            {data.done.map((item: any, index: number) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <li
                    className="item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanTable;