import React from "react";
import "./styles/App.css";
import HierarchicalViewer from "./components/HierarchicalViewer";

function App() {
  const dropboxToken = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;
  const filePath = process.env.REACT_APP_DROPBOX_FILE_PATH;
  const clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_DROPBOX_CLIENT_SECRET;
  const refreshToken = process.env.REACT_APP_DROPBOX_REFRESH_TOKEN;

  if (
    !dropboxToken ||
    !filePath ||
    !clientId ||
    !clientSecret ||
    !refreshToken
  ) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Avant Leap Dynamo</h1>
        </header>
        <main>
          <div className="error-message">
            <p>Missing environment variables. Please check your .env file.</p>
            <p>
              Required variables: DROPBOX_ACCESS_TOKEN, DROPBOX_FILE_PATH,
              DROPBOX_CLIENT_ID, DROPBOX_CLIENT_SECRET, DROPBOX_REFRESH_TOKEN
            </p>
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
          clientId={clientId}
          clientSecret={clientSecret}
          refreshToken={refreshToken}
        />
      </main>
    </div>
  );
}

export default App;
