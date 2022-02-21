import "./App.css";
import { Component } from "react";
import axios from "axios";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

axios.defaults.baseURL = "https://pixabay.com/api";

class App extends Component {
  state = {
    request: "",
    error: null,
  };

  formSubmitHandler = (data) => {
    this.setState((prevState) => ({
      request: (prevState.request = data.searchRequest),
    }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery request={this.state.request} />
      </div>
    );
  }
}

export default App;
