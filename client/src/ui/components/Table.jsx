import { createContext, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled.div`
  width: 100%;
`;

const StyledBody = styled.div`
  & > div:last-child {
    border-bottom: none;
  }
`;

const CommonRow = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: start;
  grid-template-columns: ${(props) => [props.columns]};
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  text-align: left;
  color: var(--text-color-primary);
  padding: 0.5rem 0.8rem;
  text-transform: capitalize;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--secondary-color);
  border: 2px solid var(--background-color-light);
  border-radius: 5rem;
  margin-bottom: 0.5rem;
`;

const StyledRow = styled(CommonRow)`
  border-bottom: 1px solid var(--background-color-light);

  & > div:nth-child(2) {
    text-transform: uppercase;
  }

  & > div {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader as="header" role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

Table.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.string.isRequired,
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

Body.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
