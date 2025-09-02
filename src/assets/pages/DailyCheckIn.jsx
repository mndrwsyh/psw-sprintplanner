import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button, Paper, TextField, Typography, Box } from "@mui/material";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { toast } from "sonner";

function DailyCheckIn() {
  const navigate = useNavigate();

  const sprintsInLocalStorage = localStorage.getItem("sprints");
  const [sprints, setSprints] = useState(
    sprintsInLocalStorage ? JSON.parse(sprintsInLocalStorage)[0] : []
  );
  const checkInInLocalStorage = localStorage.getItem("checkIn");
  const [checkIn, setCheckIn] = useState(
    checkInInLocalStorage ? JSON.parse(checkInInLocalStorage) : []
  );

  // main sprint details
  const [selectedDateTime, setSelectedDateTime] = useState(
    sprintsInLocalStorage ? sprints.selectedDateTime : ""
  );
  const [name, setName] = useState(sprintsInLocalStorage ? sprints.name : "");
  const [duration, setDuration] = useState(
    sprintsInLocalStorage ? sprints.duration : ""
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    sprintsInLocalStorage ? sprints.selectedEndDate : ""
  );

  const [goal, setGoal] = useState(sprintsInLocalStorage ? sprints.goal : []);

  // goal states
  const [goalDesc, setGoalDesc] = useState(
    sprintsInLocalStorage ? goal.description : ""
  );
  const [goalDuration, setGoalDuration] = useState(
    sprintsInLocalStorage ? goal.duration : ""
  );
  const [priority, setPriority] = useState(
    sprintsInLocalStorage ? goal.priority : ""
  );
  const [completed, setCompleted] = useState(
    sprintsInLocalStorage ? goal.completed : false
  );

  // daily check in / goal notes
  const [hoursWorked, setHoursWorked] = useState("");
  const [notes, setNotes] = useState("");
  const [plan, setPlan] = useState("");

  /*
    Open Daily Check-in
        - User clicks Daily Check-in button
        - System shows current date and sprint progress (Day 3 of 7) 
    Update Goals Progress
        - System lists all goals
        - For each goal, user can:
            - Mark as completed ✅
            - Log hours worked today (number input)
            - Add a quick note (optional)
        - Today’s Focus
            - User selects 1-3 goals to focus on today
            - User writes a brief plan for the day (optional text field)
        Save Check-in
            - User clicks “Save Daily Update”
            - System saves and shows updated progress
  */

  const handleMarkAsDone = (id) => {
    goal.map((g) => {
      if (g.id === id) {
        g.completed = true;
      }
      return;
    });
    toast("Task marked as done");
  };

  const handleCheckIn = () => {
    if (!hoursWorked) {
      toast("Please log your hours first!");
    } else {
      const dailyCheckInProgress = [
        ...checkIn,
        {
          id: nanoid(),
          hoursWorked: hoursWorked,
          notes: notes,
          plan: plan,
        },
      ];
      setCheckIn(dailyCheckInProgress);
      localStorage.setItem("checkIn", JSON.stringify(dailyCheckInProgress));
      toast("Today's progress has been saved.");

      navigate("/");
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: "60px", mb: "25px" }}>
        <Typography variant="h4">Daily Check-In</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper elevation={1} sx={{ p: "30px", mt: "9px", mb: "40px" }}>
              <Box sx={{ mt: "15px" }}>
                <Typography variant="h6">
                  Current Date: {dayjs().format("DD/MM/YYYY")}
                </Typography>
                <Typography variant="h6">
                  {/* current date - start date = the day out of duration */}
                  Sprint Progress: {`Day 1 out of ${duration}`}
                </Typography>
              </Box>
              {/* for each goal user
                  1. mark as done
                  2. log hours worked today (number)
                  3. add a quick note (optional)
              */}
              <Box sx={{ mt: "25px" }}>
                <InputLabel>Goals: ({goal.length})</InputLabel>
                <List sx={{ width: "100%" }}>
                  {goal.map((g, index) => {
                    return (
                      <ListItem key={g.id} disableGutters divider>
                        <Box sx={{ display: "block" }}>
                          {/* goal name */}
                          {g.completed ? (
                            // completed (true)
                            <ListItemText
                              color="success"
                              primary={`Goal ${index + 1}: ${g.description}`}
                            />
                          ) : (
                            // not completed (false)
                            <ListItemText
                              primary={`Goal ${index + 1}: ${g.description}`}
                            />
                          )}
                          {/* hours worked */}
                          <TextField
                            color="primary"
                            sx={{ mt: "25px" }}
                            fullWidth
                            id="hours_worked"
                            label="Hours Worked"
                            variant="outlined"
                            type="number"
                            autoFocus
                            value={hoursWorked}
                            onChange={(event) =>
                              setHoursWorked(event.target.value)
                            }
                          />
                          {/* quick notes */}
                          <TextField
                            color="primary"
                            sx={{ mt: "25px" }}
                            fullWidth
                            id="quick_notes"
                            label="Quick Notes"
                            variant="outlined"
                            autoFocus
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                          />
                          {g.completed ? null : (
                            <Button
                              color="primary"
                              variant="contained"
                              sx={{ mt: "25px", mb: 2 }}
                              onClick={() => handleMarkAsDone(g.id)}
                            >
                              Mark As Done
                            </Button>
                          )}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box sx={{ mt: "25px" }}>
                <Typography>Plan for the day</Typography>
                <TextField
                  color="primary"
                  sx={{ mt: "25px" }}
                  fullWidth
                  id="plan"
                  variant="outlined"
                  autoFocus
                  value={plan}
                  onChange={(event) => setPlan(event.target.value)}
                />
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
                  onClick={handleCheckIn}
                >
                  Save Daily Update
                </Button>
                {/* <Button
                  component={Link}
                  to="/"
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button> */}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DailyCheckIn;
