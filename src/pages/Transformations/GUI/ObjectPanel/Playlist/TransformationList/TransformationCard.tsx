import { XYCoord } from 'dnd-core';
import React, { useImperativeHandle, useRef } from 'react';
import {
  ConnectDragSource,
  ConnectDropTarget,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';
import styled from 'styled-components';

import { Transformations } from '../../../../../../stores';
import { ActiveToggleCheckBox } from './ActiveToggleCheckBox';
import DetailsHandle from './DetailsHandle';
import ItemTypes from './ItemTypes';
import TransformationCardContent from './TransformationCardContent';
import TransformationCardDelete from './TransformationCardDelete';
import TransformationCardIcon from './TransformationCardIcon';
import cgTheme from '../../../../../../styles';

const Card = styled.div<{ inAnimation: boolean }>`
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0.25rem 0.5rem 0rem 0.5rem;
  margin-bottom: 0.25rem;
  background-color: white;
  cursor: move;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props): string => (props.inAnimation ? cgTheme.palette.secondary.main : 'white')};
`;

const CardWrapper = styled.div<{ active: boolean }>`
  opacity: ${(props): number => (props.active ? 1 : 0.2)};
  position: relative;
  width: 200px;
`;

export interface CardProps {
  id: any;
  index: number;
  transformation: Transformations.Transformation;
  inAnimation: boolean;
  moveCard: (dragIndex: number, hoverIndex: number) => void;

  canDrop: boolean;
  isOver: boolean;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
}

interface CardInstance {
  getNode(): HTMLDivElement | null;
}

// eslint-disable-next-line react/display-name
const TransformationCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ id, inAnimation, transformation, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const dragStyles = {
      opacity: isDragging ? 0.2 : '',
    };

    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: (): any => elementRef.current,
    }));

    return (
      <CardWrapper active={transformation.active} style={dragStyles}>
        <DetailsHandle transformation={transformation} />
        <Card ref={elementRef} inAnimation={inAnimation}>
          <TransformationCardIcon transformation={transformation} />
          <TransformationCardContent transformation={transformation} />
          <TransformationCardDelete transformationId={id} />
        </Card>
        <ActiveToggleCheckBox transformation={transformation} />
      </CardWrapper>
    );
  },
);

export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props: CardProps, monitor: DropTargetMonitor, component: CardInstance) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }

      // const dragIndex = monitor.getItem().index;
      // const hoverIndex = props.index;
      const item = monitor.getItem() as {
        index: number;
      };

      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    isOver: monitor.isOver(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: (props: CardProps) => ({
        id: props.id,
        index: props.index,
        transformation: props.transformation,
      }),
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(TransformationCard),
);
