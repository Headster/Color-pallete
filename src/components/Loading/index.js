import React, { useState } from "react";
import { Wrapper, Loader } from './Loading.styles';

const Loading = ({ loading }) => {
    return (
        <Wrapper style={{ display: loading ? 'flex' : 'none' }}>
            <Loader />
        </Wrapper>
    );
};

export default Loading;
