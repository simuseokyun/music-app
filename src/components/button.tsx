import styled from 'styled-components';

interface IButton {
    text: string;
    state: boolean;
    onClick: () => void;
    ml?: string;
}

const Container = styled.button<{ state: boolean; ml: string }>`
    background-color: ${(props) => (props.state ? 'white' : '#232323')};
    color: ${(props) => (props.state ? '#232323' : 'white')};
    margin-left: ${(props) => (props.ml ? props.ml : 0)};
    padding: 4px 8px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
`;

export const Button = ({ text, state, onClick, ml }: IButton) => {
    return (
        <Container ml={ml!} onClick={onClick} state={state}>
            {text}
        </Container>
    );
};
