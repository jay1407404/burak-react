import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <>
          <Box className={"help-menu"}>
            <Box sx={{ width: "75%", borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Help topics"
                variant="fullWidth"
                className={"table-list"}
              >
                <Tab label="TERMS" value={"1"} id="help-tab-1" aria-controls="help-panel-1" />
                <Tab label="FAQ" value={"2"} id="help-tab-2" aria-controls="help-panel-2" />
                <Tab label="CONTACT" value={"3"} id="help-tab-3" aria-controls="help-panel-3" />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <Box role="tabpanel" id="help-panel-1" aria-labelledby="help-tab-1" hidden={value !== "1"} sx={{ p: 3 }}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </Box>
              <Box role="tabpanel" id="help-panel-2" aria-labelledby="help-tab-2" hidden={value !== "2"} sx={{ p: 3 }}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`faq-${number}-content`}
                          id={`faq-${number}-header`}
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </Box>
              <Box role="tabpanel" id="help-panel-3" aria-labelledby="help-tab-3" hidden={value !== "3"} sx={{ p: 3 }}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Contact us!</span>
                      <p>Fill out below form to send a message!</p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label>Your name</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Your email</label>
                        <input
                          type={"text"}
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Message</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={"Your message"}
                        ></textarea>
                      </div>
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end", mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </>
      </Container>
    </div>
  );
}
