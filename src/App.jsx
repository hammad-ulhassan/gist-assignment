import React from "react";
import { BrowserRouter,} from "react-router-dom";
import Root from "./components/Root/Root";



class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    );
  }
}

export default App;
