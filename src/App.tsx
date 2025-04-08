import React from "react";
import "./styles/App.css";
import HierarchicalViewer from "./components/HierarchicalViewer";

function App() {
  const dropboxToken = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;
  const filePath = process.env.REACT_APP_DROPBOX_FILE_PATH;

  if (!dropboxToken || !filePath) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Avant Leap Dynamo</h1>
        </header>
        <main>
          <div className="error-message">
            <p>Missing environment variables. Please check your .env file.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Avant Leap Dynamo</h1>
      </header>
      <main>
        <HierarchicalViewer
          dropboxAccessToken={dropboxToken}
          filePath={filePath}
        />
      </main>
    </div>
  );
}

export default App;
