import React, { useState, useRef, useEffect } from "react";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { ColorWrapper, PalleteWrapper, ColorName, ColorBox } from './ColorPallete.styles';

const ColorPalette = ({ colorData, onColorChange }) => {
    const [color, setColor] = useColor(colorData.color);
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
        if (color.hex !== colorData.color) {
            onColorChange(color.hex);
        }
    }, [color, colorData.color, onColorChange]);

    return (
        <ColorWrapper ref={paletteRef}>
            <ColorName>{colorData.name}:</ColorName>
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

const App = ({ GenerateNewModel }) => {
    const [predefinedColors, setPredefinedColors] = useState([
        { color: '#561ecb', name: 'Color 1' },
        { color: '#ffffff', name: 'Color 2' },
        { color: '#000000', name: 'Color 3' }
    ]);

    const handlePaletteColorChange = (index, newColor) => {
        setPredefinedColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index].color = newColor;
            return newColors;
        });
    };

    return (
        <>
            <ColorPaletteList colorArray={predefinedColors} onPaletteColorChange={handlePaletteColorChange} />
            <button onClick={GenerateNewModel}>Generate new model</button>
        </>
    );
};

export default App;
