import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "./Context";
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';



export default function Gender(props) {

    const [genderUserList, setgenderUserList] = useState([]);

    const forms = useSelector((state) => state.formData);

    const familyDetails = useSelector((state) => state.familyDetail)
    const gender_reducer = useSelector((state) => state.gender)

    const [genderList, setgenderList] = useState([]);

    const animatedComponents = makeAnimated();

    const initialGenders = ['', ''];
    const [selectedGenders, setSelectedGenders] = useState(initialGenders);


    const [userGender, setuserGender] = useState([]);


    const dispatch = useDispatch();
    const selectRef = useRef(null);



    const { formValues, handleChange, handleNext, variant, margin, handleBack } = useContext(
        AppContext
    );


    useEffect(() => {

        const getAllMaster = async () => {

            const callAPi = await fetch('/urban/api/gender-api');

            const res = await callAPi.json();

            let members = [];

            const { gender } = res || {};

            let gender_list = [];

            console.log(gender, "Asdjhqwkansdjfdqwkansd")

            for (let i = 0; i < gender.length; i++) {

                let object = { label: gender[i].genderName, value: gender[i].id }
                gender_list.push(object);
                setgenderList(gender_list)


                if (forms) {
                    const { value } = forms || {};

                    if (value.length > 0) {

                        for (let a = 0; a < value.length; a++) {



                            if (value[a].memberName) {



                                if (gender[i].genderName === "Male") {
                                    if (value[a].gender === "M") {

                                        console.log(gender[i].genderName, "gender list")
                                        console.log(value[a].gender, "gender list")

                                        let object = { label: gender[i].genderName, name: value[a].memberName, gender: value[a].gender, value: gender[i].id, selectValue: { label: gender[i].genderName, value: gender[i].id } };
                                        members.push(object)
                                    }
                                }
                                if (gender[i].genderName === "Female") {
                                    if (value[a].gender === "F") {
                                        let object = { label: gender[i].genderName, name: value[a].memberName, gender: value[a].gender, value: gender[i].id, selectValue: { label: gender[i].genderName, value: gender[i].id } };
                                        members.push(object)
                                    }
                                }

                                if (gender[i].genderName === "Others") {
                                    if (value[a].gender === "O") {
                                        let object = { label: gender[i].genderName, name: value[a].memberName, gender: value[a].gender, value: gender[i].id, selectValue: { label: gender[i].genderName, value: gender[i].id } };
                                        members.push(object)
                                    }
                                }


                            }
                        }



                    }

                }

                console.log(members, "ASnfowqjpdaklsjfoewqidl")
                setgenderUserList(members)
                setSelectedGenders(members)




            }






        }

        getAllMaster();

        // dispatch(onGenderList())

    }, [])






    const setGender = (props, value, name) => {
        let gender_list = [];
        let data = genderUserList;

        console.log(value, "asjdbhqwuikjasviqwuk")


        for (var i = 0; i < data.length; i++) {
            if (data[i].name === name) {
                // Update the value key for this entry
                data[i].value = value;
                // data[i].gender = newGender;

            }


        }

        console.log(data, "asdiwhuaqdjks")

        setgenderUserList(data);



    }






    function setGenderDefault(item, index) {


        let genderId = "-";

        for (let i = 0; i < genderList.length; i++) {

            if (item.gender === "F") {

                if (genderList[i].label == "Female") {
                    console.log(genderList[i], "asjndaskdasjdladoqwendalsdjkqwloqwfen")
                    return genderList[i].value;
                }
            }
            else if (item.gender === "M") {
                if (genderList[i].label == "Male") {
                    return genderList[i].value;
                }
            }
            else if (item.gender === "O") {
                if (genderList[i].label == "Others") {
                    return genderList[i].value;
                }
            }
            else {
                return 0;
            }

        }


        console.log(genderId, "Asdhasdqwdjwihudqjasknchfuidzl")

        // return genderId;

    }


    useEffect(() => {

        console.log(genderUserList, "Asdasdasdhasdqwdjwihudqjasknchfuidzl")
    }, [setgenderUserList])


    const handleGenderChange = (event, index) => {
        console.log(event, "ASdfjjodiwlmakjsm")
        const newSelectedGenders = [...selectedGenders];

        console.log(newSelectedGenders[index], "Adjskbqijwlkasdfbuowqijfleskd")

        for (let i = 0; i < genderList.length; i++) {

            if (genderList[i].value === event.value) {
                newSelectedGenders[index].gender = genderList[i].label;
                newSelectedGenders[index].selectValue = event;


            }

        }
        newSelectedGenders[index].selectValue = event;
        newSelectedGenders[index].value = event.value;
        setSelectedGenders(newSelectedGenders);

        console.log(newSelectedGenders, "aasdasdkkdjiqwlaksilaskd")

    };


    return (
        <>
            {selectedGenders && selectedGenders.length > 0 && selectedGenders.map((item, index) => {
                // console.log(item.selectValue.value, "asdmskaldasldkewald")
                return (
                    <Grid container spacing={2} key={index} mt={1}>

                        <Grid item xs={12} sm={4}>
                            <Typography >
                                {item.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>

                            <Select
                                closeMenuOnSelect={true}
                                value={item.selectValue}
                                options={genderList}
                                onChange={(event) => handleGenderChange(event, index)}
                            />

                        </Grid>






                    </Grid>
                )


            })}



            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={isError()}
                    // color="success"
                    onClick={() => handleBack()}
                    style={{ backgroundColor: 'blue' }}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Back
                </Button>



                <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    // disabled={isError()}
                    // color="success"
                    onClick={() => handleNext()}
                    style={{ backgroundColor: 'blue' }}
                // onClick={!isError() ? handleNext : () => null}
                >
                    Save and Proceed
                </Button>
            </Box>
        </>
    );
}
