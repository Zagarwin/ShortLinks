import React, { useEffect, useState } from 'react';
import config from '../config';
import { 
    Form,
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap';

const LinkForm = () => {
    const baseUrl = 'localhost:3000/'

    const [url, setUrl] = useState('');
    const [isLoading, setLoading] = useState(false);

    const updateUrl = (event) => {
        setUrl(event.target.value);
    };

    const submitUrl = (event) => {
        setLoading(true);
        config.axios.post('/createShort', { url: url })
            .then((response) => {
                console.log('Response: ', response);
                setLoading(false);
                setUrl(baseUrl + response.data.short_id);
            })
            .catch((error) => {
                console.log(error);
            });
        event.preventDefault();
    };

    return(
        <Form onSubmit={submitUrl}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Your URL"
                    aria-label="Your URL"
                    aria-describedby="basic-addon"
                    value={url} 
                    onChange={updateUrl} 
                />
                <Button disabled={isLoading} variant="outline-secondary" id="button-addon" type="submit">
                    {isLoading ? 'Loading…' : 'Click to shorten'}
                </Button>
            </InputGroup>
        </Form>
    );
};

export default LinkForm;