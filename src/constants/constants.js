export const API_KEY = "fad484ed0bb2f65657e528abaf80decf";
export const API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=20`;
export const SEARCH_API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=20`;
export const imgStyle = {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '10px',
    cursor: 'pointer'
}
export const ViewImgStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
};
export const headSectionStyle = {
    width: '100%',
    height: '180px',
    backgroundColor: '#333',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    color: '#fff',
}