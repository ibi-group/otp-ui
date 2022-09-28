import {
  useHover,
  useInteractions,
  useFloating,
  offset,
  shift,
  arrow,
  safePolygon,
  FloatingPortal
} from "@floating-ui/react-dom-interactions";

import React, { ReactElement, useRef, useState } from "react";
import styled from "styled-components";
import { QueryParamChangeEvent } from "../types";
import SubSettingsPane from "./SubSettingsPane";
import { Combination } from "./types";

const ModeBar = styled.div`
  display: inline-grid;
  gap: 0;
  grid-auto-flow: column;
`;

const ModeButtonItem = styled.button<{ enabled?: boolean }>`
  display: inline-block;
  /* stylelint-disable-next-line property-no-unknown */
  aspect-ratio: 1/1;
  cursor: pointer;
  margin: 0;
  user-select: none;
  border: 1px solid #0062cc;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  background: ${props => (props.enabled ? "#007bff" : "#004691")};
  transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  color: white;

  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    color: #fff;
    background: #006fe6;
    border-color: #006fe6;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05),
      0 4px 10px rgba(0, 123, 255, 0.25);
  }
`;

const HoverPanel = styled.div`
  z-index: 10;
  width: 100%;
  padding: 0 10px;
`;

const HoverInnerContainer = styled.div`
  background: #006fe6;
  color: white;
  font-weight: bold;
  padding: 5px;
  border-radius: 4px;
  font-size: 90%;
  pointer-events: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 123, 255, 0.25);
`;

const Arrow = styled.div`
  position: absolute;
  background: #006fe6;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  transform: rotate(-45deg);
`;

interface ModeButtonProps {
  combination: Combination;
  floatingTarget: HTMLDivElement;
  onToggle: () => void;
  onSettingsUpdate: (QueryParamChangeEvent) => void;
}

function ModeButton({
  combination,
  floatingTarget,
  onToggle,
  onSettingsUpdate
}: ModeButtonProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {
    context,
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8), shift(), arrow({ element: arrowRef })]
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({ blockPointerEvents: true })
    })
  ]);
  const updateSetting = (event: QueryParamChangeEvent) => {
    if (!combination.enabled) {
      onToggle();
    }
    onSettingsUpdate(event);
  };
  return (
    <>
      <ModeButtonItem
        ref={reference}
        onClick={onToggle}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...getReferenceProps()}
        enabled={combination.enabled}
      >
        <combination.Icon size={32} />
      </ModeButtonItem>
      <FloatingPortal root={floatingTarget} id="foobartest">
        {open && (
          <HoverPanel
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getFloatingProps()}
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
          >
            <Arrow
              ref={arrowRef}
              style={{ top: arrowY ?? 0, left: arrowX ?? 0 }}
            />
            <HoverInnerContainer>
              <SubSettingsPane
                combination={combination}
                onSettingUpdate={updateSetting}
              />
            </HoverInnerContainer>
          </HoverPanel>
        )}
      </FloatingPortal>
    </>
  );
}

interface Props {
  combinations: Combination[];
  onToggleCombination: (key) => void;
  onSettingsUpdate: (QueryParamChangeEvent) => void;
}

export default function ModeSelector({
  onToggleCombination,
  onSettingsUpdate,
  combinations = []
}: Props): ReactElement {
  const floatingTarget = useRef(null);
  return (
    <>
      <ModeBar>
        {combinations.map(combination => (
          <ModeButton
            onToggle={() => onToggleCombination(combination.key)}
            key={combination.label}
            combination={combination}
            floatingTarget={floatingTarget.current}
            onSettingsUpdate={onSettingsUpdate}
          />
        ))}
      </ModeBar>
      <div ref={floatingTarget} id="foobartest" />
    </>
  );
}
