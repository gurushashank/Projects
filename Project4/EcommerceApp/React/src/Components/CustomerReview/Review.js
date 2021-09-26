import React, { useState } from "react";
import {
  ReviewContainer,
  Wrap,
  Heading,
  CustomerInfo,
  Name,
  CommentSection,
  Comments,
  Date,
  Stars,
} from "./ReviewElements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Rating1 from "../OrderHistory/Rating1";
import { IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { FETCH_REVIEWS, ADD_REVIEW } from "../../Utils/Routes";

const Review = ({ productID }) => {
  const [reviewObject, setReviewObject] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [startDate, setStartDate] = useState(new window.Date());

  const [cookies, setCookie] = useCookies();
  const id = cookies.id;
  const name = cookies.name;

  useEffect(() => {
    fetch(FETCH_REVIEWS + `${productID}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.body);
        setReviewObject(result.body);
        console.log(reviewObject);
      });
  }, []);

  const addHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const changeHandler = (event) => {
    if (event.target.id == "comments") {
      setComment(event.target.value);
      console.log(comment);
    }
  };

  const submitHandler = () => {
    axios
      .post(ADD_REVIEW, {
        userName: name,
        productId: productID,
        review: comment,
        date: startDate.toDateString(),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  return (
    <ReviewContainer>
      <Wrap>
        <Heading>
          Customer Reviews{" "}
          <IconButton onClick={() => addHandler()}>
            <AddIcon />
          </IconButton>
        </Heading>

        {reviewObject?.map((review) => (
          <div>
            <CustomerInfo>
              <i class="fa fa-user" aria-hidden="true" fa-lg></i>
              <Name> {review.userName} </Name>
            </CustomerInfo>

            <CommentSection>
              <Comments> {review.review} </Comments>
              <Date> {review.date} </Date>
            </CommentSection>
          </div>
        ))}
      </Wrap>

      <Dialog
        fullWidth
        style={{ width: "100%", height: "100%" }}
        open={open}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">Add Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={changeHandler}
            id="comments"
            label="Comments"
            type="text"
            fullWidth
          />
          <br />
          <br />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
        </DialogContent>

        <DialogActions>
          <Button onClick={submitHandler} color="primary">
            Add
          </Button>

          <Button onClick={closeHandler} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ReviewContainer>
  );
};

export default Review;
