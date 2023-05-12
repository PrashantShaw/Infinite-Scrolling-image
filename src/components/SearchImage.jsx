import React, { useState, useRef } from "react";
import { ViewImgStyle, headSectionStyle } from "../constants/constants";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchArea from "./SearchArea";
import { CircularProgress, Modal } from "@mui/material";
import { imgStyle } from "../constants/constants";
import useGetDefaultImgs from "../api/useGetDefaultImgs";
import useGetQueryImgs from "../api/useGetQueryImgs";

function FlickrPhotos() {
    const [viewImg, setViewImg] = useState(null);
    const observer = useRef();
    const {
        data: defaultPhotos,
        loading: defaultImgsLoading,
        error: defaultImgsError,
        setPage: setDefaultPage } = useGetDefaultImgs()
    const {
        data: queryPhotos,
        loading: queryImgsLoading,
        error: queryImgsError,
        setPage: setQueryPage,
        query,
        handleQueryChange } = useGetQueryImgs()
    let photos = query ? queryPhotos : defaultPhotos
    let loading = query ? queryImgsLoading : defaultImgsLoading
    let error = query ? queryImgsError : defaultImgsError

    // Infinite scroll handler
    const handleLastItemInterception = (node) => {
        // console.log('!!!!!!', defaultImgsLoading)
        if (loading) return;
        console.log("node +++", node);
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                query ?
                    setQueryPage((prev) => prev + 1)
                    :
                    setDefaultPage((prev) => prev + 1)
            }
        });
        if (node) observer.current.observe(node);
    };

    if (error) return <h2>Some error occured: {typeof error === 'object' && error.message}</h2>

    return (<>
        <Box sx={headSectionStyle} >
            <h1>Search Photos</h1>
            {/* input */}
            <SearchArea handleQueryChange={handleQueryChange} />
        </Box>
        <Container maxWidth='lg' >
            <div
                className='img-wrapper'
                style={{ paddingTop: '200px', display: 'flex', justifyContent: ' center', flexWrap: 'wrap', gap: '20px' }}>
                {photos.map((photo, idx) => {
                    if (photos.length - 1 === idx) {
                        console.log("intercepted", photos.length - 1, idx);
                        return (
                            <img
                                ref={handleLastItemInterception}
                                key={idx}
                                style={imgStyle}
                                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                                alt={photo.title}
                                onClick={() => { setViewImg(photo) }}
                            />
                        );
                    }
                    return (
                        <img
                            key={idx}
                            style={imgStyle}
                            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                            alt={photo.title}
                            onClick={() => { setViewImg(photo) }}
                        />
                    );
                })}
                {loading && <CircularProgress />}
            </div>
        </Container>
        <Modal
            open={viewImg !== null}
            onClose={() => { setViewImg(null) }}
        >
            <Box sx={ViewImgStyle}>
                <img
                    src={`https://farm${viewImg && viewImg.farm}.staticflickr.com/${viewImg && viewImg.server}/${viewImg && viewImg.id}_${viewImg && viewImg.secret}.jpg`}
                    alt={viewImg && viewImg.title}
                />
            </Box>
        </Modal>
    </>);
}

export default FlickrPhotos;
