import React, { useState, useEffect } from "react";
import axios from "axios";
import CollapsibleMenu from "./CollapsibleMenu";
import DataViewer from "./DataViewer";
import { DropboxTokenManager } from "../utils/dropboxTokenManager";

// Interface for hierarchical data
interface TreeNode {
  node: string;
  description?: string;
  input?: string;
  output?: string;
  nodes?: TreeNode[];
}

interface HierarchicalViewerProps {
  dropboxAccessToken: string;
  filePath: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

const HierarchicalViewer: React.FC<HierarchicalViewerProps> = ({
  dropboxAccessToken,
  filePath,
  clientId,
  clientSecret,
  refreshToken,
}) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TreeNode | null>(null);

  // Create a token manager that provides a Dropbox client with auto-refresh enabled.
  const [tokenManager] = useState(
    () =>
      new DropboxTokenManager(
        clientId,
        clientSecret,
        refreshToken,
        dropboxAccessToken
      )
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get a Dropbox client instance using the token manager.
        const dbx = tokenManager.getDropboxClient();

        // Get a temporary link to download the file.
        const { result } = await dbx.filesGetTemporaryLink({ path: filePath });

        // Download the file content using the temporary link.
        const response = await axios.get(result.link);

        // The file data is expected to have an "Avant Leap Dynamo Nodes" array.
        const rootNodes = response.data["Avant Leap Dynamo Nodes"];
        setTreeData(rootNodes);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data from Dropbox");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filePath, tokenManager]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!treeData || treeData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="hierarchical-viewer">
      <div className="menu-container">
        {treeData.map((node, index) => (
          <CollapsibleMenu key={index} data={node} onSelect={setSelectedItem} />
        ))}
      </div>
      <div className="data-container">
        <DataViewer data={selectedItem} />
      </div>
    </div>
  );
};

export default HierarchicalViewer;
