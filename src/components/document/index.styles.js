
import styled from 'styled-components';

export const File = styled.div`
    list-style: none; margin: 1rem 0;

    svg {
        margin-right: 1rem;
    }
`;

export const FileList = styled.ul` 
    margin-left: 2rem;
    padding: 0;
`;

export const Folder = styled(File).attrs({
  role: 'button',
  tabIndex: 0,
})`
    cursor: pointer;
`;
