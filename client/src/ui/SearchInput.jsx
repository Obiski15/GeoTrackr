import { useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";
import { useTimeline } from "../features/dashboard/useTimeline";

const StyledSearchInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--tertiary-color);
  outline: 2px solid var(--background-color-light);
  border-radius: 2rem;
  outline-offset: 3px;

  &:hover {
    background-color: var(--secondary-color);
    & input {
      background-color: var(--secondary-color);
    }
  }

  & svg {
    padding: 0.5rem;
    color: var(--text-color-primary);
    font-size: 4.2rem;
    stroke: var(--text-color-primary);
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding-left: 0.5rem;
  padding-right: 2rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  background-color: var(--tertiary-color);
  color: var(--text-color-primary);
  flex: 1;

  &:focus {
    outline: none;
  }
`;

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const { data } = useTimeline();

  return (
    <StyledSearchInput>
      <IoIosSearch />

      <Input
        disabled={data.length <= 0}
        placeholder="Search Timeline"
        value={searchParams.get("search") || ""}
        onChange={(e) => {
          searchParams.set("search", e.target.value);
          setSearchParams(searchParams);
        }}
      />
    </StyledSearchInput>
  );
}

export default SearchInput;
