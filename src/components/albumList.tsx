import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { saveAlbumList } from '../atoms';
import { Link } from 'react-router-dom';

const Container = styled.ul``;
const List = styled.li`
    /* margin-top: 5px; */
    border-radius: 8px;
    transition: all 0.2s;
    padding: 5px;
    width: 100%;
    &:hover {
        background-color: gray;
    }
    &:first-child {
        margin-top: 10px;
    }
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
    }
`;
const ListImg = styled.img`
    width: 50px;
    height: 50px;
`;
const ListInfo = styled.div`
    width: calc(100% - 50px);
    margin-left: 8px;
`;
const ListTitle = styled.h1`
    margin-bottom: 5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const ListArtist = styled.p`
    font-size: 12px;
`;
const Message = styled.p`
    text-align: center;
    font-size: 14px;
    margin-top: 20px;
`;
export const AlbumList = () => {
    const AlbumList = useRecoilValue(saveAlbumList);
    return (
        <Container>
            {AlbumList.length ? (
                AlbumList.map((album) => (
                    <List>
                        <Link to={`/home/album/${album.id}`}>
                            <ListImg src={album.img} />
                            <ListInfo>
                                <ListTitle>{album.title}</ListTitle>
                                <ListArtist>{album.name}</ListArtist>
                            </ListInfo>
                        </Link>
                    </List>
                ))
            ) : (
                <Message>찜한 앨범이 없습니다</Message>
            )}
        </Container>
    );
};
