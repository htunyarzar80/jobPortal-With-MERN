import { Box, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { companyLoadSingleAction, companyUpdateAction } from "../../redux/actions/companyAction";


const DashUpdateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleCompany} = useSelector((state) => state.singleCompany);
  console.log("singleCompany",singleCompany)
  const { id } = useParams();

  useEffect(() => {
    dispatch(companyLoadSingleAction(id)); 
  }, [id]);

  const [imagePreview, setImagePreview] = React.useState(null);

  const handleSelectImage = () => {
    document.getElementById("companyLogo").click();
  };

  const handleFileChange = (event) => {
    const image = event.currentTarget.files[0];
    if (image) {
      if (image.size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(image);
          formik.setFieldValue("companyLogo", image);
      } else {
        alert("Image size more than 2MB");
      }
    } 
    // else {
    //    formik.setFieldValue("companyLogo", ""); 
    //   setImagePreview(null); 
    // }
  };
  

  const formik = useFormik({
    initialValues: {
      companyName: singleCompany?.companyName || "",
      description: singleCompany?.description || "",
      companyPhone: singleCompany?.companyPhone || "",
      companyEmail: singleCompany?.companyEmail || "",
      location: singleCompany?.location || "",
    },
    onSubmit: (values, actions) => {
      const formData = new FormData();
  
      formData.append("companyName", values.companyName);
      formData.append("description", values.description);
      formData.append("companyEmail", values.companyEmail);
      formData.append("location", values.location);
      formData.append("companyPhone", values.companyPhone);
  
      if (values.companyLogo) {
        formData.append("companyLogo", values.companyLogo);
      }
  
      dispatch(companyUpdateAction(id, formData));
      actions.resetForm();
      navigate("/admin/companies");
    },
  });
  

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 4,
      }}
    >
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        className="form_style border-style"
        sx={{
          width: "100%",
          bgcolor: "#003366",
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ pb: 3, color: "white" }} className="text-center">
          Update Company
        </Typography>
          <Grid container spacing={2}>
          {/* ... (other grid items) */}
          <Grid item xs={6}>
            <div
              className="container imageUp mb-0 my-0 w-100"
              style={{ backgroundColor: "#003366" }}
            >
              <input
                id="companyLogo"
                name="companyLogo"
                type="file"
                style={{ display: "none", backgroundColor: "#003366" }}
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
                error={
                  formik.touched.companyLogo &&
                  Boolean(formik.errors.companyLogo)
                }
                helperText={
                  formik.touched.companyLogo && formik.errors.companyLogo
                }
              />
              <div className="img-area" onClick={handleSelectImage}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Company Logo" />
                ) : (
                  <>
                    <CloudUploadIcon />
                    <h3 className="text-dark">Upload Logo</h3>
                  </>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyName"
              label="Name"
              name="companyName"
              InputLabelProps={{
                shrink: true,
              }}
         
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyName && Boolean(formik.errors.companyName)}
              helperText={formik.touched.companyName && formik.errors.companyName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyPhone"
              name="companyPhone"
              label="companyPhone"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="companyPhone"
              value={formik.values.companyPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyPhone && Boolean(formik.errors.companyPhone)}
              helperText={formik.touched.companyPhone && formik.errors.companyPhone}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyEmail"
              name="companyEmail"
              label="Email"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.companyEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.companyEmail && Boolean(formik.errors.companyEmail)}
              helperText={formik.touched.companyEmail && formik.errors.companyEmail}
            />
          </Grid>
          
        </Grid>
        <Button fullWidth variant="contained" type="submit">
          Update 
        </Button>
      </Box>
    </Box>
  );
};

export default DashUpdateCompany;
