import { Component } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";

import ImageGalleryItem from "./ImageGalleryItem";
import Button from "./Button";
import Modal from "./Modal";

<Oval
  height="100"
  width="100"
  color="grey"
  ariaLabel="loading"
  justify-content="center"
/>;

class ImageGallery extends Component {
  state = {
    key: "24634494-a9c983226c04769a6e409a37a",
    images: [],
    totalImagesAmount: 1,
    isLoading: false,
    page: 1,
    largeImage: "",
    tags: "",
  };

  async componentDidMount() {
    this.getImages();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.request !== prevProps.request) {
      this.setState({ page: 1 });
      this.setState({ images: [] });
      this.getImages();
    } else if (this.state.page !== prevState.page) {
      this.getImages();
    }
  }

  async getImages() {
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `/?q=${this.props.request}&page=${this.state.page}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ totalImagesAmount: response.data.total });
      this.setState({ images: [...this.state.images, ...response.data.hits] });
    } catch (error) {
      this.setState({ error });
      console.log("error");
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onClickLoadMore = (e) => {
    if (e.target.className === "Button") {
      this.setState((prevState) => ({ page: prevState.page + 1 }));
    }
  };

  handleModalOpen = (e) => {
    if (
      e.target.className === "ImageGalleryItem-image" ||
      e.target.className === "Overlay"
    ) {
      this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
      this.setState({ largeImage: e.currentTarget.dataset.lgimage });
      this.setState({ tags: e.target.alt });
    } else if (e.key === "Escape" && this.state.isModalOpen === true) {
      this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
    }
  };

  render() {
    const {
      images,
      totalImagesAmount,
      isModalOpen,
      isLoading,
      largeImage,
      tags,
    } = this.state;
    return (
      <>
        {isLoading && (
          <div className="Loader">
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {images.length > 0 && (
          <div>
            <ul className="ImageGallery">
              {Object.values(images).map(
                ({ id, webformatURL, largeImageURL, tags }) => (
                  <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    modalOpen={this.handleModalOpen}
                  />
                )
              )}
            </ul>
            {totalImagesAmount > 12 ? (
              <Button onClickLoadMore={this.onClickLoadMore} />
            ) : null}
            {isLoading && (
              <div className="Loader">
                <Oval color="#00BFFF" height={80} width={80} />
              </div>
            )}
            {isModalOpen ? (
              <Modal
                handleModalOpen={this.handleModalOpen}
                largeImage={largeImage}
                tags={tags}
              />
            ) : null}
          </div>
        )}
        {totalImagesAmount === 0 && (
          <p className="oops-notification">
            Oops, there are no results that match your search :(
          </p>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired
}

export default ImageGallery;
