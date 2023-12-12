"use client"

import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModelInputs from './AuthModelInputs';

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

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent;
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
                    <div className="p-2">
                        <div className="uppercase font-bold text-center pb-2 border0b mb-2">
                            <p className="text-small">
                                {renderContent("Sign in", "Create account")}
                            </p>
                        </div>
                        <div className="m-auto">
                            <h2 className="text-2xl font-light text-center">
                                {renderContent("Log into your account", "Create your open table account")}
                            </h2>
                            <AuthModelInputs/>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
