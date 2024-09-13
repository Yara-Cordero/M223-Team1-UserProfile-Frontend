import React, {useContext, useEffect, useState} from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";
import isImageURL from 'image-url-validator';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";



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



function UserProfileForm() {
    const {loadActiveUser} = useContext(ActiveUserContext);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null );

    /*
    useEffect(() => {
        return (() => {
            UserInfoService.getUserProfile(loadActiveUser)
                .then((userProfile : UserProfile) => {
                    console.log(userProfile);
                    setUserProfile(userProfile);
                })
        })
    }, [loadActiveUser]);


    const submitHandler = (values: UserProfile) => {
        if(values.username !== undefined) {
            UserInfoService.updateUserProfile(values)
                .then(() => {

                })
        } else {
            UserInfoService.createUserProfile(values)
                .then(() => {

                })
        }
    }
     */


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
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ paddingTop: '15px' }}>
                    <TextField
                        id="profilePicture"
                        label="Profilpicture URL"
                        variant="outlined"
                        value={formik.values.profilePicture}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="address"
                        label="Address"
                        variant="outlined"
                        value={formik.values.address}
                    />
                    <TextField
                        id="birthdate"
                        label="Birthdate"
                        name="birthdate"
                        variant="outlined"
                        value={formik.values.birthdate}
                    />
                </Box>
                    <div>
                        <Button
                            sx={{ marginTop: '15px', marginRight: '10px' }}
                            variant="outlined"
                            type="submit"
                            disabled={!(formik.isValid)}
                        >
                            Save
                        </Button>
                    </div>
            </form>
        </div>
    );
}

export default UserProfileForm;