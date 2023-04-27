import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**
 * Moves an item from one list to another list.
 */
const move = (source: Object[], destination: Object[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

function QuoteApp() {
  const [state, setState] = useState(
    [
    {id: 'item-4-1682613093493', content: 'item 4'},
    {id: 'item-5-1682613093493', content: 'item 5'},
    {id: 'item-6-1682613093493', content: 'item 6'},
    {id: 'item-7-1682613093493', content: 'item 7'},
    {id: 'item-8-1682613093493', content: 'item 8'},
    {id: 'item-9-1682613093493', content: 'item 9'},
    {id: 'item-10-1682613093493', content: 'item 10'},
    {id: 'item-11-1682613093493', content: 'item 11'},
    {id: 'item-12-1682613093493', content: 'item 12'}
  ],
    [
      {id: 'item-4-1682613093493', content: 'item 4'},
      {id: 'item-5-1682613093493', content: 'item 5'},
      {id: 'item-6-1682613093493', content: 'item 6'},
      {id: 'item-7-1682613093493', content: 'item 7'},
      {id: 'item-8-1682613093493', content: 'item 8'},
      {id: 'item-9-1682613093493', content: 'item 9'},
      {id: 'item-10-1682613093493', content: 'item 10'},
      {id: 'item-11-1682613093493', content: 'item 11'},
      {id: 'item-12-1682613093493', content: 'item 12'}
    ]);

  function onDragEnd(result: any) {
    console.log(result);
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <div>
      {console.log(state)}
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}


export default QuoteApp;