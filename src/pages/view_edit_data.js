import React, { useEffect, useState } from "react";
import Layout from "../components/dashboard/layout";
import { useDispatch, useSelector } from "react-redux";
import { onFamiliesList } from "../network/actions/familiesList";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { onShowLoader } from "../network/actions/showLoader";
import { getDistrict, getPanchayat, getRoles, getToken, getVillage } from "../utils/cookie";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ClosedCaption } from "@mui/icons-material";
import ErrorSnack from "../utils/ErrorSnack";
import { TableBody } from "mui-datatables";
import Filters from "../components/dashboard/filters";
import Members from "../components/verify/members/Members";
import FamilyDetails from "../components/verify/family/FamilyDetails";
import FamilyDetailsHeader from "../components/verify/family/FamilyDetailsHeader";
import MemberDetailsHeader from "../components/verify/members/MemberDetailsHeader";
import EditFamily from "../components/verify/family/EditFamily";
import Families from "../components/verify/family/Families";

const columns = [
  {
    id: "name",
    label: "Head of Family",
    minWidth: 170,
    align: "center",
    fontWeight: "bold",
  },
  { id: "kisanId", label: "Kisan Id.", minWidth: 100, align: "center" },
  {
    id: "totalFamilyMembers",
    label: "Total Members",
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "aadhaarNumber",
    label: "Aadhar Number",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "qualification",
    label: "Qualification",
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "view",
    label: "Action",
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #83a2b2",
  boxShadow: 30,
  height: "90vh",
  overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 2,
};

function CustomCellRenderer(params) {
  const cellValue = params.value;

  const cellHeight =
    cellValue && cellValue.length > 1 ? cellValue.length * 20 : 40; // Adjust the height factor (20) as needed

  // Customize the cell rendering as needed
  return (
    <div style={{ height: `${cellHeight}px`, overflow: "auto" }}>
      {cellValue.map((item, index) => (
        <Typography
          style={{ color: "red", fontWeight: "500" }}
          key={index}
          variant="h7"
          component="h3"
        >
          {item}
        </Typography>
      ))}
    </div>
  );
}

const ViewData = () => {
  const [wardId, setWardId] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [municipalityId, setMunicipalityId] = useState();

  const [selectedItems, setSelectedItems] = useState([]);
  const [familyList, setfamilyList] = useState([]);
  console.log('familyList', familyList)
  const [selectedFamily, setselectedFamily] = useState({});
  const [detailCalled, setdetailCalled] = useState(false);
  const [isCardClicked, setCardClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");

  const [totalPages, settotalPages] = React.useState(0);

  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const dispatch = useDispatch();
  const familiesList = useSelector((state) => state.familiesList);
  console.log('familiesList', familiesList)

  // const familiesDetailApi = useSelector((state) => state.familiesDetailApi);
  const familiesDetailApi = {data : {
    "districtName": "SOLAN",
    "members": [
        {
            "memberName": "NIRMLA DEVI",
            "rationCardNumber": "HP201511380917",
            "dateOfBirth": "07-02-1980",
            "relation": "Wife (W/O)",
            "relativeName": "late shri Pyaar lal",
            "aadhaarNumber": 473734346615,
            "mobileNumber": "9882415295",
            "gender": "Female",
            "isEkycVerified": true,
            "educationQualification": "Matric",
            "occupation": "Trader/Shopkeeper\n",
            "emailAddress": "nirmalabhati39@gmail.com",
            "himMemberId": 246657000,
            "isBonafide": true,
            "isActive": true,
            "aadhaarDocument": null
        },
        {
            "memberName": "SHALINI",
            "rationCardNumber": "HP201511380917",
            "dateOfBirth": "14-11-2001",
            "relation": "Daughter (D/O)",
            "relativeName": "late shri Pyaar lal",
            "aadhaarNumber": 966636456177,
            "mobileNumber": "9882415245",
            "gender": "Female",
            "isEkycVerified": true,
            "educationQualification": "Graduate",
            "occupation": "Student",
            "emailAddress": "nirmalabhati39@gmail.com",
            "himMemberId": 388701955,
            "isBonafide": true,
            "isActive": true,
            "aadhaarDocument": null
        },
        {
            "memberName": "DIVYA",
            "rationCardNumber": "HP201511380917",
            "dateOfBirth": "27-01-2004",
            "relation": "Daughter (D/O)",
            "relativeName": "late shri Pyaar lal",
            "aadhaarNumber": 787975942598,
            "mobileNumber": "9882415245",
            "gender": "Female",
            "isEkycVerified": true,
            "educationQualification": "Senior Secondary",
            "occupation": "Student",
            "emailAddress": "nirmalabhati39@gmail.com",
            "himMemberId": 882832921,
            "isBonafide": true,
            "isActive": true,
            "aadhaarDocument": null
        },
        {
            "memberName": "HEMANT",
            "rationCardNumber": "HP201511380917",
            "dateOfBirth": "14-12-2001",
            "relation": "Son (S/O)",
            "relativeName": "late shri Pyaar lal",
            "aadhaarNumber": 614798653698,
            "mobileNumber": "9882415245",
            "gender": "Male",
            "isEkycVerified": true,
            "educationQualification": "Graduate",
            "occupation": "Private Employee",
            "emailAddress": "nirmalabhati39@gmail.com",
            "himMemberId": 933972025,
            "isBonafide": true,
            "isActive": true,
            "aadhaarDocument": null
        }
    ],
    "membersDropDownList": [
        {
            "himMemberId": 246657000,
            "name": "NIRMLA DEVI"
        },
        {
            "himMemberId": 388701955,
            "name": "SHALINI"
        },
        {
            "himMemberId": 882832921,
            "name": "DIVYA"
        },
        {
            "himMemberId": 933972025,
            "name": "HEMANT"
        }
    ],
    "propertyDetail": {
        "propertyId": "00",
        "propertyDetails": "Owned",
        "rentGivenTo": "",
        "electricityConsumerNo": "100001186680",
        "waterConnectionNumber": "00"
    },
    "wardName": "Raboun-Angi Ward",
    "houseAddress": "Ward no 16, Sharanu, PO - Saproon, Tehsil & Distt Solan (HP) 173211",
    "rationCardNo": "HP201511380917",
    "himParivarId": 21845284,
    "economicStatus": "B.P.L",
    "socialCategory": "Scheduled Caste",
    "religion": "Hindu",
    "residentStatus": "Urban",
    "fileData": "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",
    "consentDocName": "HP201511380917_declaration_1716983348972.jpeg",
    "municipalName": "Solan ( Municipal Corporation )",
    "headOfFamily": "NIRMLA DEVI"
}};

  const [isAdmin, setIsAdmin] = useState(false);

  // const globalUser = getToken();
  const router = useRouter();

  useEffect(() => {
    const roles = JSON.parse(getRoles());
    console.log('roles', roles)
    // const { roles } = globalUser || {};
    // setIsAdmin(roles && roles.length > 0 && roles[0] === "Admin");
    setIsAdmin(
      roles &&
        roles.length > 0 &&
        (roles[0] === "Admin" || roles[0] === "Verifying Authority")
    );
  }, []);

  const handleFilterChange = ({ district, municipal, ward, village }) => {
    console.log("selectedDistrict value", district);
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);
    setSelectedVillage(village)
    const queryParams = createQueryParamsDefault(
      0,
      100,
      district?.code,
      municipal?.value,
      ward?.id,
      village?.value,
      1
    );
    console.log("params", queryParams);
    dispatch(onFamiliesList(queryParams));
  };

  const handleCardClick = () => {
    setCardClicked(!isCardClicked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("selectedDistrict", selectedDistrict);
    console.log("selectedMunicipality", selectedMunicipality);
    console.log("selectedMunicipality", selectedWard);

    if (selectedDistrict || selectedMunicipality || selectedWard) {
      console.log("Inside x", selectedDistrict);
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        selectedDistrict?.code,
        selectedMunicipality?.municipalId,
        selectedWard?.id,
        1
      );
      console.log("queryParams", queryParams);
      dispatch(onFamiliesList(queryParams));
    } else {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};
      const queryParams = createQueryParamsDefault(
        newPage - 1,
        100,
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id,
        1
      );
      console.log("queryParams", queryParams);
      dispatch(onFamiliesList(queryParams));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (familiesDetailApi?.data) {
      // const { data, status, message, rationCardAlreadyExists } =
      //   familiesList.data || {};
      // setShowModal(true);
      // setrationList(data);

      setselectedFamily(familiesDetailApi?.data);
      setdetailCalled(false);
    }
  }, [familiesDetailApi]);

  useEffect(() => {
    // setShowModal(false);
    if (familiesList?.error) {
      setOpen(true);

      if (familiesList?.error?.response?.data?.message) {
        seterrorMessage(familiesList.error.response.data.message);
      }
    }
    if (familiesList?.data) {
      const { data, status, message, rationCardAlreadyExists } =
        familiesList.data || {};

      //dispatch(onShowLoader(true));

      // setrationList(data);

      if (familiesList?.data?.totalPages) {
        setTotalPage(familiesList?.data?.totalPages);
      }

      setfamilyList(familiesList?.data);
      // setfamilyList();
    } else {
      //console.log(familiesList.);
    }
  }, [dispatch, familiesList]);

  const createQueryParamsDefault = (
    pageNumber,
    pageSize,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage,
    verificationStatusId
  ) => {
    const queryParams = {};
    if (pageNumber) queryParams.page = pageNumber;
    if (pageSize) queryParams.size = pageSize;
    if (selectedDistrict) queryParams.districtCode = selectedDistrict;
    if (selectedMunicipality) queryParams.blockCode = selectedMunicipality;
    if (selectedWard) queryParams.panchayatCode = selectedWard;
    if (selectedVillage) queryParams.villageCode = selectedVillage;
    // if (verificationStatusId)
    //   queryParams.verificationStatusId = verificationStatusId;

    console.log(queryParams);

    return queryParams;
  };

  useEffect(() => {
    const districtDetail = JSON.parse(getDistrict());
    const municipalityDetail = JSON.parse(getPanchayat());
    const ulb = JSON.parse(getVillage());
    // const { districtDetail, municipalityDetail, ulb, roles } = globalUser || {};

    const queryParams = createQueryParamsDefault(
      0,
      100,
      districtDetail?.districtCode,
      municipalityDetail?.municipalId,
      ulb?.id,
      1
    );
    dispatch(onFamiliesList(queryParams));
  }, []);

  //Testing Working Code
  const handleSendtoedit = (himParivarId, RationCard) => {
    console.log("HimParivar ID", himParivarId, "Ration Card", RationCard);

    // Construct the URL with query parameters
    const queryParam = new URLSearchParams({
      himParivarId,
      RationCard,
    }).toString();
    router.push(`/edit_modify?${queryParam}`);
  };

  return (
    <>
      <Layout>
        <Filters onChange={handleFilterChange} />
        {errorMessage && (
          <ErrorSnack open={open} setOpen={setOpen} message={errorMessage} />
        )}
        <main className="p-6 space-y-6">
          <>
            {familyList &&
            familyList.content &&
            familyList.content.length > 0 ? (
              <Grid container sx={{ background: "#FFF", borderRadius: 6 }}>
                <Grid
                  item={true}
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ background: "#FFF", borderRadius: 6 }}
                >
                  <div
                    style={{
                      display: "table",
                      tableLayout: "fixed",
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  >
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ height: "65vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns &&
                                columns.map((column, index) => (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      minWidth: column.minWidth,
                                      background: "#074465",
                                      color: "#FFF",
                                    }}
                                  >
                                    {column.label}
                                  </TableCell>
                                ))}
                            </TableRow>
                          </TableHead>
                          {familyList?.content &&
                            familyList?.content.map((row, index2) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={index2}
                                >
                                  {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        className="hoverable-cell"
                                        key={column.id}
                                        align={column.align}
                                        fontWeight={column.fontWeight}
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                        {index > 6 && (
                                          <>
                                            <Stack spacing={2} direction="row">
                                              {isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {
                                                    console.log(
                                                      row,
                                                      "Row Data"
                                                    );
                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    dispatch(
                                                      onFamiliesDetailApi(
                                                        row.himParivarId,
                                                        row.rationCardNo
                                                      )
                                                    );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )}
                                              {isAdmin && (
                                                <Button
                                                  color="error"
                                                  startIcon={<ModeEditIcon />}
                                                  onClick={() =>
                                                    handleSendtoedit(
                                                      row.himParivarId,
                                                      row.rationCardNo
                                                    )
                                                  }
                                                >
                                                  Verify
                                                </Button>
                                              )}
                                              {!isAdmin && (
                                                <Button
                                                  color="success"
                                                  startIcon={
                                                    <RemoveRedEyeIcon />
                                                  }
                                                  onClick={(handleEvent) => {
                                                    console.log(
                                                      row,
                                                      "Row Data"
                                                    );
                                                    setSelectedItems(row);
                                                    setdetailCalled(true);
                                                    setShowModal(true);
                                                    dispatch(
                                                      onFamiliesDetailApi(
                                                        row.himParivarId,
                                                        row.rationCardNo
                                                      )
                                                    );
                                                  }}
                                                >
                                                  View
                                                </Button>
                                              )}
                                            </Stack>
                                          </>
                                        )}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </Table>
                      </TableContainer>

                      <Box
                        style={{
                          padding: 10,
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Typography textAlign={"center"}>
                          Total Records Found: {familyList.totalElements}
                        </Typography>
                        <Pagination
                          style={{
                            padding: 10,
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          count={totalPage}
                          onChange={handleChangePage}
                          color="primary"
                        />
                      </Box>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <div>
                {/* This is the "else" case, modify as needed */}
                <p>No data available.</p>
              </div>
            )}

            <div className="p-4 flex-grow">
              <Modal
                open={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div style={{}}>
                    <Grid container>
                      <Grid item={true} xs={11.5}>
                        <FamilyDetailsHeader />
                      </Grid>

                      <Grid
                        item={true}
                        xs={0.5}
                        style={{
                          justifyContent: "flex-end",
                          alignContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => setShowModal(false)}
                        >
                          <HighlightOffIcon fontSize="medium" />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Paper elevation={3} variant="elevation">
                      <Families selectedFamily={selectedFamily} />
                    </Paper>
                    <Divider>&nbsp; &nbsp;</Divider>
                    <Grid container>
                      <Grid item={true} xs={12}>
                        <MemberDetailsHeader />
                      </Grid>
                    </Grid>
                    {selectedFamily?.members &&
                      selectedFamily?.members.map((memberObject, index) => (
                        <Paper
                          elevation={3}
                          variant="elevation"
                          style={{ marginBottom: 8 }}
                          key={index}
                        >
                          <Members memberObject={memberObject} />
                        </Paper>
                      ))}
                  </div>
                </Box>
              </Modal>
            </div>
          </>
        </main>
      </Layout>
    </>
  );
};

export default ViewData;
