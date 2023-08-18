import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { ColorWrapper, PalleteWrapper, ColorName, ColorBox } from './ColorPallete.styles';

const ColorPalette = ({ colorData, onColorChange }) => {
    const [color, setColor] = useColor(colorData);
    const [isOpen, setIsOpen] = useState(false);
    const paletteRef = useRef(null);

    const togglePalette = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (paletteRef.current && !paletteRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (color.hex !== colorData) {
            onColorChange(color.hex);
        }
    }, [color, colorData, onColorChange]);

    return (
        <ColorWrapper ref={paletteRef}>
            <ColorName>{colorData}:</ColorName>
            <ColorBox style={{ backgroundColor: color.hex }} onClick={togglePalette} />
            {isOpen && (
                <PalleteWrapper>
                    <ColorPicker color={color} onChange={setColor} />
                </PalleteWrapper>
            )}
        </ColorWrapper>
    );
};

const ColorPaletteList = ({ colorArray, onPaletteColorChange }) => {
    return (
        <div>
            {colorArray.map((colorData, index) => (
                <ColorPalette
                    key={index}
                    colorData={colorData}
                    onColorChange={(newColor) => onPaletteColorChange(index, newColor)}
                />
            ))}
        </div>
    );
};

const App = ({ GenerateNewModel, colors, onLoading }) => {
    // const [predefinedColors, setPredefinedColors] = useState([
    //     { color: '#561ecb', name: 'Color 1' },
    //     { color: '#ffffff', name: 'Color 2' },
    //     { color: '#000000', name: 'Color 3' }
    // ]);

    const [predefinedColors, setPredefinedColors] = useState(colors['Colors']);

    const handlePaletteColorChange = (index, newColor) => {
        setPredefinedColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = newColor;
            return newColors;
        });
    };

    const handleGenerateNewModel = () => {

        const originalString = colors['Object url'];
        const substringToRemove = 'https://cvt-upload-files.s3.eu-north-1.amazonaws.com/';
        const modifiedUrl = originalString.replace(substringToRemove, '');
        const colorsArray = predefinedColors.join(' ');

        onLoading(true);

        axios.post('http://3.75.175.62:8080/v1/recolor-mesh/', {
            product_id: '1',
            colors: colorsArray,
            input_obj_link: modifiedUrl
        })
            .then(response => {
                console.log('Response: ', response.data);
                GenerateNewModel(response.data);
                onLoading(false);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    return (
        <>
            <ColorPaletteList colorArray={predefinedColors} onPaletteColorChange={handlePaletteColorChange} />
            <button onClick={handleGenerateNewModel}>Generate new model</button>
        </>
    );
};

export default App;
