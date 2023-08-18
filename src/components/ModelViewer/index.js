import React, { useState } from "react";
import { Wrapper, DownloadBtn } from './ModelViewer.styles';
import Ring from './diamond_ring.glb';

const ModelViewer = ({ newModelUrl }) => {
    const [modelData, setModelData] = useState(null);

    // Example model URL
    const modelUrl = newModelUrl['Object url'];

    return (
        <Wrapper>
            <model-viewer
                src={modelUrl}
                ios-src=""
                alt="A 3D Model"
                loading="lazy"
                auto-rotate
                camera-controls
                style={{
                    height: "100vh",
                    width: "100vw",
                    contain: "none",
                    overflow: "unset !important"
                }}
            ></model-viewer>
            <DownloadBtn href={modelUrl} download="3d_model.glb">Download 3D model</DownloadBtn>
        </Wrapper>
    );
};

export default ModelViewer;
