import React from "react";
import "../styles/DataViewer.css";

interface DataViewerProps {
  data: {
    node: string;
    description?: string;
    input?: string;
    output?: string;
    nodes?: any[];
  } | null;
}

const DataViewer: React.FC<DataViewerProps> = ({ data }) => {
  if (!data) {
    return <div className="data-viewer">Select a node to view details</div>;
  }

  const formatInput = (input: string) => {
    return input.split(",").map((item, index) => (
      <div key={index} className="input-item">
        {item.trim()}
      </div>
    ));
  };

  const hasInputOrOutput = data.input || data.output;

  return (
    <div className="data-viewer">
      <h2 className="node-title">{data.node}</h2>
      <div className={`data-grid ${!hasInputOrOutput ? "full-width" : ""}`}>
        {hasInputOrOutput && (
          <div className="left-column">
            {data.input && (
              <div className="data-section">
                <h3>Input</h3>
                <div className="input-list">{formatInput(data.input)}</div>
              </div>
            )}
            {data.output && (
              <div className="data-section">
                <h3>Output</h3>
                <p>{data.output}</p>
              </div>
            )}
          </div>
        )}
        <div className="right-column">
          {data.description && (
            <div className="data-section">
              <h3>Description</h3>
              <p>{data.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataViewer;
