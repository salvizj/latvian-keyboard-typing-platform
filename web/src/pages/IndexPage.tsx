import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';

const IndexPage = () => {
    const [finished, setFinished] = useState(false);

    return (
        <>
            <Keyboard
                text="fsdfsdf sdf asdf dsaf dsa fsdf dsa fasdf sdaf asdf sdaf sdaf asdf adsf asdf asdf"
                finished={finished}
                setFinished={setFinished}
            />
        </>
    );
};

export default IndexPage;
