import React from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";
import UserProfileService from "../../../Services/UserProfileService";

interface UserProfileProps {
    userProfile: UserProfile | undefined | null;
    isDisabled: boolean;
}


const UserProfileSchema = Yup.object().shape({
    username: Yup.string().required("required").min(1, "min. 1 letter").max(50, "max. 50 letters"),
    address: Yup.string().min(3, "min. 3 letters").max(50, "max. 50 letters"),
    birthday: Yup.string().nullable()
        .test("Check Max Date", "Date is invalid.", (value) => {
            const date = value ? new Date(value) : new Date();
            date.setHours(0, 0, 0, 0);
            let today = new Date();
            today.setHours(0, 0, 0, 0);

            return value ? today >= date : true;
        }),
    profilePicture: Yup.string()
        .url("Invalid URL format.")
});



const UserProfileForm = ({userProfile, isDisabled} : UserProfileProps) => {

    const formatDate = ((date : Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    });




    const submitHandler = (values: UserProfile) => {
        try {
            const payload ={
                ...values,
                birthday : values.birthday ? new Date(values.birthday) : undefined,
            }
            if(values.username) {
                UserProfileService.updateUserProfile(payload)
                    .then(() => {
                        console.log("UserProfile Updated");
                    })
            } else {
                UserProfileService.addUserProfile(payload)
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
            birthday: userProfile && userProfile.birthday ? formatDate(new Date(userProfile.birthday)) : '',
            profilePicture: userProfile ? userProfile.profilePicture: '',
        },
        validationSchema: UserProfileSchema,
        onSubmit : (values: UserProfile) => {
            console.log(values);
            submitHandler(values);
        },
        enableReinitialize: true,
        validateOnChange: true
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
                        helperText={formik.errors.profilePicture}
                        disabled={isDisabled}
                    />
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.errors.username}
                        disabled={isDisabled}
                    />
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        variant="outlined"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.errors.address}
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
                        helperText={formik.errors.birthday}
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