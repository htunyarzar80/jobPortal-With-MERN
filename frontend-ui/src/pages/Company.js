import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { companyLoadAction } from "../redux/actions/companyAction";
import Navbar from "../components/layout/Navbar";
import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import LoadingBox from "../components/LoadingBox";
import CompanyCard from "../components/CompanyCard";
import { useTheme } from "@emotion/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { dark } from "@mui/material/styles/createPalette";
import SearchCom from "../components/SearchCom";
import ComHeader from "../components/layout/ComHeader";
import Footer from "../components/layout/Footer";
import Meta from "./Meta";

const Company = () => {
  const { companies, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadCompanies
  );
  // console.log(setUniqueLocation);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

  const [page, setPage] = useState(1);
 

  useEffect(() => {
    dispatch(companyLoadAction(page, keyword, location));
  }, [page, keyword, location]);

  return (
    <>
      <Meta title={"J4U - Companies"} />
      <ComHeader />
      <Box sx={{ color: palette.background.default, minHeight: "100vh" }}>
        <Typography
          variant="h5"
          sx={{ color: "dark", justifyContent: "center" }}
          className="text-center"
        >
          Companies list
        </Typography>
        <Navbar />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              <Card
                sx={{
                  minWidth: 250,
                  mb: 3,
                  mt: 3,
                  p: 2,
                  bgcolor: "#003366",
                  border: 1.5,
                }}
              >
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.white, fontWeight: 600 }}
                  >
                    Find company by location
                  </Typography>
                  <MenuList>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon
                              sx={{
                                color: palette.secondary.white,
                                fontSize: 18,
                              }}
                            />
                          </ListItemIcon>
                          <Link to={`/${location}`} className="text-white">
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 6, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : companies && companies.length === 0 ? (
                <>
                  <Box
                    sx={{
                      minHeight: "350px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <h2>No result found!</h2>
                  </Box>
                </>
              ) : (
                <>
                  <div className="row">
                    {companies &&
                      companies.map((company, i) => (
                        <CompanyCard
                          key={i}
                          id={company._id}
                          companyName={company.companyName}
                          companyLogo={company.companyLogo}
                          description={company.description}
                          companyEmail={company.companyEmail}
                          companyPhone={company.companyPhone}
                          jobs={company.jobs}
                          location={company.location}
                        />
                      ))}
                  </div>
                </>
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Company;
