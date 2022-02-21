const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  modalOpen,
}) => {
  return (
    <li
      onClick={modalOpen}
      data-lgimage={largeImageURL}
      key={id}
      className="ImageGalleryItem"
    >
      <img
        key={id}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

export default ImageGalleryItem;
