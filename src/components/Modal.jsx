import { Component } from "react";

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

export default Modal;
