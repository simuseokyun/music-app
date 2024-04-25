import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { addPlaylistState, playlistList } from '../atoms';

interface ITrack {
    name: string;
    artists: { id: string; name: string }[];
    track_number: number;
    duration_ms: number;
    cover: string;
    album_title: string;
    album_id: string;
}
const Container = styled.tr`
    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        span {
            opacity: 1;
        }
    }
    a {
        color: #a0a0a0;
        &:hover {
            color: white;
        }
    }

    border-radius: 10px;
`;
const TrackArtist = styled.span`
    /* margin-left: 5px; */
`;
const rotateIn = keyframes`
    from {
        transform: rotate(0deg) 
    }
    to {
        transform: rotate(180deg) 
    }
`;
const AddBtn = styled.span`
    opacity: 0;
    &:hover {
        animation: ${rotateIn} 1s forwards;
    }
`;
const Category = styled.ul`
    position: absolute;
    right: 0;
    width: 200px;
    padding: 10px;
    background-color: #282828;
    border-radius: 8px;
`;
const CategoryList = styled.li`
    text-align: left;
    color: white;
    font-size: 14px;
    padding: 5px;
    &:hover {
        background-color: #3e3d3d;
    }
`;
export const TrackList = ({ name, track_number, duration_ms, cover, album_title, artists, album_id }: ITrack) => {
    const [playlists, setPlaylist] = useRecoilState(playlistList);
    const addPlaylistFormState = useSetRecoilState(addPlaylistState);
    const [open, setOpen] = useState(false);
    const onAddBtn = () => {
        if (!playlists.length) {
            alert('먼저 플레이리스트를 생성해주세요');
            addPlaylistFormState((prev) => !prev);
            return;
        }
        setOpen((prev) => !prev);
    };
    const addTrack = (event: React.MouseEvent<HTMLLIElement>) => {
        const {
            currentTarget: { textContent, id },
        } = event;
        setPlaylist((prev) => {
            const newTrack = { id: name, title: name, duration_ms, cover, album_title, artists, album_id };
            const prevArray = prev.map((prev, index) => {
                if (prev.title === textContent) {
                    const confirm = prev.tracks.find((ele) => {
                        return ele.title === name;
                    });
                    if (confirm) {
                        alert('이미 플레이리스트에 곡이 존재합니다');
                        return prev;
                    }
                    return {
                        ...prev,
                        tracks: [...prev.tracks, newTrack],
                    };
                }
                return prev;
            });
            return prevArray;
        });
    };
    const msTransform = (ms: number) => {
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        return { minutes, seconds };
    };
    return (
        <Container
            key={name}
            style={{ borderRadius: '5px' }}
            onMouseLeave={() => {
                setOpen(false);
            }}
        >
            <td style={{ width: '10%' }}>{track_number}</td>
            <td style={{ textAlign: 'left', padding: '10px 0' }}>
                <p style={{ marginBottom: '5px' }}>{name}</p>
                {artists.map((artist, i) => (
                    <TrackArtist key={artist.name}>
                        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                        {artists.length == 1 ? undefined : artists[i + 1] ? ',' : undefined}
                    </TrackArtist>
                ))}
            </td>
            <td>{`${msTransform(duration_ms).minutes}:${
                String(msTransform(duration_ms).seconds).length === 1
                    ? `0${msTransform(duration_ms).seconds}`
                    : msTransform(duration_ms).seconds
            }`}</td>
            <td style={{ paddingRight: '5px', position: 'relative' }}>
                <AddBtn onClick={onAddBtn} style={{ position: 'relative' }} className="material-symbols-outlined">
                    add_circle
                </AddBtn>
                {open ? (
                    <Category>
                        {playlists.map((playlist) => {
                            return (
                                <CategoryList key={playlist.id} id={playlist.title} onClick={addTrack}>
                                    {playlist.title}
                                </CategoryList>
                            );
                        })}
                    </Category>
                ) : null}
            </td>
        </Container>
    );
};
