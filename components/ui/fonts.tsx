import { Global } from "@emotion/react";

const Fonts = () => {
    return (
        <Global
            styles={`
                @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
            `}
        />
    );
}

export default Fonts;
