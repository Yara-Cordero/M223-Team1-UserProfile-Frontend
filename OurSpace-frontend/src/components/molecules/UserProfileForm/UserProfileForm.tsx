import React from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {object} from "yup";
import {Box} from "@mui/system";
import {Button, TextField} from "@mui/material";


interface UserProfileForm {
    userProfile: UserProfile;
    submitActionHandler: (values : UserProfile) => void
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
        profilePicture: Yup.string(),
    })
})

function UserProfileForm({userProfile, submitActionHandler}: UserProfileForm) {

    const formik = useFormik({
        initialValues : {
            username: userProfile ? userProfile.username : '',
            address: userProfile ? userProfile.address : '',
            birthdate: userProfile ? userProfile.birthdate : new Date(0),
            profilePicture: userProfile ? userProfile.profilePicture: '',
            user: userProfile ? userProfile.user : null,
        },
        validationSchema: (UserProfileSchema),
        onSubmit(values: UserProfile): void {
            return submitActionHandler(values);
        },
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
                    />
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
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