import { Global } from "@emotion/react";

const Fonts = () => {
    return (
        <Global
            styles={`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700&family=Open+Sans:wght@300&family=Ysabeau+Infant:wght@300&display=swap');
            `}
        />
    );
}
 
export default Fonts;
