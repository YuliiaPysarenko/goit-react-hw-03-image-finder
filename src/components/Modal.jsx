import { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.props.handleModalOpen(e);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.props.handleModalOpen(e);
      }
    });
  }

  render() {
    const { handleModalOpen, largeImage, tags } = this.props;
    return (
      <div onClick={handleModalOpen} className="Overlay">
        <div className="Modal">
          <img src={largeImage} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleModalOpen: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}

export default Modal;
