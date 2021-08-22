import { useParams } from "react-router";
import { useEffect, useState } from "react";

import config from "../config";

const Redirect = () => {
    const { id } = useParams();

    const [originalLink, setOriginalLink] = useState('');
    const [linkFetchState, setLinkFetchState] = useState(0);

    useEffect(() => {
        if (linkFetchState === 0) {
            setLinkFetchState(1);
            config.axios.get('/' + id)
                .then((response) => {
                    setOriginalLink(response.data.original_link);
                    setLinkFetchState(2);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    });

    if (linkFetchState === 2) {
        window.location.assign(originalLink);
    }
    
    return null;
};

export default Redirect;