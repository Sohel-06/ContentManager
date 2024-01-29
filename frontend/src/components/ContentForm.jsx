import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import useStyles from "./PageStyles";
import { addressFields } from "./constants";
import schemaValidation from "./SchemaValidation";
import Loader from "./Loader";

const ContentForm = (props) => {
  const { isNew, setIsNew, open, setOpen } = props;
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [fileValue, setFileValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      if (!fileValue) {
        setIsError(true);
      } else {
        setIsLoading(true);
        var formData = new FormData();
        formData.append("title", data.Title);
        formData.append("description", data.Description);
        formData.append("authorName", data["Author Name"]);
        formData.append("email", data.Email);
        formData.append("file", fileValue);
        await axios.post("https://content-manager-s0ec.onrender.com/content", formData);
        setIsLoading(false);
        setOpen(false);
        setIsNew(!isNew);
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      scroll="paper"
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <DialogTitle id="simple-dialog-title" sx={{ textAlign: "center" }}>
        Submit your Content
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} sx={{ marginBottom: "16px" }}>
          {addressFields.map((fieldName, index) => (
            <Grid item xs={12} sm={fieldName.size} key={index}>
              <TextField
                required
                label={fieldName.name}
                fullWidth
                variant="outlined"
                {...register(fieldName.name)}
                error={errors[fieldName.name] ? true : false}
                helperText={
                  errors[fieldName.name] ? errors[fieldName.name]?.message : ""
                }
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => {
                setFileValue(e.target.files[0]);
                setIsError(false);
              }}
              fullWidth
              variant="outlined"
              type="file"
            />
            {isError && (
              <Typography className={classes.errorStyles}>required</Typography>
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" sx={{ mr: 1 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ display: "inline-block", marginLeft: "auto" }}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
      <Loader isLoading={isLoading}/>
    </Dialog>
  );
};

export default ContentForm;
