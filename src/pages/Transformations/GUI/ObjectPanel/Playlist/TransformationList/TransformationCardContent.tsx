import { Typography } from '@material-ui/core';
import React from 'react';
import styled, { CSSProp } from 'styled-components';

import { Transformations } from '../../../../../../stores';

const ItemContent = styled.div`
  font-weight: 800;
  font-size: 1.5em;
  padding-bottom: 8px;
`;

interface NumberContainerProps {
  padded?: boolean;
  small?: boolean;
}
const NumberContainer = styled.span`
  position: relative;
  margin-right: ${(props: NumberContainerProps): CSSProp => (props.padded ? '12px' : '')};
  font-size: ${(props: NumberContainerProps): CSSProp => (props.small ? '0.8em' : '')};
  font-weight: bold;
`;

const TextContainer = styled.span`
  margin: 0 15px 0 0;
  position: relative;
  font-size: 0.8em;
`;

const SmallLetter = styled.span`
  position: absolute;
  bottom: 0px;
  right: -7px;
  font-size: 0.4em;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const ColumnDivider = styled.span`
  margin-left: 10px;
  margin-right: 4px;
`;

interface Props {
  transformation: Transformations.Transformation;
}

const TransformationCardContent: React.FC<Props> = ({ transformation }) => {
  switch (transformation.type) {
    case Transformations.ETransformationType.ROTATION:
      return <ItemContent>{transformation.degree}°</ItemContent>;

    case Transformations.ETransformationType.SCALING:
    case Transformations.ETransformationType.TRANSLATION:
      return (
        <ItemContent>
          <NumberContainer>
            <Typography component="span" variant="h6">
              {transformation.x}
            </Typography>

            <SmallLetter>X</SmallLetter>
          </NumberContainer>
          <ColumnDivider>|</ColumnDivider>
          <NumberContainer>
            <Typography component="span" variant="h6">
              {transformation.y}
            </Typography>
            <SmallLetter>Y</SmallLetter>
          </NumberContainer>
          <ColumnDivider>|</ColumnDivider>
          <NumberContainer>
            <Typography component="span" variant="h6">
              {transformation.z}
            </Typography>
            <SmallLetter>Z</SmallLetter>
          </NumberContainer>
        </ItemContent>
      );

    case Transformations.ETransformationType.SHEAR:
      return (
        <ItemContent>
          <TextContainer>
            <Typography component="span">shear</Typography>
            <SmallLetter>{transformation.axis}</SmallLetter>
          </TextContainer>
          {transformation.axis !== 'X' && (
            <>
              <NumberContainer padded small>
                <Typography component="span" variant="h6">
                  {transformation.x}
                </Typography>
                <SmallLetter>X</SmallLetter>
              </NumberContainer>
            </>
          )}
          {transformation.axis !== 'Y' && (
            <>
              <NumberContainer padded small>
                <Typography component="span" variant="h6">
                  {transformation.y}
                </Typography>
                <SmallLetter>Y</SmallLetter>
              </NumberContainer>
            </>
          )}
          {transformation.axis !== 'Z' && (
            <NumberContainer padded small>
              <Typography component="span" variant="h6">
                {transformation.z}
              </Typography>
              <SmallLetter>Z</SmallLetter>
            </NumberContainer>
          )}
        </ItemContent>
      );
    default:
      return null;
  }
};

export default TransformationCardContent;
