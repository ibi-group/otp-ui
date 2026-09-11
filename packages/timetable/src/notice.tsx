import React, { useState } from "react";
import styled from "styled-components";

import colors from "@opentripplanner/building-blocks";

const NoticeSymbol = styled.span`
  border: solid black;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 20px;
  width: 20px;
`;

const NoticeContent = styled.div`
  background-color: ${colors.grey[100]};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  position: absolute;
  text-align: left;
  text-wrap: wrap;
  transform: translateX(25px) translateY(-80%);
  max-width: 600px;
`;

const NoticeContainer = styled.div`
  display: flex;
`;

const CloseIcon = styled.div`
  cursor: pointer;
  padding: 10px;
`;

interface Props {
  content: string[];
}

const Notice = (props: Props): JSX.Element => {
  const { content } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <NoticeContainer>
      <NoticeSymbol
        className="trip-notice-symbol"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        {"\u2139"}
      </NoticeSymbol>
      {isOpen ? (
        <NoticeContent>
          <ul>
            {content.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <CloseIcon onClick={() => setIsOpen(false)}>{"\u2715"}</CloseIcon>
        </NoticeContent>
      ) : null}
    </NoticeContainer>
  );
};

export default Notice;
