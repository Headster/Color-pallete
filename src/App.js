import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ColorPallete from './components/ColorPallete';
import ModelViewer from './components/ModelViewer';

const App = () => {
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [showPallete, setShowPallete] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const handleShowPallete = () => {
    setShowPallete(true);
  };

  const handleShowViewer = () => {
    setShowViewer(true);
    setShowFileUpload(false);
    setShowPallete(false);
  };

  return (
    <>
      {showFileUpload && <FileUpload onFileUpload={handleShowPallete} />}
      {showPallete && <ColorPallete GenerateNewModel={handleShowViewer} />}
      {showViewer && <ModelViewer />}
    </>
  )
};

export default App;
