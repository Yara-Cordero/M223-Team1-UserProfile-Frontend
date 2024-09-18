import React from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";
import isImageURL from 'image-url-validator';
import UserProfileService from "../../../Services/UserProfileService";

interface UserProfileProps {
    userProfile: UserProfile | undefined | null;
    isDisabled: boolean;
}


const UserProfileSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    address: Yup.string().min(3, "too short").max(50, "too long"),
    birthday: Yup.date().nullable(),
        /*
        .test("Check Max Date", "", (value) => {
            const date = value ? new Date(value) : new Date();
            let today = new Date();

            return value ? today >= date : true;
        }),

         */
    profilePicture: Yup.string()
        /*.test("Check if URL is an image", "Link is not an image.", value => {
            return isImageURL(value as string);
        }),

         */
});



const UserProfileForm = ({userProfile, isDisabled} : UserProfileProps) => {


    const submitHandler = (values: UserProfile) => {
        try {
            if(values.username) {
                UserProfileService.updateUserProfile(values)
                    .then(() => {
                        console.log("UserProfile Updated");
                    })
            } else {
                UserProfileService.addUserProfile(values)
                    .then(() => {
                        console.log("UserProfile Created")
                    })
            }
        }catch (error) {
            console.log(error);
        }
    };


    const formik = useFormik({
        initialValues : {
            id : userProfile ? userProfile.id : '',
            username: userProfile ? userProfile.username : '',
            address: userProfile ? userProfile.address : '',
            birthday: userProfile ? userProfile.birthday : undefined,
            profilePicture: userProfile ? userProfile.profilePicture: '',
        },
        validationSchema: UserProfileSchema,
        onSubmit : (values: UserProfile) => {
            console.log(values);
            submitHandler(values);
        },
        enableReinitialize: true,
    });



    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                <Box sx={{ paddingTop: '30px' }}>
                    <TextField
                        id="profilePicture"
                        name="profilePicture"
                        label="Profilpicture URL"
                        variant="outlined"
                        value={formik.values.profilePicture}
                        onChange={formik.handleChange}
                        error={formik.touched.profilePicture && Boolean(formik.errors.profilePicture)}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        disabled={isDisabled}
                    />
                    {formik.errors.username && formik.touched.username ? (
                        <div>{formik.errors.username}</div>
                    ) : null}
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        variant="outlined"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="birthday"
                        name="birthday"
                        label="Birthday"
                        variant="outlined"
                        value={formik.values.birthday}
                        onChange={formik.handleChange}
                        error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                        disabled={isDisabled}
                    />
                </Box>
                    <div>
                        {!isDisabled && (
                            <Button
                                sx={{ marginTop: '15px', marginRight: '10px' }}
                                variant="outlined"
                                type="submit"
                                disabled={!formik.isValid}
                            >
                                Save
                            </Button>
                        )}
                    </div>
            </form>
        </div>
    );
}

export default UserProfileForm;