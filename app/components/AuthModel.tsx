"use client"

import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModelInputs from './AuthModelInputs';
import { render } from 'react-dom';
import useAuth from '../../hooks/useAuth';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModel({ isSignIn }: { isSignIn: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {signin} = useAuth();

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent;
    }
    
    const [inputs, setinputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: ""
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const [disabed, setDisabled] = useState(true);

    useEffect(() => {
        if (isSignIn) {
            if (!inputs.password || !inputs.email) {
                setDisabled(true)
            }
        } else {
            if (inputs.firstName && inputs.lastName && inputs.email && inputs.city && inputs.password && inputs.phone ) {
                setDisabled(true)
            }
        }
    });

    const handleClick = () => {
        if(isSignIn) {
            signin({email: inputs.email, password: inputs.password});
        }
    }

    return (
        <div>
            <button className={`${renderContent("bg-blue-400 text-white border", "")} p-1 px-4 rounded mr-3`} onClick={handleOpen}>
                {renderContent("Sign in", "Sign up")}
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-2 h-[600px]">
                        <div className="uppercase font-bold text-center pb-2 border0b mb-2">
                            <p className="text-small">
                                {renderContent("Sign in", "Create account")}
                            </p>
                        </div>
                        <div className="m-auto">
                            <h2 className="text-2xl font-light text-center">
                                {renderContent("Log into your account", "Create your open table account")}
                            </h2>
                            <AuthModelInputs inputs={inputs} handleChangeInput={handleChangeInput} isSignIn={isSignIn} />
                            <button onClick={handleClick} className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-grey-400" disabled={disabed}>
                                {
                                    renderContent(
                                        "Sign In",
                                        "Create Account"
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
