import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";

function SprintForm() {
  const navigate = useNavigate();
  const sprintsInLocalStorage = localStorage.getItem("sprints");
  const [sprints, setSprints] = useState(
    sprintsInLocalStorage ? JSON.parse(sprintsInLocalStorage) : []
  );
  const goalsInLocalStorage = localStorage.getItem("goals");
  const [goal, setGoal] = useState(
    goalsInLocalStorage ? JSON.parse(goalsInLocalStorage) : []
  );

  // main sprint details
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs());
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(7);
  const [selectedEndDate, setSelectedEndDate] = useState(
    moment().add(7, "days")
  );

  useEffect(() => {
    setSelectedEndDate(moment().add(Number(duration), "days"));
  }, [duration]);

  // goal states
  const [goalDesc, setGoalDesc] = useState("");
  const [goalDuration, setGoalDuration] = useState("");
  const [priority, setPriority] = useState("");

  const handleAddSprint = () => {
    if (selectedDateTime === dayjs() || name === "" || duration === "") {
      toast("Please fill in all fields.");
    } else {
      const updatedSprint = [
        ...sprints,
        {
          id: nanoid(),
          selectedDateTime: selectedDateTime.toLocaleString(),
          selectedEndDate: selectedEndDate.toLocaleString(),
          name: name,
          duration: duration,
          goal: goal,
        },
      ];
      setSprints(updatedSprint);

      localStorage.setItem("goals", JSON.stringify([]));
      localStorage.setItem("sprints", JSON.stringify(updatedSprint));
      toast("Sprint has been created.");

      navigate("/");
    }
  };

  // add a goal to goal array
  const addGoal = () => {
    if (goalDesc === "" || goalDuration === "" || priority === "") {
      toast("Please fill in the all the fields in goal.");
    } else {
      const updatedGoalList = [
        ...goal,
        {
          id: nanoid(),
          description: goalDesc,
          duration: goalDuration,
          priority: priority,
          completed: false,
        },
      ];
      setGoal(updatedGoalList);
      localStorage.setItem("goals", JSON.stringify(updatedGoalList));
      setGoalDesc("");
      setGoalDuration("");
      setPriority("");
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: "60px", mb: "25px" }}>
        <Typography variant="h4">Create a Sprint</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem>
                  <DateCalendar
                    sx={{ width: "300px" }}
                    value={selectedDateTime}
                    onChange={(newDateTime) => {
                      setSelectedDateTime(newDateTime);
                    }}
                    disablePast
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid> */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper elevation={1} sx={{ p: "30px", mt: "9px", mb: "40px" }}>
              <Box sx={{ mt: "15px" }}>
                <Typography variant="h6">
                  Start Date: {dayjs().format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="h6">
                  End Date: {selectedEndDate.format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <TextField
                color="primary"
                sx={{ mt: "25px" }}
                fullWidth
                id="sprint_name"
                label="Sprint Name"
                variant="outlined"
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                color="primary"
                type="number"
                sx={{ mt: "25px" }}
                fullWidth
                id="group_location"
                label="Duration"
                variant="outlined"
                autoFocus
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
              <Box sx={{ mt: "25px" }}>
                <InputLabel>Goals: ({goal.length})</InputLabel>
                <List sx={{ width: "100%" }}>
                  {goal.map((g) => {
                    // const courseInGroup = groups.some((g) =>
                    //   g.selectedCourse.includes(course.id)
                    // );
                    return (
                      <ListItem
                        key={g.id}
                        disableGutters
                        divider
                        secondaryAction={
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            {/* <IconButton
                            //  onClick={() => handleUpdate(course)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                            //   disabled={courseInGroup}
                            //   onClick={() => handleDelete(course)}
                            >
                              <Delete />
                            </IconButton> */}
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={`Goal Desc: ${g.description}, Estimated ${g.duration} hours, ${g.priority} Priority`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box sx={{ mt: "25px" }}>
                <Typography variant="h6">Add Goals</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  mt: "10px",
                }}
              >
                <TextField
                  fullWidth
                  color="primary"
                  label="Goal Description"
                  variant="outlined"
                  value={goalDesc}
                  onChange={(event) => setGoalDesc(event.target.value)}
                />
                <TextField
                  fullWidth
                  color="primary"
                  label="Estimated Hours"
                  variant="outlined"
                  type="number"
                  value={goalDuration}
                  onChange={(event) => setGoalDuration(event.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    color="primary"
                    label="Priority"
                    variant="outlined"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
                <Button color="primary" variant="contained" onClick={addGoal}>
                  Add Goal
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  mt: "20px",
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleAddSprint}
                >
                  Create Sprint
                </Button>
                <Button
                  component={Link}
                  to="/"
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SprintForm;
