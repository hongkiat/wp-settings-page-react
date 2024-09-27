import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { Button, TextField, Notice } from '@syntatis/kubrick';
import '@syntatis/kubrick/dist/index.css';

export const App = () => {
    const [status, setStatus] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const [values, setValues] = useState();

    // Load the initial settings when the component mounts.
    useEffect(() => {
        apiFetch({ path: '/wp/v2/settings' })
            .then((data) => {
                setValues({
                    admin_footer_text: data?.admin_footer_text,
                });
            })
            .catch((error) => {
                setStatus('error');
                setStatusMessage('An error occurred. Please try to reload the page.');
                console.error(error);
            });
    }, []);

    // Handle the form submission.
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        apiFetch({
            path: '/wp/v2/settings',
            method: 'POST',
            data: {
                admin_footer_text: data.get('admin_footer_text'),
            },
        })
            .then((data) => {
                setStatus('success');
                setStatusMessage('Settings saved.');
                setValues(data);
            })
            .catch((error) => {
                setStatus('error');
                setStatusMessage('An error occurred. Please try again.');
                console.error(error);
            });
    };

    if (!values) {
        return;
    }

    return (
        <>
            {status && <Notice level={status} isDismissable onDismiss={() => setStatus(null)}>{statusMessage}</Notice>}
            <form method="POST" onSubmit={handleSubmit}>
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label
                                    htmlFor="admin-footer-text"
                                    id="admin-footer-text-label"
                                >
                                    Admin Footer Text
                                </label>
                            </th>
                            <td>
                                <TextField
                                    aria-labelledby="admin-footer-text-label"
                                    id="admin-footer-text"
                                    className="regular-text"
                                    defaultValue={values?.admin_footer_text}
                                    name="admin_footer_text"
                                    description="This text will be displayed in the admin footer."
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button type="submit">Save Settings</Button>
            </form>
        </>
    );
};

export default App;
