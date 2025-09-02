import { useState } from "react";
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
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function Dashboard() {
  const navigate = useNavigate();
  const sprintsInLocalStorage = localStorage.getItem("sprints");
  const [sprints, setSprints] = useState(
    sprintsInLocalStorage ? JSON.parse(sprintsInLocalStorage) : []
  );
  const checkinInLocalStorage = localStorage.getItem("checkIn");
  const [checkIn, setCheckIn] = useState(
    checkinInLocalStorage ? JSON.parse(checkinInLocalStorage) : []
  );
  return (
    <>
      <Container maxWidth="lg">
        {sprints.length === 0 ? (
          <Box sx={{ mt: 5 }}>
            <Button
              color="primary"
              variant="contained"
              to="/sprints"
              component={Link}
            >
              New Sprint
            </Button>
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
          >
            {/* 3. use .map to render the notes */}
            {sprints.map((sprint) => (
              <Grid key={sprint.id} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    mt: 5,
                  }}
                >
                  <CardContent>
                    {/* 4. render the sprint title */}
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                      {sprint.name}
                    </Typography>
                    <Chip
                      label={`Duration: ${sprint.duration} days`}
                      sx={{ mb: 1.5 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 1.5 }}
                    >
                      {/* {new Date().toISOString()} */}
                      {dayjs(sprint.selectedDateTime).format(
                        "DD/MM/YYYY"
                      )} - {dayjs(sprint.selectedEndDate).format("DD/MM/YYYY")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h5" component="div">
                        Day 1 of {sprint.duration}
                      </Typography>
                      <Button
                        component={Link}
                        to="/checkin"
                        variant="contained"
                      >
                        Daily Check-In
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* 3. use .map to render the notes */}
          {checkIn.map((c) => (
            <>
              <Grid key={c.id} size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    mt: 2,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ mb: 1, mt: 1 }}
                    >
                      Goals:
                    </Typography>
                    {sprints.map((sprint) =>
                      sprint.goal.map((g) => (
                        <>
                          <Typography
                            textAlign={"left"}
                            key={g.id}
                            variant="h5"
                            component="div"
                          >
                            - {g.description}
                          </Typography>
                          <Typography
                            textAlign={"left"}
                            variant="h6"
                            component="div"
                          >
                            Hours Worked: {c.hoursWorked}
                          </Typography>
                          <Typography
                            textAlign={"left"}
                            variant="h6"
                            component="div"
                          >
                            Notes: {c.notes}
                          </Typography>
                        </>
                      ))
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid key={c.id} size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    mt: 2,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ mb: 1, mt: 1 }}
                    >
                      Plans for the day:
                    </Typography>
                    <Typography variant="h5" component="div">
                      {c.plan}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
