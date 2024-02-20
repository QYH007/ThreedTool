import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import React, { useCallback } from 'react';
// import { DndProvider } from 'react-dnd';
// import { MultiBackend,  Preview } from 'react-dnd-multi-backend';
import { DndProvider, Preview } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import styled from 'styled-components';

import { Transformations } from '../../../../../stores';
import TransformationCardContent from './TransformationList/TransformationCardContent';
import TransformationCardIcon from './TransformationList/TransformationCardIcon';
import TransformationList from './TransformationList/TransformationList';

const Wrapper = styled.div`
  padding: 8px 0;
`;

const PreviewStyled = styled.div`
  height: 30px;
  width: 180px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0.25rem 0.5rem 0rem 0.5rem;
  margin-bottom: 0.25rem;
  cursor: move;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface Props {
  activeObject: Transformations.SceneObject;
}

const Playlist: React.FC<Props> = ({ activeObject }) => {
  const state = Transformations.useStore((state: Transformations.State) => state);
  const actions = state.actions;

  const isAnimating = state.isAnimating;

  const deleteTransformationsOfActiveObject = actions.deleteTransformationsOfActiveObject;
  const startAnimating = actions.startAnimating;
  const setShouldResetModel = actions.setShouldResetModel;
  const transformations = activeObject.transformations;

  const isNoTransformationSelected = useCallback(() => {
    const selected = transformations.find((trans) => trans.active);
    if (selected === undefined) {
      return true;
    } else {
      return false;
    }
  }, [transformations]);

  // this generates the element that is visible if a drag-item is dragged
  // on a touch device
  const generatePreview = ({ item, style }: any): JSX.Element => {
    return (
      <PreviewStyled style={style}>
        <TransformationCardIcon transformation={item.transformation} />
        <TransformationCardContent transformation={item.transformation} />
        <div></div>
      </PreviewStyled>
    );
  };

  return (
    <div>
      {/* <DndProvider backend={MultiBackend} options={HTML5toTouch}> */}
      <DndProvider options={HTML5toTouch}>
        <TransformationList transformations={activeObject.transformations} />
        <Preview generator={generatePreview} />
      </DndProvider>

      <Wrapper>
        <Grid container alignContent="center" justify="space-evenly">
          <Fab
            disabled={transformations.length === 0 || isAnimating || isNoTransformationSelected()}
            color="primary"
            aria-label="play"
            onClick={(): void => startAnimating()}
          >
            <PlayArrowIcon />
          </Fab>
          <Fab
            disabled={transformations.length === 0 || isAnimating}
            color="default"
            aria-label="delete"
            onClick={(): void => deleteTransformationsOfActiveObject()}
          >
            <DeleteIcon />
          </Fab>
          <Fab
            disabled={isAnimating}
            color="default"
            aria-label="reset"
            onClick={(): void => setShouldResetModel(true)}
          >
            <RotateLeftIcon />
          </Fab>
        </Grid>
      </Wrapper>
    </div>
  );
};

export default Playlist;
