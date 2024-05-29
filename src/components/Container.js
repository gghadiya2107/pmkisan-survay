import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";

import { onRationDetails } from "../network/actions/rationSearch";
import { useDispatch, useSelector } from "react-redux";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";

import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FaceRetouchingOffRounded } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";

import { onFamiliesList } from "../network/actions/familiesList";
import { onFamiliesDetailApi } from "../network/actions/familyDetailApi";
import { TopCard } from "./TopCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

import TableRow from "@mui/material/TableRow";

import { onShowLoader } from "../network/actions/showLoader";
import Filters from "./dashboard/filters";
import { getToken } from "../utils/cookie";
import { onDashboarFilters } from "../network/actions/dashboardFilter";

const columns = [
  { id: "headOfFamily", label: "Head of Family", minWidth: 170 },
  { id: "rationCardNo", label: "Ration No.", minWidth: 100 },
  {
    id: "municipalName",
    label: "Municipality",
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "economicStatus",
    label: "Economic Status",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "wardName",
    label: "Ward Name",
    minWidth: 120,
    align: "left",
    format: (value) => value.toFixed(2),
  },

  {
    id: "socialCategory",
    label: "Social Category",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "religion",
    label: "Religion",
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "residentStatus",
    label: "Resident",
    align: "left",
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
  // border: '2px solid #000',
  boxShadow: 30,
  maxHeight: "80vh",
  overflow: "hidden",
  overflowY: "auto",
  p: 4,
  borderRadius: 1,
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

const Dashboard = () => {


  /**Handle Filters and Call the External Service */
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedVillage, setSelectDisabledVillage] = useState(null);

  /**
   * Dashboard Object
   */
  const [surveyInfo, setSurveyInfo] = useState([]);
  const [verificationInfoList, setVerificationInfoList] = useState([]);
  const [aadhaarEkycInfoList, setAadhaarEkycInfoList] = useState([]);
  const [economicCategoryInfoList, setEconomicCategoryInfoList] = useState([]);
  const [retainInInfoList, setRetainInInfoList] = useState([]);
  

  const dispatch = useDispatch();
  const dashboardFilterState = useSelector(
    (state) => state.dashboardFilterRedux
  );

  console.log('dashboardFilterState', dashboardFilterState)

  const handleFilterChange = ({ district, municipal, ward,village }) => {
    setSelectedDistrict(district);
    setSelectedMunicipality(municipal);
    setSelectedWard(ward);
    setSelectDisabledVillage(village)

    console.log('allDataa', {district , municipal , ward , village})
    if (district || municipal || ward || village) {
      const queryParams = createQueryParams(district, municipal?.value, ward?.value, village?.value);
      console.log('queryParams', queryParams)
      dispatch(onDashboarFilters(queryParams));
    }
  };

  const createQueryParams = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage
  ) => {
    const queryParams = {};
    queryParams.districtId =
      selectedDistrict &&
      selectedDistrict.code !== null &&
      selectedDistrict.code !== undefined
        ? selectedDistrict.code
        : selectedDistrict;
    queryParams.municipalId =
      selectedMunicipality &&
      selectedMunicipality.value !== null &&
      selectedMunicipality.value !== undefined
        ? selectedMunicipality.value
        : selectedMunicipality;
    queryParams.wardId =
      selectedWard &&
      selectedWard.value !== null &&
      selectedWard.value !== undefined
        ? selectedWard.value
        : selectedWard;
    queryParams.villageId =
      selectedVillage &&
      selectedVillage.value !== null &&
      selectedVillage.value !== undefined
        ? selectedVillage.value
        : selectedVillage;
   
    // if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    // if (selectedWard) queryParams.wardId = selectedWard;
    // if (selectedVillage) queryParams.villageId = selectedVillage;
    console.log("queryParams", queryParams);
    return queryParams;
  };

  const createQueryParamsDefault = (
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
    selectedVillage
  ) => {
    const queryParams = {};

    if (selectedDistrict) queryParams.districtId = selectedDistrict;
    if (selectedMunicipality) queryParams.municipalId = selectedMunicipality;
    if (selectedWard) queryParams.wardId = selectedWard;
    if (selectedVillage) queryParams.villageId = selectedVillage;

    return queryParams;
  };

  /**
   * Calling the Use Effect with Default Ward ID, Municipality Id and District ID
   * Getting the Values from Global User
   * createQueryParamsDefault function is used to create parameters
   */

  useEffect(() => {
    try {
      const globalUser = JSON.parse(getToken());
      const { districtDetail, municipalityDetail, ulb, roles } =
        globalUser || {};

      const queryParams = createQueryParamsDefault(
        districtDetail?.districtCode,
        municipalityDetail?.municipalId,
        ulb?.id
      );
      dispatch(onDashboarFilters(queryParams));
    } catch (e) {}
  }, []);

  /**
   * Calling the Use Effect with On Onchange event of District, Municipality and Ward
   * Getting the Values from Global User
   * createQueryParams function is used
   */

  useEffect(() => {
    if (selectedDistrict || selectedMunicipality || selectedWard) {
      const queryParams = createQueryParams(
        selectedDistrict,
        selectedMunicipality,
        selectedWard
      );
      // dispatch(onDashboarFilters(queryParams));
    }
  }, [
    dispatch,
    setSelectedDistrict,
    selectedDistrict,
    selectedMunicipality,
    selectedWard,
  ]);

  /**
   * Effect for logging or reacting to state changes
   * dispatch(onDashboarFilters(queryParams)); Redux
   */
  useEffect(() => {
    if (dashboardFilterState?.data) {
      // const { data, status, message } = dashboardFilterState.data || {};
      if (dashboardFilterState?.data) {
        // Set the parsed data to state variables
        setSurveyInfo(dashboardFilterState?.data?.surveyInfoList);
        setVerificationInfoList(dashboardFilterState?.data?.verificationInfoList);
        setAadhaarEkycInfoList(dashboardFilterState?.data?.aadhaarEkycInfoList);
        setEconomicCategoryInfoList(dashboardFilterState?.data?.economicCategoryInfoList);
        setRetainInInfoList(dashboardFilterState?.data?.retainInInfoList);
        

        console.log("setVerificationInfoList", verificationInfoList);
      } else {
        console.log("No data in dashboardFilterState");
      }
    } else {
      console.log("No data in dashboardFilterState");
    }
  }, [dashboardFilterState]);

  return (
    <>
      <Filters onChange={handleFilterChange} />
      <main className="p-6 space-y-6">
        {surveyInfo?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Survey Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={surveyInfo.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {verificationInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Verification Status
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={verificationInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {aadhaarEkycInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Aadhaar eKYC Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={aadhaarEkycInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}


        
      {economicCategoryInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
                Economic Status (Family)
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={economicCategoryInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

          
        
      {retainInInfoList?.length > 0 && (
          <>
            <Box
              style={{ background: "#074465", color: "#FFF", borderRadius: 6 }}
            >
              <Typography
                fontSize={20}
                fontStyle={700}
                textAlign={"left"}
                style={{ paddingLeft: 10 }}
              >
               Urban / Rural Family Retention  Status
              </Typography>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TopCard
                  top_header_data={retainInInfoList.map((item) => ({
                    label: item.headerName.toUpperCase(),
                    value: item.headerValueCount ? item.headerValueCount : 0,
                    color: "red", // You can customize this color based on your requirements
                  }))}
                />
              </Grid>
            </Grid>
          </>
        )}

        {/* <Grid item={true} xs={12}>
          <TopCard
            top_header_data={[
              {
                label: "Pending",
                value: totalFamilyCount,
                color: "red",
              },
              {
                label: "Verified",
                value: totalMemberCount,
                color: "blue",
              },
              {
                label: "Objection",
                value: wardFamilyCount,
                color: "green",
              },
            ]}
          />
        </Grid> */}

        {/* <Grid
          container
          sx={{ background: "#FFF", borderRadius: 6, display: "none" }}
        >
          <Grid
            item={true}
            xs={12}
            md={12}
            lg={12}
            sx={{ background: "#FFF", borderRadius: 6 }}
          > */}
        {/* <div
              style={{
                display: "table",
                tableLayout: "fixed",
                width: "100%",
                maxHeight: "400px",
              }}
            >
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 400, height: 400 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
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
                    <TableBody>
                      {familyList?.content &&
                        familyList?.content
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index2) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index2}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      className="hoverable-cell"
                                      key={column.id}
                                      align={column.align}
                                      onClick={(handleEvent) => {
                                        console.log(
                                          row,
                                          "Asdjkuiwhqdjwknshfewdsk"
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
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  style={{
                    padding: 10,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  count={10}
                  color="primary"
                />

              </Paper>
            </div> */}
        {/* </Grid>
        </Grid> */}

        {/* <div className="p-4 flex-grow">
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
                    <Typography
                      fontWeight="600"
                      style={{ fontSize: 20 }}
                      color="black"
                    >
                      Member Details
                    </Typography>
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

                <Divider
                  variant="fullWidth"
                  horizontal
                  style={{ marginTop: 10, marginBottom: 10 }}
                />

                {selectedFamily?.members &&
                  selectedFamily?.members.map((memberObject, index) => {
                    return (
                      <>
                        <Paper
                          elevation={3}
                          variant="elevation"
                          style={{ marginBottom: 16 }}
                        >
                          <Typography
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              letterSpacing: 0.5,
                              background: "#074465",
                              padding: 10,
                              color: "#FFF",
                            }}
                          >
                            Member Name: {memberObject.memberName}
                          </Typography>

                          <Box style={{ padding: 10 }}>
                            <Grid container>
                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Name:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.memberName}
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Date of Birth:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.dateOfBirth}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container mt={1}>
                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Gender:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.gender}
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Qualification:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.educationQualification}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container mt={1}>
                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Relation:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.relation}
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Relative Name:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.relativeName}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container mt={1}>
                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Ration Number::
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.rationCardNumber}
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Aadhaar Number:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.aadhaarNumber}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container mt={1}>
                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  Mobile Number:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 14, letterSpacing: 0.5 }}
                                >
                                  {memberObject.mobileNumber}
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={2}>
                                <Typography
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    letterSpacing: 0.5,
                                  }}
                                >
                                  E-KYC:
                                </Typography>
                              </Grid>

                              <Grid item={true} xs={12} sm={4}>
                                <Typography
                                  style={{ fontSize: 16, letterSpacing: 0.5 }}
                                >
                                  {memberObject.isEkycVerfied ? (
                                    <Chip
                                      icon={
                                        <DoneAllIcon
                                          fontSize="small"
                                          color="success"
                                        />
                                      }
                                      label="Verified"
                                      style={{ height: 20 }}
                                    />
                                  ) : (
                                    <Chip
                                      icon={
                                        <ErrorIcon
                                          color="error"
                                          fontSize="small"
                                        />
                                      }
                                      label="Not Verified"
                                      style={{ height: 20 }}
                                    />
                                  )}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </>
                    );
                  })}
              </div>
            </Box>
          </Modal>
        </div> */}
      </main>
    </>
  );
};

export default Dashboard;
