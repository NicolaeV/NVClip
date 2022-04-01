import React from "react";
import ClipMaker, { MemoizedClipMaker } from "./ClipMaker";
import Container from '@mui/material/Container';
import "../css/FileDrop.css";
// import { hasPointerEvents } from "@testing-library/user-event/dist/utils";

const FileDrop = (props) => {
    const { data, dispatch } = props;

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        if (props.data.inDropZone) {
            dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
        }
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
        if (data.dropDepth > 1) return
        if (props.data.inDropZone) {
            dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
        }
    };

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        if (!props.data.inDropZone) {
            dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
        }
    };

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];

        if (files && files.length > 0) {
            const existingFiles = data.fileList.map(f => f.name)
            files = files.filter(f => !existingFiles.includes(f.name))

            dispatch({ type: 'ADD_FILE_TO_LIST', files });
            e.dataTransfer.clearData();
            dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
            dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        }
    };

    return (
        <div
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
            height={"100vh"} overflow={"hidden"}
            className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}>
            <Container>
                <MemoizedClipMaker fileList={data.fileList} />
            </Container>
        </div>
    );
}

export default FileDrop;
