import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {useForm, ValidationError} from '@formspree/react';

function ContactForm({modal, toggle}) {
    const [state, handleSubmit] = useForm('mlekvbpw');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    // const [showAlert, setShowAlert] = useState(false);

    if (state.succeeded) {
        return <div className="alert alert-success" role="alert">
            <strong>Your email send successfully!</strong>
            <button style={{marginLeft: "10px"}} type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"></button>
        </div>
    }

    // useEffect(() => {
    //     if (state.succeeded) {
    //         setShowAlert(true);
    //         setTimeout(() => {
    //             setShowAlert(false);
    //         }, 3000);
    //     }
    // }, [state.succeeded]);

    const handleCancel = () => {
        setAddress('');
        setMessage('');
        toggle();
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await handleSubmit(e);
        handleCancel();
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={handleCancel}>
                <ModalHeader toggle={handleCancel}>Send Your Message</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmitForm}>
                        <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Your Email:
              </span>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                placeholder="type your email address ..."
                            />
                        </div>
                        <ValidationError prefix="Email" field="email" errors={state.errors}/>
                        <div className="input-group">
                            <span className="input-group-text">Message:</span>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="type your message ..."
                                className="form-control"
                                aria-label="With textarea"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                        <ValidationError prefix="Message" field="message" errors={state.errors}/>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                            <button
                                className="btn btn-primary"
                                type="submit"
                                style={{width: '100%'}}
                                disabled={state.submitting || address === '' || message === ''}
                            >
                                Submit Your Message
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            {/*{showAlert && (*/}
            {/*    <div className="alert alert-success" role="alert">*/}
            {/*        <strong>Your email send successfully!</strong>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default ContactForm;

