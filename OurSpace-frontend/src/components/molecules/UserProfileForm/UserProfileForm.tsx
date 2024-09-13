import React, {useContext, useEffect, useState} from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";
import isImageURL from 'image-url-validator';
import {User} from "../../../types/models/User.model";
import UserProfileService from "../../../Services/UserProfileService";

interface UserProfileProps {
    activeUser: User | undefined | null;
    isDisabled: boolean;
}


const UserProfileSchema = Yup.object().shape({
    userProfile: object({
        username: Yup.string().required("Required"),
        address: Yup.string().min(3).max(50),
        birthdate: Yup.date().nullable()
            .test("Check Max Date", "", (value) => {
                const date = value ? new Date(value) : new Date();
                let today = new Date();

                return value ? today >= date : true;
            }),
        profilePicture: Yup.string()
            .test("Check if URL is an image", "Link is not an image.", value => {
                return isImageURL(value as string);
            }),
    })
});



const UserProfileForm = ({activeUser, isDisabled} : UserProfileProps) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null );


    useEffect(() => {
        return (() => {
            if (activeUser) {
                UserProfileService.getUserProfile(activeUser)
                    .then((userProfile: UserProfile) => {
                        console.log(userProfile);
                        setUserProfile(userProfile);
                    })
            } else {
                isDisabled = true;
            }
        })
    }, [activeUser]);


    const submitHandler = (values: UserProfile) => {
        if(values.username !== undefined) {
            UserProfileService.updateUserProfile(values)
                .then(() => {

                })
        } else {
            UserProfileService.addUserProfile(values)
                .then(() => {

                })
        }
    };




    const formik = useFormik({
        initialValues : {
            username: userProfile ? userProfile.username : '',
            address: userProfile ? userProfile.address : '',
            birthdate: userProfile ? userProfile.birthdate : new Date(0),
            profilePicture: userProfile ? userProfile.profilePicture: '',
            user: userProfile ? userProfile.user : null,
        },
        validationSchema: UserProfileSchema,
        onSubmit : submitHandler,
        enableReinitialize: true,
    });



    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <Box sx={{ paddingTop: '15px' }}>
                    <TextField
                        id="profilePicture"
                        label="Profilpicture URL"
                        variant="outlined"
                        value={formik.values.profilePicture}
                        onChange={formik.handleChange}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={formik.values.address}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        variant="outlined"
                        value={formik.values.birthdate}
                        disabled={isDisabled}
                    />
                </Box>
                    <div>
                        <Button
                            sx={{ marginTop: '15px', marginRight: '10px' }}
                            variant="outlined"
                            type="submit"
                            disabled={!(formik.isValid) || isDisabled}
                        >
                            Save
                        </Button>
                    </div>
            </form>
        </div>
    );
}

export default UserProfileForm;