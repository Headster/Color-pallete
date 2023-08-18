import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ColorPallete from './components/ColorPallete';
import ModelViewer from './components/ModelViewer';
import Loading from './components/Loading';

const App = () => {
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [showPallete, setShowPallete] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [colors, setColors] = useState([]);
  const [newModelUrl, setNewModelUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowPallete = (uploadedColors) => {
    setColors(uploadedColors);
    setShowPallete(true);
  };

  const handleLoading = (loading) => {
    setLoading(loading);
  };

  const handleShowViewer = (newUrl) => {
    setShowViewer(true);
    setShowFileUpload(false);
    setShowPallete(false);
    setNewModelUrl(newUrl);
  };

  return (
    <>
      {showFileUpload && <FileUpload onFileUpload={handleShowPallete} onLoading={handleLoading} />}
      {showPallete && <ColorPallete GenerateNewModel={handleShowViewer} colors={colors} onLoading={handleLoading} />}
      {showViewer && <ModelViewer newModelUrl={newModelUrl} />}
      <Loading loading={loading} />
    </>
  )
};

export default App;
