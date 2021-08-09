import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  table: {
    minWidth: 600
  }
}));

export default function Student() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const classes = useStyles();
  const paperStyle = {
    padding: "50px 20px",
    margin: "50px auto",
    width: "600px"
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const student = {
      firstName,
      lastName,
      email,
      country
    };

    if (firstName === "") {
      setError("First Name cannot be empty");
    } else if (lastName === "") {
      setError("Last Name cannot be empty");
    } else if (email === "") {
      setError("Email Name cannot be empty");
    } else if (country === "") {
      setError("Country Name cannot be empty");
    } else {
      fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      })
        .then(() => console.log("New student added"))
        .then(() => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setCountry("");
          setError("");
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/students")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      }, []);
  });

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <p style={{ color: "red" }}>{error}</p>
        <h1 style={{ color: "#3F51B5" }}>
          <u>Add New Student</u>{" "}
        </h1>
        <form
          className={classes.root}
          noValidate
          autoComplete='on'
          onSubmit={handleFormSubmit}
        >
          <TextField
            id='outlined-basic'
            label='Student First Name'
            variant='outlined'
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Student Last Name'
            variant='outlined'
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Student email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Student country'
            variant='outlined'
            fullWidth
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      </Paper>

      <TableContainer style={{ marginBottom: "100px" }} component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Student ID:</TableCell>
              <TableCell align='left'>First Name:</TableCell>
              <TableCell align='left'>Last Name:</TableCell>
              <TableCell align='left'>Email:</TableCell>
              <TableCell align='left'>Country:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell component='th' scope='row'>
                  {student.id}
                </TableCell>
                <TableCell align='left'>{student.firstName}</TableCell>
                <TableCell align='left'>{student.lastName}</TableCell>
                <TableCell align='left'>{student.email}</TableCell>
                <TableCell align='left'>{student.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
